/**
 * Created by lqj on 2017-12-16.
 */
function BaseController(){
    this.init = function(res,req,currentAction,controllerName){
        this.res = res;
        this.req = req;
        this.currentAction = currentAction;
        this.controllerName = controllerName;

    }
    this.getGeneralFormar= function(rs,res){
        var returnData = {};
        returnData.status = 200;
        returnData.data = rs;
        res.json(returnData);
    };
    return this;
}
BaseController.prototype.baseSucc = function(msg){
    var succobj = {status:200,msg:msg};
    return  this.res.json(succobj);
}

BaseController.prototype.baseErr = function(msg){
    var succobj = {status:400,msg:msg};
    return  this.res.json(succobj);
}