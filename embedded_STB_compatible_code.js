//======================================//
//Embedded STB compatible code          //
//This is not required to be deleted!   // 
//======================================//
if (typeof JSON == "undefined") {
    JSON = {
        parse: function (text) {

            if (window.navigator.userAgent.indexOf("Chrome") !== -1) {
                return new Function("return " + text)();
            }
            return eval("(" + text + ")");
        }
       , stringify: function (jsObj) {
           var stack1 = [];
           var stack2 = [];
           var process = function (obj) { if (obj && typeof obj == "object") { return obj; } else if (typeof obj == "string") { return "\"" + obj.replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\""; } else { return obj + ""; } };
           stack1.push(process(jsObj)); while (stack1.length) {
               var o = stack1.pop(); if (typeof o == "object") {
                   var i = null;
                   if (o instanceof Array) {
                       stack1.push("["); for (i = 0; i < o.length; i++) { stack1.push(process(o[i])); stack1.push(","); } if (i) {
                           stack1.pop();
                       } stack1.push("]");
                   } else {
                       stack1.push("{"); for (i in o) { stack1.push("\"" + i + "\":"); stack1.push(process(o[i])); stack1.push(","); } if (i) {
                           stack1.pop();
                       } stack1.push("}");
                   }
               } else {
                   stack2.unshift(o);
               }
           } return stack2.join("");
       }, stringify1: function (jsonObj) {
           var jsonBuffer = []; var type = typeof jsonObj;
           if (type === "object") {
               if (jsonObj === null) { jsonBuffer.push(jsonObj + ""); } else {
                   if (jsonObj instanceof Array) {
                       jsonBuffer.push("["); for (var i = 0; i < jsonObj.length; i++) { jsonBuffer.push(JSON.stringify1(jsonObj[i])); jsonBuffer.push(","); } if (i) {
                           jsonBuffer.pop();
                       } jsonBuffer.push("]");
                   } else {
                       jsonBuffer.push("{"); for (var j in jsonObj) { jsonBuffer.push("\"" + j + "\":" + JSON.stringify1(jsonObj[j])); jsonBuffer.push(","); } if (j) {
                           jsonBuffer.pop();
                       } jsonBuffer.push("}");
                   }
               }
           } else if (type == "string") { jsonBuffer.push("\"" + jsonObj.replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\""); } else { jsonBuffer.push(jsonObj + ""); } return jsonBuffer.join("");
       }
    };
}




var rand = {};
rand.get = function (begin, end) {
    return Math.floor(Math.random() * (end - begin)) + begin;
};

//window.location.host;
//alert(request.QueryString("a"));
var request = {
    QueryString: function (val) {
        var uri = window.location.search;
        var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
        return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
    },
    QueryStringSelect: function (args) {
        var uri = window.location.search;
        var re = /\w*\=([^\&\?]*)/ig;
        var retval = [];
        while ((arr = re.exec(uri)) != null) {
            var _li = arr[0].split('=');
            //retval.push(arr[0]);
            for (var i = 0; i < args.length; i++) {
                if (_li[0] == args[i]) {
                    retval.push(_li[0] + '=' + _li[1]);
                }
            }
        }
        return retval.join('&');
    },
    QueryStrings: function () {
        var uri = window.location.search;
        var re = /\w*\=([^\&\?]*)/ig;
        var retval = [];
        while ((arr = re.exec(uri)) != null)
            retval.push(arr[0]);
        return retval;
    },
    setQuery: function (val1, val2) {
        var a = this.QueryStrings();
        var retval = "";
        var seted = false;
        var re = new RegExp("^" + val1 + "\=([^\&\?]*)$j", "ig");
        for (var i = 0; i < a.length; i++) {
            if (re.test(a[i])) {
                seted = true;
                a[i] = val1 + "=" + val2;
            }
        }
        retval = a.join("&");
        return "?" + retval + (seted ? "" : (retval ? "&" : "") + val1 + "=" + val2);
    },
    getSURL: function () {
        return 'http://' + window.location.host + '' + window.location.pathname;
    }
};

var Timewait_obj = [];

var getHttpRequest = function (val, wait, func) {
    var _data = [];

    if (typeof wait != "undefined" && typeof func != "undefined") {
        Ajax.get(val, function (data) {
            func(data);
        }, false, false, wait);

    } else {

        Ajax.get(val, function (data) {
            _data = data;
        }, false, false);

    }
    return _data;
};

var Ajax = {
    __ajax: this
    , timeout: {}
    , _xmlHttp: function () {
        return new (window.ActiveXObject || window.XMLHttpRequest)("Microsoft.XMLHTTP");
    }
    , _AddEventToXHP: function (xhp, fun, isxml) {
        xhp.onreadystatechange = function () {
            if (xhp.readyState == 4 && xhp.status == 200)
                fun(isxml ? xhp.responseXML : xhp.responseText);
        }
    }
    , get: function (url, fun, isxml, bool, wait) {
        var _xhp = this._xmlHttp();
        this._AddEventToXHP(_xhp, fun || function () { }, isxml);

        if (typeof wait == "undefined") {
            _xhp.open("GET", url, bool);
            //_xhp.withCredentials = true;
            _xhp.send(null);
        } else {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () {
                _xhp.open("GET", url, bool);
                //_xhp.withCredentials = true;
                _xhp.send(null);

            }, wait);

        }
    },
    post: function (url, data, fun, isxml, bool, wait) {
        var _xhp = this._xmlHttp();
        this._AddEventToXHP(_xhp, fun || function () { }, isxml);

        if (typeof wait == "undefined") {
            _xhp.open("POST", url, bool);
            //_xhp.withCredentials = true;
            _xhp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            _xhp.send(data);
        } else {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () {
                _xhp.open("POST", url, bool);
                //_xhp.withCredentials = true;
                _xhp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                _xhp.send(data);

            }, wait);

        }

    }
};



var jqAjax = {};

var html_load = function (url, data, func) {

    if (typeof ajax == "object" && typeof ajax.abort == "function") {
        jqAjax.abort();
    }
    var item = url + data;


    var options = {
        dataType: "html",
        url: url,
        data: data,
        success: function (data, textStatus) {
            if (textStatus == 'success') {
                //$j('#panel').find("div.level3_panel").html(data);
                //$j('#panel').find("div.weather_area_content").width($j('#panel').find("div.weather_area_content ul").length * 358);
                func(data, textStatus);

                //ajax_cache[item] = {
                //    data: data,
                //    exptime: (new Date()).getTime() + 60000
                //};

            }
            else {

            }
        },
        error: function (x, msg, err) {
            func(html_loading, "");
        }
    };
    jqAjax = $j.ajax(options);
    // }
};
//=============================//
//Embedded STB compatible code//
//============================//