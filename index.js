 
//fast_eval function
var f_eval = {
    //判断是不是在这个区
    objarea_isselect:function (obj) {

        if (cm.obj.area_id == obj) {
            return true;
        }
        return false;
    }
    , input_sync: function (s) {
        alert(s);
    }
    , input_change_chs_up: function () {

        alert("act::input_change_chs_up()");
    }
    , show_mini_key: function () {
        //exit last area
        cm.unpoint("#area_select", "#point");

        //change dom
        $j('#area_select').hide();
        $j('#mini_key').show();

        //set new area
        cm.setpoint("#mini_key", "#point", "#mini_key li[path]:first");
    } 
    , input_return: function () {
        //exit last area
        cm.unpoint("#mini_key", "#point");
        //change dom
        $j('#area_select').show();
        $j('#mini_key').hide();
        //set new area
        cm.setpoint("#area_select", "#point", "#area_select li[path]:first");
    }
     , eval: function (property, parameter) {


         var func = property;
         if (typeof parameter == "undefined" && property.indexOf('(') > -1) {

             parameter = property.match(/\(([^)]*)\)/gi);
             parameter = (parameter + "").replace(/\(/gi, '').replace(/\)/gi, '');

             property = property.replace(/\(\)/gi, '');
             property = property.replace(/\(.*?\)/gi, '');
         }


         var fn = this[property];

         if (typeof fn === 'function') {
             fn(parameter);
         } else {
             //alert('eval');

             switch (property) {
                 case "":
                     break;
                 default:
                     eval(func);
                     break;
             }
         }
     }
};


//页面第一次加载的时候处理
$j(document).ready(function () {  
    document.onkeydown = function (event) {

       //bind system key event
        var code = Event(event); 

        //无第三方事件，同时在某个区域的时候处理事件。
        if (f_eval.objarea_isselect("#area_select")) {
            //键盘拦截
            switch (code) {
                case key.PageUp:
                case key.PageDown:

                    return false;
                    break;
                case key.Back:
                   
                    return false;
                    break;
                default:
                    //把其余键盘释放给#area_select区的create_menu事件
                    cm.event(code, { area_id: "#area_select", point_id: "#point" });
                    break;
            }
        } else if (f_eval.objarea_isselect("#mini_key")) {

            //键盘拦截
            switch (code) {
                case key.PageUp:
                case key.PageDown:

                    return false;
                    break;
                case key.Back:
                    cm.unpoint("#mini_key", "#point");
                    $j('#mini_key').hide();
                    $j('#area_select').show();
                    cm.setpoint("#area_select", "#point", '#area_select li[path]:first');

                    return false;
                    break;
                default:
                    //把其余键盘释放给#area_select区的create_menu事件
                    cm.event(code, { area_id: "#mini_key", point_id: "#point" });
                    break;
            }
        }
    }
     

    cm.setpoint("#area_select", "#point", '#area_select li[path]:first');
});
