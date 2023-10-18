

Start();
function Start(){
    var VarQianDao = 0;//签到
    console.show();

    app.launchApp("好看视频极速版");
    WaitaMoment(20,"等待软件加载");

    AlertWindow();//关闭初始的各种弹窗
               
    WaitaMoment(5,"即将去往首页界面");
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
    click(random(540,810),random(1789,1920));//440,1810,639,1920
}

function TurnShiPin(){
    click(random(0,270),random(1789,1920))//660,1810,859,1920
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
    if(className("android.widget.TextView").textMatches(/再看一个领取\d+金币/).exists()){
        let X = className("android.widget.TextView").textMatches(/再看一个领取\d+金币/).findOne().bounds().centerX();
        let Y = className("android.widget.TextView").textMatches(/再看一个领取\d+金币/).findOne().bounds().centerY();
        click(X+random(-20,20),Y+random(-20,20))
        AD();
    }else if(className("android.widget.TextView").textMatches(/观看视频再得\d+金币/).exists()){
        let X = className("android.widget.TextView").textMatches(/观看视频再得\d+金币/).findOne().bounds().centerX();
        let Y = className("android.widget.TextView").textMatches(/观看视频再得\d+金币/).findOne().bounds().centerY();
        click(X+random(-20,20),Y+random(-20,20))
        AD();
    }else if(className("android.widget.TextView").textMatches(/看广告再得\d+金币/).exists()){
        let X = className("android.widget.TextView").textMatches(/看广告再得\d+金币/).findOne().bounds().centerX();
        let Y = className("android.widget.TextView").textMatches(/看广告再得\d+金币/).findOne().bounds().centerY();
        click(X+random(-20,20),Y+random(-20,20))
        AD();
    }else if(className("android.widget.TextView").text("再看一个").exists()){
        let X = className("android.widget.TextView").text("再看一个").findOne().bounds().centerX();
        let Y = className("android.widget.TextView").text("再看一个").findOne().bounds().centerY();
        click(X+random(-20,20),Y+random(-10,10))
        AD();
    }else if(className("android.widget.TextView").text("立即收下").exists()) {//
        let X = className("android.widget.TextView").text("立即收下").findOne().bounds().centerX();
        let Y = className("android.widget.TextView").text("立即收下").findOne().bounds().centerY();
        click(X+random(-20,20),Y+random(-20,20))
    }else if(className("android.widget.TextView").text("残忍离开").exists()){
        let X = className("android.widget.TextView").text("残忍离开").findOne().bounds().centerX();
        let Y = className("android.widget.TextView").text("残忍离开").findOne().bounds().centerY();
        click(X+random(-20,20),Y+random(-10,10))
    }
}

function OpenBox(){
    if(className("android.widget.TextView").text("开宝箱").exists()){
        let X = className("android.widget.TextView").text("开宝箱").findOne().bounds().centerX();
        let Y = className("android.widget.TextView").text("开宝箱").findOne().bounds().centerY();
        click(X+random(-10,10),Y+random(-10,10))
        WaitaMoment(random(4,5),"判断是否有再看一个领取");
        SeeMore()
    }
}

function RandomDianZhan(){
    if(id("ba5").exists()){
        if(random(0,100) <= 5){//5%的点赞率
            log("点赞")
            console.hide();
            let X = id("ba5").findOne().bounds().centerX();//此处未测试
            let Y = id("ba5").findOne().bounds().centerY();
            click(X+random(-10,10),Y+random(-10,10))
            console.show();
            sleep(500);
        }
    }
}
 

function CloseQianDao(){
    if(className("android.widget.TextView").text("直接领取").exists()){
        click(random(154,417),random(1254,1370));
        WaitaMoment(random(3,5),"即将关闭签到界面")
        click(random(517,561),random(1576,1614))
        VarQianDao = 1;
    }
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
    SwipRandom(0,random(1600,1800),1080,random(300,500),random(400,800)) 
    //swipe(random(800,900) ,random(1550,1650) ,random(800,900) ,random(100,150) ,random(200,300));
    console.show();
}

function SwipRandom(num1,num2,num3,num4,num5){//x轴写范围，y轴自己写random，时间自己写random
    var snum1,snum3;
    snum1 = random(num1,num3)
    snum3 = snum1+random(-300,300)
    if(snum3 >= num3 || snum3 <= num1){
        snum3 = snum1
    }
    swipe(snum1,num2,snum3,num4,num5);
}


function WaitaMoment(second,word){
    for(let i = 0; i < second; i++){
        log(word + "," + (second-i) + "秒后执行");
        sleep(1000);
    }
}

function AlertWindow(){
    if(id("eud").exists()){//收益快报
        click(random(813,860),random(735,782))
    }
}






























