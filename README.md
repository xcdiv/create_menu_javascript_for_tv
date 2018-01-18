
###DOM 扩展框架 create_menu_DVB for TV version 0.7.6

##Project Objectives:
Encapsulates the keyboard's top, bottom, and right sides and confirms the corresponding logic with the HTML DOM, simplifying the handling of events for each DOM object by encapsulating the DOM's attributes
(I am sorry, because the time constraints and examples are very simple, I will gradually improve)

##项目目标：
封装键盘的上下左右和确认与HTML DOM之间相应的逻辑，通过DOM的属性封装简化了每个DOM对象的事件封装处理
(很抱歉，因为时间紧张说明和例子都很简单我会逐步完善的)

##修正日志
2018-01-18
cm.panel()方法发现一个BUG,主要原因是构架设计的时候是从i=0开始计算的，导致在++--的逻辑处理上容易出现指针计算错误，后修正为i=1为默认值。

##初始化例子
```html
<html>
<head>
<!--引入基本库-->
    <script src="jquery-1.4.4.min.js"></script>
    <script src="create_menu_DVBv7.js"></script>

<!--引入CM的f_eval代码-->

<script>
//fast_eval function
var f_eval = {
 
	//function例子
    function_demo: function (s) {
        alert(s);
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

//键盘事件控制
 $j(document).ready(function () { 
            document.onkeydown = function (event) {

                //捆绑系统键盘控制
                var code = Event(event);

                
                //键盘拦截
                switch (code) {
                    case key.PageUp:
                    case key.PageDown:
						alert('key.PageUp or key.PageDown');
                        return false;
                        break;
                    case key.Back:
						alert('key.Back');
                        return false;
                        break;
                    default:
                        //把其余键盘释放给#area_select区的create_menu事件
                        cm.event(code, { area_id: "#area_select", point_id: "#point" });
                        break;
                }
            };

			//panel模板
            cm.panel_model = {
                "#area_line0":
                 { point: 0, size: 5, diff: 60, base_diff: 0, mode: "left>right" }

            };
            //填充nnode一个DOM
            cm.nnode = $j('#area_line0 li[path]:first');
            f_eval.load_content();
            cm.setpoint("#area_select", "#point", '#area_line0 li[path]:first');

        });



</script> 

</head>

<body>
<div id="area_select">

...............内容................

</div>

<!--光标-->
<div id="point"></div>

</body>
```

##f_eval函数体
 
f_eval是一个快速的eval方法，如果方法写入f_eval中，例如：function_demo，执行到这种方法的时候会优先调用function_demo，当然如果在f_eval以外声明的其它方法将调用JavaScript的Eval的函数。
f_eval的内置函数调用效率会高于JavaScript的Eval调用速度，但是由于嵌入式设备的兼容性所以内置的f_eval声明的方法只能有一个string类型的参数。

##实现上下左右的路径操作：PATH

CM（create_menu_DVB）主要实现在HTML增加特殊attrion项目实现键盘的操作逻辑，其中在<li>中增加<li path="....">标签来记录下一步键盘需要向什么方向执行，按照CSS的简写规范实现上右下左,

path 表示触发上右下左的按键的跳转对象
           
''为对象，可支持多个':jump{#area_line3,li[path]:first}',':next',':jump{#area_select,#movieWnd}',':prev'但对象必须保持全局唯一（区域唯一）
*完全兼容jquery 1.3以上版本的select DOM的方法
*但请注意'','','',''的格式，为了提高效率我们的间隔符号不能写成，例如： ':next'   ,    ':prev'， ':next'   ,    ':prev'这种格式，在这里错误有两个，一、','中间不能出现空格或者其它字符；二、必须用ASCII的符号，不要出现中文输入法的全角。



#跳转方法
:jump{区域对象,光标对象}
0.7.2版本开始推出简写法   ::J
范例：

```html
跳转到<div id="area_line3"><ul><li path="............">1<li><li path="............">2<li><li path="............">3<li><li path="............">3<li>
```

