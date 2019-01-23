importScripts("logger.js");

var IDB_NAME = "meteo_archive";
var IDB_VERSION = 1;
var IDB_TABLES = ["temperature", "precipitation"];
var IDB_DATABASE = null;
var IDB_INDEX = 'y';

var logPrefix = '--| IDB_WORKER: ';
// disableLogging = true;

onmessage = function (event) {
	var data = event.data;
	log("--> IDB_WORKER INCOMING message: ", data);

	if (data.table && data.from && data.to) {
		getIndexedDBData(data, function (result) {
			log(logPrefix + "getIndexedDBData RESULT:", result);
			resolve("message", {
				uid: data.uid,
				result: result
			});
		});
	} else {
		resolve("message", {
			uid: data.uid,
			result: null
		});
	}
};

function resolve (event, args) {
	var post = {
		resolve: event,
		args: args
	};
	log("<-- IDB_WORKER OUTGOING message: ", post);
	postMessage(post);
}

function getIndexedDBData (request, getIndexedDBDataCallback) {
	// 	request = {
	// 		table: "expected_table_name_from_IDB_TABLES",
	// 		from: 1894,
	// 		to: 1899
	// 	}

	log(logPrefix + "getIndexedDBData REQUEST:", request);
	getDB(/*getDBCallback*/function (db) {
		IDB_DATABASE = db;
		if (db) {
			queryDBTableRange(db, request.table, request.from, request.to, /*queryDBTableRangeCallback*/function (records) {
				if (records && records.length) {
					// records array
					getIndexedDBDataCallback(createListByYears(records));
				} else {
					// empty array (as no records or some error)
					getIndexedDBDataCallback([]);
				}
			});
		} else {
			// null as fail
			getIndexedDBDataCallback(null);
		}
	});
}

function createListByYears (records) {
	var annual = [];
	var record, temp_year, temp_year_data, t;
	var i = 0, len = records.length;
	while (i < len) {
		record = records[i];
		if (i === 0) {
			temp_year = record.y;
		}
		if (record.m === 1 && temp_year === record.y) {
			temp_year = record.y;
			temp_year_data = {
				y: temp_year,
				L: record.L,
				H: record.H,
				t: [],
				d: record.d
			};
			for (t = 0; t < record.d.length; t++) {
				temp_year_data.t.push('' + (t + 1) + '/' + record.m + '/' + temp_year + "");
			}
		} else if (temp_year === record.y) {
			temp_year_data.d = temp_year_data.d.concat(record.d);
			for (t = 0; t < record.d.length; t++) {
				temp_year_data.t.push('' + (t + 1) + '/' + record.m + '/' + temp_year + "");
			}
			if (record.L < temp_year_data.L) {
				temp_year_data.L = record.L;
			}
			if (record.H > temp_year_data.H) {
				temp_year_data.H = record.H;
			}
			if (i === (len - 1)) {
				annual.push(temp_year_data);
			}
		} else {
			annual.push(temp_year_data);
			temp_year = record.y;
			continue;
		}
		i++;
	}
	return annual;
}

function getDB (getDBCallback) {
	if (IDB_DATABASE) {
		log(logPrefix + "getDB: DB already opened", IDB_DATABASE);
		getDBCallback(IDB_DATABASE);
	} else {
		openDB(/*openDBCallback*/function (openedDB, readyToUse, transaction) {
			if (openedDB && readyToUse) {
				log(logPrefix + "getDB: DB opened successful", openedDB);
				getDBCallback(openedDB);
			} else if (openedDB && !readyToUse && transaction) {
				log(logPrefix + "upgradeDB: try to create DB tables");
				upgradeDB(openedDB, transaction, /*upgradeDBCallback*/function (upgradedDB) {
					if (upgradedDB) {
						log(logPrefix + "upgradeDB: DB upgraded and opened successful", upgradedDB);
						getDBCallback(upgradedDB);
					} else {
						log(logPrefix + "upgradeDB: DB upgade failed");
						getDBCallback(null);
					}
				});
			} else {
				log(logPrefix + "getDB: DB open failed");
				getDBCallback(null);
			}
		});
	}
}

function openDB (openDBCallback) {
	log(logPrefix + "openDB: try to open DB");
	var request = indexedDB.open(IDB_NAME, IDB_VERSION);

	request.onsuccess = function () {
		var db = this.result;
		if (db.upgadeFinished === true) return;
		db.upgadeFinished = true;
		db.onerror = function (errorEvent) {
            log(logPrefix + "db.onerror:", errorEvent.target);
		};
		openDBCallback(db, true);
	};

	request.onerror = function () {
		openDBCallback(null);
	};

	request.onupgradeneeded = function (upgradeNeededResult) {
		var db = upgradeNeededResult.currentTarget.result;
		var transaction = upgradeNeededResult.currentTarget.transaction;
		openDBCallback(db, false, transaction);
	};
}

function upgradeDB (openedDB, transaction, upgradeDBCallback) {
	if (openedDB) {
		for (var i in IDB_TABLES) {
			createDBTable(openedDB, IDB_TABLES[i]);
		}
		transaction.oncomplete = function (e) {
			if (openedDB.upgadeFinished === true) return;
			openedDB.upgadeFinished = true;
			upgradeDBCallback(openedDB);
		};
	} else {
		transaction.oncomplete = function (e) {
			upgradeDBCallback(null);
		};
	}
}

function createDBTable (openedDB, tableName) {
	var store = openedDB.createObjectStore(tableName, { keyPath: "id", autoIncrement: true });
	store.createIndex(IDB_INDEX, IDB_INDEX, { unique: false });
}

