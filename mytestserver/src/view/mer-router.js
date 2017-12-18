/**
 * Created by lqj on 2017-12-16.
 */

var express = require("express");
var merRouter = express.Router();

merRouter.get("/",function(req,res,next){
    res.render('index1', { title1: 'Expreadsfsdafdfsadfsadfsass' });
});
module.exports = merRouter;