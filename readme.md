
DOM 扩展框架 create_menu_DVB for TV version 0.7




Project Objectives:
Encapsulates the keyboard's top, bottom, and right sides and confirms the corresponding logic with the HTML DOM, simplifying the handling of events for each DOM object by encapsulating the DOM's attributes
(I am sorry, because the time constraints and examples are very simple, I will gradually improve)

项目目标：
封装键盘的上下左右和确认与HTML DOM之间相应的逻辑，通过DOM的属性封装简化了每个DOM对象的事件封装处理
(很抱歉，因为时间紧张说明和例子都很简单我会逐步完善的)

           上右下左  例子：'#demo ul.line2 li:eq(0)','#demo ul.line1 li:eq(1)','#demo ul.line2 li:eq(0)','#demo ul.line1 li:eq(1)'
           
           
           param=>pointclass
               光标的classname名称。
           
           param=>point
               表示如果到当前位置光标的样式。
               
           
               
           param=>path 表示触发上右下左的按键的跳转对象
           
                   ''为对象，可支持多个'#l1p3','#l0p0','#l0p2','#l0p3'，但对象必须保持全局唯一（区域唯一）
                   
                   #id 表示标签<div id="id"></div>
                   .classname 表示标签<div class="classname"></div>
                   
                   
                   !myfunction() 表示过程js方法myfunction(fn,ref){} fn为当前select=true的dom对象；ref为切换对象

                           
                   ===========================================
                   :function 内置方法
                   ===========================================
                       :prev
                          [select=true] 上一个对象
                       :next
                          [select=true] 下一个对象 
                   
                   @http://127.0.0.1/2.html 跳转到谋网页
                   
           
           param=>select
               表示全局唯一标示的选中处理
               true或''
           
           param=>keyclick
               标示处理'确认'按钮，与param=>path近似，但只能触发一个对象，所以不需要''包裹
               
               *注意!因为不是基于DOM所以不支持this    
               
               函数：
               myfunc2() 
               
           param=>instyle
               激活当前的dom的样式处理
               
           param=>outstyle
               离开当前的dom的样式处理
               
           param=>inclass
               当前classname
               
           param=>outclass
               离开时classname
               
           param=>trigger
               当select=true的时候触发function事件
               
           param=>leave_trigger
               离开时触发function事件

           param=>parentstyle
               
