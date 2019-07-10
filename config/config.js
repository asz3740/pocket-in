
/*
 * 설정
 */

module.exports = {
	server_port: 3001,
	db_url: 'mongodb://localhost:27017/NodePro',
	db_schemas: [
	    {file:'./board_schema', collection:'boards', schemaName:'BoardSchema', modelName:'BoardModel'},

	],
    //file:실행파일 path:route경로 method:함수이름 type:get or post #get, post 잘못 쓰면 인식 못함
    //nav 페이지 이동은 type:'get'으로.
	route_info: [
        {file:'./board',path:'/process/boardfind',method:'boardfind',type:'get'},
        {file:'./content',path:'/process/contentwrite',method:'contentwrite',type:'post'},
        {file:'./content',path:'/process/contentwriteform',method:'contentwriteform',type:'get'},
        {file:'./content',path:'/process/contentread',method:'contentread',type:'get'},
        {file:'./content',path:'/process/contentmodify',method:'contentmodify',type:'get'},
        {file:'./content',path:'/process/contentmodified',method:'contentmodified',type:'get'},
        {file:'./content',path:'/process/contentdelete',method:'contentdelete',type:'get'},
        {file:'./content',path:'/process/contentsearch',method:'contentsearch',type:'get'},
        {file:'./content',path:'/process/search',method:'search',type:'get'},
        //댓글
        {file:'./reply',path:'/process/reply',method:'replyadd',type:'post'},
        {file:'./reply',path:'/process/replypage',method:'replyPage',type:'get'},
        {file:'./reply',path:'/process/replymodify',method:'replymodify',type:'get'},
        {file:'./reply',path:'/process/replymodified',method:'replymodified',type:'get'},
        {file:'./reply',path:'/process/replydelete',method:'replydelete',type:'get'}
	],
	facebook: {		// passport facebook
		clientID: '196604394366966',
		clientSecret: '5401f32b378a3c464f12edadb04b768e',
        callbackURL: '/auth/facebook/callback',
        profileFields:['emails','name','id']

	},
}