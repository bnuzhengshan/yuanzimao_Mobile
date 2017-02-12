  var bt=baidu.template;



  $(function () {

      shadowEffect();
      renderAllDate();
      renderCate();

      function renderAllDate() {
          getAllData(function (data) {
             var html=bt('singleApp',data);
              $('#wrapper').html(html);
              copyClipboard();
              QRHandleller();
          })
      }

      function QRHandleller() {
          var allSpan =$('.arrow').find('span');
          for(var i=0; i<allSpan.length;i++){
              allSpan[i].onclick=function () {
                  layerShow(this);
                  layerUpdate(this);
              }
          }

      }
      function renderCate() {
          var cateAll= $('#nav');
          $(cateAll).click(function (e) {
              var e=e||e.event;
              var target=e.target;
              var requiredCate=$(cateAll).find('.firstLi').html();
              getCateData(function (data) {
                  var html=bt('singleApp',data);
                  $('#wrapper').html(html);
                  copyClipboard();
                  QRHandleller();
              },requiredCate)
          })
      }

    function layerUpdate(ele) {
        var layerTitle= $('#title');
        var  qrCode  =$('#qrCode');
         var target=$(ele).parent().parent();
        var title= $(target).attr('appname');
        var  qrUrl =$(target).attr('qrurl');
        $(layerTitle).html(title);
        $('#qrCode').attr('src',qrUrl);
    }
      function layerShow() {
          var  displayQR= $('#displayQR');
          var layer= $('#layer');
          $(displayQR).show();
          layer.css('display','block');
          layer.click(function () {
              console.log(111);
              var  displayQR= $('#displayQR');
              $(this).hide();
              displayQR.hide();
          })
          // $('html,body').animate({scrollTop: '0px'}, 100);//因为页面很长，有纵向滚动条，先让页面滚动到最顶端，然后禁止滑动事件，这样可以使遮罩层锁住整个屏幕
          // $('#bg').bind("touchmove",function(e){
          //     e.preventDefault();
          // });
      }

      function copyClipboard() {
          var clipboard = new Clipboard('.showQR');
          clipboard.on('success', function(e) {
           var  msg= $('.text').find('.msg'),
               tips= $('.text').find('.tips');
              msg.html('您已成功复制此微信小程序名称')
              tips.html('请打开微信->发现->小程序->搜索小程序 粘贴您的结果！')
              e.clearSelection();
          });

          clipboard.on('error', function(e) {
              var  msg= $('.text').find('.msg'),
                  tips= $('.text').find('.tips');
              msg.html('请手动复制此小程序名称，或使用其他设备扫描上方二维码');
              tips.html('小程序打开方式:首先打开微信->发现->小程序->搜索小程序')
          });
      }

      function shadowEffect() {
          var layer=document.createElement("div");
          var yuanzimao_code=$('#yuanzimao_code');
          var  displayQR= $('#displayQR');
          var  closeBtn= $('#close')
          $(layer).css({
              width:'100%',
              height:'100%',
              position:'fixed',
              top:'0',
              left:'0',
              backgroundColor:'#000',
              zIndex:'999',
              opacity:'0.6',
              display:'none'
          })
          $(layer).attr('id','layer');
          $('body').append(layer);
          yuanzimao_code.on('click',function () {
              $(displayQR).toggle({
                  duration:300
              });
              var layer= $('#layer');
              layer.css('display','block');
          })
          closeBtn.on('click',function () {
              $(displayQR).hide();
              var layer= $('#layer');
              layer.css('display','none');
          })
      }
  })