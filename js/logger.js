function log (text, params) {
	if (typeof disableLogging != 'undefined' && disableLogging) return;
    var data = (typeof params == 'undefined' ? null : params);
    var dt = new Date();
    var ms = dt.getMilliseconds();
    var len = ms.toString().length;
    if (len === 1) {
        ms += '00';
    } else if (len === 2) {
        ms += '0';
    }
    var dateLog = dateFormat(dt, 'DD-MM-YYYY');
    var timeLog = dt.toLocaleTimeString() + '.' + ms;
    var logString = dateLog + ' ' + timeLog + ' > ' + text;

    if (data) {
        console.log(logString, data);
    } else {
        console.log(logString);
    }
}

function dateFormat (date, format) {
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    format = format.replace("DD", (d < 10 ? '0' : '') + d);
    format = format.replace("MM", (m < 9 ? '0' : '') + (m + 1));
    format = format.replace("YYYY", y);

    return format;
}

if (typeof exports !== 'undefined') {
	exports.log = log;
}
