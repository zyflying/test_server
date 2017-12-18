/**
 * Created by lqj on 2017-12-14.
 */

var fs = require("fs");
var url = require("url");
var path =require('path');

var _controllers = {};

var showInfo = function(req,res,next){
    //if(req.body){
    //    __logger_info__.info("body++"+req.body.testname);
    //}
    //res.cookie("textname", "123123");
    //__logger_info__.info("cookies++"+req.cookies);
    //__logger_info__.info("query++"+req.query.testname);
    //__logger_info__.info("pargram++"+req.param("testname"));
    __logger_info__.info("pargrams++"+req.params.testname);
    return next();
}


var use = function (func) {
    this.middlewares.push(func);
}

var genFunction = function* (){
    var me =this;
    for(var i=0,j=me.middlewares.length;i<j;i++){
        yield  me.middlewares[i]();
    }
}

var handlerMiddlewares = function(next){

    var me = this;

    var gentest = me.genFunction();
    function gentestHandler(){
        var genEnd =gentest.next();
        if(!genEnd.done){
            gentestHandler();
        }else{
            next();
        }
    }
    gentestHandler();
}

var getActions = function(dir,filename){
    __logger_info__.info(filename);
    filename = filename.replace('.js',"").toLowerCase();
    var filePath = "./../../"+path.join(dir,filename).replace(/\\/g,"/");
    var control = require(filePath);
    if(typeof control != "function")
        return;
    if(control.constructor.name=="GeneratorFunction"){
        true;
    }
    var controlObj = new control;
    TestMiddleware.controllers[filename] = controlObj;
    //TestMiddleware.controllers.push(controlObj);
}

var getRouters = function(dir){
    //__logger_info__.info(dir);
    fs.readdir(dir,function(err,names){
        if(err) __logger_error__.error(err);
        for(var i=0,j=names.length;i<j;i++){
            //__logger_info__.info(names[i]);
            if(names[i].search(".js")!=-1){
                getActions(dir,names[i]);
            }else{
                getRouters(path.join(dir,names[i]));
            }
        }
    });
}

var testConfig = function(dir,req,res,next){

    getRouters(dir);
}

var handleReq = function(){

    return function handlerReqDetail(req,res,next){
        //handlerMiddlewares(next);

        var rurl = url.parse(req.url);
        var query = req.query;
        var controller = req.params.controller;
        var action = req.params.action;
        next();
    }
}

exports = module.exports = TestMiddleware =  {
    showInfo:showInfo,
    middlewares:[],
    controllers:_controllers,
    use:use,
    genFunction:genFunction,//这才是正确的
    testConfig:testConfig,
    handleReq:handleReq,
    //genFunction:genFunction(),//这种方式创建，genFunction调用是被模块调用的，而不是被TestMiddleware调用
    handlerMiddlewares:handlerMiddlewares
}
TestMiddleware.use(function(req,res,next){
    __logger_error__.error("TestMiddleware use method");
});