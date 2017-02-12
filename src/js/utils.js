

function getAllData(cb) {
    $.ajax({
        url:'http://api.yuanzimao.com/miniapp/all_app',
        method:'GET',
        dataType:'json',
        success:function (data) {
           cb(data);
        }
    })
}

function getCateData(cb,cate) {
    var  cateAll={};
    cateAll.cate=cate;
    $.ajax({
        url:'http://api.yuanzimao.com/miniapp/appcate',
        data:cateAll,
        method:'POST',
        dataType:'json',
        success:function (data) {
            cb(data);
        }
    })
}