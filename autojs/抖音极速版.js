//去宝箱操作，无宝箱可点击情况已经测试
//下面需要测试：有宝箱可开的情况以及整体运行(去TEST.js中测试)

Start();
function Start(){
    console.show();
    if(!images.requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }

    app.launchApp("抖音极速版");
    WaitaMoment(20,"等待软件加载");

    AlertWindow();//在刷视频时弹出的各种内容进行处理

    TurnRenWuZhongXin();

    WaitaMoment(10,"等待任务中心界面加载");

    //检查有什么活动可做,签到也做一下
    CloseQianDao();

    //返回主页面
    back();

    Video();
    function Video(){
        var VideoNowTime = 0;
        var DifferenceTime = 5;//目前每5分钟去一次比较合适
        var VideoStartTime = NowTime();
        
        while(!(VideoNowTime == VideoStartTime + DifferenceTime)){
            VideoNowTime = NowTime();

            RandomDianZhan();//随机点赞

            WaitaMoment(random(3,30),"即将滑动");

            AlertWindow();//在刷视频时弹出的各种内容进行处理

            Swip();
        }

        WaitaMoment(random(3,7),"即将进入任务中心界面");

        TurnRenWuZhongXin();

        WaitaMoment(10,"等待任务中心界面加载");

        log("检测任务中心界面是否有弹出框")

        OpenBox();//执行完毕后会back返回精选
        
        WaitaMoment(random(3,7),"准备刷视频");

        Video();
    }
}

function TurnRenWuZhongXin(){
    WaitaMoment(2,"即将去来赚钱");
    console.hide();
    if(id("gqp").findOne()){
        let X = id("gqp").findOne().bounds().centerX();
        let Y = id("gqp").findOne().bounds().centerY();
        click(X,Y);
        log("已点击去赚钱")
        console.show();
    }
}

function TurnShouYe(){
    className("androidx.appcompat.app.ActionBar$c").desc("首页").click();
}

function TurnLeftTop(){
    click(90,116);
}

function TurnJingXuan(){
    if(className("android.widget.CheckedTextView").text("精选").findOne()){
        let X = className("android.widget.CheckedTextView").text("精选").findOne().bounds().centerX();
        let Y = className("android.widget.CheckedTextView").text("精选").findOne().bounds().centerY();
        click(X,Y);
        log("已到精选");
    }    
}

function CloseQianDao(){
    
}

function NowTime(){
    let now = new Date();
    let Hours = now.getHours();
    let Minutes = now.getMinutes();
    let NowTime = Hours * 60 + Minutes;
    return NowTime;
}

function WaitaMoment(second,word){
    for(let i = 0; i < second; i++){
        log(word + "," + (second-i) + "秒后执行");
        sleep(1000);
    }
}

function Swip(){
    console.hide();
    swipe(random(787,910) ,random(1400,1600) ,random(787,910) ,random(200,300) ,random(100,200));
    console.show();
}

function AlertWindow(){
    if(id("tv_cancel").exists()){
        id("tv_cancel").click();
    }
}

function RandomDianZhan(){
    if(random(0,100) <= 5){//5%的点赞率
        log("准备点赞")
        click(1003,946);
        log("点赞完成")
    }
}

function OpenBox(){
    WaitaMoment(10,"即将打开宝箱");
    console.hide();
    click(923,1691);//点击宝箱
    WaitaMoment(5,"等待看更多是否出现");
    click(545,1476);//点击看更多
    WaitaMoment(10,"等待判断广告是否出现");
    //检测广告是否出现
    if(className("com.lynx.tasm.behavior.ui.text.FlattenUIText").text("广告").exists()){
        //进入广告
        AD();
    }

    back();
}

function AD(){
    ADSleep();
    ADClose();
}

function ADClose(){
    log("寻找广告关闭")
    console.hide();
    if(className("com.lynx.tasm.ui.image.Ullmage").boundsInside(950, 0, 1050, 200).findOne()){//通用广告类型
        let X = className("com.lynx.tasm.ui.image.Ullmage").boundsInside(950, 0, 1050, 200).findOne().bounds().centerX();
        let Y = className("com.lynx.tasm.ui.image.Ullmage").boundsInside(950, 0, 1050, 200).findOne().bounds().centerY();
        click(X,Y);
    }
    console.show();

    WaitaMoment(5,"判断看更多是否出现");
    if(className("com.lynx.tasm.behavior.ui.LynxFlattenUI").text("领取奖励").exists()){
        className("com.lynx.tasm.behavior.ui.LynxFlattenUI").text("领取奖励").click();
        AD();
    }
    if(className("com.lynx.tasm.behavior.ui.view.UIView").text("开心收下").exists()){
        className("com.lynx.tasm.behavior.ui.view.UIView").text("开心收下").click();
    }
}

function ADSleep(){
    WaitaMoment(random(50,60),"等待广告");
}

























 

























