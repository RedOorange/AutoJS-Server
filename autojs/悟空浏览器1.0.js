

Start();
function Start(){
    var VarQianDao = 0;//签到
    console.show();

    app.launchApp("悟空浏览器");
    WaitaMoment(20,"等待软件加载");

    AlertWindow();//关闭初始的各种弹窗
               
    WaitaMoment(5,"即将去往视频界面");
    TurnShiPin();

    Video();
    function Video(){
        var VideoNowTime = 0;
        var DifferenceTime = 5;//目前每5分钟去一次比较合适
        var VideoStartTime = NowTime();
        
        while(!(VideoNowTime == VideoStartTime + DifferenceTime)){
            VideoNowTime = NowTime();
            WaitaMoment(random(4,10),"即将滑动");

            AlertWindow();//在刷视频时弹出的各种内容进行处理

            RandomDianZhan();//随机点赞

            Swip();
        }

        AlertWindow();//在离开刷视频页面时再次确认有没有弹出的内容阻挡

        WaitaMoment(random(3,7),"即将进入任务界面");

        TurnRenWu();

        WaitaMoment(random(5,10),"等待任务界面加载");

        CloseQianDao();

        WaitaMoment(random(5,10),"判断看广告最高得是否存在");
        SeeMore();

        WaitaMoment(random(3,7),"即将打开宝箱");

        OpenBox();

        WaitaMoment(random(3,7),"即将去首页");

        TurnShiPin()
        
        WaitaMoment(random(3,7),"准备刷视频");

        Video();
    }
}

function TurnRenWu(){
    click(random(435,645),random(1770,1920));//440,1810,639,1920
}

function TurnShiPin(){
    click(random(225,435),random(1770,1920))//660,1810,859,1920
}

function AD(){    
    ADSleep();
    ADClose();
}

function ADSleep(){
    WaitaMoment(random(50,60),"等待广告");
}

function ADClose(){
    log("寻找广告关闭")
    console.hide();
    if(className("android.widget.ImageView").boundsInside(900, 60, 1100, 200).findOne()){//右上交关闭 
        let X = className("android.widget.ImageView").boundsInside(900, 60, 1100, 200).findOne().bounds().centerX();
        let Y = className("android.widget.ImageView").boundsInside(900, 60, 1100, 200).findOne().bounds().centerY();
        click(X,Y);
    }
    console.show();
    WaitaMoment(random(5,7),"判断是否有再看一个领取");
    SeeMore();
}

function SeeMore(){
   
}

function OpenBox(){
    
}

function RandomDianZhan(){
    
}
 

function CloseQianDao(){
    
}


 //记录当前时间 
 function NowTime(){
    let now = new Date();
    let Hours = now.getHours();
    let Minutes = now.getMinutes();
    let NowTime = Hours * 60 + Minutes;
    return NowTime;
}
 
function Swip(){
    console.hide();
    swipe(random(800,900) ,random(1550,1650) ,random(800,900) ,random(100,150) ,random(200,300));
    console.show();
}


function WaitaMoment(second,word){
    for(let i = 0; i < second; i++){
        log(word + "," + (second-i) + "秒后执行");
        sleep(1000);
    }
}

function AlertWindow(){
    
}






