function queryDBTableRange (openedDB, tableName, rangeFrom, rangeTo, queryDBTableRangeCallback) {
	getCountOfDBTableRecords(openedDB, tableName, /*getCountOfDBTableRecordsCallback*/function (count) {
		if (count > 0) { // table already filled from remote
			selectDBTableRecordsByRange(openedDB, tableName, rangeFrom, rangeTo, /*selectDBTableRecordsByRangeCallback*/function (recordsArray) {
				queryDBTableRangeCallback(recordsArray);
			});
		} else { // table not filled yet from remote
			fetchAndFillRemoteData(openedDB, tableName, /*fetchAndFillRemoteDataCallback*/function (count) {
				if (count > 0) { // table just filled from remote
					selectDBTableRecordsByRange(openedDB, tableName, rangeFrom, rangeTo, /*selectDBTableRecordsByRangeCallback*/function (recordsArray) {
						queryDBTableRangeCallback(recordsArray);
					});
				} else { // table empty after fill from remote (or error on filling)
					queryDBTableRangeCallback(null);
				}
			});
		}
	});
}

function selectDBTableRecordsByRange (openedDB, tableName, rangeFrom, rangeTo, selectDBTableRecordsByRangeCallback) {
	if (rangeFrom > rangeTo) {
		// if incorrect ranges then just return empty array as QUERY RECORDS NOT FOUND
		selectDBTableRecordsByRangeCallback([]);
		return;
	}
	var transaction = openedDB.transaction([tableName], 'readonly');
	var store = transaction.objectStore(tableName);
	var index = store.index(IDB_INDEX);
	var keyRangeValue = IDBKeyRange.bound(rangeFrom, rangeTo);
	var req = index.openCursor(keyRangeValue);
	var res = [];

	req.onsuccess = function (successResult) {
		var cursor = successResult.target.result;
		if (cursor) {
			res.push(cursor.value);
			cursor.continue();
		} else {
			selectDBTableRecordsByRangeCallback(res);
		}
	};
}

function getCountOfDBTableRecords (openedDB, tableName, getCountOfDBTableRecordsCallback) {
	var transaction = openedDB.transaction([tableName], 'readonly');
	var store = transaction.objectStore(tableName);
	var index = store.index(IDB_INDEX);
	var req = index.count();
	req.onsuccess = function (successResult) {
		getCountOfDBTableRecordsCallback(successResult.target.result);
	};
	req.onerror = function (errorResult) {
		getCountOfDBTableRecordsCallback(null);
	};
}

function fetchAndFillRemoteData (openedDB, tableName, fetchAndFillRemoteDataCallback) {
	var remote_data = [];
	log(logPrefix + 'fetchRemoteData: remote request for table "' + tableName + '"');
	remoteRequest('/' + tableName + '.json', function (json_string) {
		try {
			remote_data = JSON.parse(json_string);
		} catch (e) {
			remote_data = [];
		}
		var transaction = openedDB.transaction([tableName], "readwrite");
		var store = transaction.objectStore(tableName);

		var i = 0, remoteDataCount = remote_data.length, storedRecords = 0, first_record = false;
		var year, month, remote_record, temp_store_record, value, temp_year, temp_month, temp_day;

		log(logPrefix + 'fetchRemoteData: received ' + remoteDataCount + ' remote data records for table "' + tableName + '"');
		processingRemoteData();

		function processingRemoteData () {
			if (i < remoteDataCount) {
				value = remote_data[i].v;
				remote_record = remote_data[i].t.split('-');
				temp_year = Number(remote_record[0]);
				temp_month = Number(remote_record[1]);
				temp_day = Number(remote_record[2]);
				if (year === temp_year && month === temp_month) {
					temp_store_record.d[temp_day - 1] = value;
					temp_store_record.L = ((value < temp_store_record.L) ? value : temp_store_record.L);
					temp_store_record.H = ((value > temp_store_record.H) ? value : temp_store_record.H);
					i++;
					if (i === remoteDataCount) {
						// last record
						store.put(temp_store_record).onsuccess = processingRemoteData;
						storedRecords++;
					} else {
						// continue
						processingRemoteData();
					}
				} else {
					if (temp_store_record) {
						// next record
						store.put(temp_store_record).onsuccess = processingRemoteData;
						storedRecords++;
						first_record = false;
					} else {
						// first record
						first_record = true;
					}
					year = temp_year;
					month = temp_month;
					temp_store_record = {
						y: temp_year,
						m: temp_month,
						L: value,
						H: value,
						d: []
					};
					temp_store_record.d[temp_day - 1] = value;
					i++;
					if (first_record) {
						processingRemoteData();
					}
				}
			} else {   // complete
				log(logPrefix + 'fetchRemoteData: stored in DB ' + storedRecords + ' records in table "' + tableName + '"');
				fetchAndFillRemoteDataCallback(storedRecords);
			}
		}           
	});
}

var remoteRequest = function (url, callback, data, cache) {
	var uri = function (o, cache) {
		var x, y = '',
			e = encodeURIComponent;
		for (x in o) {
			y += '&' + e(x) + '=' + e(o[x]);
		}
		return y.slice(1) + (!cache ? '&_t=' + Date.now() : '');
	};

	if (data && typeof(data) === 'object') {
		data = uri(data, cache);
	}
	try {
		var x = new(this.XMLHttpRequest)('MSXML2.XMLHTTP.3.0');
		x.open((data ? 'POST' : 'GET'), url, 1);
		x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		x.setRequestHeader('Content-type', (data ? 'application/x-www-form-urlencoded' : 'application/json') + '; charset=UTF-8');
		x.onreadystatechange = function () {
			if (x.readyState > 3 && callback) callback(x.responseText, x);
		};
		x.send(data);
	} catch (e) {}
};

