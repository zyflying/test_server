/**
 * Created by lqj on 2017-12-13.
 */

const log4js = require("log4js");

log4js.configure("./log4js-config");


var getLogger = function(category){

    return log4js.getLogger(category||'default');
}
//var useLogger = function(app,logger=log4js.getLogger('default')){
//    app.use(log4js.connectLogger(logger,{
//        format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'//自定义输出格式
//    }));
//}
var useLogger = function(logCategory){
    var logger = getLogger(logCategory);
    return log4js.connectLogger(logger,{format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'});
}

var log4jsConfig = {
    getLogger,
    useLogger
};
module.exports = log4jsConfig;