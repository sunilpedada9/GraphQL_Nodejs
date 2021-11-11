exports.pagination=(page,limit)=>{
    if(page==1){
        var offset=0;
        var limit=limit?limit:3;
        return {limit:limit,offset:offset};
    }
    var limit=limit?limit:3;
    var offset=page-1*limit;
    return {limit:limit,offset:offset};
}