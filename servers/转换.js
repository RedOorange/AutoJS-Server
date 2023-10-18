
var AllCode1 = function AllCode(){
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
    
    //记录当前时间
    var StartTime = NowTime();
    var StartHours = StartTime[0];
    var StartMinutes = StartTime[1];
    var BeginingTime = StartHours*60 + StartMinutes; 
    
    app.launchApp("快手免费小说");
    
    log("等待10秒运行")
    sleep(10000);
    
    Main();
    function Main(){
        //log("Main");
        TurnBook();
        SleepRandom1();
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
            log("已执行" + DifferenceMinutes + "分钟" );
            swipe(XRightPositionRandom(), YPositionRandom(), XLeftPositionRandom(), YPositionRandom(), SwipRandom1());

            SleepRandom2();
    
            //暂不加入书架
            //Close_add_shelf();
    
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
        SleepRandom2();
        TurnQuFuLi();
        SleepRandom2();
        click(Box_XPosition(),Box_YPosition());
        SleepRandom2();
        log("检查看视频赚更多是否存在")
        if(className("android.widget.Button").text("看视频赚更多").exists()){
            click(More_XPosition(),More_YPosition())
            CloseAD();
        }
        SleepRandom2();
        TurnShuCheng();
        SleepRandom2();
        TurnBook();
    }

    function TurnShuCheng(){
        log("准备进入书城导航")
        if(id("tab_tv").className("android.widget.TextView").text("书城").findOne()){
            click(ShuCheng_XPosition(),ShuCheng_YPosition())
        }
    }

    function Close_add_shelf(){

    }

    function BookAD(){
        if(id("tv_ad").exists()){
            log("翻页广告存在,准备进入")
            id("tv_ad").click();
            CloseAD();
        }
        SleepRandom1();
        click(XRightPositionRandom(),YPositionRandom());
    }

    function CloseAD(){
        SleepRandom3();
        log("正在寻找可关闭的按钮")
        if(id("video_close_icon").exists()){
            id("video_close_icon").click();
        }
    }

    function TurnQuFuLi(){
        log("准备前往福利导航")
        if(id("tab_tv").className("android.widget.TextView").text("福利").findOne()){
            click(FuLi_XPosition(),FuLi_YPosition());
        }
        SleepRandom2();
        if(className("android.widget.Button").text("立即签到").exists()){
            log("签到存在,准备签到")
            className("android.widget.Button").text("立即签到").click();
            SleepRandom2();
            log("签到结束,离开页面")
            click(XRightPositionRandom(),YPositionRandom());//点击边缘退出签到界面
        }
    }
    
    
    function TurnBook(){
        log("正在寻找去书城导航")
        if(id("read_recycler").findOne()){
            log("已找到书城导航")
            click(BookXPositionRandom(),BookYPositionRandom())
        }
    }

    //当前本地时间
    function NowTime(){
        var now = new Date();
        var Hours = now.getHours();
        var Minutes = now.getMinutes();
        return [Hours,Minutes];
    }
    //随机等待
    function SleepRandom1(){
        sleep(random(2000,3000));
    }
    function SleepRandom2(){
        sleep(random(5000,10000));
    }
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
    function Box_XPosition(){////792,1497,1080,1731
        return random(792,1080);
    }
    function Box_YPosition(){////792,1497,1080,1731
        return random(1497,1731);
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
        return random(1755,1905);
    }
    function Close_add_shelf_XPosition(){//159,1034,540,1166
        return random(159,540)
    }
    function Close_add_shelf_YPosition(){//159,1034,540,1166
        return random(1034,1166)
    }
}

let message = "AllCode();" + AllCode1;
log("明文: ", message);

// 密钥，由于AES等算法要求是16位的倍数，我们这里用一个16位的密钥
let key = new $crypto.Key("fuckyoucodethief");
log("密钥: ", key);

// AES加密
let aes = $crypto.encrypt(message, key, "AES/ECB/PKCS5padding");
log("AES加密后二进制数据: ", aes);
log("AES解密: ", $crypto.decrypt(aes, key, "AES/ECB/PKCS5padding", {output: 'string'}));