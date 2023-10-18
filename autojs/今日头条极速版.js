//Last update 4.16
//如果进入直播，返回重进

Start();
function Start(){

    app.launchApp("今日头条极速版");
    WaitaMoment(20,"等待软件加载");

    AlertWindow();//关闭初始的各种弹窗
               
    WaitaMoment(random(3,7),"即将去往视频界面");
    TurnShouYe();

    Video();
    function Video(){
        var VideoNowTime = 0;
        var DifferenceTime = 3;//目前每5分钟去一次比较合适
        var VideoStartTime = NowTime();
        
        while(!(VideoNowTime == VideoStartTime + DifferenceTime)){
            VideoNowTime = NowTime();
           
            WaitaMoment(random(2,12),"即将滑动");
           
            SwipRandom(0,random(1600,1800),1080,random(300,500),random(400,800)) 
        }

        WaitaMoment(random(2,4),"即将退出内容");
            
        //退出文章 视窗为首页back()
        back();

        AlertWindow();//在离开刷视频页面时再次确认有没有弹出的内容阻挡

        WaitaMoment(random(3,7),"即将进入任务界面");

        TurnRenWu();

        WaitaMoment(random(5,10),"等待任务界面加载");

        AlertWindow();

        WaitaMoment(random(3,7),"即将打开宝箱");

        OpenBox();

        WaitaMoment(random(3,7),"即将返回首页");

        TurnShouYe()
        
        WaitaMoment(random(3,7),"准备看首页");

        Video();
    }
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

function TurnShouYe(){
    click(random(216,432),random(1804,1915))
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
    if(className("com.lynx.tasm.behavior.ui.text.FlattenUIText").text("领取成功").exists()){//右上交关闭                                                         
        click(random(985,1006),random(74,95));
        WaitaMoment(random(3,5),"等待检查是否有看更多弹出");
        SeeMore();
    }
    WaitaMoment(random(3,5),"等待检查广告结束弹窗");
    OverRenWu();
}
function OverRenWu(){
    if(className("com.lynx.tasm.behavior.ui.text.UIText").textMatches(/\d+金币/).exists()){//右上交关闭                                                         
        click(random(511,569),random(1539,1588));
    }
}

function SeeMore(){
    if(className("com.lynx.tasm.ui.image.UIImage").exists()){//最初点击宝箱的弹窗，可能有问题
        click(random(270,820),random(1220,1370))
        AD();
    }else if(className("com.lynx.tasm.behavior.ui.LynxFlattenUI").textMatches(/再看一个获取\d+金币/).exists()){
        let X = className("com.lynx.tasm.behavior.ui.LynxFlattenUI").textMatches(/再看一个获取\d+金币/).findOne().bounds().centerX();
        let Y = className("com.lynx.tasm.behavior.ui.LynxFlattenUI").textMatches(/再看一个获取\d+金币/).findOne().bounds().centerY();
        click(X+random(-10,10),Y+random(-10,10))
        AD();  
    }
}

function OpenBox(){
    click(random(815,970),random(1590,1738))
    WaitaMoment(random(3,5),"检查看更多是否出现");
    SeeMore()
}

function RandomDianZhan(){
    
}
 

function CloseQianDao(){
    //if(签到相应的条件存在){
        //click(500,1500);//480,1485,600,1605 - 仅适用于1920x1080
    //}
}
 //记录当前时间
 function NowTime(){
    let now = new Date();
    let Hours = now.getHours();
    let Minutes = now.getMinutes();
    let NowTime = Hours * 60 + Minutes;
    return NowTime;
}

function WaitaMoment(second,word){
    console.show()
    for(let i = 0; i < second; i++){
        log(word + "," + (second-i) + "秒后执行");
        sleep(1000);
    }                                                
    console.hide()
}

function AlertWindow(){
    
}
function TurnRenWu(){
    click(random(432,648),random(1804,1915))
}
