var key = {
    Up: 38,
    Down: 40,
    Left: 37,
    Right: 39,
    Ok: 13,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    numb1: 49,
    numb2: 50,
    numb3: 51,
    numb4: 52,
    numb5: 53,
    numb6: 54,
    numb7: 55,
    numb8: 56,
    numb9: 57,
    numb0: 48,
    Mute: 77,
    Back: 66,
    Track: 82,
    VolumeUp: 190,
    VolumeDown: 188,
    Fav: 84,
    PlayBack: 80,
    PageDown: 34,
    PageUp: 33,
    Menu: 72
};

//键盘转数字
var getKeyNum = function (code) {

    switch (code) {
        case key.numb1:
            return 1;
            break;
        case key.numb2:
            return 2;
            break;
        case key.numb3:
            return 3;
            break;
        case key.numb4:
            return 4;
            break;
        case key.numb5:
            return 5;
            break;
        case key.numb6:
            return 6;
            break;
        case key.numb7:
            return 7;
            break;
        case key.numb8:
            return 8;
            break;
        case key.numb9:
            return 9;
            break;
        case key.numb0:
            return 0;
            break;
        default:

            return null;

    }

};

var Event = function (_event) {

    var keycode = [];

    //if (_event.which) {
    keycode = _event.which;

    //} else {

    //    keycode = event.keyCode;
    //}
    var code = 0;

    switch (keycode) {
        case 1:
        case 38: //other browsers
        case 65362: //上
            code = key.Up;
            break;
        case 2:
        case 40: //other browsers
        case 65364: //下
            code = key.Down;
            break;
        case 3:
        case 37: //other browsers
        case 65361: //左
            code = key.Left;
            break;
        case 4:
        case 39: //other browsers
        case 65363: //右
            code = key.Right;
            break;
        case 13:
        case 65293: //确定
            code = key.Ok;
            break;
        case 340:
        case 8: //other browsers
        case 27: //谷歌浏览器返回键返回页面问题，用ESC键暂代
        case 65367: //返回
        case 66:
            code = key.Back;
            break;
        case 372:
        case 33: //other browsers
        case 25: //向前翻页
            code = key.PageUp;
            break;
        case 373:
        case 34: //other browsers
        case 26: //向后翻页
            code = key.PageDown;
            break;
        case 513: //right [Ctrl]
        case 65360: //菜单
            code = key.Menu;
            break;
        case 595: //[+]
        case 63561: //音量加
            code = key.VolumeUp;
            break;
        case 596: //[-]
        case 63562: //音量减
            code = key.VolumeDown;
            break;
        case 597: //[.]
        case 63563: //静音
            code = key.Mute;
            break;
        case 32:
            code = key.F1;
            break;
        case 33:
            code = key.F2;
            break;
        case 34:
            code = key.F3;
            break;
        case 35:
            code = key.F4;
            break;
        case 49:
            code = key.numb1;
            break;
        case 50:
            code = key.numb2;
            break;
        case 51:
            code = key.numb3;
            break;
        case 52:
            code = key.numb4;
            break;
        case 53:
            code = key.numb5;
            break;
        case 54:
            code = key.numb6;
            break;
        case 55:
            code = key.numb7;
            break;
        case 56:
            code = key.numb8;
            break;
        case 57:
            code = key.numb9;
            break;
        case 48:
            code = key.numb0;
            break;
        case 65307:
            code = key.Track;
            break;
        case 36: // 喜爱
            code = key.Fav;
            break;
        case 72: // 回看
            code = key.PlayBack;
            break;
    }
    return code;
};




//Beta 4.2
var $j = jQuery.noConflict();


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


String.prototype.trim = function () {
    // 用正则表达式将前后空格  
    // 用空字符串替代。  
    return this.replace(/(^\s*)|(\s*$j)/g, "");
};

String.prototype.TrueLength = function () {
    var str = this;
    var length = str.length;
    var realLength = 0
    var temLength = 0;
    for (var i = 0; i < length; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            temLength += 1;
        } else {
            realLength += 1;
        }
        if (temLength == 2) {
            realLength += 1;
            temLength = 0;
        }
    }
    return realLength;
};