其中path的编写为：
:jump{#area_line3,li[path]:first} 
 
#格式解释：   
   
	:jump{区域对象,光标要跳转的对象}
	区域对象			为ID或者CLASS的DOM范围，*语法与jQuery兼容
	光标要跳转的对象	{区域对象}下面的DOM对象，*语法与jQuery兼容
 
	#id 表示标签<div id="id"></div>

	.classname 表示标签<div class="classname"></div>

	触发一个方法：
	!myfunction() 表示过程javascript方法myfunction(参数){}

	*因为这个框架是运行在很多嵌入是瘦客户端上的所以myfunction的参数只能传递一个
	
	@http://www.baidu.com


#获取当前DOM，的方法$('[select=true]')


*注意!为了便于开发一些复杂的自动光标
例如：
```html
<ul id="area0"><li path="........">1</li><li path="........">2</li><li path="........">3</li><li path="........">4</li><ul>
<ul id="area1"><li path="........">1</li><li path="........">2</li><li path="........">3</li><ul>
```
例如： #area0 li[path]:eq(1) 跳到#area1 li[path]:eq(1)的对应索引会牵扯到众多计算的问题，为了简化操作可以直接写成跳转目的为#area1 li[path]:eq(index)，但这个不是jQuery标准的语法。
这种方法还可以规避#area0 li[path]:eq(3) 跳到#area1 li[path]:eq(3)但#area1 li[path]:eq(3)并不存在造成的DOM失效问题，如果出现这种情况#area1 li[path]:eq(3)会被自动替换为#area1 li[path]中最后的一个li[path]对象。


                           
##path的内置方法

```css
 
    :prev 0.7.2版本开始推出简写法   ::P
        同父级的上一个[path]对象（必须是可显示的）
    :next 0.7.2版本开始推出简写法   ::N
        同父级的下一个[path]对象（必须是可显示的）
                   
	@http://127.0.0.1/2.html 跳转到谋网页

```

例如：

```html
<div id="demo">
	<ul>
		<li>按钮1</li> 
		<li>按钮2</li> 
	</ul>
</div>
```

增加path后   
```html
<div id="demo">
	<ul>
  <lipath="':jump{#panel,#UI1 li[path]:eq(index)}',':next',':jump{#panel,#UI1 li[path]:eq(index)}',':prev'">
 按钮1</li>
            <lipath="':jump{#panel,#UI1 li[path]:eq(index)}',':next',':jump{#panel,#UI1 li[path]:eq(index)}',':prev'">
 按钮2</li>
	</ul>
</div>

<li panel="#area_line0|1|8|left" inclass="in_select" outclass="un_select" path="':jump{#area_line3,li[path]:first}',':next',':jump{#area_select,#movieWnd}',':prev'" pointstyle="display:none;" class="un_select" serviceid="462">老年生活</li>
```

##光标指针

*虽然我们可以标注逻辑位置但是无法直接显示光标有两种方法可以显示光标：

*pointstyle或者pointclass，表示一个全屏幕的光标显示的left\top的位置。

    pointclass
        光标的classname名称。           
    pointstyle
        表示如果到当前位置光标的样式。
	例如：
	style定义:
```css
#point{
	position: absolute; position: absolute;
	left: 67px;
	top: 94px;
	width: 732px;
	height: 410px;
	z-index: 99;
}
```

	HTML:
```html
<li path='#demo ul li:eq(0)','#demo ul li:eq(1)','#demo ul li:eq(0)','#demo ul li:eq(1)' pointstyle="left: 67px;width: 732px;height: 410px;z-index: 99;" pointstyle="left: 267px;top: 294px;">按钮1</li>
```
	全局加一个<div id="point"></div>
	

*inclass或者outclass的class样式
		inclass
				选中li的样式
		outclass="un_select"
				离开li的样式


	例如：
```css
style定义：
	.in_select {
    color: #fff;
    font-size: 31px;
    background: #13baff;
    color: #fff;
    float: left;
    line-height: 45px;
            }

    .un_select {
    font-size: 31px;
    color: #fff;
    line-height: 45px;
    float: left;
            }
```
	HTML:
```html
<li path='#demo ul li:eq(0)','#demo ul li:eq(1)','#demo ul li:eq(0)','#demo ul li:eq(1)' inclass="in_select" outclass="un_select">按钮1</li>
```
*instyle或者instyle的直接样式
	instyle
        激活当前的dom的样式处理
               
	outstyle
        离开当前的dom的样式处理  
	*与inclass或者outclass的规则类似
		 
##当前光标位置 

    select
        表示全局唯一标示的选中处理
        true或''
```html
	<li ............ select="true">1</li>
```
##确认事件 

    keyclick
        标示处理'确认'按钮，与path近似，但只能触发一个对象，所以不需要''包裹
               
        *注意!因为不是基于DOM所以不支持this    
               
        函数：
        myfunc2() 
               
        
##位置选中激活触发器

            
	trigger
		当select=true的时候触发function事件
```html
	<li ............  tigger="!demo1(hello)">1</li>
```

##位置离开激活触发器
                 
	leave_trigger
		离开时触发function事件
```html
<li ............  leave_trigger="!demo1(hello)">1</li>
```
##位置选中激活触发修改父级别样式
 
	parentstyle
		父级样式样式，
		
		直属上级样式
		parentstyle="样式"

		定位某个父级样式
		parentstyle="父级DOM的selector|样式"

		同时改变父级多个样式
		parentstyle="父级DOM的selector|样式[!]父级DOM的selector|样式[!]..............."

		**parentstyle效率高于objectstyle

```html
<ul id="abcd">
<li ............  parentstyle="#abcd|top:1000px;">1</li>
</ul>
```
##位置选中激活触发修改某个DOM对象样式
 
	objectstyle
		某个DOM对象样式

		定位某个DOM对象样式
		parentstyle="父级DOM的selector|样式"

		同时改变DOM对象样式
		parentstyle="父级DOM的selector|样式[!]父级DOM的selector|样式[!]..............."
		*效率略比parentstyle方案慢一点，好处是可以并发执行多个DOM对象的时候效率提升较大

```html
<ul id="abcd">
<li ............  objectstyle="#abcd|top:1000px;">1</li>
</ul>
```
##URL跳转
 
	href
		http标准地址即可
```html
<li ............  href="http://www.baidu.com">1</li>
```
##panel滑动区块 0.7.6更改

	panel是实现滑动光标块的效果
	*代码中初始化：
	首先定义panel的基础模板，一个页面可定义多个例如：
```javascript
		cm.panel_model = {
        "#area_line0":
            { point: 0, size: 5, diff: 60, base_diff: 0, mode: "left>right" }
		,"#area_line1":
            { point: 0, size: 5, diff: 60, base_diff: 0, mode: "left>right" }
    };
```
	其中
	point		是初始化位置，int 0->n
	size		是panel范围可显示数据的区域，比如：总数为100，但是每页只显示5条，那么应该填写5。
	diff		是每个块的大小，如：宽度或者高度，int 0->n 表示px，例如：含有overflow: hidden;的父级DIV的width: 580px;那么如果显示5个元素，按照横排每个元素的宽应该为116，如果为横排显示则应考虑计算是-116模拟向左移动。
	base_diff	是默认的块初始化位置，如：left=0px;，int 0->n 表示px，因网页设计的原因元素不一定从0计算那么填写初始化的位置。
	mode		是panel的模式定义，方向模式分别为：
				right>left		左边索引小于右侧，一般用于从左向右的操作（ float:left;）
				left>right		右边索引小于左侧，一般用于从右向左的操作（ float:right;）
				down>up			下DOM索引小于上索引（倒序），一般用于从下向上排序的操作	
				up>down			上DOM索引小于下索引（正序），一般用于从上向下的操作	
	
	*区块触发代码：
	启动对模板#area_line0的启用
		cm.set_panel_model("#area_line0");
	如果需要启动多个模板逻辑则
		cm.set_panel_model("#area_line0").set_panel_model("#area_line1");

	再DOM中的封装增加panel的行配置：
		panel="模板名称|当前的index|总数量|样式对象名"

		"当前的index"从1计算，"总数量"而为总数的长度，"总数量"="index"中最大值。

		*样式对象名如：left或 margin-left
	例如：
		panel="#area_line0|1|8|left"
		panel="#area_line0|2|8|left"
		panel="#area_line0|3|8|left"
		panel="#area_line0|4|8|left"

	完整例子：
```html
	<li panel="#area_line0|1|8|left" inclass="in_select" outclass="un_select" path="':jump{#area_line3,li[path]:first}',':next',':jump{#area_select,#movieWnd}',':prev'">类1</li>
	<li panel="#area_line0|2|8|left" inclass="in_select" outclass="un_select" path="':jump{#area_line3,li[path]:first}',':next',':jump{#area_select,#movieWnd}',':prev'">类2</li>
```
	
	*panel的位置初始化

		//第一个默认DOM光标位置的初始化
		cm.setpoint("#area_select", "#point", '#area_line2 li[path]:visible:eq(3)');
	    //光标默认初始化，自动计算光标的位置
        var o = $j('#area_line2 li[path]:visible:eq(3)');
        if (o.length > 0) {
            cm.set_panel_proc("#area_line2"
                    , o.prevAll().length
                    , o.parent().find("li[path]").length
                    , "top"
                    , o.parent());
        }

	*已知BUG：
		因为出现了先生鸡和先生蛋的问题，当默认初始化光标的时候，正巧这个光标有存在panel处理，导致当前对象lnode和下一个对象nnode不能被正常初始化。
		所以需要在代码中增加一个预处理 
		例如：
        cm.nnode = $j('#area_line0 li[path]:first');

