function dateFormatChange(date){
    var option={
        weekday:'short',year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'
    };
    return date.toLocaleTimeString('ko-KR',option);
}