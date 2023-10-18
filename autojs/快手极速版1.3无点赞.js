//需要测试

Start();
function Start(){
    console.show();
    if(!images.requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }

    app.launchApp("快手极速版");
    WaitaMoment(20,"等待软件加载");

    //我知道了:App的弹窗
    if(id("positive").exists()){
        log("我知道了");
        console.hide();
        id("positive").click();
        console.show();
        SleepRandom1();
    }

    //关闭拉新红包窗口
    if(className("android.widget.TextView").text("邀请新用户可得").exists()){
        log("关闭拉新红包窗口");
        className("android.widget.ImageView").clickable(true).depth(5).click();//点击下面的关闭按钮
    }

    TurnQuZhuanQian();

    WaitaMoment(10,"等待去赚钱界面加载");

    //检查有什么活动可做,签到也做一下
    CloseQianDao();//做的不好

    TurnShouYe();

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

        WaitaMoment(random(3,7),"即将进入去赚钱界面");

        TurnQuZhuanQian();

        WaitaMoment(10,"等待去赚钱界面加载");

        AlertWindow();

        log("判断看视频最高得是否存在")
        if(className("android.widget.TextView").text("看视频最高得").exists()){
            log("看视频最高得")
            console.hide();
            className("android.widget.TextView").text("看视频最高得").click();
            console.show();
            AD();
        }

        WaitaMoment(random(3,7),"即将打开宝箱");

        OpenBox();

        WaitaMoment(random(3,7),"即将去首页");

        TurnShouYe()
        
        WaitaMoment(random(3,7),"准备刷视频");

        Video();
    }
}

function OpenBox(){
    log("点击宝箱");
    console.hide();
    click(900,1600);//----仅限1920x1080
    console.show();
    SleepRandom1();
    log("判断看视频最高的是否存在")
    if(className("android.widget.TextView").text("看视频最高得").exists()){
        log("看视频最高得")
        console.hide();
        className("android.widget.TextView").text("看视频最高得").click();
        console.show();
        AD();
    }
}

function RandomDianZhan(){
    // if(id("like_icon").exists()){
    //     if(random(0,100) <= 3){//3%的点赞率
    //         log("点赞")
    //         let boundsclickX = id("like_icon").findOne().bounds().centerX();//906,783,1074,951
    //         //let boundsclickY = id("like_icon").findOne().bounds().centerY();
    //         //Y值会出现负数,自己定义一个吧 - 仅限1920x1080
    //         console.hide();
    //         click(boundsclickX, random(833,901));
    //         console.show();
    //         sleep(500)
    //     }
    // }
}
 
function TurnShouYe(){
    if(className("androidx.appcompat.app.ActionBar$c").desc("首页").findOne()){
        console.hide();
        className("androidx.appcompat.app.ActionBar$c").desc("首页").click()
        console.show();
    }
}

function CloseQianDao(){
    //if(签到相应的条件存在){
        //click(500,1500);//480,1485,600,1605 - 仅适用于1920x1080
    //}
}

function AD(){
    ADSleep();
    ADClose();
}

function ADClose(){
    log("寻找广告关闭")
    console.hide();
    if(className("android.widget.ImageView").boundsInside(300, 0, 500, 200).findOne()){//通用广告类型
        let X = className("android.widget.ImageView").boundsInside(300, 0, 500, 200).findOne().bounds().centerX();
        let Y = className("android.widget.ImageView").boundsInside(300, 0, 500, 200).findOne().bounds().centerY();
        click(X,Y);
    }
    console.show();
}

function TurnQuZhuanQian(){
    log("寻找去赚钱导航")
    if(className("androidx.appcompat.app.ActionBar$c").desc("去赚钱").findOne()){
        let boundsclickX = className("androidx.appcompat.app.ActionBar$c").desc("去赚钱").findOne().bounds().centerX();
        let boundsclickY = className("androidx.appcompat.app.ActionBar$c").desc("去赚钱").findOne().bounds().centerY();
        console.hide();
        click(boundsclickX, boundsclickY)
        console.show();
    }

    SleepRandom1();
    
    internetTry();
    function internetTry(){
        if(id("retry_btn").exists()){
            log("网络重连")
            id("retry_btn").click();
            SleepRandom1();
            internetTry();
        }    
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
    swipe(random(787,910) ,random(1400,1600) ,random(787,910) ,random(200,300) ,random(100,200));
    console.show();
}

function SleepRandom1(){
    sleep(random(3000,7000));
}

function ADSleep(){
    WaitaMoment(random(50,60),"等待广告");
}

function WaitaMoment(second,word){
    for(let i = 0; i < second; i++){
        log(word + "," + (second-i) + "秒后执行");
        sleep(1000);
    }
}

function AlertWindow(){
    if(id("title_tv").exists()){
        WaitaMoment(9,"请人工进行验证");
        back();
        WaitaMoment(3,"等待页面加载")
    }
    if(className("android.widget.Button").text("立即报名 稳赚不赔").exists()){
        WaitaMoment(5,"早起打卡,请手动关闭,还未书写完整逻辑,时间到后将back");
        back();
    }
}

/*
逻辑:

开始(){
    判断账号上有什么任务;
}

时间(){
    返回当前时间;
}



刷视频(){
    获取开始时间
    while循环刷视频(){
        获取时间
        判断时间
    }

    领宝箱();

    if(一次性任务未做||有任务){
        执行一次性任务
    }
    if(可多次执行任务条件满足){
        执行
    }

    返回刷视频页面();
}

可多次执行任务(){
    //如果还有时间限制

    执行完毕,全局变量+1;
}


领宝箱(){
    执行
    完毕
}

一次性任务(){
    执行
    执行完毕全局变量+1
    刷视频;
}



*/






























// var Pointcolor = images.pixel(img,1035,1926);
// console.log(colors.toString(Pointcolor));
