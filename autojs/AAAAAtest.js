if(id("like_icon").exists()){
        if(random(0,100) <= 10){//10%的点赞率
            log("点赞")
            sleep(500)
            let boundsclickX = id("like_icon").findOne().bounds().centerX();//906,783,1074,951
            //let boundsclickY = id("like_icon").findOne().bounds().centerY();
            //Y值会出现负数,自己定义一个吧 - 仅限1920x1080
            console.hide();
            click(boundsclickX, random(833,901));
            console.show();
        }
}