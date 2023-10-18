//页内广告以及宝箱广告需要继续测试,但其余已稳定运行
//通用广告类型的坐标有问题
//书内广告没有点击进入

AllCode();
function AllCode(){
    log("开始执行熊猫小说")
    if(!images.requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }
    console.show();


    //全局变量
    var RunTime = 100;//------------------------------------运行分钟(可以修改)
    var TurnTime1 = 3;//-------------去宝箱的等待的分钟(可以修改)
    var DifferenceMinutes = 0;
    
    //记录当前时间
    var StartTime = NowTime();
    var StartHours = StartTime[0];
    var StartMinutes = StartTime[1];
    var BeginingTime = StartHours*60 + StartMinutes; 
    
    app.launchApp("熊猫免费小说");
    
    WaitaMoment(20,"等待页面启动");
    
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
    
                //有金币的页面才会前往
                if(id("float_more_viewgroup").exists()){
                    TurnBox();
                }
            }
        } while (DifferenceMinutes < RunTime);
    
        log("时间已到,结束运行");
        exit();
    } 
    
    function BookAD(){
        if(id("tv_go_on_tip").exists()){
    
            log("BookAD BookAD");
    
            id("tv_go_on_tip").click();
            
            SleepRandom2();
        }
        if(id("tv_text_chain_btn_end").exists()){
            
            log("看小视频赚xx金币");
    
            id("tv_text_chain_btn_end").click();
    
            AD();

            WaitaMoment(random(5,10),"检查是否有看小视频再领");

            SeeMore();
        }
    }
    
    function TurnBox(){
        log("TurnBox");
    
        //去福利界面
        TurnFuLi();
    
        //点击宝箱
        ClickBox();
    
        //领取完毕返回书中
        back();//有时候返回不成功

        WaitaMoment(5,"等待返回后加载页面")
        
    }
    
    function TurnFuLi(){
        log("TurnFuLi");
        if(id("float_more_viewgroup").findOne()){
            id("float_more_viewgroup").click();
        }
        SleepRandom2();
    }
    
    //领取宝箱(如果可以领,就一直领取)
    function ClickBox(){
        log("ClickBox");
        //点击宝箱(宝箱不存在的时候还需要进行测试)
        click(Box_XPosition(),Box_YPosition());

        WaitaMoment(random(5,10),"检查看更多是否弹出");
        SeeMore();
    }
    
    function SeeMore(){//此不执行,为什么不执行啊
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
        if(className("android.view.View").text("看小视频再领100金币").exists()){
            log("看小视频再领100金币");
            className("android.view.View").text("看小视频再领100金币").click();
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
        if(className("android.widget.ImageView").boundsInside(0, 0, device.width, device.height / 4).findOne()){
            log("通用广告类型")
            var XX = className("android.widget.ImageView").boundsInside(0, 0, device.width, device.height / 4).findOne().bounds().centerX()
            var YY = className("android.widget.ImageView").boundsInside(0, 0, device.width, device.height / 4).findOne().bounds().centerY()
            log(XX);
            log(YY);
            click(XX,YY);
            console.show();
            SleepRandom2();
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