//1.下拉菜单
//2.轮播广告
//广告图片数组
var imgs=[
    "images/banner_1.jpg",
    "images/banner_2.jpg",
    "images/banner_3.jpg",
    "images/banner_4.jpg",
    "images/banner_5.jpg"
];
var t=imgs[0];
console.log(t);
//DOM内容加载后执行
$(function(){
    var $ulImgs=$("#imgs");
    var $ulIdxs=$("#indexs");
    //每个li的宽度
    var LIWIDTH=parseFloat($("#slider").css("width"));
    //设置ul的总宽度，容下所有li
    $ulImgs.css("width",LIWIDTH*(imgs.length+1));
    //将imgs中的图片动态生成为li>img
    var strImgs='<li><img src="'+imgs.join('"></li><li><img src="')+'"></li>';
    //再重复追加第一张图片
    strImgs+='<li><img src="images/banner_1.jpg"></li>';
    $ulImgs.html(strImgs);
    //根据imgs中图片的个数动态生成索引li
    for(var a= 1,str="";a<=imgs.length;a++){
        str+="<li>"+a+"</li>";
    }
    //设置默认第一个li为hover
    $ulIdxs.html(str).children(":first").addClass("hover");
    //自动轮播
    var speed=1000,//每次轮播的时间
        wait=3000,//每次轮播之间等待的时间
        timer=null,//保存一次性定时器的序号
        i=0;//保存当前显示的图片下标
    //轮播一个周期
    function move(){
        timer=setTimeout(function(){
            i++;
            //让$ulImgs的left在speed时间内，移动到-i*LIWIDTH
            $ulImgs.animate(
                {left:-i*LIWIDTH},speed,function(){
                    //防止i越界
                    if(i==imgs.length){
                        i=0;
                        $ulImgs.css("left","0");
                    }
                    //将$ulIdxs中的第i个li设置为hover,清除其兄弟的hover
                    $ulIdxs.children(":eq("+i+")").addClass("hover").siblings().removeClass("hover");
                    //只有可以move时
                    if(canMove)move();
                }
            );
        },wait);
    }
    move();//启动第一次
    //标记变量，用来标记是否启用下次move
    var canMove=true;
    //为id为slider的div添加鼠标进入和移出事件
    $("#slider").hover(
        function(){
            //停止一次性定时器
            clearTimeout(timer);
            canMove=false;
        },
        function(){
            canMove=true;move();
        }
    );
    //当鼠标进入index中的li时，滚动到指定的图片
    $ulIdxs.on(
        "mouseover","li:not(.hover)",function(e){
            //获得当前li的下标
            i=$ulIdxs.children().index(e.target);
            //先清空动画队列，再启动本次动画
            $ulImgs.stop(true).animate(
                {left:-i*LIWIDTH},
                speed,
                function(){
                    $ulIdxs.children(":eq("+i+")").addClass("hover").siblings().removeClass("hover");
                }
            )
        }
    )
});