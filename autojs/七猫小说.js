//签到没做但是并不影响运行
//翻页的时候也要检查赚更多

AllCode();
function AllCode(){
    log("开始执行七猫小说")
    if(!images.requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }
    console.show();


    //全局变量
    var RunTime = 100;//------------------------------------运行分钟(可以修改)
    var TurnTime1 = random(2,3);//-------------去宝箱的等待的分钟(可以修改)
    var DifferenceMinutes = 0;
    
    //记录当前时间
    var StartTime = NowTime();
    var StartHours = StartTime[0];
    var StartMinutes = StartTime[1];
    var BeginingTime = StartHours*60 + StartMinutes; 
    
    app.launchApp("七猫免费小说");
    
    WaitaMoment(20,"等待页面启动");

    //打开App后弹出的乱七八糟的东西
    //不更新
    if(id("tv_update_cancel").exists()){
        WaitaMoment(3,"");
        id("tv_update_cancel").click();
    }
    
    Main();
    function Main(){
        TurnBook();
        Swip();
    }
    
    //点击书城栏目中推荐下第一个书籍
    function TurnBook(){  
        //log("即将进入书籍");
        if(id("img_book_four_layout_1").findOne()){
            id("img_book_four_layout_1").click();
            WaitaMoment(random(5,10),"即将进入书籍");
        }
        ////log("准备开始阅读")
        if(id("book_detail_foot_free_read_tv").findOne()){
            id("book_detail_foot_free_read_tv").click();
            WaitaMoment(random(5,10),"立即免费阅读");
        }
    }
    
    //执行连续向右翻动操作
    function Swip(){
    
        //开始之前先获取时间
        var OldTime = NowTime();
        var OldHours = OldTime[0];
        var OldMinutes = OldTime[1];
        var OldTimeMinutes = OldHours*60 + OldMinutes;
        log("老时间" + OldHours+ ":" + OldMinutes);
    
        do {
            log("已循环" + DifferenceMinutes + "分钟" );
            swipe(XRightPositionRandom(), YPositionRandom(), XLeftPositionRandom(), YPositionRandom(), SwipRandom1());

            WaitaMoment(random(5,10),"即将翻页并检查页面广告与是否领宝箱");
    
            // Close_add_shelf();
    
            BookAD();//判断广告

            alertwindow();//关闭弹出的一些莫名其妙的东西
    
            //判断一下当前时间,时间一到,去领箱子
            var Time = NowTime();
            var Hours = Time[0];
            var Minutes = Time[1];
            var NowTotalMinutes = Hours*60 + Minutes;
            DifferenceMinutes = NowTotalMinutes - BeginingTime;
            //log("新时间"+ Hours + ":" + Minutes);
            if(NowTotalMinutes - OldTimeMinutes >= TurnTime1){//----------------------------------跳转宝箱栏目的时间间隔
                OldTimeMinutes = NowTotalMinutes;
                log("老时间" + OldHours+ ":" + OldMinutes);
    
                //右上方进入福利界面
                if(id("float_more_viewgroup").exists()){
                    JinBi();
                }
            }
        } while (DifferenceMinutes < RunTime);
    
        log("时间已到,结束运行");
        exit();
    } 
    
    function BookAD(){//感觉有问题，先屏蔽
        if(id("tv_go_on_tip").exists()){
    
            log("BookAD BookAD");
    
            //点击进入下一页
            id("tv_go_on_tip").click();
        }

        if(id("tv_text_chain_btn_end").exists()){
            
            log("小说内看小视频赚xx金币");
    
            id("tv_text_chain_btn_end").click();
    
            AD();

            //点击进入下一页，以防滑动点击到广告
            click(1057,1614);
        }
    }
    
    function JinBi(){
        console.show();
        //log("JinBi");
    
        //去福利界面
        TurnFuLi();
    
        //点击宝箱
        ClickBox();

        SeeMore();

        //领取完毕返回书中
        while(!(id("float_more_viewgroup").exists())){//如果没有返回到书籍的界面则继续back
            back();
            sleep(2000);
        }

        log("我已back");

        WaitaMoment(5,"等待返回后加载页面")
        
    }
    
    function TurnFuLi(){
        log("TurnFuLi");
        console.hide();
        if(id("float_more_viewgroup").findOne()){
            id("float_more_viewgroup").click();
        }
        console.show();
    }
    
    //领取宝箱(如果可以领,就一直领取)
    function ClickBox(){
        WaitaMoment(10,"即将点击宝箱");
        //点击宝箱(宝箱不存在的时候还需要进行测试)
        click(Box_XPosition(),Box_YPosition());
    }
    
    function SeeMore(){

        WaitaMoment(5,"检查看更多是否弹出");

        if(id("jump_button").exists()){//另外格式的seeMore
            log("看小视频再领");
            id("jump_button").click();
            AD();
        }
        if(className("android.view.View").desc("看小视频再领300金币").exists()){
            log("看小视频再领300金币");
            className("android.view.View").desc("看小视频再领300金币").click();
            AD();
        }
        if(className("android.view.View").desc("看小视频再领200金币").exists()){
            log("看小视频再领200金币");
            className("android.view.View").desc("看小视频再领200金币").click();
            AD();
        }
        if(className("android.view.View").desc("看小视频再领150金币").exists()){
            log("看小视频再领150金币");
            className("android.view.View").desc("看小视频再领150金币").click();
            AD();
        }
        if(className("android.view.View").desc("看小视频再领130金币").exists()){
            log("看小视频再领130金币");
            className("android.view.View").desc("看小视频再领130金币").click();
            AD();
        }
        if(className("android.view.View").desc("看小视频再领120金币").exists()){
            log("看小视频再领120金币");
            className("android.view.View").desc("看小视频再领120金币").click();
            AD();
        }
        if(className("android.view.View").desc("看小视频再领110金币").exists()){
            log("看小视频再领110金币");
            className("android.view.View").desc("看小视频再领110金币").click();
            AD();
        }
        if(className("android.view.View").desc("看小视频再领100金币").exists()){
            log("看小视频再领100金币");
            className("android.view.View").desc("看小视频再领100金币").click();
            AD();
        }
        if(className("android.view.View").desc("看小视频再领90金币").exists()){
            log("看小视频再领90金币");
            className("android.view.View").desc("看小视频再领90金币").click();
            AD();
        }
        if(className("android.view.View").desc("看小视频再领80金币").exists()){
            log("看小视频再领80金币");
            className("android.view.View").desc("看小视频再领80金币").click();
            AD();
        }
        if(className("android.view.View").desc("看小视频再领70金币").exists()){
            log("看小视频再领70金币");
            className("android.view.View").desc("看小视频再领70金币").click();
            AD();
        }
        if(className("android.view.View").desc("看小视频再领60金币").exists()){
            log("看小视频再领60金币");
            className("android.view.View").desc("看小视频再领60金币").click();
            AD();

        }
        if(className("android.view.View").desc("看小视频再领50金币").exists()){
            log("看小视频再领50金币");
            className("android.view.View").desc("看小视频再领50金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领300金币").exists()){
            log("看小视频再领300金币");
            className("android.view.View").text("看小视频再领300金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领200金币").exists()){
            log("看小视频再领200金币");
            className("android.view.View").text("看小视频再领200金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领150金币").exists()){
            log("看小视频再领150金币");
            className("android.view.View").text("看小视频再领150金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领130金币").exists()){
            log("看小视频再领130金币");
            className("android.view.View").text("看小视频再领130金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领120金币").exists()){
            log("看小视频再领120金币");
            className("android.view.View").text("看小视频再领120金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领110金币").exists()){
            log("看小视频再领110金币");
            className("android.view.View").text("看小视频再领110金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领100金币").exists()){
            log("看小视频再领100金币");
            className("android.view.View").text("看小视频再领100金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领90金币").exists()){
            log("看小视频再领90金币");
            className("android.view.View").text("看小视频再领90金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领80金币").exists()){
            log("看小视频再领80金币");
            className("android.view.View").text("看小视频再领80金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领70金币").exists()){
            log("看小视频再领70金币");
            className("android.view.View").text("看小视频再领70金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领60金币").exists()){
            log("看小视频再领60金币");
            className("android.view.View").text("看小视频再领60金币").click();
            AD();
        }
        if(className("android.view.View").text("看小视频再领50金币").exists()){
            log("看小视频再领50金币");
            className("android.view.View").text("看小视频再领50金币").click();
            AD();
        }
    }
    
    function AD(){
        //log("AD");
    
        //进行广告时长的随机等待
        WaitaMoment(random(50,60),"等待广告");
        
        console.hide();
        //屏幕右上角寻找android.widget.ImageView点击
        if(className("android.widget.ImageView").boundsInside(device.width / 2, 0, device.width, device.height / 4).findOne()){
            log("通用广告类型")
            var XX = className("android.widget.ImageView").boundsInside(device.width / 2, 0, device.width, device.height / 4).findOne().bounds().centerX()
            var YY = className("android.widget.ImageView").boundsInside(device.width / 2, 0, device.width, device.height / 4).findOne().bounds().centerY()
            log(XX);
            log(YY);
            click(XX,YY);
            console.show();
            SeeMore();
        }
    }

    function alertwindow(){
        if(id("got_it").exists()){
            id("got_it").click();
        }
    }
    function Box_XPosition(){//861,1662,1023,1830
        return random(861,1023);
    }
    function Box_YPosition(){//861,1662,1023,1830
        return random(1662,1830);
    }
    function SleepRandom2(){
        sleep(random(5000,10000));
    }
    //当前本地时间
    function NowTime(){
        var now = new Date();
        var Hours = now.getHours();
        var Minutes = now.getMinutes();
        return [Hours,Minutes];
    }
    
    //随机等待
    function SleepRandom3(){
        sleep(random(40000,50000));
    }
    function SwipRandom1(){
        return random(200,500);
    }
    function XLeftPositionRandom(){
        return random(1,270);
    }
    function XRightPositionRandom(){
        return random(1030,1079);
    }
    function YPositionRandom(){
        return random(200,1600);
    }
    function BookXPositionRandom(){//96,586,291,864
        return random(96,291);
    }
    function BookYPositionRandom(){//96,586,291,864
        return random(586,864);
    }
    function FuLi_XPosition(){////432,1755,648,1905
        return random(432,648);
    }
    function FuLi_YPosition(){////432,1755,648,1905
        return random(1755,1905);
    }
    function ShuCheng_XPosition(){////216,1755,432,1905
        return random(216,432);
    }
    function ShuCheng_YPosition(){////216,1755,432,1905
        return random(1755,1905);
    }
    function Close_add_shelf_XPosition(){//159,1034,540,1166
        return random(159,540)
    }
    function Close_add_shelf_YPosition(){//159,1034,540,1166
        return random(1034,1166)
    }
    function WaitaMoment(second,word){
        for(let i = 0; i < second; i++){
            log(word + "," + (second-i) + "秒后执行");
            sleep(1000);
        }
    }
}