//week_day[d.getDay()]
//var week_day = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

String.prototype.toDate = function () {
    var _d = this.split('-');
    return new Date(parseInt(_d[0], 10)
                , parseInt(_d[1], 10) - 1
                , parseInt(_d[2], 10));
};
String.prototype.toDateTime = function () {

    return new Date(Date.parse(this.replace(/-/g, "/")));
};


//var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");     
Date.prototype.format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
Date.prototype.AddDays = function (_add) { //author: meizz   
    var t = new Date();//你已知的时间
    var t_s = t.getTime();//转化为时间戳毫秒数
    var nt = new Date();//定义一个新时间 
    nt.setTime(t_s + 1000 * 60 * 60 * 24 * _add);//设置新时间比旧时间多一小时 

    return nt;
};
Date.prototype.AddHours = function (_add) { //author: meizz   
    var t = new Date();//你已知的时间
    var t_s = t.getTime();//转化为时间戳毫秒数
    var nt = new Date();//定义一个新时间 
    nt.setTime(t_s + 1000 * 60 * 60 * _add);//设置新时间比旧时间多一小时 

    return nt;
};

Date.prototype.UTCToLocalTimeString = function () {

    //'yyyy/MM/dd hh:mm:ss'
    // var d = this;
    var timeOffsetInHours = -(this.getTimezoneOffset() / 60) + -8;
    this.setHours(this.getHours() + timeOffsetInHours);
    return this.format('yyyy/MM/dd hh:mm:ss');
};
Date.prototype.UTCToLocalTime = function () {

    //'yyyy/MM/dd hh:mm:ss'
    // var d = this;
    var timeOffsetInHours = -(this.getTimezoneOffset() / 60) + -8;
    this.setHours(this.getHours() + timeOffsetInHours);
    return this;
};

String.prototype.removeAT = function (b) {
    var a = this;
    while (a.indexOf(b) != -1) {
        a = a.replace(b, '');
    }
    return a;
};


String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
};
String.prototype.UnicodeLength = function () {
    var txt = this;
    txt = txt.replace(/[\u00FF-\uFFFF]/g, "**");
    return txt.length;
};





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


/*
 类 Cookie
 将此类放入用到的js文件中即可使用
 1.add(name,value,100); 添加一个cookie
 2.get(name);
 3.remove(name);
 用例:
 Cookie.add("sk","ss",3);
 _alert(cookie.get("sk"));
 Cookie.remove("sk");
 */
var Cookie = new function () {
    //添加cookie
    this.add = function (name, value, hours) {
        var life = new Date().getTime();
        life += hours * 1000 * 60;
        var cookieStr = name + "=" + escape(value) + ";expires=" + new Date(life).toGMTString() + ";path=/";
        document.cookie = cookieStr;
    };
    //获取cookie值
    this.get = function (name) {
        var cookies = document.cookie.split(";");
        if (cookies.length > 0) {
            var cookie = cookies[0].split("=");
            if (cookie[0] == name)
                return unescape(cookie[1]);
        }
        return null;
    };
    //删除cookie
    this.remove = function (name) {

        if (typeof name == "object") {
            for (var i = 0; i < name.length; i++) {
                this._remove(name[i]);
            }
        }
    };
    this._remove = function (name) {

        var date = new Date();
        date.setTime(date.getTime() - 10000);
        var cookieStr = name + "=" + escape('null') + ";expires=" + date.toGMTString() + ";path=/";
        document.cookie = cookieStr;
    }
};

/*
 * 写方法 _global.val('value_name','设置这个value');
 * 读取方法var value=$g('value_name');
 */
