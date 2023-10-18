//几乎没有问题
//设置公共变量省的去检查签到

AllCode();

function AllCode(){
    if(!images.requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }
    console.show();
    log("开始执行快手小说")
    
    //全局变量
    var RunTime = 1440;//------------------------------------运行分钟(可以修改)但已经在UI界面写好运行时间
    var TurnTime1 = random(5,10);//------------------------去开宝箱的等待分钟(可以修改)
    var DifferenceMinutes = 0;//时间差值
    var QianDao = 0;//是否签到
    
    //记录当前时间
    var StartTime = NowTime();
    var StartHours = StartTime[0];
    var StartMinutes = StartTime[1];
    var BeginingTime = StartHours*60 + StartMinutes; 
    
    app.launchApp("快手免费小说");
    
    WaitaMoment(10,"等待app加载");
    
    Main();
    function Main(){
        //log("Main");

        //前往书籍之中
        TurnBook();
        
        WaitaMoment(random(2,5),"即将开始运行");

        Swip();
    }
    
    //执行连续向右翻动操作
    function Swip(){
        //log("Swip");
    
        //开始之前先获取时间
        var OldTime = NowTime();
        var OldHours = OldTime[0];
        var OldMinutes = OldTime[1];
        var OldTotalMinutes = OldHours*60 + OldMinutes; 
        log("当前时间" + OldHours+ ":" + OldMinutes);
    
        do {
            //log("当前总计已执行" + DifferenceMinutes + "分钟" );
            console.hide();
            swipe(XRightPositionRandom(), YPositionRandom(), XLeftPositionRandom(), YPositionRandom(), SwipRandom1());
            console.show();

            WaitaMoment(random(5,10),"即将进入下一页");
    
            BookAD();//判断页内广告
    
            //判断一下当前时间,时间一到,去领箱子
            var Time = NowTime();
            var Hours = Time[0];
            var Minutes = Time[1];
            var NowTotalMinutes = Hours*60 + Minutes;
            DifferenceMinutes = NowTotalMinutes - BeginingTime;
            if(NowTotalMinutes - OldTotalMinutes >= TurnTime1){//----------------------------------跳转宝箱栏目的时间间隔
                OldTotalMinutes = NowTotalMinutes;
                log("当前时间" + Hours+ ":" + Minutes + "准备去领宝箱");
                TurnBox();
            }
        } while (DifferenceMinutes < RunTime);
    
        log("时间已到,结束运行");
        exit();
    } 
    
    function TurnBox(){
        back();
        WaitaMoment(5,"即将检查是否有加入书架弹窗");

        //暂不加入书架
        Close_add_shelf();


        WaitaMoment(3,"检查是否成功返回主页面");
        //检查是否back成功
        while(!(id("tab_tv").className("android.widget.TextView").text("福利").exists())){//如果没有返回到主界面则继续back
            back();
            sleep(3000);
        }

        WaitaMoment(random(4,9),"即将去福利导航");
        TurnQuFuLi();
        WaitaMoment(random(4,9),"即将点击宝箱");
        console.hide();
        click(943,1622);
        console.show();
        WaitaMoment(random(4,9),"即将检查看视频赚更多是否存在");
        if(className("android.widget.Button").text("看视频赚更多").exists()){
            console.hide();
            click(More_XPosition(),More_YPosition())
            console.show();
            CloseAD();
        }
        TurnShuCheng();
        TurnBook();
    }

    function TurnShuCheng(){
        WaitaMoment(random(5,10),"即将进入书城导航");
        console.hide();
        // if(id("tab_tv").className("android.widget.TextView").text("书城").exists()){
        //     click(ShuCheng_XPosition(),ShuCheng_YPosition());
        // }
        if(className("android.widget.RelativeLayout").clickable(true).selected(true).depth(5).findOne()){
            click(ShuCheng_XPosition(),ShuCheng_YPosition());
        }
        console.show();
    }

    function Close_add_shelf(){
        if(id("tv_no_add_shelf").exists()){
            WaitaMoment(random(5,10),"即将关闭加入书架弹窗");
            console.hide();
            id("tv_no_add_shelf").click();
            console.show();
        }
    }

    function BookAD(){
        if(id("tv_ad").exists()){
            WaitaMoment(random(2,3),"翻页广告存在,即将进入");
            console.hide();
            id("tv_ad").click();
            console.show();

            WaitaMoment(random(2,3),"即将判断是否进入广告");
            //如果因为网络原因没有进去
            if(id("tv_ad").exists()){
                log("进入失败，继续看小说");
                return;
            }
            CloseAD();
            WaitaMoment(random(2,5),"即将点击进入下一页");
            console.hide();
            click(XRightPositionRandom(),YPositionRandom());
            console.show();
        }
    }

    function CloseAD(){
        WaitaMoment(random(40,50),"等待广告播放");
        log("正在寻找可关闭的按钮")
        console.hide();
        if(id("video_close_icon").exists()){
            id("video_close_icon").click();
        }
        console.show();
    }

    function TurnQuFuLi(){
        log("准备前往福利导航")
        if(id("tab_tv").className("android.widget.TextView").text("福利").findOne()){
            console.hide();
            click(FuLi_XPosition(),FuLi_YPosition());
            console.show();
        }
        WaitaMoment(random(5,10),"即将检查签到是否存在");
        if(className("android.widget.Button").text("立即签到").exists() && QianDao == 0){
            log("签到存在,准备签到")
            console.hide();
            className("android.widget.Button").text("立即签到").click();
            console.show();
            WaitaMoment(random(5,10),"签到结束,即将离开页面");
            console.hide();
            click(XRightPositionRandom(),YPositionRandom());//点击边缘退出签到界面
            console.show();
            QianDao = 1;//表示签到已经完成
        }
    }
    
    
    function TurnBook(){
        WaitaMoment(5,"即将进入书籍");
        console.hide();
        swipe(800,700,800,1400,500);
        swipe(800,700,800,1400,500);
        swipe(800,700,800,1400,500);
        swipe(800,700,800,1400,500);
        sleep(2000);
        click(900,781)//点击最后一本书籍的位置
        log("我已点击书籍")
        console.show();
    }

    //当前本地时间
    function NowTime(){
        var now = new Date();
        var Hours = now.getHours();
        var Minutes = now.getMinutes();
        return [Hours,Minutes];
    }
    //随机等待
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
    function FuLi_XPosition(){////432,1776,648,1905
        return random(432,648);
    }
    function FuLi_YPosition(){////432,1776,648,1905
        return random(1776,1905);
    }
    function More_XPosition(){////228,1188,852,1338
        return random(228,852);
    }
    function More_YPosition(){////228,1188,852,1338
        return random(1188,1338);
    }
    function ShuCheng_XPosition(){////216,1755,432,1905
        return random(216,432);
    }
    function ShuCheng_YPosition(){////216,1755,432,1905
        return random(1776,1905);
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


