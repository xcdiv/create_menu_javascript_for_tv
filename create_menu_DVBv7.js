//=========================================//
//embedded STB compatible keyboard code    //
//=========================================//
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

    if (_event.which) {
        keycode = _event.which; 
    } else { 
        keycode = _event.keyCode;
    }
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




//=============================//
//jquery alias change $=>$j    //
//============================//
var $j = jQuery.noConflict();

String.prototype.trim = function () {
    // 用正则表达式将前后空格  
    // 用空字符串替代。  
    return this.replace(/(^\s*)|(\s*$j)/g, "");
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





//=============================//
//create_menu_DVB code//
//============================//
var cm = {
    version: "0.7",
    __self: [],
    nnode: [],//下一个 dom
    lnode: [], //当前的 dom
    pointnode: [],
    attr: [],//当前DOM的attr集合

    obj: { area_id: "", point_id: "" },
    keyevent: -1,
    tag: {},

    init: function () {
        //this.__self = this;
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
                if (typeof this.attr["keyclick"] !== "undefined") {
                    f_eval.eval(this.attr["keyclick"].removeAT("!"));
                    //eval(this.lnode["keyclick"]);
                }
                else if (typeof this.attr["href"] != "undefined") {
                    window.location.href = this.attr["href"];
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

    /*
    panel="#panel|#panel li|width:200px;height:200px;"

    */

    attrib2node: function (obj) {
        var _node = [];
        var attrs = ["path", "href", "keyclick", "outclass", "outstyle", "trigger", "leave_trigger", "inclass", "instyle", "parentstyle", "pointstyle", "panel"];
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
                if (next_lisen == ":next") {
                    this.next();
                    return this;
                }
                else if (next_lisen == ":prev") {
                    this.prev();
                    return this;
                }
                else if (next_lisen.indexOf(":jump") > -1) {
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
        //V1:
        //parentstyle="top:123px;"
        //V2:
        //parentstyle="#div1|top:123px;"
        //parentstyle="#div1|top:123px;[!]#div2|top:300px;"
        //V3:Add Action up\down\left\right
        //parentstyle="#div1:up|top:123px;[!]#div1:down|top:123px;[!]#div1:left|top:123px;[!]#div1:right|top:123px;"
        if (typeof _n["parentstyle"] !== "undefined" && _n["parentstyle"].length > 0) {

            if (_n["parentstyle"].indexOf('[!]') > -1) {

                var muti = _n["parentstyle"].split('[!]');

                for (var i = 0; i < muti.length; i++) {

                    if (muti[i].indexOf('|') > -1) {
                        var ppo = muti[i].split('|');
                        if (ppo[0].indexOf(":") > -1) {
                            var _a_p = ppo[0].split(":");

                            switch (this.keyevent) {
                                case key.Up:
                                    if (_a_p[1].toLowerCase() == "up") {
                                        nlisen.parents(_a_p[0]).css(this.style2css(ppo[1]));
                                    }
                                    break;
                                case key.Down:
                                    if (_a_p[1].toLowerCase() == "down") {
                                        nlisen.parents(_a_p[0]).css(this.style2css(ppo[1]));
                                    }
                                    break;
                                case key.Left:
                                    if (_a_p[1].toLowerCase() == "left") {
                                        nlisen.parents(_a_p[0]).css(this.style2css(ppo[1]));
                                    }
                                    break;
                                case key.Right:
                                    if (_a_p[1].toLowerCase() == "right") {
                                        nlisen.parents(_a_p[0]).css(this.style2css(ppo[1]));
                                    }
                                    break;
                            }



                        } else {
                            nlisen.parents(ppo[0]).css(this.style2css(ppo[1]));
                        }
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
                f_eval.eval(_n["pointstyle"].removeAT("!"));
            } else {
                this.pointnode.css(this.style2css(_n["pointstyle"]));
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
};

cm.init();