var _global = new function () {
    this.val = function (name, value) {
        if (typeof (Global) == 'function') {
            var _local_global = new Global(name);
            if (value != undefined) {
                _local_global.value = value;
                Cookie.add(name, value, 1);
            }
            return _local_global.value;
        }
        else {
            if (value != undefined) {
                Cookie.add(name, value, 1);
                return value;
            }
            if (Cookie.get(name) == null) {
                return "default";
            }
            else {
                return Cookie.get(name);
            }
        }
        return "default";
    };
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



//模拟走马灯
var Jsmarquee = function () {
    var self = this;
    self.isrun = true;
    self.speed = 10;
    self.t = [];
    self.Marquee = [];
    self.marquee_obj = [];
    self.marquee_obj1 = [];
    self.marquee_obj2 = [];
    this.Marquee = function () {
        var sleft = self.marquee_obj.scrollLeft();

        if (sleft > self.marquee_obj2[0].offsetWidth) {
            self.marquee_obj.scrollLeft(sleft - self.marquee_obj2[0].offsetWidth);
        } else {
            self.marquee_obj.scrollLeft(sleft + self.speed);
        }
    };

    this.stop = function () {
        self.isrun = false;
        clearTimeout(self.t);
    };

    this.timer = function () {
        if (self.isrun) {
            self.t = setTimeout(function () {
                self.Marquee();
                self.timer();
            }, 100);
        }
    };

    this.start = function () {
        self.marquee_obj2.html("" + self.marquee_obj1.html());
        self.marquee_obj.scrollLeft(0);
        self.isrun = true;
        self.timer();
    };
};

var jsmobj = [];

jsmobj = new Jsmarquee();


var cm = {
    version: "0.7.6.1",
    __self: [],
    nnode: [],      //下一个 dom
    lnode: [],      //当前的 dom
    pointnode: [],
    attr: [],       //当前DOM的attr集合

    obj: { area_id: "", point_id: "" },
    keyevent: -1,
    tag: {}
    //Panel框架配置信息
    , panel: {}
    , panel_model: {}
   , init: function () {
       //this.__self = this;
   }
    , $: function (id) {
        return document.getElementById(id);
    }
    , unpoint: function (_master, _point, _selectobj) {
        if (_master && _point) {
            this.setarea({ area_id: _master, point_id: _point });
        }
        var _so = []; //$j(_selectobj);
        if (!_selectobj && cm.nnode.length > 0) {
            _so = cm.nnode;
        } else {
            _so = $j(_selectobj);
        }
        this.proc_out(_so);
        this.select_unlock(_so);
    }
    , setpoint: function (_master, _point, _selectobj) {

        //"#master", "#point", "#master li[path]:first"
        var _so = $j(_selectobj);
        this.setarea({ area_id: _master, point_id: _point });
        this.proc_in(_so);   //激活#mini_key0的in事件不触发光标
        this.select_lock(_so); // 触发#mini_key0的光标显示

        //初始化第一个对象
        this.lnode = _so;
    }
    ,
    resetarea: function () {
        this.pointnode = $j(this.obj.point_id);
        this.o = $j(this.obj.area_id);
    }
    ,
    setarea: function (o) {
        if (this.obj.point_id != o.point_id) {
            this.pointnode = $j(o.point_id);
        }

        if (this.obj.area_id != o.area_id) {
            this.o = $j(o.area_id);
            this.obj = o;
        }
        return this;
    },
    event: function (key_event, o, callback) {
        this.setarea(o);
        this.keyevent = key_event;

        if (!this.nnode || this.nnode.length == 0 || !this.nnode.attr('path')) {
            this.lnode = this.o.find('[select=true][path]:first');
        } else {
            this.lnode = this.nnode;
        }
        this.attr = this.attrib2node(this.lnode);

        var path = this.attr["path"].substring(1, this.attr["path"].length - 1).split('\',\'');

        switch (key_event) {
            case key.Ok:

                if (typeof this.attr["keyclick"] !== "undefined" && this.attr["keyclick"].length > 0) {
                    f_eval.eval(this.attr["keyclick"].removeAT("!"));
                    //eval(this.lnode["keyclick"]);
                }
                else if (typeof this.attr["href"] != "undefined" && this.attr["href"].indexOf('!') == -1) {
                    window.location.href = this.attr["href"];
                }
                else if (typeof this.attr["href"] != "undefined" && this.attr["href"].indexOf('!') > -1) {
                    f_eval.eval(this.attr["href"].removeAT("!"));
                }
                return false;

                break;
            case key.Down:
                this.proc(path[2], this.lnode);
                return false;
                break;
            case key.Up:
                this.proc(path[0], this.lnode);
                return false;
                break;
            case key.Right:
                this.proc(path[1], this.lnode);
                return false;
                break;
            case key.Left:
                this.proc(path[3], this.lnode);
                return false;
                break;
        }
        return this;

    },

    attrib2node: function (obj) {
        var _node = [];
        var attrs = ["path", "href", "keyclick", "outclass", "outstyle", "trigger", "leave_trigger", "inclass", "instyle", "objectstyle", "parentstyle", "pointstyle", "panel"];
        if (obj.length > 0) {
            var i = 0;
            for (; i < attrs.length; i++) {
                if (typeof obj.attr(attrs[i]) != "undefined")
                    _node[attrs[i]] = obj.attr(attrs[i]);
            }
        }

        return _node;
    },
    style2css: function (style) {
        //width: 210px; height: 267px; margin-top: 298px; margin-left: 21px; background:url(ocg/point-3.png);

        if (typeof style != "undefined" && style.length > 0) {
            var ss = "", s = style.split(';'), css = [], i = 0;
            for (; i < s.length; i++) {
                ss = s[i].split(':');
                if (ss.length == 2) {
                    css[ss[0].trim()] = ss[1].trim().replace(/\'/gi, '\"');
                }
            }
            return css;
        }
        return this;
    },

    proc: function (next_lisen, lisen) {
        if (typeof next_lisen != "undefined") {
            //var re = /:change\(.*?\)/gi;
            //null处理
            if (typeof next_lisen == "string" && next_lisen == '') {

            } else if (typeof next_lisen == "string" && next_lisen.charAt(0) == ":") {
                if (next_lisen == ":next" || next_lisen == "::N") {
                    this.next();
                    return this;
                }
                else if (next_lisen == ":prev" || next_lisen == "::P") {
                    this.prev();
                    return this;
                }
                else if (next_lisen.indexOf(":jump") > -1 || next_lisen.indexOf("::J") > -1) {
                    this.jump_s(next_lisen, lisen);
                }
            }
            else if (typeof next_lisen == "string" && next_lisen.charAt(0) == "!") {
                //eval(next_lisen.removeAT("!"));
                f_eval.eval(next_lisen.removeAT("!"));
                //下一个对象
                return;
            }
            else if (typeof next_lisen == "string" && next_lisen.charAt(0) == "@") {
                window.location.herf = next_lisen.removeAT("@");
                //下一个对象
                return;
            }
            else {

                var nlisen = [];
                if (typeof next_lisen == "object") {
                    nlisen = next_lisen;
                    // eval('cm.' + next_lisen.removeAT(":") + "()");
                } else {
                    if ($j(next_lisen).length == 0) { //is null?
                        return;
                    }
                    //下一个对象
                    nlisen = $j(next_lisen);
                }
                this.proc_out(lisen);
                this.select_unlock(lisen);

                this.proc_in(nlisen);
                this.select_lock(nlisen);
                this.nnode = nlisen;
            }
        }
        return this;

    },
    //新格式(下一个对象)
    proc_in: function (nlisen) {

        var _n = this.attrib2node(nlisen);



        //var inclass = nlisen.attr('inclass');
        //var outclass = nlisen.attr('outclass');
        if (typeof _n["inclass"] !== "undefined" && _n["inclass"].length > 0) {
            nlisen.removeClass(_n["outclass"]).addClass(_n["inclass"]);
        }
        //var instyle = nlisen.attr('instyle');
        if (typeof _n["instyle"] !== "undefined" && _n["instyle"].length > 0) {
            nlisen.css(this.style2css(_n["instyle"]));
        }

        //var parentstyle = nlisen.attr('parentstyle');
        if (typeof _n["parentstyle"] !== "undefined" && _n["parentstyle"].length > 0) {

            if (_n["parentstyle"].indexOf('[!]') > -1) {

                var muti = _n["parentstyle"].split('[!]');

                for (var i = 0; i < muti.length; i++) {

                    if (muti[i].indexOf('|') > -1) {
                        var ppo = muti[i].split('|');
                        nlisen.parents(ppo[0]).css(this.style2css(ppo[1]));
                    } else {
                        nlisen.parent().css(this.style2css(muti[i]));
                    }
                }
            } else {
                if (_n["parentstyle"].indexOf('|') > -1) {
                    var ppo = _n["parentstyle"].split('|');
                    nlisen.parents(ppo[0]).css(this.style2css(ppo[1]));
                } else {
                    nlisen.parent().css(this.style2css(_n["parentstyle"]));
                }
            }
        }
        //var objectstyle = nlisen.attr('objectstyle');
        if (typeof _n["objectstyle"] !== "undefined" && _n["objectstyle"].length > 0) {

            if (_n["objectstyle"].indexOf('[!]') > -1) {

                var muti = _n["objectstyle"].split('[!]');

                for (var i = 0; i < muti.length; i++) {

                    if (muti[i].indexOf('|') > -1) {
                        var ppo = muti[i].split('|');
                        $j(ppo[0]).css(this.style2css(ppo[1]));
                    }
                }
            } else {
                if (_n["objectstyle"].indexOf('|') > -1) {
                    var ppo = _n["objectstyle"].split('|');
                    $j(ppo[0]).css(this.style2css(ppo[1]));
                }
            }
        }

        //触发器
        // var trigger = nlisen.attr('trigger');
        if (typeof _n["trigger"] !== "undefined") {

            this.nnode = nlisen;

            if (_n["trigger"].indexOf(';') > -1) {
                var t = _n["trigger"].split(';');
                var ii = 0;
                for (; ii < t.length; ii++) {
                    f_eval.eval(t[ii].removeAT("!"));
                    //eval(t[ii].removeAT("!"));
                }
            }
            else {
                f_eval.eval(_n["trigger"].removeAT("!"));

                //  eval(trigger.removeAT("!"));
            }
        }
        if (this.pointnode.length > 0 && typeof _n["pointstyle"] != "undefined") {

            if (_n["pointstyle"].charAt(0) == "!") {
                //调用扩展方法
                f(_n["pointstyle"].removeAT("!"));
            } else {
                this.pointnode.css(this.style2css(_n["pointstyle"]));
            }
        }


        //panel
        //panel="jquery-object|k|len|top"
        //panel="#area_line1|5|22|top"
        if (typeof _n["panel"] !== "undefined" && _n["panel"].length > 0) {
            var _panel = _n["panel"].split('|');
            if (_panel.length == 4) {
                this.panel_proc(
                    _panel[0]
                    , parseInt(_panel[1], 10)
                    , parseInt(_panel[2], 10)
                    , _panel[3]);
            }

        }


        return this;

    },
    //还原格式
    proc_out: function (lisen) {
        var _n = this.attr; // this.attrib2node(lisen);
        //var outclass = lisen.attr('outclass');

        //var inclass = lisen.attr('inclass');

        if (typeof _n["outclass"] !== "undefined" && _n["outclass"].length > 0) {
            lisen.removeClass(_n["inclass"]).addClass(_n["outclass"]);
        }

        //var outstyle = lisen.attr('outstyle');
        if (typeof _n["outstyle"] !== "undefined" && _n["outstyle"].length > 0) {
            lisen.css(this.style2css(_n["outstyle"]));
        }

        //离开触发器
        if (typeof _n["leave_trigger"] !== "undefined") {
            if (_n["leave_trigger"].indexOf(';') > -1) {
                var t = _n["leave_trigger"].split(';');
                var ii = 0;
                for (; ii < t.length; ii++) {
                    f_eval.eval(t[ii].removeAT("!"));
                    //eval(t[ii].removeAT("!"));
                }
            }
            else {
                f_eval.eval(_n["leave_trigger"].removeAT("!"));

                //  eval(trigger.removeAT("!"));
            }
        }
        return this;
    },
    set_prev: function () {
        var eq1 = this.prev();
        this.attr = this.attrib2node(eq1.nnode);
        this.proc_in(eq1.nnode);
        this.select_lock(eq1.nnode);
    },
    set_next: function () {
        var eq1 = this.next();
        this.attr = this.attrib2node(eq1.nnode);
        this.proc_in(eq1.nnode);
        this.select_lock(eq1.nnode);
    }
    , prev: function () {
        //var current = this.o.find('[select=true][path]');
        var prev = this.lnode.prev('[path]:visible:first');

        if (prev.length > 0) {
            return this.proc(prev, this.lnode);
        }
        else {
            prev = this.lnode.prevAll('[path]:visible:first');
            if (prev.length > 0) {
                return this.proc(prev, this.lnode);
            } else {
                //prev的同辈，找最后一个
                var localname = this.lnode[0].localName;
                return this.proc(this.lnode.parent().children(localname + '[path]:visible:last'), this.lnode);
            }
        }
        return this;
    },

    next: function () {
        //var current = this.o.find('[select=true][path]');
        var next = this.lnode.next('[path]:visible:first');
        if (next.length > 0) {
            return this.proc(next, this.lnode);
        }
        else {

            next = this.lnode.nextAll('[path]:visible:first');
            if (next.length > 0) {
                return this.proc(next, this.lnode);
            } else {
                //next的同辈，找第一个
                var localname = this.lnode[0].localName;
                return this.proc(this.lnode.parent().children(localname + '[path]:visible:first'), this.lnode);
            }

        }
        return this;
    },
    //实现方式的跳跃，为:jump{"#ID区域","li:eq(1)"} ，与jquery语法一致，lisen当前监听jquery DOM
    jump_s: function (jump_script, lisen) {
        var parameter = jump_script.match(/\{([^\}]*)\}/gi);
        parameter = (parameter + "").replace(/\{/gi, '').replace(/\}/gi, '');
        var p = parameter.split(',');
        this.jump(p[0], p[1], lisen);
    },
    jump: function (next_lisen, next_lisen_c, lisen) {
        //":jump[#mini_key_line3 li:eq(index)]";
        var eq = lisen.prevAll('[path]:visible').length;
        if (eq <= 0) {
            eq = 0;
        }
        var next = $j(next_lisen + " " + next_lisen_c.replace('index', eq));
        if (next.length > 0) {
            return this.proc(next, lisen);
        } else {
            if ($j(next_lisen + " [path]:last").length == 0) {
                return this;
            }
            return this.proc($j(next_lisen + " [path]:last"), lisen);
        }
        return this;
    },

    //选择
    select_lock: function (nlisen) {

        nlisen.attr('select', 'true');

        return this;
    },
    //取消选择
    select_unlock: function (lisen) {
        lisen.attr('select', '');
        return this;

    }
     , set_panel_model: function (_item) {
         cm.panel[_item] = cm.panel_model[_item];
         return this;
     }
    //设置初始化位置，p_node为当特殊情况下需要操作其它dom则设定
 , set_panel_proc: function (_item, k, len, css_obj, p_node) {

     if (k >= cm.panel[_item].size) {
         cm.panel[_item].point = k - cm.panel[_item].size + 1;
     }

     var top = (cm.panel[_item].point) * cm.panel[_item].diff;
     if (typeof p_node == "undefined") {
         cm.nnode.parents(_item).css(css_obj, top);
     } else {
         p_node.css(css_obj, top);
     }

     return this;

 }
    , panel_proc_next: function (_val) {
        var down = 0;
        cm.panel[_val.item]._val = _val;

        if (_val.k == 1) {
            cm.panel[_val.item].point = 0;
            down = cm.panel[_val.item].base_diff;
            cm.nnode.parents(_val.item).css(_val.css_obj, down);
        } else if (_val.k == _val.len && _val.len > cm.panel[_val.item].size) {
            cm.panel[_val.item].point = _val.len - cm.panel[_val.item].size;
            down = (_val.len - cm.panel[_val.item].size) * cm.panel[_val.item].diff;
            cm.nnode.parents(_val.item).css(_val.css_obj, down);
        }
            //else if (k != 0 || (k > cm.panel[item].point && k < (cm.panel[item].size + cm.panel[item].point))) { }
        else if (_val.k == (cm.panel[_val.item].point + cm.panel[_val.item].size) && _val.len > cm.panel[_val.item].size) {
            down = (cm.panel[_val.item].point) * cm.panel[_val.item].diff;
            cm.panel[_val.item].point++;
            cm.nnode.parents(_val.item).css(_val.css_obj, down);
        }

    }
     , panel_proc_prev: function (_val) {

         var top = 0;
         cm.panel[_val.item]._val = _val;
         if (_val.k == 1) {
             cm.panel[_val.item].point = 0;
             top = cm.panel[_val.item].base_diff;
             cm.nnode.parents(_val.item).css(_val.css_obj, top);
         }
         else if (_val.k == _val.len) {

             cm.panel[_val.item].point = (_val.len - cm.panel[_val.item].size);
             top = cm.panel[_val.item].point * cm.panel[_val.item].diff;;
             cm.nnode.parents(_val.item).css(_val.css_obj, top);
         }
         else if (_val.k == _val.len && _val.k < _val.len && _val.len > cm.panel[_val.item].size) {
             cm.panel[_val.item].point = _val.len - cm.panel[_val.item].size;
             top = (_val.len - cm.panel[_val.item].size) * cm.panel[_val.item].diff;
             cm.nnode.parents(_val.item).css(_val.css_obj, top);
         }
         else if (_val.k == cm.panel[_val.item].point && _val.len > cm.panel[_val.item].size) {

             top = (cm.panel[_val.item].point - 1) * cm.panel[_val.item].diff;

             cm.nnode.parents(_val.item).css(_val.css_obj, top);
             if (cm.panel[_val.item].point > 0) {
                 cm.panel[_val.item].point--;
             }
         }

     }
    , panel_proc: function (_item, k, len, css_obj) {

        if (cm.nnode) {
            var _val = { "item": _item, "k": k, "len": len, "css_obj": css_obj };
            cm.panel[_val.item].k = k;
            switch (cm.panel[_item].mode) {
                case "right>left":
                    if (cm.keyevent == key.Left) {
                        cm.panel_proc_prev(_val);
                    } else if (cm.keyevent = key.Right) {
                        cm.panel_proc_next(_val);
                    }
                    break;
                case "left>right":
                    if (cm.keyevent == key.Left) {
                        cm.panel_proc_next(_val);
                    } else if (cm.keyevent = key.Right) {
                        cm.panel_proc_prev(_val);
                    }
                    break;

                case "down>up":
                    if (cm.keyevent = key.Down) {
                        cm.panel_proc_next(_val);
                    } else if (cm.keyevent == key.Up) {
                        cm.panel_proc_prev(_val);
                    }
                    break;

                case "up>down":
                default:
                    if (cm.keyevent == key.Down) {
                        cm.panel_proc_next(_val);
                    } else if (cm.keyevent = key.Up) {
                        cm.panel_proc_prev(_val);
                    }
                    break;
            }
        }

        //    var _debug = cm.nnode;
        //
        //  $j('#debug').html(
        //       "K=" + _val.k
        //       + "<br> point=" + cm.panel[_item].point
        //       + "<br> size=" +  cm.panel[_item].size
        //       + "<br> diff=" +  cm.panel[_item].diff
        //       + "<br> mode=" +  cm.panel[_item].mode
        //       + "<br> _val.len=" + _val.len
        //      ).show();

        //{ point: 0, size: 7, diff: -51, base_diff: 0, mode: "up>down" }

    }
};



cm.init();