var express = require('express');
var router = express.Router();
var Usermodel = require("../model/User")
var md5  = require("md5")
var GoodsModel = require("../model/Goods")
var multiparty = require('multiparty');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//前台主页面
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//h后台登录页面
router.get('/admin', function(req, res, next) {
  res.render('admin-Login', {});
});
//后台管理admin登录页面
router.post('/adminAction', function(req, res, next) {
  	var username = req.body.username;
  	var pwd = req.body.pwd;
  	var result = {
  		code : 1,
  		massage :"登录成功"
  	}
  	Usermodel.find({username:username},function(err,docs){
			if(docs.length==0){
  				result.code=-10;
  				result.massage = "用户名不存在"
  			}else if(docs[0].pwd == pwd){
  				
  			}else{
  				result.code=-101;
  				result.massage = "请检查用户名或者密码"
  			}
  			res.json(result)
		});
});

//进入后台，加载页面
router.get('/admin-index', function(req, res, next) {
  res.render('admin-index', {});
});

//进入后台，main页面
router.get('/main-shop', function(req, res, next) {
  res.render('main-shop', {});
});
router.post('/admin-main1', function(req, res, next) {
  res.render('main-shop', {});
});


//进入后台，addgoods页面

router.get('/addgoods', function(req, res, next) {
  res.render('addgoods', {});
});
//后台添加商品，addgoods页面


router.post('/api/addgoodsAction', function(req, res, next) {
 		var form = new multiparty.Form({
    	uploadDir: "public/images"
    })
 			var result = {
			code: 1,
			message: "商品信息保存成功"
		};
    form.parse(req, function(err, fields, files) {
    	var goodname = fields.goodname[0]
    	var cargo = fields.cargo[0]
    	var brand = fields.brand[0]
    	var myprice = fields.myprice[0]
    	var waiprice = fields.waiprice[0]
    	var goodsimg = (files.goodsimg[0].path).replace("public\\","")
    	var inventory = fields.inventory[0]
    	var sales = fields.sales[0]
//  	console.log(goodname)
    	var gm = new GoodsModel();
    	gm.goodname = goodname;
    	gm.cargo = cargo;
    	gm.brand = brand;
    	gm.myprice = myprice;
    	gm.waiprice= waiprice;
    	gm.goodsimg = goodsimg;
    	gm.inventory = inventory;
    	gm.sales = sales;	
    	gm.save(function(err){
    		if(err){
    			result.code = -1000;
    			result.message = "商品信息保存失败"
    		}
    		res.json(result)
    	})
   	});
});

//后台商品管理页面 实时更新
router.get('/updatagoods', function(req, res, next) {
//	GoodsModel.find({}, 
//		function (err, docs) {
//			res.json(docs)
//	});
		var pageIndex = parseInt(req.query.pageIndex);
		console.log("第"+pageIndex+"页的几个数据")
		var query = GoodsModel.find({});
		query.count({},function(err, count){
//			console.log(count)
			query.skip(pageIndex).limit(5).exec('find', function(err, items) {
				console.log(count)
				var result = {
					pageindex: count,
					items: items,
				}
			res.json(result);
//			console.log(items)
			});
			
		});
		
});


//删除商品
router.post('/removegoods', function(req, res, next) {
	var result = {
			code: 1,
			message: "商品删除失败"
		};
	console.log(req.body.p)
		GoodsModel.remove({goodname:req.body.goodId}, function (err,docs) {
			if(!err){
				result.code = -444;
    		result.message = "商品删除成功"
			}
			res.json(result)
		});
});


//更新商品
router.get('/updatagoods-index', function(req, res, next) {
res.render('updatagoods-index', {});
});

router.get('/updata-addgoods', function(req, res, next) {
	GoodsModel.find({goodname:req.query.goodIdp}, function (err,docs) {

			res.json(docs)
		});
});

router.post('/updata-addgoods-add', function(req, res, next) {
	var form = new multiparty.Form({
    	uploadDir: "public/images"
    })
 			var result = {
			code: 1,
			message: "商品信息更新成功"
		};
    form.parse(req, function(err, fields, files) {
    	var goodname = fields.goodname[0]
    	var cargo = fields.cargo[0]
    	var brand = fields.brand[0]
    	var myprice = fields.myprice[0]
    	var waiprice = fields.waiprice[0]
    	var goodsimg = (files.goodsimg[0].path).replace("public\\","")
    	var inventory = fields.inventory[0]
    	var sales = fields.sales[0]
//  	console.log(goodname)
    	GoodsModel.update({goodname:goodname},{$set:{cargo:cargo}},function(err){
    		if(err){
    			result.code = -1000;
    			result.message = "商品信息更新失败"
    		}
    		res.json(result)
    	})
   	});
});

//router.get('/updatagoods-index', function(req, res, next) {
//	GoodsModel.find({}, 
//		function (err, docs) {
//			res.json(docs)
//	});
//});
//
//
//
//
//router.post('/updatagoods', function(req, res, next) {
//	var result = {
//			code: 1,
//			message: "商品更新失败"
//		};
//	console.log(req.body.goodId)
//		GoodsModel.updata({goodname:req.body.goodId}, function (err,docs) {
//			
//			
//			var goodname = fields.goodname[0]
//  	var cargo = fields.cargo[0]
//  	var brand = fields.brand[0]
//  	var myprice = fields.myprice[0]
//  	var waiprice = fields.waiprice[0]
//  	var goodsimg = (files.goodsimg[0].path).replace("public\\","")
//  	var inventory = fields.inventory[0]
//  	var sales = fields.sales[0]
////  	console.log(goodname)
//  	var gm = new GoodsModel();
//  	gm.goodname = goodname;
//  	gm.cargo = cargo;
//  	gm.brand = brand;
//  	gm.myprice = myprice;
//  	gm.waiprice= waiprice;
//  	gm.goodsimg = goodsimg;
//  	gm.inventory = inventory;
//  	gm.sales = sales;	
//  	gm.save(function(err){
//  		if(err){
//  			result.code = -1000;
//  			result.message = "商品信息保存失败"
//  		}
//  		res.json(result)
//  	})
//		});
//});
//
//router.get('/uppage', function(req, res, next) {
//		var pageIndex = req.query.pageIndex;
//		var query = GoodsModel.find({});
//query.count({},function(err, count) {
//	
//});
//query.skip(pageIndex).limit(5).exec('find', function(err, items) {
//	res.json(items)
//});
//});




//模糊查
router.get('/list', function(req, res, next) {
	var condition = req.query.condition;

	GoodsModel.count({goodname: {$regex: condition}}, function(err, count){
		var query = GoodsModel.find({goodname: {$regex: condition}})
		query.exec(function(err, docs){
			console.log(err, docs);
			var result = {
				total: count,
				data: docs,
			}
			res.json(result);
		});
	})
});



module.exports = router;
