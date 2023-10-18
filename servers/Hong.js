"ui";
ui.layout(//我希望按钮永远居中,两边的贴着就好
        <vertical bg="#F2F2F2">
            <vertical>
                <text gravity="center" w="*" h="200px" bg="#E3A869" textColor="white" textSize="40sp">宏骑士</text> 
            </vertical>

            <vertical h="1400px" id="ScrollBar">
                <scroll >
                    <vertical>
                        <horizontal marginTop="20px">
                            <text gravity="center" w="*">打开无障碍服务,弹窗权限,前台服务权限即可运行.音量上键关闭运行</text> 
                        </horizontal>

                        <horizontal gravity="center">
                            <Switch id="autoService" text="无障碍服务" checked="false" textSize="15sp"/>
                        </horizontal>

                        <horizontal marginTop="150px" bg="#FFFFFF" h="270px" marginLeft="50px" marginRight="50px">
                            <text bg="#FF8652" h="*" w="20px"></text>
                            <vertical marginLeft="50px">
                                <horizontal>
                                    <text id="C" text="微信阅读"  w="auto" h="auto" textColor="red" textSize="25sp" marginTop="20px"/>
                                    <checkbox id="WXYDCheck" marginTop="10px"></checkbox>
                                </horizontal>
                                <horizontal>
                                    <text>第</text><input id="WXYDSort" text="1" inputType="number"/><text>个运行</text>
                                    <text textSize="30sp" marginLeft="30px" marginTop="10px">|</text>
                                    <text marginLeft="30px">尽量每天只运行一次</text>
                                </horizontal>
                            </vertical>
                        </horizontal>

                        <horizontal marginTop="150px" bg="#FFFFFF" h="270px" marginLeft="50px" marginRight="50px">
                            <text bg="#FF8652" h="*" w="20px"></text>
                            <vertical marginLeft="50px">
                                <horizontal >
                                    <text id="A" text="七猫小说"  w="auto" h="auto" textColor="red" textSize="25sp" marginTop="20px"/>
                                    <checkbox id="QMXSCheck" marginTop="10px"></checkbox>
                                </horizontal>
                                <horizontal>
                                    <text>第</text><input id="QMXSSort" text="2" inputType="number"/><text>个运行</text>
                                    <text textSize="30sp" marginLeft="30px" marginTop="10px">|</text>
                                    <text marginLeft="30px">运行</text><input id="QMXSRunTime" text="60" inputType="number"/><text>分钟</text>
                                </horizontal>
                            </vertical>
                        </horizontal>

                        <horizontal marginTop="150px" bg="#FFFFFF" h="270px" marginLeft="50px" marginRight="50px">
                            <text bg="#FF8652" h="*" w="20px"></text>
                            <vertical marginLeft="50px">
                                <horizontal>
                                    <text id="B" text="快手小说"  w="auto" h="auto" textColor="red" textSize="25sp" marginTop="20px"/>
                                    <checkbox id="KSXSCheck" marginTop="10px"></checkbox>
                                </horizontal>
                                <horizontal>
                                    <text>第</text><input id="KSXSSort" text="3" inputType="number"/><text>个运行</text>
                                    <text textSize="30sp" marginLeft="30px" marginTop="10px">|</text>
                                    <text marginLeft="30px">运行</text><input id="KSXSRunTime" text="60" inputType="number"/><text>分钟</text>
                                </horizontal>
                            </vertical>
                        </horizontal>

                        


                        <horizontal marginTop="150px" marginLeft="50px" marginRight="50px">
                            <text>本应用基于无障碍功能开发,服务于残障人士,如有侵权,请联系作者删除</text> 
                        </horizontal>
                    </vertical>
                </scroll>
            </vertical>
            
            <vertical h="400px">
                        <horizontal>
                            <button id="UpDate" text="软件更新"  w="auto" h="auto" layout_weight="1"/>
                            <input id="CPW" layout_weight="2" text="" hint="请输入卡密" inputType="number" gravity="center"/>
                            <button id="Start" text="开始运行"  w="auto" h="auto" layout_weight="1"/>
                        </horizontal>
            </vertical>
        </vertical>
);

activity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);//启动UI不弹出输入法

var array100 = [];//放执行脚本的数组
var array101 = [];
var CardPassword = "";
var storage = storages.create("ABCDEGHIGK");//本地存储
var content = storage.get("CPW");//取出
var height = device.height;
var WXYDCode = 0;
var AndroidId = device.getAndroidId();
var key = new $crypto.Key("fuckyoucodethief");

function ChangeWXYDCode(){
    return WXYDCode = 1;
}

if(content){
    ui.CPW.setText(content);
}

ui.autoService.on("check",function(checked){
    if(checked){
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }else{
        auto.service.disableSelf();
        toast("关闭无障碍服务将无法运行")
    }
})

