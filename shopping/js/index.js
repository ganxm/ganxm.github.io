//1.�����˵�
//2.�ֲ����
//���ͼƬ����
var imgs=[
    "images/banner_1.jpg",
    "images/banner_2.jpg",
    "images/banner_3.jpg",
    "images/banner_4.jpg",
    "images/banner_5.jpg"
];
var t=imgs[0];
console.log(t);
//DOM���ݼ��غ�ִ��
$(function(){
    var $ulImgs=$("#imgs");
    var $ulIdxs=$("#indexs");
    //ÿ��li�Ŀ��
    var LIWIDTH=parseFloat($("#slider").css("width"));
    //����ul���ܿ�ȣ���������li
    $ulImgs.css("width",LIWIDTH*(imgs.length+1));
    //��imgs�е�ͼƬ��̬����Ϊli>img
    var strImgs='<li><img src="'+imgs.join('"></li><li><img src="')+'"></li>';
    //���ظ�׷�ӵ�һ��ͼƬ
    strImgs+='<li><img src="images/banner_1.jpg"></li>';
    $ulImgs.html(strImgs);
    //����imgs��ͼƬ�ĸ�����̬��������li
    for(var a= 1,str="";a<=imgs.length;a++){
        str+="<li>"+a+"</li>";
    }
    //����Ĭ�ϵ�һ��liΪhover
    $ulIdxs.html(str).children(":first").addClass("hover");
    //�Զ��ֲ�
    var speed=1000,//ÿ���ֲ���ʱ��
        wait=3000,//ÿ���ֲ�֮��ȴ���ʱ��
        timer=null,//����һ���Զ�ʱ�������
        i=0;//���浱ǰ��ʾ��ͼƬ�±�
    //�ֲ�һ������
    function move(){
        timer=setTimeout(function(){
            i++;
            //��$ulImgs��left��speedʱ���ڣ��ƶ���-i*LIWIDTH
            $ulImgs.animate(
                {left:-i*LIWIDTH},speed,function(){
                    //��ֹiԽ��
                    if(i==imgs.length){
                        i=0;
                        $ulImgs.css("left","0");
                    }
                    //��$ulIdxs�еĵ�i��li����Ϊhover,������ֵܵ�hover
                    $ulIdxs.children(":eq("+i+")").addClass("hover").siblings().removeClass("hover");
                    //ֻ�п���moveʱ
                    if(canMove)move();
                }
            );
        },wait);
    }
    move();//������һ��
    //��Ǳ�������������Ƿ������´�move
    var canMove=true;
    //ΪidΪslider��div�����������Ƴ��¼�
    $("#slider").hover(
        function(){
            //ֹͣһ���Զ�ʱ��
            clearTimeout(timer);
            canMove=false;
        },
        function(){
            canMove=true;move();
        }
    );
    //��������index�е�liʱ��������ָ����ͼƬ
    $ulIdxs.on(
        "mouseover","li:not(.hover)",function(e){
            //��õ�ǰli���±�
            i=$ulIdxs.children().index(e.target);
            //����ն������У����������ζ���
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