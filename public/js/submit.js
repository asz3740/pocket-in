function submitContents(option) {
    var title = $('#title').val();
    var contents = $('#contents').val();
    console.log(title,',',contents);
    //var password = $('#pw').val();
    if(option == 'add') {
        // 새 글 등록 시
        if(title == '' || contents == '') {
            alert("제목과 내용이 있어야합니다.");
            return;
        } else {
            $('#writeAction').submit();
        }
    }
}