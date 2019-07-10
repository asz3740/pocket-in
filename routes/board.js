var boardfind=function(req,res){//게시판의 전체 글 보기.
    var database=req.app.get('database');
    console.log('boardfind 호출됨');
    var page=req.query.page;//사용자가 클릭한 페이지 번호
    console.log('%d page',page);
    if(page==null||page==undefined){page=1;}
    var skipSize=(page-1)*10;
    var limitSize=10;
    var pageNum=1;
    database.BoardModel.count({},function(err,count){
        pageNum=Math.ceil(count/limitSize);//전체 글 수 / 한 페이지 당 보여줄 글 수
        database.BoardModel.find({}).sort({date:-1})//최신순
                                 .skip(skipSize)//현재 페이지 앞부분 스킵
                                  .limit(limitSize)//한 페이지당 몇개의 글
                                .exec(function(err,results){
            res.render('board',{contents:results,pages:pageNum});
        });
    });
}
module.exports.boardfind=boardfind;
