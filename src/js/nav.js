$(function () {
    var oLi1 = document.getElementById('moreCur');
    var oLi2 = document.getElementById('more');
    var nav = document.getElementById('nav');
    var aLi = $(nav).find('li');
    var obj = {
        全部: -1,
        购物: 2,
        教育: 3,
        健康: 4,
        阅读: 5,
        理财: 6,
        出行: 7,
        更多: 8,
        生活服务: 9,
        政务民生: 10,
        餐饮: 11,
        旅游: 12,
        社交: 13,
        多媒体: 14,
        工具: 15,
        快递物流: 16,
        商业服务: 17,
        公益: 18,
        体育: 19,
    };
//重置li的order属性
    function resetOrder() {
        for (var i = 0; i < aLi.length; i++) {
            var cur = aLi[i];
            $(cur).css('order', obj[$(cur).html()]);
        }
        $(nav).find('.firstLi').removeClass('firstLi').css({
            'border-left': '0rem solid #d8d8d8',
            'color': '#666666'
        });
        $(nav).find("ul li:first-child").addClass('firstLi').css({
            'border-left': '0rem solid #d8d8d8',
            'color': '#ff5700'
        });
    }
//重置边框样式
    function resetBorder() {
        for (var i = 0; i < aLi.length; i++) {
            if (i % 4 == 0) {
                $(aLi[i]).css('border-left', '0rem solid #d8d8d8');
            } else {
                $(aLi[i]).css('border-left', '.01rem solid #d8d8d8');
            }
        }
    }
    function resetColor() {
        for (var i = 0; i < aLi.length; i++) {
            $(aLi[i]).css('background-color','#f1f1f1');
        }
    }
//初次加载重置边框和order值
    resetOrder();
    resetBorder();
//初次加载时，border大于8隐藏，即只显示八个标签，第八个为‘更多’按钮，并且为隐藏的按钮添加hid属性
    for (var i = 0; i < aLi.length; i++) {
        var a = aLi[i];
        if ($(a).css('order') > 8) {
            a.hid = true;
            $(a).css('display', 'none')
        }
    }
// show点击‘更多’时调用
    function show() {
        for (var i = 0; i < aLi.length; i++) {
            $(aLi[i]).css('display', 'flex')
        }
        $(oLi2).html('房地产');
        $(oLi1).html('出行')
        $(nav).css('height','4.43rem')
    }
//hidden点击收起时调用
    function hidden() {
        for (var i = 0; i < aLi.length; i++) {
            if (aLi[i].hid) {
                $(aLi[i]).css('display', 'none')
            }else{
                $(aLi[i]).css('display', 'flex')
            }
        }
        $(oLi2).html('更多');
        $(nav).css('height','1.79rem')
    }
//使用事件委托，实现每一个li的点击事件
    $(nav).on('click', function (event) {
        //当点击‘更多’按钮要执行的方法
        if (event.target.innerHTML == '更多'||event.target.className == 'down') {
            if($(nav).find('.firstLi').css('order')<-1){
                show();
                $(nav).find('.down').css('display','none');
            }else {
                if($(nav).find('.firstLi').html()=='房地产'){
                    console.log($(nav).find('.firstLi').html())
                    $(nav).find('.firstLi').html('更多')
                    console.log($(nav).find('.firstLi').html());
                }
                $(oLi1).html('出行');
                resetOrder();
                show();
                resetBorder();
                resetColor();
                $(nav).find('#underline').addClass('underline').css('width', '0.6rem');
                $(nav).find('.down').css('display','none');
            }
        } else if (/收起/.test(event.target.innerHTML )||event.target.className == 'up') {
            //点击收起要执行的方法
            if($(nav).find('.firstLi').css('order')<-1&&$(nav).find('.firstLi').css('order')>-8){
                hidden();
            }else if($(nav).find('.firstLi').css('order')==-8){
                for (var i = 0; i < aLi.length; i++) {
                    if (aLi[i].hid&&$(nav).find('.firstLi').css('order')!=-i-1) {
                        $(aLi[i]).css('display', 'none')
                    }else{
                        $(aLi[i]).css('display', 'flex')
                    }
                }
                $(oLi1).html('更多');
                $(nav).css('height','1.79rem');
            }else if($(nav).find('.firstLi').css('order')<-8){
                for (var i = 0; i < aLi.length; i++) {
                    if (aLi[i].hid&&$(nav).find('.firstLi').css('order')!=-i-1) {
                        $(aLi[i]).css('display', 'none')
                    }else{
                        $(aLi[i]).css('display', 'flex')
                    }
                }
                $(oLi1).html('更多');
                $(oLi2).css('display','none');
                $(nav).css('height','1.79rem');
            }else{
                hidden();
                resetOrder();
                resetBorder();
                resetColor();
                $(nav).find('#underline').addClass('underline').css('width', '0.6rem');
            }
            $(nav).find('.down').css('display','block');
        } else {
            //当点击li时，将order值改为负值，从而改变页面显示顺序，同时将第一个的样式加进去
            if ($(event.target).css('order') > 0) {
                //当order为正值，即没有被点击过，才执行以下方法
                //之前带有‘firstLi’className的元素改变order值和样式，然后移除‘firstLi’
                $(nav).find('.firstLi').css({
                    'order': -($(nav).find('.firstLi').css('order')),
                    'border-left': '0.01rem solid #d8d8d8',
                    'color': '#666666',
                    'background-color':'#f1f1f1'
                }).removeClass('firstLi');
                //为目标元素添加‘firstLi’
                $(event.target).addClass('firstLi').css({
                    'order': -$(event.target).css('order'),
                });
                //重置样式
                var orderCur = $(event.target).css('order');
                resetBorder();
                for (var i = 0; i < -orderCur; i++) {
                    if ((i + 1) % 4 == 0) {
                        $(aLi[i]).css('border-left', '0rem solid #d8d8d8');
                    } else {
                        $(aLi[i]).css('border-left', '.01rem solid #d8d8d8');
                    }

                }
                $(event.target).css({
                    'border-left': '0rem solid #d8d8d8',
                    'color': '#ff5700',
                    'background-color':'#f8f8f8'
                });
                $(nav).css('height','1.79rem')
                //添加下划线
                var underLine = $(nav).find("ul .firstLi").html().length;
                $(nav).find('#underline').addClass('underline').css('width', 0.3 * underLine + 'rem');

                for (var i = 0; i < aLi.length; i++) {
                    if (aLi[i].hid) {
                        if (aLi[i] == event.target) continue;
                        $(aLi[i]).css('display', 'none')
                    }
                }
                //更改不同情况下第八个标签的显示值；
                if (event.target.hid) {
                    $(oLi1).html('更多');
                    $(aLi[7]).css('display', 'none')
                }else if(event.target.innerHTML == '房地产'){
                    $(oLi1).html('更多');
                    $(aLi[7]).css('display', 'block')
                }else {
                    $(oLi2).html('更多');
                    $(aLi[7]).css('display', 'block')
                    $(oLi1).html('出行');
                }
                //为更多按钮增加下拉图标
                $(nav).find('.down').css('display','block');
            }
        }
    });
})