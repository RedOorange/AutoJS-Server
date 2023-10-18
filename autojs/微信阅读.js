AllCode();
function AllCode(){
    //全局变量
    var WXwebsite = "https://kg0319180040-1316423525.cos.ap-nanjing.myqcloud.com/index.html?upuid=636145";

    log("开始执行微信阅读脚本")
    if(!images.requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }

    app.launchApp("微信");
    sleep(5000);
    
    //点击查找
    if(id("gsl").findOne()){
        log("成功找到右上角放大镜");
        WaitaMoment();
        id("gsl").click();
    }

    setClip(WXwebsite);

    sleep(5000);

    //点击搜索框
    if(className("android.widget.RelativeLayout").depth(10).findOne()){
        log("成功找到搜索框")
        WaitaMoment();
        className("android.widget.RelativeLayout").depth(10).click();
        setText([0],WXwebsite)
        
        sleep(5000);

        if(id("m94").findOne()){
            log("成功找到搜索按钮")
            WaitaMoment();
            var Img1Position = id("m94").findOne().bounds();
            click(Img1Position.centerX(), Img1Position.centerY())
        }
    }

    log("等待访问网页出现")
    WaitaMoment();
    //这个地方有时候不会出现访问网页

    if(className("android.view.View").text("访问网页").findOne()){
        log("成功找到访问网页");
        WaitaMoment();
        className("android.view.View").text("访问网页").click()
    }

    log("等待开始阅读出现")
    WaitaMoment();

    if(className("android.view.View").text("开始阅读").findOne()){
        log("成功找到开始阅读");
        WaitaMoment();
        className("android.view.View").text("开始阅读").click()
    }

    for(var i = 1; i <= 30; i++){//连续执行三十次判断
        WaitaMoment();
        if(id("publish_time").exists()){
            log("文章时间存在");
            back();
        }else{
            log("没有检测到文章");
        }
        log("第" + i + "次执行完毕");
    }

    log("微信阅读脚本执行完毕");


    //延时执行函数
    function WaitaMoment(){
        for(let i = 0; i <= 4; i++){
            log((5-i) + "秒后执行");
            sleep(1000);
        }
    }
}

//给WaitaMoment()写一个时间传入，让它暂停多久就暂停多久