ui.Start.click(function() {
    console.log("开始按钮已点击")
    var content = ui.CPW.text();//本地存储
    storage.put("CPW", content)//放入
    
    var QMXSObject = {Name : "七猫小说", Runtime : ui.QMXSRunTime.text(), Check : ui.QMXSCheck.checked, Sort : ui.QMXSSort.text(), JB:"QMXSJB"}
    var KSXSObject = {Name : "快手小说", Runtime : ui.KSXSRunTime.text(), Check : ui.KSXSCheck.checked, Sort : ui.KSXSSort.text(), JB:"KSXSJB"}
    var WXYDObject = {Name : "微信阅读", Check : ui.WXYDCheck.checked, Sort : ui.WXYDSort.text(), JB:"WXYDJB"}

    CheckObject(QMXSObject);//如果参数全部正确,即加入数组队列
    CheckObject(KSXSObject);
    CheckObject(WXYDObject);

    for (let i = 0; i < array100.length; i++) {//数组队列排队调整
        for (let j = 0; j < i; j++) {
            if (array100[j].Sort > array100[i].Sort) {
                const temp = array100[j]
                array100[j] = array100[i]
                array100[i] = temp
            }
        }   
    }

    //按照队列顺序进行执行
    threads.start(function() {
        //先执行微信脚本
        for(var i = 0; i < array100.length; i++){
            log("执行脚本队列,正在执行队列中第" + (i+1) +"个")
            
            //微信脚本因为没有运行时间,比较特殊,单独写一个判断,等待执行完毕
            if(array100[i].JB == "WXYDJB"){
                var WXYDJBDoing = eval(array100[i].JB)
                var WXYDZX = WXYDJBDoing();
                while(WXYDCode !== '1'){//需要写一个判断,如果Code = 1也就是微信脚本执行完成,那么就进入下一步,思路:判断当前有几个正在运行的脚本,一般就是UI一直在运行,然后就剩app脚本,app脚本运行完成则总共运行仅剩1个
                    log(engines.all().length);//返回当前所有正在运行的脚本的脚本引擎ScriptEngine的数组。如果在执行两个,那么就是2
                    if(engines.all().length == "1"){
                        WXYDCode = '1';//执行完毕
                    }
                }
            }
            else{
                var JBDoing = eval(array100[i].JB)
                var RunTime = JBDoing();
                sleep(RunTime*60000 + 3000);
            }
            log(array100[i].Name+"已执行完毕")
        }
    })
}) 

function QMXSJB(){
    CardPassword = ui.CPW.text();
        var RunTime = ui.QMXSRunTime.text();
            var webGet = http.get("http://192.168.43.146:8888/download/QMXS1.0.js?" + CardPassword + "%" + AndroidId);

            //log(webGet);
                    
            log("code = " + webGet.statusCode);
                
                    //存放代码
            var JSfile = webGet.body.string();
                    
                    //运行代码文件
            log("开始运行脚本")

                //运行脚本会脱离主线程存在
            var QMXSZX = engines.execScript("QMXS", JSfile,{
            });

            log("睡眠前")
            sleep(RunTime*60000);
            log("睡眠后")
            QMXSZX.getEngine().forceStop()
            
    return RunTime;
}

function KSXSJB(){
    CardPassword = ui.CPW.text();
       var RunTime = ui.KSXSRunTime.text()
        log(RunTime);
            http.get("http://192.168.43.35:8888/download/KSXS1.0.js?" + CardPassword + "%" + AndroidId, {}, function(res, err){
                if(err){
                    log(err);
                    console.error("与服务器的连接出现错误,请重试");
                    return;
                }
                    
                log("code = " + res.statusCode);

                    //存放代码
                var JSfile = res.body.json();

                log(JSfile)

                JSfile = $crypto.decrypt(JSfile, key, "AES/ECB/PKCS5padding", {output: 'string'});

                log(JSfile)
                    
                    //运行代码文件
                log("开始运行脚本")
                var KSXSZX = engines.execScript("KSXS", JSfile);
                

                log("睡眠前")
                sleep(RunTime*60000);
                log("睡眠后")
                KSXSZX.getEngine().forceStop()
            });
    return RunTime;
}

//微信阅读没有执行时间,执行完成就返回
function WXYDJB(){ 
    CardPassword = ui.CPW.text();
    var HuiDiao1 = "1";
    http.get("http://192.168.43.146:8888/download/WXYD1.0.js?" + CardPassword, {}, function(res, err){//要连接服务器,默认线程执行
        if(err){
            console.error("与服务器的连接出现错误,请重试");
            return;
        }
                 
        log("code = " + res.statusCode);
             
        var JSfile = res.body.string();
        
        HuiDiao1 = JSfile;
    });
    

    //下面的代码运行要比上面的http请求里面的快, 使用sleep进行一个等待,等HuiDiao改变
    log("进行5秒等待")
    sleep(5000)
    var receive = HuiDiao1
    var WXYDZX = engines.execScript("WXYD", receive); //这种类型的脚本执行也是在线程中进行操作的,想要有个准确的判断,最好设置等待,确保脚本开始执行
    log("进行5秒等待,等待脚本开始执行");//需要让脚本先开始跑,否则没开始执行就做判断,会显示只有1个脚本在运行,
    sleep(5000)
}

function CheckObject(param){
    //输入框已经限制仅可输入数字\不能为空,下面需要判断 1.运行顺序数字不能有重复 

    log("检查勾选情况中")

    if(param.Check){//复选框
        log(param.RunTime);
        if(param.RunTime == "" || param.Sort == ""){
            log("勾选的程序应填写参数!")
            return;
        }
        array100.push(param);
        log("已经添加了" + array100.length +"个脚本在执行队列中")
    }
}

ui.UpDate.click(function(){
    app.openUrl("https://wwci.lanzouo.com/b03jy8i4h密码:8888");
})

























