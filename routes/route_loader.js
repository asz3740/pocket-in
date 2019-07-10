/**
 * 라우팅 모듈을 로딩하여 설정
 * 
 * 라우팅 모듈 파일에 대한 정보는 config.js의 route_info 배열에 등록함
 *
 * @date 2016-11-10
 * @author Mike
 */

var route_loader = {};

var config = require('../config/config');
var multer=require('multer');
var fs=require('fs');
var static=require('serve-static');
var path=require('path');

var storage=multer.diskStorage({
    destination:'/uploads'/*function(req,file,callback){
        callback(null,'uploads')
    }*/,
    filename:function(req,file,callback){
        callback(null,file.originalname)
        //callback(null,file.name)
    }
});

var upload=multer({
    storage:storage,
    limits:{
        files:10,
        fileSize:1024*1024*1024
    }
});

route_loader.init = function(app, router) {
	console.log('route_loader.init 호출됨.');
	initRoutes(app, router);
};

// config파일의 route_info에 정의된 라우팅 정보 처리
function initRoutes(app, router) {
	var infoLen = config.route_info.length;
	console.log('설정에 정의된 라우팅 모듈의 수 : %d', infoLen);
 
	for (var i = 0; i < infoLen; i++) {
		var curItem = config.route_info[i];
			
		// 모듈 파일에서 모듈 불러옴
		var curModule = require(curItem.file);
		console.log('%s 파일에서 모듈정보를 읽어옴.', curItem.file);
		
		//  라우팅 처리
		if (curItem.type == 'get') {
            router.route(curItem.path).get(curModule[curItem.method]);
		} else if (curItem.type == 'post') {
            console.log('route post');
            if(curItem.method=='images'||curItem.method=='siteinsert'||curItem.method=='siteupdate'){ //이미지 저장하는 함수인 경우
                console.log('route post2');
                //file이 비어 있으면 continue...?
                router.route(curItem.path).post(upload.array('bookmarkImg',1),curModule[curItem.method]);
                console.log(router.route(curItem.path).post(upload.array('bookmarkImg',1),curModule[curItem.method]));
                console.log('route post3');
            }else{
                router.route(curItem.path).post(curModule[curItem.method]);
            }
		} else {
			router.route(curItem.path).post(curModule[curItem.method]);
		}
		console.log('라우팅 모듈 [%s]이(가) 설정됨.', curItem.method);
	}
    // 라우터 객체 등록
    app.use('/', router);
}

module.exports = route_loader;