var replyadd=function(req,res){
    console.log('replyadd 호출됨');
    var database=req.app.get('database');
    var contentid=req.body.contentid;
    var reply=req.body.reply;
    console.log('글 id:%s 댓글내용:%s',contentid,reply);
    database.BoardModel.findOne({_id:contentid},function(err,results){
        if(err){throw err;}else{console.log('글 찾음');}
        results.comments.unshift({name:'글쓴이',memo:reply});
        results.save(function(err){
            if(err){throw err;}
            else{
                console.log('댓글 추가');
                res.redirect('back');
                //res.render('contentread',{reply:reply});
            }
        });
    });
}

var replyPage=function(req,res){
    console.log('replyPage 호출됨');
    var database=req.app.get('database');
    var id=req.query.id;
    var page=req.query.page;
    var max=req.query.max;
    var skipSize=(page-1)*5;//현 페이지보다 앞에 있는 글 skip
    var limitSize=5;//한 페이지에 출력할 총 댓글 수
    console.log(id,page,max,'%d,%d',skipSize,limitSize);

    database.BoardModel.findOne({_id:id},{comments:{$slice:[skipSize,limitSize]}},function(err,pageReply){
        if(err) throw err;
        console.log('founded',pageReply);
        res.send(pageReply);
    });
}

var replymodify=function(req,res){
    console.log('replymodify 호출됨');
    var database=req.app.get('database');
    var contentid=req.query.contentid;
    var replyid=req.query.replyid;
    console.log('id:',contentid,',', replyid);
    database.BoardModel.findOne({_id:contentid},{comments:{$elemMatch:{_id:replyid}}},function(err,reply){
        if(err) throw err;
        console.log(reply);
        res.send(reply.comments);
       // console.log(reply[0].comments);
       // res.send({reply:reply[0].comments});
    });
}

var replymodified=function(req,res){
    console.log('replymodified 호출됨');
    var database=req.app.get('database');
    var mongoose=require('mongoose');
    var contentid=req.query.contentid;
    var replyid=req.query.replyid;
    var modifiedtext=req.query.modifiedtext;
    console.log(mongoose.Types.ObjectId(contentid),',',replyid,',',modifiedtext,':',typeof modifiedtext);
    //database.BoardModel.find({_id:contentid})
    database.BoardModel.findOneAndUpdate(
        {_id:contentid,comments:{$elemMatch:{_id:replyid}}},
        {$set:{"comments.$.memo":modifiedtext}},//comments에서 검색된 원소의 memo에다가 수정된 글 넣기.
        function(err,results){
            if(err) throw err;
            console.log(results);
            if(results){
                database.BoardModel.find({_id:contentid},function(err,reply){
                    if(err) throw err;
                    console.log('reply after modifying',reply[0].comments);
                    res.send({reply:reply[0].comments});
                });
            }
    });
/*database.BoardModel.findOneAndUpdate(
    {_id:contentid},//1. 글 찾기
    {$set:{"comments.$[elem].memo":modifiedtext}},//해당 배열 요소의 memo에 값 쓰기
    {arrayFilters:[{"elem._id":replyid}],new:true},//2. 배열의 요소 중 id 일치하는 것 찾기
    function(err,modified){
        if(err) throw err;
        console.log('modified',modified);
        //console.log('modified',modified.comments);
        res.send({reply:modified.comments});
});*/
}
var replydelete=function(req,res){
    console.log('replydelete 호출됨');
    var database=req.app.get('database');
}
module.exports.replyadd=replyadd;
module.exports.replyPage=replyPage;
module.exports.replymodify=replymodify;
module.exports.replymodified=replymodified;
module.exports.replydelete=replydelete;