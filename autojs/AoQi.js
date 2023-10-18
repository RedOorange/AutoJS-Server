function GameStart(){
    //拿第一个技能
    click(459,427)
    //拿第二个技能
    click(819,422)
    //点击确定
    click(787,771)
}

Main();

function Main(){
    for(var i=0;i<=10;i++){
        GetCard();
    }
}

function GetCard(){
    let Iamge1 = rootGetScreen();
    let 指令1颜色 = images.findColor(Iamge1, "#ff01ffff",{//第一个呈蓝色的指令370,331 #ff01ffff
        region:[365,326,5,5],
    });
    let 指令2颜色 = images.findColor(Iamge1, "#ff15ffff",{//392,457 #ff15ffff
        region:[387,452,5,5],
    });
    let 指令3颜色 = images.findColor(Iamge1, "#ff00ffff",{//377,614 #ff00ffff
        region:[372,609,5,5],
    });
    if(指令1颜色||指令2颜色||指令3颜色){
        console.log("指令判断为蓝色,继续摸牌");
        press(1131,455,50);//摸牌位置1166,458
    }
    sleep(1000);
}
    














//截图函数
function rootGetScreen() {
    console.log("截图中");
    shell("screencap -p " + "/sdcard/01.png", true);
    sleep(100);
    return images.read("/sdcard/01.png");
}