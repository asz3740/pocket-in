/*function changePage(page){
    console.log('changePage');
    $.get('/process/replypage?id='+contents._id+'&page='+page+'&max='+contents.comments.length',
         function(replyList){
        var output='';
        for(var i=0;i<replyList;i++){
            output+='<div class="reply_comment"><div class="reply_info">'+replyList[i].name+'/'+dateFormatChange(replyList[i].date)+'</div>';
            +'<div class="reply_text">'+replyList[i].memo.replace(/\\r\\n/gi,"")+'</div></div>';
        }
        $('.reply_list').html(output);
    });
}*/