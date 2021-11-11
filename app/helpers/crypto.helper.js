const crypto=require('crypto');

exports.rendomString=(size=10)=>{
    var date=Date.now();
    var rand=crypto
            .randomBytes(size)
            .toString('hex')
            .slice(0,size);
    return date+rand;
}