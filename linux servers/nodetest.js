//此代码可以进行文件传输,成功传送了hello.txt文件,但是文件路径应该有误,需要研究一下
var fs = require('fs');
var http = require("http");
var mysql = require("mysql");
var MySQLCode = 0;
var ResNum = 0;//当服务器启动是,request执行的次数

var MySQLconnection = mysql.createConnection({
    host:"192.168.43.35",//主机IP
    port:3306,//端口号
    user:"mrshc",//用户名
    password:"!Wshcstc2003120o",//密码
    database:"card"//数据库名
})

//启动连接MySQL
MySQLconnection.connect();
 
//http://192.168.43.146:8888/download/QMXS1.0.js?" + CardPassword + "%" + AndroidId

const server = http.createServer((request, response) => {
    ResNum += 1;
    console.log("get请求执行了" + ResNum + "次");

    //先获取请求的URL后面的卡密,如果卡密正确再执行下面的内容
    var UrlAll = request.url; // /download/QMXS1.0.js?卡密

    var CardPassword = UrlAll.substring(UrlAll.lastIndexOf('?') + 1).slice(0,6);//CardPassword提取成功 187543

    var AndroidId = UrlAll.substring(UrlAll.lastIndexOf('%') + 1);//提取安卓ID

    //先判断卡密是否存在

    var Code1 = "select 1 from test where cardP = " + CardPassword + " limit 1;";//定义一个指令:查询这个卡密是否存在

    MySQLconnection.query(Code1, function(error, result){
        if(error) throw error;
        var CheckCode = result;
        MySQLCode = Object.keys(CheckCode).length//Object.keys(变量).length返回对象里面的内容,有几个就返回几个
    })

    //再判断卡密所对应的安卓号是否为空

    var Code2 = "select phone from test where cardP = '" + CardPassword + "';";//根据卡密查其对应安卓号

    var Code3 = "UPDATE test SET phone = '" + AndroidId + "' WHERE cardP = '" + CardPassword + "';";//绑定安卓号(新卡密未绑定安卓号)

    MySQLconnection.query(Code2, function(error, result){
        if(error) throw error;   
        var AnID = JSON.parse(JSON.stringify(result))[0].phone;
        console.log(AnID);

        //如果为空,将安卓号加入,开始执行代码
        if(AnID == ""){//此情况测试成功
            console.log("AnID为空");
            //将数据库设置
            MySQLconnection.query(Code3, function(error, result){
                if(error) throw error; 
                console.log(result);
            })
        }else{//如果不为空,判断是否相等,不相等报错,相等执行
            if(AndroidId == AnID){
                console.log("卡密正确,设备唯一,可以继续执行");
            }else{//此情况还未测试
                throw error;
            }
        }
    })
    
    console.log(MySQLCode);

    //判断是否是卡密
    if(MySQLCode == 1){//后续接入数组或者数据库
        // 获取请求下载的URL
        var JBName = UrlAll.substring(UrlAll.lastIndexOf('/') + 1,UrlAll.lastIndexOf('?'));
        console.log(JBName)

            // 如果是下载文件的URL，则判断进行处理
        if (JBName === 'QMXS1.0.js') {//这个download只是说网页链接是这个，并不是指

            // 创建可读流，读取当前项目目录下的hello.txt文件
            var rs = fs.createReadStream(__dirname + "/" + JBName);
            // 设置响应请求头，200表示成功的状态码，headers表示设置的请求头
            response.writeHead(200, {
                'Content-Type': 'application/json',
                //'Content-Disposition': 'attachment; filename=' + JBName
            });
            // 将可读流传给响应对象response
            rs.pipe(response);
        }

        if (JBName === 'KSXS1.0.js') {
            var rs = fs.createReadStream(__dirname + "/" + JBName);
            response.writeHead(200, {
                'Content-Type': 'application/json',
                //'Content-Disposition': 'attachment; filename=' + JBName
            });
            rs.pipe(response);
        }

        if (JBName === 'WXYD1.0.js') {
            var rs = fs.createReadStream(__dirname + "/" + JBName);
            response.writeHead(200, {
                'Content-Type': 'application/json',
                //'Content-Disposition': 'attachment; filename=' + JBName
            });
            rs.pipe(response);
        }
    }else{
        response.writeHead(100);
    }
})

 
server.listen(8888, function () {
    console.log("服务器启动成功，可以通过 8888端口 来进行访问");
});

//http://192.168.43.146:8888/download/QMXS1.0.js