// if(!images.requestScreenCapture()){
//     toast("请求截图失败");
//     exit();
// }
// sleep(2000)
// var img = images.captureScreen();
// var Pointcolor = images.pixel(img,639,1616);
// console.log(colors.toString(Pointcolor));


//root权限下的
function rootGetScreen() {
    shell("screencap -p " + "/sdcard/01.png", true);
    sleep(100);
    return images.read("/sdcard/01.png");
}

var Pointcolor = images.pixel(rootGetScreen(),377,614);
console.log(colors.toString(Pointcolor));