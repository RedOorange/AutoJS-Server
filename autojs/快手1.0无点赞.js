//

Start();
function Start(){
    console.show();
    if(!images.requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }

    app.launchApp("快手");
    WaitaMoment(20,"等待软件加载");

    TurnRenWuZhongXin();

    WaitaMoment(10,"等待任务中心界面加载");

    //检查有什么活动可做,签到也做一下
    CloseQianDao();

    //返回主页面
    back();

    //进入精选界面
    TurnJingXuan();

    Video();
    function Video(){
        var VideoNowTime = 0;
        var DifferenceTime = 5;//目前每5分钟去一次比较合适
        var VideoStartTime = NowTime();
        
        while(!(VideoNowTime == VideoStartTime + DifferenceTime)){
            VideoNowTime = NowTime();

            RandomDianZhan();//随机点赞

            AlertWindow();//在刷视频时弹出的各种内容进行处理

            WaitaMoment(random(3,30),"即将滑动");

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

function AlertWindow(){
    log("检测是否有弹出")
    if(className("android.widget.TextView").text("请完成安全验证").exists()){
        WaitaMoment(9,"请人工进行验证");
        back();
        WaitaMoment(3,"等待页面加载")
    }
}

function TurnRenWuZhongXin(){
    WaitaMoment(2,"即将去精选");
    TurnJingXuan();
    WaitaMoment(5,"即将点击左上角");
    console.hide();
    sleep(2000);
    click(random(25,125),(68,170));
    console.show();
    log("已点击左上角")
    WaitaMoment(4,"即将点击任务中心");
    console.hide();
    if(className("android.widget.TextView").text("任务中心").findOne()){
        let X = className("android.widget.TextView").text("任务中心").findOne().bounds().centerX();
        let Y = className("android.widget.TextView").text("任务中心").findOne().bounds().centerY();
        click(X,Y);
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
    if(className("android.widget.Button").text("立即领取").exists()){
        log("cz")
        let X = className("android.widget.CheckedTextView").text("精选").findOne().bounds().centerX();
        let Y = className("android.widget.CheckedTextView").text("精选").findOne().bounds().centerY();
        click(X,Y);
        sleep(2000);
        back();
        // if(className("android.widget.Button").textMatches(/看视频赚\d+金币/).findOne().bounds().centerX()){
        //     log("看视频赚金币")
        //     let X = className("android.widget.TextView").textMatches(/看视频赚\d+金币/).findOne().bounds().centerX();
        //     let Y = className("android.widget.TextView").textMatches(/看视频赚\d+金币/).findOne().bounds().centerY();
        //     click(X+random(-20,20),Y+random(-20,20))
        //     AD();
        // }
    }
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
    
}

function RandomDianZhan(){
    // if(random(0,100) <= 5){//5%的点赞率
    //     log("准备点赞")
    //     click(1003,946);
    //     log("点赞完成")
    // }
}

function OpenBox(){
    WaitaMoment(10,"即将打开宝箱");
    console.hide();
    if(className("android.widget.Button").text("立刻领20金币").exists()){
        log("宝箱存在")
        className("android.widget.Button").text("立刻领20金币").click();

        console.show();
        WaitaMoment(5,"判断看视频最高得是否存在");

        SeeMore();

        WaitaMoment(5,"检查任务中心是否还有内容弹出");
        back();//返回精选
    }
    else if(className("android.widget.Button").text("立刻领40金币").exists()){
        log("宝箱存在")
        className("android.widget.Button").text("立刻领40金币").click();

        console.show();
        WaitaMoment(5,"判断看视频最高得是否存在");

        SeeMore();

        WaitaMoment(5,"检查任务中心是否还有内容弹出");
        back();//返回精选
    }
    else if(className("android.widget.Button").text("立刻领60金币").exists()){
        log("宝箱存在")
        className("android.widget.Button").text("立刻领60金币").click();

        console.show();
        WaitaMoment(5,"判断看视频最高得是否存在");

        SeeMore();

        WaitaMoment(5,"检查任务中心是否还有内容弹出");
        back();//返回精选
    }
    else if(className("android.widget.Button").text("立刻领80金币").exists()){
        log("宝箱存在")
        className("android.widget.Button").text("立刻领80金币").click();

        console.show();
        WaitaMoment(5,"判断看视频最高得是否存在");

        SeeMore();

        WaitaMoment(5,"检查任务中心是否还有内容弹出");
        back();//返回精选
    }
    else if(className("android.widget.Button").text("立刻领100金币").exists()){
        log("宝箱存在")
        className("android.widget.Button").text("立刻领100金币").click();

        console.show();
        WaitaMoment(5,"判断看视频最高得是否存在");

        SeeMore();

        WaitaMoment(5,"检查任务中心是否还有内容弹出");
        back();//返回精选
    }
    else if(className("android.widget.Button").text("立刻领120金币").exists()){
        log("宝箱存在")
        className("android.widget.Button").text("立刻领120金币").click();

        console.show();
        WaitaMoment(5,"判断看视频最高得是否存在");

        SeeMore();

        WaitaMoment(5,"检查任务中心是否还有内容弹出");
        back();//返回精选
    }
    else{//如果没有找到宝箱(因为没加载出来等等的原因)就返回重进

        log("宝箱未到时间或者未加载出来");
        back();
    }
}

function SeeMore(){
    if(className("android.widget.Button").text("观看广告最高可得600金币 保底10金币").exists()){
        log("看视频最高得存在")
        console.hide();
        className("android.widget.Button").text("观看广告最高可得600金币 保底10金币").click();
        console.show();
        AD();
    }
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

function ADSleep(){
    WaitaMoment(random(50,60),"等待广告");
}

























 

























