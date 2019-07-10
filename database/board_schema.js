var Schema={};
Schema.createSchema=function(mongoose){
    console.log('createSchema 호출됨');
    
    var BoardSchema=mongoose.Schema({
        writer:{type:String},
        userid:{type:String},
        title:{type:String},
        contents:{type:String,default:'글 작성'},
        comments:[{
            name:String,
            memo:String,
            date:{type:Date,default:Date.now}
        }],
        count:{type:Number,default:0},
        date: {type:Date,default:Date.now},
        updated:[{
            contents:String,
            date:{type:Date,default:Date.now}
        }]
    });
    console.log('board schema 정의함');
    
    return BoardSchema;
}

module.exports=Schema;