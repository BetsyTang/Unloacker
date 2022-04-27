var pdfUrl = "";
var puname = "";
var pulist = ""; 

(function(params) {

  var old_id = $('.opern_name').attr('data-oid');
  var new_opern_id = $('.opern_name').attr('data-id');
  
  var audio = new ChongAudio();
  var pid = "";
  
  var mySwiper1;
  var mySwiper2;
  //ä¹è°±æ˜¾ç¤ºæ¨¡å¼
  var puType = "0";
	
  //é»˜è®¤æ’­æ”¾é€Ÿåº¦
  var speed = 1.0;
  var isVip = "1";
  var has_buy = "0";
  var is_pay = '1';
  
  var pulist = "";
  var price = "0.0";
  var user_balance = "0.0";
  var balance_list = "";
  var viplist = "";
  
  var torder_id;
  var torderType;
  
  var balance_type_index = 0;
  var balance_paytype_data = "3";
  
  var vip_type_index = 0;
  var vip_paytype_data = "3";
  
  var newWindow = '';
  var newH5Window = '';
  
  var comment_page = 1;
  var comment_timer;
  
  var is_show_wechat_code = 0;
  
  var audition_longtime = 0;
  
  var adv_time = null; //appå¼•å¯¼å¼¹çª—å®šæ—¶å™¨
  var adv_time_ai = null; //appå¼•å¯¼å¼¹çª—å®šæ—¶å™¨
  
  var currencyCodeList = []; //è´§å¸åˆ—è¡¨
  var couponList = null; //ä¼˜æƒ åŠµåˆ—è¡¨
  
  var is_lock_num = 0;
  
  var initw = $('.swiper-pattern').width();
  
  $('.opern-detail a').removeClass("download-btn");
  
  window.addEventListener('message',function(event){
      if(event.data.message == "onPlayerInited"){   
    	  //åˆå§‹åŒ–å®Œæˆ
    	  if($('#ai-score')[0]){
    		  newWindow = $('#ai-score')[0].contentWindow;
    		  setSpeedNumber();
    	  }
    	  
    	  if(isMobile() && $('#ai-score-h5')[0]){
    		  newH5Window = $('#ai-score-h5')[0].contentWindow;
    		  setSpeedNumberH5();
    	  }
    	  
    	  //ç»“æŸloading
    	  $('.opern-detail .music-play').removeClass('loading');
    	  $('.play_botton_ai').show();
    	  $('.audio_loading').hide();
    	  $('.audio_loading_ai').hide();
      }else if(event.data.message == "yes-close"){
    	  is_show_wechat_code = 0;
    	  setCookie('yes_close', 1);
    	  $('.wechat-code').hide();
      }else if(event.data.message == "close"){
    	  $('.wechat-code').hide();
    	  $('.login-iframe').hide();
      }else if(event.data.message == "down_app"){
    	  var tmp_opern_id = $('.opern_name').attr('data-oid');
    	  loadInstall()
      }else if(event.data.message == "down_app_ipad"){
    	  window.location.href = 'https://apps.apple.com/cn/app/id1080634885';
      }else if(event.data.method == "onUpdateState"){
    	  //audio.pause(); 
    	  
    	  if(event.data.data && event.data.data.data.inited == 2){
    		  //åˆå§‹åŒ–å®Œæˆ
        	  if($('#ai-score')[0]){
        		  newWindow = $('#ai-score')[0].contentWindow;
        		  setSpeedNumber();
        	  }
        	  
        	  if(isMobile() && $('#ai-score-h5')[0]){
        		  newH5Window = $('#ai-score-h5')[0].contentWindow;
        		  setSpeedNumberH5();
        	  }
        	  
        	  //ç»“æŸloading
        	  $('.opern-detail .music-play').removeClass('loading');
        	  $('.play_botton_ai').show();
        	  $('.audio_loading').hide();
        	  $('.audio_loading_ai').hide();
    	  }
      }else if(event.data.message == "reload"){
    	  window.location.reload();
      }
  }, false);
  
  if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
	  addhit(2000000)
  }
  
  $('.search').click(function (e) {
	  addhit(2000001)
  })
  $('#type-switch').click(function (e) {
	e.stopPropagation();
	/*if(this.innerText != "å›¾ç‰‡æ¨¡å¼" && this.innerText != "AIæ¨¡å¼"){
		console.log(this.innerText);
		return;
	}*/
    
    $(this).toggleClass('active');
    swiperInit();
    $('#line-spectrum-box').toggleClass('active');
    
    audio.stop(); 
    
    $('#audio_play').css('display', 'block');
	$('#audio_pause').css('display', 'none');
	
    if(this.innerText == "å›¾ç‰‡æ¨¡å¼"){
    	puType = "1";
    	
    	$('.audio_ai_utils').css('display','flex');
    	$('.audio_mp3_utils').css('display','none');
    }
    else if(this.innerText == "AIæ¨¡å¼"){
    	puType = "0";
    	$('.audio_ai_utils').css('display','none');
    	$('.audio_mp3_utils').css('display','flex');
    	
    	 if(newWindow.Player.isPlayerReady()){
			  newWindow.Player.resetPlay();
		  }
    }
  });
  swiperInit();
  function swiperInit(params) {
	  mySwiper1 = new Swiper('#scoreSwiper', {
		  loop: false,
		  autoplay: false,
		  observer: true,
		  observeParents: true,
      // paginationClickable: true,
    });
	  
	 console.log('----------------');
	 console.log(mySwiper1);
	 
    $('#siwper1-prev').click(function (params) {
    	if(is_show_wechat_code == 1){
			$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/wechatCodePopup.html?v1.2"></iframe>');
    		//$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.4"></iframe>');
    		return;
		}
    	
    	if(!identity.getUid()){
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
			return;
		}
    	
    	if(price > 0 && !identity.getIsVip() && has_buy != '1'){
    	    vip();
  		    return;
  	    }
    	
    	var index = $('.opern-detail .tool-tab-box-page span:eq(0)').text();
    	if(isNaN(mySwiper1.activeIndex) && index != ''){
    		index = index;
    	}else{
    		index = mySwiper1.activeIndex+1;
    	}
    	
    	$('.opern-detail .tool-tab-box-page span:eq(0)').text(index);
    	mySwiper1.swipePrev();
    });
    $('#siwper1-next').click(function (params) {
    	if(is_show_wechat_code == 1){
			$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/wechatCodePopup.html?v1.2"></iframe>');
    		//$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.4"></iframe>');
    		return;
		}
    	
    	if(!identity.getUid()){
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
			return;
		}
    	
    	if(price > 0 && !identity.getIsVip() && has_buy != '1'){
    	    vip();
  		    return;
  	    }
    	
    	var index = $('.opern-detail .tool-tab-box-page span:eq(0)').text();
    	if(isNaN(mySwiper1.activeIndex) && index != ''){
    		index = index;
    	}else{
    		index = mySwiper1.activeIndex+1;
    	}
    	
    	$('.opern-detail .tool-tab-box-page span:eq(0)').text(index);
    	mySwiper1.swipeNext();
    });
    $('.tab-left').click(function (params) {
    	if(is_show_wechat_code == 1){
			$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/wechatCodePopup.html?v1.2"></iframe>');
    		//$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.4"></iframe>');
    		return;
		}
    	
    	if(!identity.getUid()){
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
			return;
		}
    	
    	if(price > 0 && !identity.getIsVip() && has_buy != '1'){
    	    vip();
  		    return;
  	    }
    	
    	var index = $('.opern-detail .tool-tab-box-page span:eq(0)').text();
    	if(isNaN(mySwiper1.activeIndex) && index != ''){
    		index = index;
    	}else{
    		index = mySwiper1.activeIndex+1;
    	}
    	
    	$('.opern-detail .tool-tab-box-page span:eq(0)').text(index);
    	mySwiper1.swipePrev();
    });
    swiperInit2();
    function swiperInit2(params) {
    	mySwiper2 = new Swiper('#scoreSwiper2', {
  		  loop: false,
  		  autoplay: false,
  		  observer: true,
  		  observeParents: true,
        // paginationClickable: true,
      });
      $('#siwper1-prev2').click(function (params) {
      	if(!identity.getUid()){
      		$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
  			return;
  		}
      	
      	var index = $('.opern-detail .tool-tab-box-page span:eq(0)').text();
      	if(isNaN(mySwiper2.activeIndex) && index != ''){
      		index = index;
      	}else{
      		index = mySwiper2.activeIndex+1;
      	}
      	
      	if(index <= 1){
      		$('#siwper1-next2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-right01.png');
      		$('#siwper1-prev2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-left01-no.png');
      	}else if(index > 1 && index < mySwiper2.slides.length){
      		$('#siwper1-next2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-right01.png');
      		$('#siwper1-prev2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-left01.png');
      	}else if(index >= mySwiper2.slides.length){
      		$('#siwper1-next2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-right01-no.png');
      		$('#siwper1-prev2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-left01.png');
      	}
      	
      	$('.opern-detail .tool-tab-box-page span:eq(0)').text(index);
      	mySwiper2.swipePrev();
      });
      $('#siwper1-next2').click(function (params) {
      	if(!identity.getUid()){
      		if(isMobile()){
      			$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
      		}else{
      			$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
      		}
  			return;
  		}
      	
      	if(price > 0 && !identity.getIsVip() && has_buy != '1'){
      		$("body").append('<iframe class="login-iframe" src="/sheetplayer/vip_remind.html?v1.0"></iframe>');
    		return;
      	}
      	
      	if(is_lock_num == 1){
	    	$("body").append('<iframe class="wechat-code" src="/sheetplayer/code.html?v1.0"></iframe>');
			return
	    }
      	
      	var index = $('.opern-detail .tool-tab-box-page span:eq(0)').text();
      	if(isNaN(mySwiper2.activeIndex) && index != ''){
      		index = index;
      	}else{
      		index = mySwiper2.activeIndex+1;
      	}
      	
      	if(index <= 1){
      		$('#siwper1-next2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-right01.png');
      		$('#siwper1-prev2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-left01-no.png');
      	}else if(index > 1 && index < mySwiper2.slides.length){
      		$('#siwper1-next2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-right01.png');
      		$('#siwper1-prev2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-left01.png');
      	}else if(index >= mySwiper2.slides.length){
      		$('#siwper1-next2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-right01-no.png');
      		$('#siwper1-prev2').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/siwper-left01.png');
      	}
      	
      	$('.opern-detail .tool-tab-box-page span:eq(0)').text(index);
      	mySwiper2.swipeNext();
      });
      $('.tab-left').click(function (params) {
      	if(is_show_wechat_code == 1){
  			$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/wechatCodePopup.html?v1.2"></iframe>');
      		//$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.4"></iframe>');
      		return;
  		}
      	
      	if(!identity.getUid()){
  			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
  			return;
  		}
      	
      	if(price > 0 && !identity.getIsVip() && has_buy != '1'){
      	    vip();
    		    return;
    	    }
      	
      	var index = $('.opern-detail .tool-tab-box-page span:eq(0)').text();
      	if(isNaN(mySwiper2.activeIndex) && index != ''){
      		index = index;
      	}else{
      		index = mySwiper2.activeIndex+1;
      	}
      	
      	$('.opern-detail .tool-tab-box-page span:eq(0)').text(index);
      	mySwiper2.swipePrev();
      });
    }
    $('.tab-right').click(function (params) {
    	if(is_show_wechat_code == 1){
			$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/wechatCodePopup.html?v1.2"></iframe>');
    		//$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.4"></iframe>');
    		return;
		}
    	
    	if(!identity.getUid()){
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
			return;
		}
    	
    	if(price > 0 && !identity.getIsVip() && has_buy != '1'){
    	    vip();
  		    return;
  	    }
    	
    	var index = $('.opern-detail .tool-tab-box-page span:eq(0)').text();
    	if(isNaN(mySwiper1.activeIndex) && index != ''){
    		index = index;
    	}else{
    		index = mySwiper1.activeIndex+1;
    	}
    	
    	$('.opern-detail .tool-tab-box-page span:eq(0)').text(index);
    	mySwiper1.swipeNext();
    });
  }
  
  $('.defalut.set_meal_list li').click(function (e) {
    e.stopPropagation();
    var _value = $(this).data('money');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('#balance_moneyNum').html(_value);
    
    balance_type_index = $(this).data('index');
    if(balance_list.length>0){
    	placeOrderForWallet(balance_list[balance_type_index].balance_id,balance_paytype_data);
    }
  });

  $('.vip.set_meal_list li').click(function (e) {
    e.stopPropagation(); 
    var _value = $(this).data('money');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    
    vip_type_index = $(this).data('index');
    setPayPrise();
    
    if(viplist.length>0 && vip_paytype_data != 1003){
    	placeOrderForVip(viplist[vip_type_index].vip_id,vip_paytype_data);
    }
    
    if(vip_type_index != 0 || (vip_paytype_data != 3 && vip_paytype_data != 2)){
    	$('.coupon').hide();
    	$('.payment').css('margin-top', '1.2rem');
    }else{
    	if(couponList){
    		$('.coupon').show(); 
    		$('.payment').css('margin-top', '.366667rem');
    	}
    }
  });

  $('.icon.close').click(function (e) {
    e.stopPropagation();
    close();
  });
  $('.icon.close1').click(function (e) {
    e.stopPropagation();
    close();
  });
  $('.tips_box_more').click(function (params) {
      $(this).toggleClass('active')
      if ($(this).hasClass('active')) {
          $(this).prev().css('-webkit-line-clamp', 'inherit')
          $(this).prev().css('ine-clamp', 'inherit')
          $(this).children('span').html('æ”¶èµ·')
      } else {
          $(this).prev().css('-webkit-line-clamp', '2')
          $(this).prev().css('ine-clamp', '2')
          $(this).children('span').html('å±•å¼€')
      }
  })
  function close(){
	  $('.dialog_box').removeClass('show');
	    
	    boxType = "";
	    
	    balance_list = "";
	    viplist = "";
	    
	    balance_type_index = 0;
	    balance_paytype_data = "3";
	    
	    vip_type_index = 0;
	    vip_paytype_data = "3";
	    
	    clearTimeout(animate1);
	    isCloseTime = false;
  }
  
  $('.deflut.payment_type li').click(function (e) {
    var arrow1 = $('#triangle');
    e.stopPropagation();
    var _value = $(this).data('value');
    $(this).siblings().removeClass('active ');
    $(this).addClass('active');
    if (_value == 'wx') {
        arrow1.css('top', '0.35rem');
        balance_paytype_data = "3";
        $('.balance_qr_code').css('display','initial');
        $('.balance_pay_paypal').css('display','none');
    } else if (_value == 'zfb') {
    	balance_paytype_data = "2";
        arrow1.css('top', '1.15rem');
        $('.balance_qr_code').css('display','initial');
        $('.balance_pay_paypal').css('display','none');
    } else if (_value == 'PayPal') {
        arrow1.css('top', '2rem');
        vip_paytype_data = "1001";
        $('.vip_qr_code').css('display','none');
        $('.vip_pay_unipin').css('display','none');
        $('.vip_pay_paypal').css('display','initial');
        orderstatetime = 60;
  	  clearTimeout(animate1);
  	  isCloseTime = false;
    } else if (_value == 'UniPin') {
        arrow1.css('top', '2.44rem'); 
        vip_paytype_data = "1003";
        $('.vip_qr_code').css('display','none');
        $('.vip_pay_paypal').css('display','none');
        $('.vip_pay_unipin').css('display','inline-block');
    }
    
    if(balance_list.length>0){
    	placeOrderForWallet(balance_list[balance_type_index].balance_id,balance_paytype_data);
    }
  });
  $('.vip.payment_type li').click(function (e) {
    var arrow1 = $('#vip_triangle');
    e.stopPropagation();
    var _value = $(this).data('value');
    $(this).siblings().removeClass('active ');
    $(this).addClass('active');
    
    if (_value == 'wx') {
      arrow1.css('top', '0.35rem');
      vip_paytype_data = "3";
      $('.vip_pay_paypal').css('display','none');
      $('.vip_pay_unipin').css('display','none');
      $('.vip_pay_unipin_currency').css('display','none');
      $('.vip_pay_unipin_text').css('display','none');
      $('.vip_qr_code').css('display','initial');
      $('.problem').css('display','inherit');
      setVipPrise('');
    } else if (_value == 'zfb') {
      arrow1.css('top', '1.15rem');
      vip_paytype_data = "2";
      $('.vip_pay_paypal').css('display','none');
      $('.vip_pay_unipin').css('display','none');
      $('.vip_pay_unipin_currency').css('display','none');
      $('.vip_pay_unipin_text').css('display','none');
      $('.vip_qr_code').css('display','initial');
      $('.problem').css('display','inherit');
      setVipPrise('');
    } else if (_value == 'PayPal') {
      arrow1.css('top', '2rem');
      vip_paytype_data = "1001";
      $('.vip_qr_code').css('display','none');
      $('.vip_pay_unipin').css('display','none');
      $('.vip_pay_unipin_currency').css('display','none');
      $('.problem').css('display','none');
      $('.vip_pay_paypal').css('display','initial');
      $('.vip_pay_unipin_text').css('display','block');
      setVipPrise('');
      orderstatetime = 60;
	  clearTimeout(animate1);
	  isCloseTime = false;
   } else if (_value == 'UniPin') {
      arrow1.css('top', '2.44rem');
      vip_paytype_data = "1003";
      $('.vip_qr_code').css('display','none');
      $('.vip_pay_paypal').css('display','none');
      $('.problem').css('display','none');
      $('.vip_pay_unipin').css('display','inline-block');
      $('.vip_pay_unipin_text').css('display','block');
      $('.vip_pay_unipin_currency').css('display','block');
      
      //è®¾ç½®è´§å¸
      setUnipinPayCurrencyCode();
    }
    
    setPayPrise();
    
    if(viplist.length>0 && vip_paytype_data != 1003){
    	placeOrderForVip(viplist[vip_type_index].vip_id,vip_paytype_data);
    }
    
    if(vip_type_index != 0 || (vip_paytype_data != 3 && vip_paytype_data != 2)){
    	$('.coupon').hide(); 
    	$('.payment').css('margin-top', '1.2rem');
    }else{
    	if(couponList){
    		$('.coupon').show(); 
    		$('.payment').css('margin-top', '.366667rem');
    	}
    }
  });
  
  function setUnipinPayCurrencyCode(){
	  var currency = '';
	  var getBalanceListApi = ccgt_domain + '/?urlparam=common/vip/unipinPayCurrencyCode';
	  $.ajax({
        type: "GET",
        dataType:"json",
        url: getBalanceListApi,
        data: {
        	service_type: 'ccgq',
        	platform:'web-ccgq',
        	service_uid: identity.getServiceUid(),
        	service_key: identity.getServiceKey(),
        	ccgq_uuid: identity.getCcgqUid(),
        	service_type: identity.getServiceType(),
        	uid: identity.getUid(),
        },
        success: function(res) {
            if(res.returnCode == '0000'){
            	currencyCodeList = res.list;
            	
            	$('#disabledSelect').empty();
            	for (var i=0;i<currencyCodeList.length;i++){
            		var item = res.list[i];
            		$('#disabledSelect').append("<option value='" +item.code+ "'>" +item.name+ "ï¼ˆ" +item.code+ "ï¼‰</option>");
            	}
            	
            	//é»˜è®¤é€‰ä¸­è´§å¸
            	var currency = currencyCodeList[0].code;
            	setVipPrise(currency);
            	setPayChannel(currency);
            	setPayPrise();
            }
            else{
            	isCloseTime = false;
            	$.message({
    		        message: res.returnMsg,
    		        type: 'error'
    		    });
            }
        }
      });
  }
  
  loadCollect()
  function loadCollect(){
	var uid = identity.getUid()
	if(!uid){
		return
	}
	
	var getOpernCollectApi = domain_str +'/home/user/getOpernCollect';
	$.ajax({
        type: "GET",
        dataType:"json",
        url: getOpernCollectApi,
        data: {
        	service_key: identity.getServiceKey(),
        	ccgq_uuid: identity.getCcgqUid(),
        	service_type: identity.getServiceType(),
        	uid: uid,
        	opern_id: new_opern_id,
			platform: 'web-ccgq',
        },
        dataType: 'json',
        success: function(res) {
            if(res.returnCode == '0000'){
            	if(res.datas.is_follow_collect == true){
            		$('.follow').css('background', '#CCCCCC')
            		$('.follow').text('å·²å…³æ³¨')
            	}else{
            		$('.follow').css('background', '#201f1c')
            		$('.follow').text('+ å…³æ³¨')
            	}
            	
            	if(res.datas.is_learning_collect == true){
            		$('#Collection').css('background-color', '#CCCCCC');
	        		$('#Collection .collect-label').text('å·²æ”¶è—');
	        		$('.Collection').addClass("no");
	        		$('.Collection .collect-label').html('å·²æ”¶è—');
	        		$('.play-collection').addClass('active');
	        		$('.play-collection').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/play-collection-active.png');
            	}else{
            		$('#Collection').css('background-color', '#FE7526');
	        		$('#Collection .collect-label').text('æ”¶è—');
	        		$('.Collection').removeClass("no");
	        		$('.Collection .collect-label').html('æ”¶è—');
	        		$('.play-collection').removeClass('active');
	        		$('.play-collection').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/play-collection.png');
            	}
            	
            	if(res.datas.is_download == true){
            		$('.play-down').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/play-down-active.png');
            	}else{
            		$('.play-down').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/play-down.png');
            	}
            }
        }
    });
  }
  
  loadUser()
  function loadUser(){
	var userid = $('.user-info-box .name p').attr('data-id')
	var userid = userid ? userid : $('.s-d-m-b-auther p').attr('data-id')
	var userid = parseInt(userid)
	if(!userid){
		return
	}

	var getUserApi = domain_str +'/home/user/stat';
	$.ajax({
        type: "GET",
        dataType:"json",
        url: getUserApi,
        data: {
        	userid: userid,
        	service_type: 'ccgq',
        	platform: 'web-ccgq',
        	ccgq_uuid: identity.getCcgqUid(),
        	uid: identity.getUid(),
        },
        dataType: 'json',
        success: function(res) {
            if(res.returnCode == '0000'){
            	$('.total_opren_num').text(res.datas.userinfo.total_opren_num)
            	$('.total_fans_num').text(res.datas.userinfo.total_fans_num)
            	$('.total_follow_num').text(res.datas.userinfo.total_follow_num)
            	$('.score_details_aside_box .name p').text(res.datas.userinfo.nickname)
            	$('.info_box .name a').text(res.datas.userinfo.nickname)
            	$('.score_details_h5_box .s_d_h_b_item5 .h5-title span').text(res.datas.userinfo.nickname + 'è¿˜ä¸Šä¼ äº†')
            	$('.score_details_aside_box .head-img img').attr('src', res.datas.userinfo.head_portrait_image)
            }
        }
    });
  }
  
  //æ”¶è— 
  $('#Collection').click(function(e){
	if(identity.getUid()){
		var text = $('.collect-label').text()
		if(text == 'æ”¶è—'){
			var collectApi = domain_str +'/cginfo/userinfo/usercollectionlearning'
		}else{
			var collectApi = domain_str +'/cginfo/userinfo/usercancelcollectionlearning'
		}
		
		var learning_id = $('.opern_name').attr('data-oid')
		if(!learning_id){
			$.message({
				message:'è¯¥è°±å­æ— æ•ˆ',
	        	type:'info'
			});
			return
		}
	
		$.ajax({
		    type: "GET",
		    dataType:"json",
		    url: collectApi,
		    data: {
		    	service_key: identity.getServiceKey(),
		    	ccgq_uuid: identity.getCcgqUid(),
		    	service_type: identity.getServiceType(),
		    	uid: identity.getUid(),
		    	learning_id: learning_id,
				platform: 'web-ccgq',
		    },
		    dataType: 'json',
		    success: function(res) {
		        if(res.returnCode == '0000'){
		        	var num = $('.collect-num').text()
		        	num = parseInt(num)
		        	if(text == 'æ”¶è—'){
		        		$('#Collection').css('background-color', '#CCCCCC');
		        		$('#Collection .collect-label').text('å·²æ”¶è—')
		        		$('.collect-num').text(num+1)
		        	}else{
		        		$('#Collection').css('background-color', '#FE7526');
		        		$('#Collection .collect-label').text('æ”¶è—')
		        		if(num-1 > 0){
		        			$('.collect-num').text(num-1)
		        		}else{
		        			$('.collect-num').text(0)
		        		}
		        	}
		        }else{
		        	$.message({
		                message:res.returnMsg,
		                type:'error'
		            });
		        }
		    }
		});
	  }
	else{
		if(isMobile()){
			$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
		}else{
			$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
		}
	}
  });
  
  //æ”¶è— 
  $('.opern-detail .Collection').click(function(e){
	if(identity.getUid()){
		var text = $('.Collection').text()
		
		if(text.indexOf("å·²æ”¶è—") >= 0) { 
			var collectApi = domain_str +'/cginfo/userinfo/usercancelcollectionlearning'
		}else{
			var collectApi = domain_str +'/cginfo/userinfo/usercollectionlearning'
		}
		
		var learning_id = $('.opern_name').attr('data-oid')
		if(!learning_id){
			$.message({
				message:'è¯¥è°±å­æ— æ•ˆ',
	        	type:'info'
			});
			return
		}
	
		$.ajax({
		    type: "GET",
		    dataType:"json",
		    url: collectApi,
		    data: {
		    	service_key: identity.getServiceKey(),
		    	ccgq_uuid: identity.getCcgqUid(),
		    	service_type: identity.getServiceType(),
		    	uid: identity.getUid(),
		    	learning_id: learning_id,
				platform: 'web-ccgq',
		    },
		    dataType: 'json',
		    success: function(res) {
		        if(res.returnCode == '0000'){
		        	
		        	var num = $('.collect-num').text()
		        	num = parseInt(num)
		        	
		        	if(text.indexOf("å·²æ”¶è—") >= 0) { 
		        		$('#Collection').css('background-color', '#FE7526');
		        		$('#Collection .collect-label').text('æ”¶è—')
		        		if(num-1 > 0){
		        			$('#Collection .collect-num').text(num-1)
		        		}else{
		        			$('#Collection .collect-num').text(0)
		        		}
		        	}else{
		        		$('#Collection').css('background-color', '#CCCCCC');
		        		$('#Collection .collect-label').text('å·²æ”¶è—')
		        		$('#Collection .collect-num').text(num+1)
		        	}
		        	
		        	var num = $('.Collection .collect-num').text()
		        	num = parseInt(num)
		        	
		        	if(text.indexOf("å·²æ”¶è—") >= 0) { 
		        		$('.Collection').removeClass("no")
		        		if(num-1 > 0){
		        			$('.Collection .collect-label').text('æ”¶è—')
			        		$('.Collection .collect-num').text(num-1)
		        		}else{
		        			$('.Collection .collect-label').text('æ”¶è—')
			        		$('.Collection .collect-num').text('')
		        		}
		        	} else {
		        		$('.Collection').addClass("no")
		        		$('.Collection .collect-label').text('å·²æ”¶è—')
		        		$('.Collection .collect-num').text(num+1)
		        	}
		        }else{
		        	$.message({
		                message:res.returnMsg,
		                type:'error'
		            });
		        }
		    }
		});
	  }
	else{
		if(isMobile()){
			$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
		}else{
			$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
		}
	}
  });
  
  //æ”¶è—
  $('.play-collection').click(function(e){
	if(identity.getUid()){
		if (!$('.play-collection').hasClass('active')) {
			var collectApi = domain_str +'/cginfo/userinfo/usercollectionlearning';
		}else{
			var collectApi = domain_str +'/cginfo/userinfo/usercancelcollectionlearning';
		}
		
		var learning_id = $('.opern_name').attr('data-oid');
		if(!learning_id){
			$.message({
				message:'è¯¥è°±å­æ— æ•ˆ',
	        	type:'info'
			});
			return;
		}
		
		$.ajax({
		    type: "GET",
		    dataType:"json",
		    url: collectApi,
		    data: {
		    	service_key: identity.getServiceKey(),
		    	ccgq_uuid: identity.getCcgqUid(),
		    	service_type: identity.getServiceType(),
		    	uid: identity.getUid(),
		    	learning_id: learning_id,
				platform: 'web-ccgq',
		    },
		    dataType: 'json',
		    success: function(res) {
		        if(res.returnCode == '0000'){
		        	if (!$('.play-collection').hasClass('active')) {
		        		$('.play-collection').addClass('active');
		        		$('.play-collection').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/play-collection-active.png');
		        		
		        		$.message({
			                message:'æ›²è°±å·²æ”¶è—ï¼Œå¯åˆ°ä¸ªäººä¸»é¡µæŸ¥çœ‹',
			                type:'success'
			            });
		        	}else{
		        		$('.play-collection').removeClass('active');
		        		$('.play-collection').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/play-collection.png');
		        		
		        		$.message({
			                message:'å·²å–æ¶ˆæ”¶è—ï¼ŒæŒ‰é’®çŠ¶æ€è¿˜åŽŸ',
			                type:'success'
			            });
		        	}
		        }else{
		        	$.message({
		                message:res.returnMsg,
		                type:'error'
		            });
		        }
		    }
		});
	}else{
		$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
	}
  });
  
  //å…³æ³¨
  $('.follow').click(function(e){
	  
	  if(identity.getUid()){
		  var text = $(this).text()
			if(text == 'å·²å…³æ³¨'){
				var collectApi = domain_str +'/home/user/delOneFollow'
			}else{
				var collectApi = domain_str +'/home/user/addOneFollow'
			}
			
			var urlParams = getUrlParamData()
			var uid_by = $('.user-info-box .name p').attr('data-id')
			var uid_by = uid_by ? uid_by : $('.s-d-m-b-auther p').attr('data-id')
			if(!uid_by){
				$.message({
					message:'è¯¥ç”¨æˆ·æ— æ•ˆ',
					type:'info'
				});

				return
			}
			
			$.ajax({
			    type: "GET",
			    dataType:"json",
			    url: collectApi,
			    data: {
			    	service_key: identity.getServiceKey(),
			    	ccgq_uuid: identity.getCcgqUid(),
			    	service_type: identity.getServiceType(),
			    	uid: identity.getUid(),
			    	uid_by: uid_by,
					platform: 'web-ccgq',
			    },
			    dataType: 'json',
			    success: function(res) {
			        if(res.returnCode == '0000'){
			        	if(text == 'å·²å…³æ³¨'){
			        		$('.follow').css('color', '#ffffff')
			        		$('.follow').css('background', '#201f1c')
			        		$('.follow').text('+ å…³æ³¨')
			        	}else{
			        		$('.follow').css('color', '#ffffff')
			        		$('.follow').css('background', '#CCCCCC')
			        		$('.follow').text('å·²å…³æ³¨')
			        	}
			        }else{
			        	$.message({
		        	        message:res.returnMsg,
		        	        type:'error'
		        	    });
			        }
			    }
			});
	  }
	  else{
		if(isMobile()){
			$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
		}else{
			$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
		}
	  }
  });
  
  //è½½å…¥è¯„è®º
  loadComment(comment_page)
  function loadComment(page){
	var page = page ? page : 1
	  
	var id = $('.opern_name').attr('data-oid')
  	var getCommentListbyIdApi = domain_str +'/pad/detail/getOpernDetailComment'
  	$.ajax({
          type: "GET",
          dataType:"json",
          url: getCommentListbyIdApi,
          data: {
          	service_key: identity.getServiceKey(),
          	ccgq_uuid: identity.getCcgqUid(),
          	service_type: identity.getServiceType(),
          	platform: 'web-ccgq',
          	uid: identity.getUid(),
          	pageindex: page,
          	pagesize: 20,
          	id: id,
          },
          dataType: 'json',
          success: function(res) {
              if(res.returnCode == '0000'){
              	  if(res.datas.list.length > 0){
              		  comment_page++;
              		  $('.comment_num').text(res.datas.total_count);
              	  }else{
              		  clearInterval(comment_timer)
              		  $('.more-box a').text('æ²¡æœ‰æ›´å¤šå†…å®¹äº†~');
              		  $('.more-box a').css('background-color', '#bcbcbc');
              	  }
              	  
              	  if(isMobile()){
              		res.datas.list = res.datas.list.length > 0 ? res.datas.list.slice(0,2) : [];
              	  }
              	  
              	  setCommentShowList(res.datas.list, true);
              }else{
            	  $.message({
	        	       message:res.returnMsg,
	        	       type:'error'
	        	  });
              }
          }
      });
  }
  
  //æ’­æ”¾
  $('.music-play').on('click', function () {
	  // å…³æ³¨å…¬ä¼—å·å¼¹çª—
	  if (!!window.ActiveXObject || "ActiveXObject" in window){
	  }else{
		  var yes_close = getCookie('yes_close');
		  if(yes_close != 1 && !isMobile() && !identity.getIsVip() && (has_buy != '1' || is_pay == '0')){
			  $("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/wechatCodePopup.html?v1.2"></iframe>');
			  //$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.4"></iframe>');
			  return;
		  }
	  }
	  
	  if(puType == "1"){//AIè°±æ¨¡å¼
		  if(!newWindow.Player){
		    $.message({
		      message:'AIæ›²è°±è¿˜åœ¨åŠ è½½ä¸­å“Ÿ~',
		      type:'warning'
		    });
			return  
		  }
		  
		  if(newWindow.Player.isPlayerReady()){
			  if(identity.getUid()){
		           if (identity.getIsVip()) {
		               newWindow.Player.setLocked(false);
		           }
		           else{
		               newWindow.Player.setLocked(true);
		           }
					
					//æ˜¯å¦æ­£åœ¨æ’­æ”¾
					  newWindow.Player.playOrPause();
					  if(newWindow.Player.isPlaying()){
						  
						  if(!identity.getIsVip()){
							  $.message({
							      message:'ä»…é™VIPä¼šå‘˜ä½¿ç”¨ï¼Œå¼€é€šVIPç•…äº«å…¨åœºAIè°±ç»ƒä¹ æ¨¡å¼',
							      type:'info'
							  });
						  }
						  
						  $('#audio_play').css('display', 'none');
						  $('#audio_pause').css('display', 'block');
					  }
					  else{
						  $('#audio_play').css('display', 'block');
						  $('#audio_pause').css('display', 'none');
					  }  
					  
					  
			  }
			  else{
				  newWindow.Player.setLocked(true);
				if(isMobile()){
					$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
				}else{
					$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
				}
			  }
		  }
	  }
	  else{
		  if(audio.isPalying){
			  audio.pause();
		  }
		  else{
			  audio.play(audition_longtime);
		  }
	  }
  });
  
  //åœæ­¢
  $('.music-stop').on('click', function () {
	  if(puType == "1"){//AIè°±æ¨¡å¼
		  if(newWindow.Player.isPlayerReady()){
			  $('#audio_play').css('display', 'block');
			  $('#audio_pause').css('display', 'none');
			  newWindow.Player.resetPlay();
		  }
	  }
	  else{
		  audio.stop();
	  }
  });
  
  //aiè°± - å·¥å…·æ  - å¾ªçŽ¯æ¨¡å¼
  $('#ai-cycle').click(function(e){
	  
	  if(newWindow.Player.isPlayerReady()){
		//æ˜¯å¦å¾ªçŽ¯
		  if(newWindow.Player.isLoopAll()){
			  newWindow.Player.setLoopAll(false);
			  $(this).attr("src","https://s201.lzjoy.com/public/web_static/images/score_details/loop.png");
			  $(this).find('img').attr("src","https://s201.lzjoy.com/public/web_static/images/score_details/loop.png");
		  }
		  else{
			  newWindow.Player.setLoopAll(true);
			  $(this).attr("src","https://s201.lzjoy.com/public/web_static/images/score_details/loop_no.png")
			  $(this).find('img').attr("src","https://s201.lzjoy.com/public/web_static/images/score_details/loop_no.png")
		  }  
	  }
  });
  
	//aiè°± - å·¥å…·æ  - èŠ‚æ‹å™¨å¼€å…³
	$('#ai-metronome').click(function(e){
	
		if(newWindow.Player.isMetronomeOn()){
			newWindow.Player.setMetronomeOn(false);
			$(this).attr("src","https://s201.lzjoy.com/public/web_static/images/score_details/metronome.png");
			$(this).find('img').attr("src","https://s201.lzjoy.com/public/web_static/images/score_details/metronome.png");
	  	}
		else{
			newWindow.Player.setMetronomeOn(true);
			$(this).attr("src","https://s201.lzjoy.com/public/web_static/images/score_details/metronome_no.png");
			$(this).find('img').attr("src","https://s201.lzjoy.com/public/web_static/images/score_details/metronome_no.png");
		}
	});
	
	//aiè°± - å·¥å…·æ  - è°ƒé€Ÿå‡
	$('#ai-speed-reduce').click(function(e){
		if(speed > 0.1){
			speed = operation.sub_p1(speed, 0.1); // åŠ 
			newWindow.Player.setSpeed(speed);
			setSpeedNumber();
		}
	});
	//aiè°± - å·¥å…·æ  - è°ƒé€ŸåŠ 
	$('#ai-speed-plus').click(function(e){
		if(speed < 2.0){
			speed = operation.add_p1(speed, 0.1); // åŠ 
			newWindow.Player.setSpeed(speed);
			setSpeedNumber();
		}
	});
	
	function setSpeedNumber(){
		speed = newWindow.Player.getSpeed();
		if(speed == '1'){
			speed = "1.0";
		}
		else if(speed == '2') {
			speed = "2.0";
		}
		$('.adjust-speed').find('p').html('x'+speed);
		$('.tool-tab-box-m-bak .tool-tab-box-page').html('x'+speed);
	}
	
	function setSpeedNumberH5(){
		speed = newH5Window.Player.getSpeed();
		if(speed == '1'){
			speed = "1.0";
		}
		else if(speed == '2') {
			speed = "2.0";
		}
		$('.adjust-speed').find('p').html('x'+speed);
	}
	
	//aiè°± - å·¥å…·æ  - åŒæ‰‹æ¨¡å¼
	$('#ai-bothhands').click(function(e){
		$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.5"></iframe>');
	});
	
	//aiè°± - å·¥å…·æ  - ç€‘å¸ƒæµ
	$('#ai-WaterfallFlow').click(function(e){
		$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.5"></iframe>');
		/*
		if(newWindow.Player.isMetronomeOn()){
			newWindow.Player.setMetronomeOn(false);
			$(this).find('img').attr("src","https://s201.lzjoy.com/public/web_static/images/score_details/piano.png");
	  	}
		else{
			newWindow.Player.setMetronomeOn(true);
			$(this).find('img').attr("src","https://s201.lzjoy.com/public/web_static/images/score_details/piano_no.png");
		}
		*/
	});
	
	//è´­ä¹°æ›²è°±
	$('.openbuy').click(function(){
		if(identity.getUid()){
			if(has_buy == "1" || identity.getIsVip()){
				$.message({
			        message: 'æ‚¨å·²æ‹¥æœ‰ä½¿ç”¨æœ¬ä¹è°±æƒé™ï¼Œå¯ç›´æŽ¥æ‰“å°æˆ–ä¸‹è½½ï¼',
			        type: 'warning'
			    });
			}
			else{
				
				var getBalanceListApi = ccgt_domain + "/?urlparam=" + 'home/user/InterfaceGetBalanceList';
				$.ajax({
			        type: "GET",
			        dataType:"json",
			        url: getBalanceListApi,
			        data: {
			        	service_type: 'ccgq',
			        	platform:'web-ccgq',
			        	service_uid: identity.getServiceUid(),
			        	service_key: identity.getServiceKey(),
			        	ccgq_uuid: identity.getCcgqUid(),
			        	service_type: identity.getServiceType(),
			        	uid: identity.getUid(),
			        },
			        success: function(res) {
			            if(res.returnCode == '0000'){
			            	//åˆ¤æ–­æ˜¯ä½™é¢ä¸è¶³
			            	user_balance = res.list.user_balance;
			        	    if(parseFloat(user_balance) < parseFloat(price) || user_balance == 0){
			        	    	$('.no-balance').show();
			        	    	recharge();
			        	    }else{
			        	    	buy();
			        	    }
			            }
			            else{
			            	isCloseTime = false;
			            	$.message({
			    		        message: res.returnMsg,
			    		        type: 'error'
			    		    });
			            }
			        }
			    });
			}
		}
		else{
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
		}
	});
	$('.openvip').click(function(){
		if(identity.getUid()){
			vip();
		}
		else{
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
		}
	});
	$('.openrecharge').click(function(){
		if(identity.getUid()){
			recharge();
		}
		else{
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
		}
	});

	function buy(){
		
		balance_list = "";
	    balance_type_index = 0;
	    balance_paytype_data = "3";
	    isCloseTime = false;
		
		initBalanceList('0');
		
		$('.buy-paypal-content').hide();
		$('.recharge_box').hide();
		$('.vip_recharge_box').hide();
		$('.buy_box').show();
		$('.dialog_box').addClass('show');
	}

	function vip(){
		if(!identity.getUid()){
    		$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			return;
		}
		
		if(isMobile()){
			window.location.href = "/sheetplayer/ccgq_h5.html";
			return;
		}
		
	    viplist = "";
	    vip_type_index = 0;
	    vip_paytype_data = "3";
	    isCloseTime = false;
	    
	    var userPhoto = identity.getUserphoto();
	    var userName = identity.getCcUsername();
	    
	    $('.account_photo').attr('src',userPhoto);
	    $('.account_number').text(userName);
	    if(identity.getIsVip()){
	    	$('.account_desc').text('æ‚¨çš„VIPå°†äºŽ'+identity.getVipDte()+'åˆ°æœŸï¼Œç”µè„‘ã€æ‰‹æœºã€ipadå‡å¯ä½¿ç”¨ï½ž');
	    }
	    else{
	    	$('.account_desc').text("è´­ä¹°VIPä¼šå‘˜ï¼Œç”µè„‘ã€æ‰‹æœºã€ipadå‡å¯ç•…äº«é«˜æ¸…AIä¹è°±ï½ž");
	    }
	    
		loadCourseVipList();
		
		$('.buy_box').hide();
		$('.buy-paypal-content').hide();
		$('.recharge_box').hide();
		$('.vip_recharge_box').show();
		$('.dialog_box').addClass('show');
		
		//é»˜è®¤é€‰ä¸­æ”¯ä»˜æ–¹å¼
		$('.vip_recharge_box .payment_type li').siblings().removeClass('active ');
		$('.vip_recharge_box .payment_type li:eq(0)').addClass('active');
		
		$('.vip_pay_paypal').css('display','none');
        $('.vip_pay_unipin').css('display','none');
        $('.vip_pay_unipin_currency').css('display','none');
        $('.vip_pay_unipin_text').css('display','none');
        $('.vip_qr_code').css('display','initial');
	}

	function recharge(){
		
		balance_list = "";
	    balance_type_index = 0;
	    balance_paytype_data = "3";
	    isCloseTime = false;
		
		initBalanceList('1');
		
		$('.buy_box').hide();
		$('.buy-paypal-content').hide();
		$('.vip_recharge_box').hide();
		$('.recharge_box').show();
		$('.dialog_box').addClass('show');
	}
	
	function payPayPal(){
		$('.buy_box').hide();
		$('.vip_recharge_box').hide();
		$('.recharge_box').hide();
		$('.buy-paypal-content').show();
		$('.dialog_box').addClass('show');
	}
	
	$('.vip_pay_paypal').click(function(e){
		var url = $(this).attr('data-vip-jump-url');
		window.open(url);
	});
	
	$('.balance_pay_paypal').click(function(e){
		if($(this).attr('data-balance-jump-url')) {
			payPayPal();
			payData($(this).attr('data-balance-orderNo'),balance_paytype_data);
        	getOrderState(torder_id,'balance');
        	addAnimate();
        	$('.buy-paypal-box').html("<iframe id='paypal-box-iframe' src="+ $(this).attr('data-balance-jump-url')+" frameborder='0'></iframe>");
		} else {
		}
	});
	
	//æ‰“å°
	$('.Printing').click(function(e){
		if (!!window.ActiveXObject || "ActiveXObject" in window){
			$.message({
	  	        message:'IEä¸æ”¯æŒæ‰“å°ï¼Œè¯·å‰å¾€APPæŸ¥çœ‹',
	  	        type:'warning'
	  	    });
			$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.5"></iframe>');
			return
		}
		
		// å…³æ³¨å…¬ä¼—å·å¼¹çª—
		if(is_show_wechat_code == 1){
			$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/wechatCodePopup.html?v1.2"></iframe>');
			//$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.4"></iframe>');
			return;
		}
		
		if(identity.getUid()){
			if (price > 0) {
                if (has_buy == "1" || identity.getIsVip()) {
                	printJS({printable: pulist, type: 'image',documentTitle:puname + " - è™«è™«é’¢ç´ç½‘ - æ‰¾æ›²è°± ä¸Šè™«é’¢"})
                } else {
                	vip();
          		    return;
                }
            } else {
            	printJS({printable: pulist, type: 'image',documentTitle:puname + " - è™«è™«é’¢ç´ç½‘ - æ‰¾æ›²è°± ä¸Šè™«é’¢"})
            }
		}
		else{
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
		}
	});
	
	//ä¸‹è½½
	$('.download').click(function(e){
		if(is_show_wechat_code == 1){
			$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/wechatCodePopup.html?v1.2"></iframe>');
			//$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.4"></iframe>');
			return;
		}
		
		//åˆ¤æ–­æ˜¯å¦ipadç‰ˆæœ¬ï¼Œå¦‚æžœæ˜¯ipadç‰ˆæœ¬ï¼Œåˆ™ç‚¹å‡»åŽè¿›å…¥appstoreã€‚å¯è°ƒç”¨ ccmusicAppStoreClick æ–¹æ³•
		if(identity.getUid()){
			if (price > 0) {
                if (has_buy == "1" || identity.getIsVip()) {
                	download_PuPdf();
                } else {
                	vip();
          		    return;
                }
            } else {
                if (pdfUrl) {
                	download_PuPdf();
                } else {
                    $.message({
                        message: 'è¯¥ä¹è°±æš‚æœªæä¾›PDFä¸‹è½½ï¼Œè¯·å°è¯•ä¸‹è½½å…¶ä»–ç‰ˆæœ¬',
                        type: 'info'
                    });
                }
            }
		}
		else{
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
		}
	});
	
	function download_PuPdf(){
		$("#down-pdf").attr('href',pdfUrl);
		$("#down-pdf").attr('download',puname + ".pdf");
		$("#down-pdf")[0].click();
	}

	//èŽ·å–é›¶é’±
	function initBalanceList(type){
		var getBalanceListApi = ccgt_domain + "/?urlparam=" + 'home/user/InterfaceGetBalanceList';
		$.ajax({
	        type: "GET",
	        dataType:"json",
	        url: getBalanceListApi,
	        data: {
	        	service_type: 'ccgq',
	        	platform:'web-ccgq',
	        	service_uid: identity.getServiceUid(),
	        	service_key: identity.getServiceKey(),
	        	ccgq_uuid: identity.getCcgqUid(),
	        	service_type: identity.getServiceType(),
	        	uid: identity.getUid(),
	        },
	        success: function(res) {
	            if(res.returnCode == '0000'){
	            	bindUBalance(res.list,type);
	            }
	            else{
	            	isCloseTime = false;
	            	$.message({
	    		        message: res.returnMsg,
	    		        type: 'error'
	    		    });
	            }
	        }
	    });
	}
	
	function bindUBalance(list,type){
		
		user_balance = list.user_balance;
		balance_list = list.list_balance;
		
		//è´¦æˆ·ä½™é¢
	    $('.buy_box .account_information').html('æˆ‘çš„è´¦æˆ·ä½™é¢ï¼š'+user_balance);
    	
	    if(parseFloat(user_balance) < parseFloat(price)){
    	    $('.buy_box .bottom .buy_paypal').html('é›¶é’±ä¸è¶³ åŽ»å……å€¼');
	    }
        
        for(var i = 0; i < balance_list.length; i++){
        	
        	if(i == balance_type_index){
			   $('.defalut.set_meal_list li:eq('+i+')').addClass("active");
		    }
		    else{
			   $('.defalut.set_meal_list li:eq('+i+')').removeClass("active");
		   }
        	
        	$('.defalut.set_meal_list li:eq('+i+')').attr('data-value', balance_list[i].balance_id);
        	$('.defalut.set_meal_list li:eq('+i+')').attr('data-money', balance_list[i].money);
        	$('.defalut.set_meal_list li:eq('+i+') p:eq(0)').text("Â¥"+balance_list[i].money);
        	$('.defalut.set_meal_list li:eq('+i+') p:eq(1)').text(balance_list[i].balance+"é›¶é’±");
        }
        
        $('#balance_moneyNum').text(balance_list[balance_type_index].money);
        
        if(type == '1'){
        	placeOrderForWallet(balance_list[balance_type_index].balance_id,balance_paytype_data);
        }
	}
	
	//å……å€¼ä¸‹å•
	function placeOrderForWallet(balance_id,paytype){
		
		var placeOrderApi = ccgt_domain + "/?urlparam=" + 'pad/order/placeOrder';
		$.ajax({
	        type: "GET",
	        dataType:"json",
	        url:placeOrderApi,
	        data: {
	        	service_type: 'ccgq',
	        	platform:'web-ccgq',
	        	service_uid: identity.getServiceUid(),
	        	service_key: identity.getServiceKey(),
	        	ccgq_uuid: identity.getCcgqUid(),
	        	service_type: identity.getServiceType(),
	        	uid: identity.getUid(),
	        	balance_id:balance_id,
	        	order_type:"rechange",
	        	payment_type:paytype,
	        },
	        success: function(res) {
	            if(res.returnCode == '0000'){
	            	if(paytype == "1001"){
	            		bindPlaceOrderInfo(res.order_id,paytype);
	            	}
	            	else{
	            		bindPlaceOrderInfo(res.list,paytype);
	            	}
	            }
	            else{
	            	isCloseTime = false;
	            	$.message({
	    		        message: res.returnMsg,
	    		        type: 'error'
	    		    });
	            }
	        }
	    });
	}
	
	function bindPlaceOrderInfo(list,paytype){
		var torder_id;

    	if(paytype == "1001"){
    		torder_id = list;
    		$('.balance_pay_paypal').attr('data-balance-jump-url', res.list.ApprovalLink);
    		$('.balance_pay_paypal').attr('data-balance-orderNo', torder_id);
    	}
    	else{
    		torder_id = list.order_id;
    		var payQRCode = list.qrcode;
    		$('.balance_qr_code').attr('src',payQRCode);
        	
        	payData(torder_id,balance_paytype_data);
        	getOrderState(torder_id,'balance');
        	
        	addAnimate();
    	}
    }
	
	//é›¶é’±æ”¯ä»˜
	function placeOrderForCoin(puid){
		
		layer.load(1, {
			  shade: [0.5,'#000']
			});
		
		var placeOrderApi = ccgt_domain + "/?urlparam=" + 'pad/order/placeOrder';
		$.ajax({
	        type: "GET",
	        dataType:"json",
	        url:placeOrderApi,
	        data: {
	        	service_type: 'ccgq',
	        	platform:'web-ccgq',
	        	service_uid: identity.getServiceUid(),
	        	service_key: identity.getServiceKey(),
	        	ccgq_uuid: identity.getCcgqUid(),
	        	service_type: identity.getServiceType(),
	        	uid: identity.getUid(),
	        	order_type:"opern",
	        	item_id:puid,
	        	extra:'[{"type_id":"0","value":["ä¸ªäºº"]},{"value":["éžç›ˆåˆ©æ€§æ•™è‚²/å­¦ä¹ "],"type_id":"2"},{"value":["365"],"type_id":"3"}]',
	        },
	        success: function(res) {
	            if(res.returnCode == '0000'){
	            	var sorder_id = res.order_id;
	            	
	            	payData(sorder_id,'1');
	            	getOrderState(sorder_id,'coin');
	            	
	            	addAnimate();
	            }
	            else{
	            	layer.closeAll('loading');
	            	isCloseTime = false;
	            	$.message({
	    		        message: res.returnMsg,
	    		        type: 'error'
	    		    });
	            }
	        }
	    });
	}
	
    //èŽ·å–VIPä»·æ ¼åˆ—è¡¨
    function loadCourseVipList(){
			
		var getCourseVipList = ccgt_domain + "/?urlparam=" + 'common/vip/getCourseVipList';
		$.ajax({
	        type: "GET",
	        dataType:"json",
	        url:getCourseVipList,
	        data: {
	        	platform:'web-ccgq',
	        	ccgq_uuid: identity.getCcgqUid(),
	        	service_type: identity.getServiceType(),
	        	vtype:'1023',
	        },
	        success: function(res) {
	            if(res.returnCode == '0000'){
	            	bindCourseVipInfo(res.list);
	            }
	            else{
	            	isCloseTime = false;
	            	$.message({
	    		        message: res.returnMsg,
	    		        type: 'error'
	    		    });
	            }
	        }
	    });
	}
    
   function bindCourseVipInfo(list){
	   // å……å€¼åˆ—è¡¨
       viplist = list;
	   
	   if(viplist.length > 0){
		   
		   for(var i = 0; i < viplist.length; i++){
	    	   
			   if(i == vip_type_index){
				   $('.vip.set_meal_list li:eq('+i+')').addClass("active");
			   }
			   else{
				   $('.vip.set_meal_list li:eq('+i+')').removeClass("active");
			   }
			   
	       		$('.vip.set_meal_list li:eq('+i+')').attr('data-value', viplist[i].vip_id);
	       		$('.vip.set_meal_list li:eq('+i+')').attr('data-money', viplist[i].price);
	       	
	       		$('.vip.set_meal_list li:eq('+i+') h1:eq(0)').text(viplist[i].name);
	       		$('.vip.set_meal_list li:eq('+i+') p:eq(0)').html("Â¥<span>"+ viplist[i].price +"</span>");
	       		$('.vip.set_meal_list li:eq('+i+') p:eq(1)').text(viplist[i].desc);
	       		$('.vip.set_meal_list li:eq('+i+') div:eq(1)').text(viplist[i].second_desc);
	       }
		   
		   $('.dialog_box .content .vip_recharge_box .set_meal > ul li:eq(2)').hide();
	       
		   setPayPrise();
		   
	       placeOrderForVip(viplist[vip_type_index].vip_id,vip_paytype_data);
	   }
   }
   
   //VIPä¸‹å•
   function placeOrderForVip(vip_id,paytype,currency='',uni_channel=''){
	   
	    var coupon_id = 0;
	    if(couponList && vip_id == 2001023 && (paytype == 2 || paytype == 3)){
	    	coupon_id = couponList.id;
	    }
	    
		var placeOrderApi = ccgt_domain + "/?urlparam=" + 'pad/order/placeOrderForVip';
		$.ajax({
	        type: "GET",
	        dataType:"json",
	        url:placeOrderApi,
	        data: {
	        	service_type: 'ccgq',
	        	platform:'web-ccgq',
	        	service_uid: identity.getServiceUid(),
	        	service_key: identity.getServiceKey(),
	        	ccgq_uuid: identity.getCcgqUid(),
	        	service_type: identity.getServiceType(),
	        	uid: identity.getUid(),
	        	vip_id:vip_id,
	        	order_type:"rechange",
	        	payment_type:paytype,
	        	currency:currency,
	        	uni_channel:uni_channel,
	        	coupon_id: coupon_id,
	        },
	        beforeSend: function(){
	        	layer.load(0, { shade: [0.01, '#fff'] });
	        },
	        success: function(res) {
	        	layer.closeAll();
	        	
	            if(res.returnCode == '0000'){
	            	
	            	var order_id = res.list.order_id;
	            	var qrcode = res.list.qrcode;
	            	
	            	if(paytype == "1001"){
	            		$('.vip_pay_paypal').attr('data-vip-jump-url', res.list.ApprovalLink);
	            		$('.vip_pay_paypal').attr('data-vip-orderNo', order_id);
	            	}
	            	else if(paytype == "1003"){
	            		$('.vip_pay_unipin').attr('data-vip-jump-url', res.list.url);
	            		$('.vip_pay_unipin').attr('data-vip-orderNo', order_id);
	            		getOrderState(order_id,'vip');
	            		window.open(res.list.url);
	            	}
	            	else{
	            		$('.vip_qr_code').attr('src', qrcode);
		            	payData(order_id,vip_paytype_data);
	            		getOrderState(order_id,'vip');
	            		addAnimate();
	            	}
	            }
	            else{
	            	isCloseTime = false;
	            	$.message({
	    		        message: res.returnMsg,
	    		        type: 'error'
	    		    });
	            }
	        }
	    });
	}
   
   //æ”¯ä»˜æŽ¥å£
   function payData(order_id,payment_type){
	   var payDataApi = ccgt_domain + "/?urlparam=" + 'pay/pay/payData';
		$.ajax({
	        type: "GET",
	        dataType:"json",
	        url:payDataApi,
	        data: {
	        	service_type: 'ccgq',
	        	platform: 'web-ccgq',
	        	service_uid: identity.getServiceUid(),
	        	service_key: identity.getServiceKey(),
	        	ccgq_uuid: identity.getCcgqUid(),
	        	service_type: identity.getServiceType(),
	        	uid: identity.getUid(),
	        	order_id: order_id,
	        	payment_type: payment_type,
	        },
	        success: function(res) {
	            if(res.returnCode == '0000'){
	            	
	            }else{
	            	isCloseTime = false;
	            	$.message({
	    		        message: res.returnMsg,
	    		        type: 'error'
	    		    });
	            }
	        }
		}); 
   }
   
   //æŸ¥è¯¢è®¢å•çŠ¶æ€
   function getOrderState(orderId,orderType){
	   var placeOrderApi = ccgt_domain + "/?urlparam=" + 'pay/pay/getOrderState';
		$.ajax({
	        type: "GET",
	        dataType:"json",
	        url:placeOrderApi,
	        data: {
	        	service_type: 'ccgq',
	        	platform:'web-ccgq',
	        	service_uid: identity.getServiceUid(),
	        	service_key: identity.getServiceKey(),
	        	ccgq_uuid: identity.getCcgqUid(),
	        	service_type: identity.getServiceType(),
	        	uid: identity.getUid(),
	        	order_id:orderId,
	        },
	        success: function(res) {
	            if(res.returnCode == '0000'){
	            	
	            	torder_id = orderId;
	            	torderType = orderType;
	            	
	            	if(res.order_state == "3"){
	            		
	            		var service_uid = identity.getServiceUid();
	            		var service_key = identity.getServiceKey();
	            		var cdb_uid = identity.getCcgqUid();
	            		var service_type = identity.getServiceType();
	            		var uid = identity.getUid();
	            		getMyNewCoupon(service_uid, service_key, cdb_uid, service_type, uid);
	            		
	            		isCloseTime = false;
	            		clearTimeout(animate1);
	            		
	            		if(orderType == "vip"){
	            			$.message({
	                            message: 'å¼€é€šVIPä¼šå‘˜æˆåŠŸï¼Œç•…äº«VIPå…¨éƒ¨ç‰¹æƒ',
	                            type: 'success'
	                        });

	                        setTimeout(function () {
	                        	location.reload();
	                        }, 3000);
	            		}
	            		else if(orderType == "balance"){
	            			
	            			$.message({
	                            message: 'å……å€¼æˆåŠŸï¼Œè¯·ä½¿ç”¨é›¶é’±è´­ä¹°ä¹è°±',
	                            type: 'success'
	                        });

	                        setTimeout(function () {
	                        	location.reload();
	                        }, 3000);
	            		}
	            		else if(orderType == "coin"){
	            			layer.closeAll('loading');
	            			$.message({
	                            message: 'è´­ä¹°ä¹è°±æˆåŠŸï¼Œè‡ªåŠ¨åˆ·æ–°åŽå¯é¢„è§ˆå®Œæ•´ç‰ˆ',
	                            type: 'success'
	                        });

	                        setTimeout(function () {
	                        	location.reload();
	                        }, 3000);
	            		}
	            		
	            		//1ã€æç¤ºè´­ä¹°æˆåŠŸ
	            		//2ã€åˆ·æ–°æ•´ä¸ªæ›²è°±è¯¦æƒ…ç•Œé¢
	            	}
	            }
	        }
	    });  
   }
   
   var orderstatetime = 60;
   var isCloseTime = false;
   var animate1;

   function getOrderStateTime() {
       if (!isCloseTime) {
    	   orderstatetime = 60;
    	   clearTimeout(animate1);
           return;
       }
       if (orderstatetime === 0) {
    	   orderstatetime = 60;
           //return
       } else {
    	   orderstatetime--;
       }
       animate1 = setTimeout(function () {
    	   getOrderStateTime();
           getOrderState(torder_id,torderType);
       }, 1000)
   }
   
   function addAnimate(){
	   orderstatetime = 60;
	   clearTimeout(animate1);
   		animate1 = setTimeout(function () {
   			isCloseTime = true;
   			getOrderStateTime();
       }, 1000)
   }
   
	loadDetailInfo();
	function loadDetailInfo(){
	    var loc = $('#Collection').attr('data-opern-id')
	    var loc = loc ? loc : $('.opern_name').attr('data-oid')
	    if(!loc){
	    	return
	    }
	    
	    var channel = '';
	    if(isMobile()){
	    	channel = 'h5';
	    }
	    
		var getBalanceListApi = domain_str + '/home/user/getOpernDetail';
		$.ajax({
	        type: "GET",
	        dataType:"json",
	        url: getBalanceListApi,
	        data: {
	        	service_type: 'ccgq',
	        	platform: 'web-ccgq',
				channel: channel,
	        	service_uid: identity.getServiceUid(),
	        	service_key: identity.getServiceKey(),
	        	ccgq_uuid: identity.getCcgqUid(),
	        	service_type: identity.getServiceType(),
	        	uid: identity.getUid(),
	        	id: loc,
	        },
	        success: function(res) {
	            if(res.returnCode == '0000'){
	            	bindDetailInfo(res.list);
	            }
	            else{
	            	$.message({
	    		        message: res.returnMsg,
	    		        type: 'error'
	    		    });
	            }
	        }
		});
	}
	
	function bindDetailInfo(info){
		if(info.instrument == '1'){ //å‰ä»–
			window.location.href = 'http://www.ccguitar.cn/cchtml/' +info.puid+ '.htm';
			return;
		}
		
		puname = info.name;
		pid = info.id;
	    has_buy = info.has_buy;
	    is_pay = info.is_pay;
	    pdfUrl = info.pdf;
	    is_lock_num = info.is_lock_num;
	    
	    price = info.sale_price;
	    pulist = info.image_list;
	    
	    collect_num = info.collect_num;
	    hit_num = info.hit_num;
	    total_image_num = info.total_image_num;
	    
	    audition_longtime = info.audition_longtime ? info.audition_longtime / 1000 : 0;
	    audio.init(audition_longtime);
	    
	    $('.d-b-top h2 span:eq(4)').text(hit_num + ' æµè§ˆ');
	    $('.d-b-top h2 span:eq(6)').text(collect_num + ' æ”¶è—');
	    $('.d-b-top h2 span:eq(10)').text(total_image_num + ' é¡µ');
	    $('.top_hit_num').text(hit_num + ' æµè§ˆ');
	    $('.top_collect_num').text(collect_num + ' æ”¶è—');
	    $('.collect-num').text(collect_num);
	    $('.score_details_h5_box .s_d_h_b_item3 .info_box .img img').attr('src', info.author_photo);
	    $('.s-u-b-buy-box .num').html(price);
	    
	    if(price > 0){
	    	if(identity.getIsVip() || has_buy == '1'){
	    		//å·²æ˜¯VIPç”¨æˆ·æˆ–è´­ä¹°è¿‡è¯¥ä¹è°±
	    		if(isMobile()){
	    			$('.to-vip').hide();
	    	    	$('.to-qupu').show();
	    		}
    	    	
    			appendWeiperSlide(pulist);
    		}else{
    			//æœªè´­ä¹°
    			$(".img-mask").show();
    			if(isMobile()){
    				$('.to-vip').show();
	    	    	$('.to-qupu').hide();
    			}
    			appendWeiperSlide(pulist, 'no-buy');
    		}
	    	
	    	if(identity.getUid()){
	    		if(!identity.getIsVip()){
	    			if($('#ai-score')[0]){
		    			$('#ai-score').attr('scrolling','no');
		    		}
	    		}
	    		
	    		if(identity.getIsVip()){
	    	    	$('.s-u-b-buy-box').css('background-image','url("https://s201.lzjoy.com/public/web_static/images/score_details/bac4.png")');
	    	    	$('.s-u-b-buy-box .tips').css('color','rgba(255,255,255,.8)');
	    	    	$('.s-u-b-buy-box .company').css('color','rgba(255,255,255,.8)');
	    	    	$('.s-u-b-buy-box .tips-box').css('color','rgba(255,255,255,.8)');
	    	    	
	    	    	$('.buy-button-box').css('display','none');
	    	    	$('.free-button-box').css('display','block');
	    	    	$('.s-d-m-b-buy').css('display','none');
	    	    	
	    	    	$('.s-d-m-b-blockstyle p:eq(1) span').css('height','auto');
	    	    	$('.s-d-m-b-blockstyle p:eq(1) span').css('max-height','3.5rem');
	    	    }
	    	    else if(has_buy == "1"){
	    	    	$('.buy-button-box .buy').html("å·²è´­ä¹°");
	    	    	$('.buy-button-box .buy').css('border','1px solid #C5C7C7');
	    	    	$('.buy-button-box .buy').css('color','#7C818A');
	    	    }
	    	}
	    	else{
	    		if($('#ai-score')[0]){
	    			$('#ai-score').attr('scrolling','no');
	    		}
	    	}
	    	
	    	//æ˜¯å¦AIè°±åˆ¤æ–­
		    if(!info.audition_midi){
		    	$('.openvip').html('å¼€é€šVIPä¼šå‘˜ï¼Œç•…äº«å…¨åœºé«˜æ¸…ä¹è°±<img src="https://s201.lzjoy.com/public/web_static/images/score_details/icon5.png" alt="å¼€é€šVIPä¼šå‘˜ï¼Œç•…äº«å…¨åœºé«˜æ¸…ä¹è°±">');
		    }
	    }
	    else{
	    	if(identity.getUid()){
	    		if(!identity.getIsVip()){
	    			var yes_close = getCookie('yes_close');
	    			if(yes_close != 1 && !isMobile()){
	    				is_show_wechat_code = 1;
	    			}
	    			
	    			if($('#ai-score')[0]){
		    			$('#ai-score').attr('scrolling','no');
		    		}
	    		}
	    		
	    		//å…è´¹ä¹è°±
	    		appendWeiperSlide(pulist);
	    	}
	    	else{
	    		var yes_close = getCookie('yes_close');
    			if(yes_close != 1 && !isMobile()){
    				is_show_wechat_code = 1;
    			}
    			
	    		if($('#ai-score')[0]){
	    			$('#ai-score').attr('scrolling','no');
	    		}
	    		
	    		//å…è´¹ä¹è°±
	    		appendWeiperSlide(pulist);
	    	}
	    	
	    	if(isMobile()){
		    	$('.to-vip').hide();
		    	$('.to-qupu').show();
	    	}
	    }
	    
	    //ä¹è°±å”®å–é‡‘é¢
	    $('.SingleSale_Price').html(price+' é›¶é’±');
	}
	
	function appendWeiperSlide(list, is_buy = ''){
		
		//æ¸…é™¤swiper-wrapperæ‰€æœ‰å›¾ç‰‡
		$('.swiper-wrapper').empty();
		
		//æ¸²æŸ“ä¹è°±å›¾ç‰‡
		for(var i = 0; i < list.length; i++){
	    	$('.swiper-wrapper').append('<div class="swiper-slide" style="width:840px;"><img class="img" src="'+pulist[i]+'" alt=""></div>');
	    }
		
		//è®¾ç½®å®Œæ•´ä¹è°±å±•ç¤º
		/*$('.score_details_mian .score-utils-box .s-u-body .line-spectrum-box .defalut #scoreSwiper').css('height','15.466667rem');
		if(identity.getIsVip()){
			
		}*/
		
		if(is_buy == ''){
			$('.score_details_mian .score-utils-box .s-u-body .line-spectrum-box .defalut #scoreSwiper').css('height','15.466667rem');
			$('.score_details_mian .score-utils-box .s-u-body .line-spectrum-box .ai iframe').css('height','15.466667rem');
			
			$('.openbuy').hide();
		}
		
		swiperInit();
	}
	
	/**********************å•è°±é”€å”®å¼¹æ¡†æ•°æ®å¡«å……**********************/
	
	// å……å€¼ || æ”¯ä»˜
	$('.buy_paypal').click(function(e){
		if(parseFloat(user_balance) < parseFloat(price)){//å……å€¼
			recharge();
		}
		else{//æ”¯ä»˜
		    //è°ƒç”¨é›¶é’±æ”¯ä»˜æŽ¥å£
		    if (parseInt(pid)>0) {
		    	placeOrderForCoin(pid);
		    }
		}
	});
	
	// è¯„è®º
	$('.a_t_publish_btn').click(function(e){
		if(isMobile()){
			loadInstall()
			return
		}

		if(!identity.getUid()){
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
			return
		}

		var opern_id = $('.opern_name').attr('data-oid')
		if(!opern_id){
			return
		}
		
		var content = $('textarea[name=content]').val();
		if(!content){
			$.message({
		        message: 'è¯·è¾“å…¥è¯„è®ºå†…å®¹',
		        type: 'warning'
		    });
			return
		}
		
		var strlen = getByteLen(content)
		if(strlen > 100){
			$.message({
		        message: 'è¾“å…¥è¯„è®ºä¸å¾—è¶…è¿‡100ä¸ªå­—ç¬¦',
		        type: 'warning'
		    });
			return
		}
		
		var addCollectApi = domain_str +'/cginfo/userinfo/usercomment';
		$.ajax({
	        type: "GET",
	        dataType:"json",
	        url: addCollectApi,
	        data: {
	        	uid: identity.getUid(),
	        	learning_id: opern_id,
	        	comment_content: content,
	        	comment_id: '',
	        	score_num: 5,
	        	platform: 'web-ccgq',
	        	ccgq_uuid: identity.getCcgqUid()
	        },
	        dataType: 'json',
	        success: function(res) {
	            if(res.returnCode == '0000'){
	            	$('textarea[name=content]').val('')
	            	$.message({
	    		        message: 'è¯„è®ºæˆåŠŸ',
	    		        type: 'success'
	    		    });
	            	
	            	setCommentShowList([res.datas], false)
	            }else{
	            	$.message({
	    		        message: res.returnMsg,
	    		        type: 'error'
	    		    });
	            }
	        }
	    });
	});
	
	// å›žå¤
	$('.a_t_comment').on('click','.reply_btn',function(){
	    event.stopPropagation();
	    
	    if(!identity.getUid()){
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
			return
		}
	    
	    var that = this
	    
	    if(!identity.getUid()){
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
			return
		}

		var opern_id = $('.opern_name').attr('data-oid')
		if(!opern_id){
			return
		}
		
		var comment_id = $(that).parents('li').attr('data-comment-id')
		if(!comment_id){
			return
		}
		
		var content = $(that).parents('li').find('input').val()
		if(!content){
			$.message({
		        message: 'è¯·è¾“å…¥è¯„è®ºå†…å®¹',
		        type: 'warning'
		    });
			return
		}
		
		var strlen = getByteLen(content)
		if(strlen > 100){
			$.message({
		        message: 'è¾“å…¥è¯„è®ºä¸å¾—è¶…è¿‡100ä¸ªå­—ç¬¦',
		        type: 'warning'
		    });
			return
		}
		
		var addCollectApi = domain_str +'/cginfo/userinfo/usercomment';
		$.ajax({
	        type: "GET",
	        dataType:"json",
	        url: addCollectApi,
	        data: {
	        	uid: identity.getUid(),
	        	learning_id: opern_id,
	        	comment_content: content,
	        	comment_id: comment_id,
	        	score_num: 5,
	        	platform: 'web-ccgq',
	        	ccgq_uuid: identity.getCcgqUid()
	        },
	        dataType: 'json',
	        success: function(res) {
	            if(res.returnCode == '0000'){
	            	$.message({
	    		        message: 'å›žå¤æˆåŠŸ',
	    		        type: 'success'
	    		    });
	            	
	            	reply(that)
	            }else{
	            	$.message({
	    		        message: res.returnMsg,
	    		        type: 'error'
	    		    });
	            }
	        }
	    });
	})
	
	function ccmusicAppStoreClick() {
	    var m = this;
	    if (navigator.userAgent.match(/(iPad);?/i)) {
	        window.location.href = "https://apps.apple.com/us/app/chong-chong-gang-qin/id1080634885?l=zh&ls=1";
	        return false;
	    } else {
	        m.wakeupOrInstall();
	        return false;
	    }
	}
	
	//åˆ†äº«
	$('.s_d_shareBtn').click(function () {
	    //$('#c_d_dialog').show();
		$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.5"></iframe>');
	});
	//å¼¹çª—éšè—
	/*$("#c_d_dialog").click(function (event) {
	    $('#c_d_dialog').hide();
	    $('.share_p_box_o').show();
	    $('.c_d_qr_code_box').hide()
	});*/
	$(".closeBtn").click(function (event) {
	    $('#c_d_dialog').hide();
	    $('.share_p_box_o').show();
	    $('.c_d_qr_code_box').hide()
	});
	$('.share_toWO').click(function(){
		var title = $('.spectrum_details_left_detail_title span').text();
		title = title ? title : 'è™«è™«é’¢ç´ç½‘';
		shareModel.sinaWeiBo(title, window.location.href);
	})
	$('.share_toQQ').click(function(){
		var title = $('.spectrum_details_left_detail_title span').text();
		title = title ? title : 'è™«è™«é’¢ç´ç½‘';
		shareModel.shareQQ(window.location.href, title, '');
	})
	$('.share_toQQKJ').click(function(){
		var title = $('.spectrum_details_left_detail_title span').text();
		title = title ? title : 'è™«è™«é’¢ç´ç½‘';
		shareModel.shareQQZone(window.location.href, title, '');
	})
	$('.share_toWX').click(function(){
		shareModel.weixin();
	    $('.share_p_box_o').css('display','none');
	    $('.c_d_qr_code_box').css('display','block')
	})
	$('.comment-box').on('click','.dz_box',function(){ 
		if(isMobile()){
			$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app.html?v1.8"></iframe>');
			return
		}

		$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.5"></iframe>');
	})
	
	if ($(window).width() < 1000) {
        $('.score_details_mian_box .audio-source-box').remove()
    } else {
        $('.s_d_h_b_item1 ').remove()
    }

    // å¼€å§‹æ’­æ”¾
    $('#audio_play').click(function (e) {
    	//audio.play(audition_longtime)
    })

    // æš‚åœ
    $('#audio_pause').click(function (e) {
    	//audio.pause()
    })

    // åœæ­¢
    $('#audio_reset').click(function (e) {
    	//audio.stop()
    })
    
    // H5å¼€å§‹æ’­æ”¾
    $('#play_botton').click(function (e) {
    	addhit(2000005)
    	
    	if($('.play-jianpu').hasClass('active')){ //AIè°±æ¨¡å¼
  		  if(!newH5Window.Player){
  		      $.message({
  		          message:'AIæ›²è°±è¿˜åœ¨åŠ è½½ä¸­å“Ÿ~',
  		          type:'warning'
  		      });
  			  return  
  		  }
  		  
  		  $('#play_botton').toggleClass('active')
  		  if(newH5Window.Player.isPlayerReady()){
  			  if(identity.getUid()){
  		           if (identity.getIsVip()) {
  		        	   newH5Window.Player.setLocked(false);
  		           }else{
  		        	   newH5Window.Player.setLocked(true);
  		           }
  				   
  				   //æ˜¯å¦æ­£åœ¨æ’­æ”¾
  		           newH5Window.Player.playOrPause();
				   if(newH5Window.Player.isPlaying()){
					   if(!identity.getIsVip()){
						   $.message({
						       message:'ä»…é™VIPä¼šå‘˜ä½¿ç”¨ï¼Œå¼€é€šVIPç•…äº«å…¨åœºAIè°±ç»ƒä¹ æ¨¡å¼',
						       type:'info'
						   });
					   }
				   }
  			  }else{
  				  newH5Window.Player.setLocked(true);
  				  if(isMobile()){
  					  $("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
  				  }else{
  					  $("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
  				  }
  			  }
  		  }
  	  }else{ //éŸ³é¢‘æ¨¡å¼
  		  console.log(111);
  		  $('#play_botton').toggleClass('active')
		  if ($('#play_botton').hasClass('active')) {
		      audio.play(audition_longtime);
		  } else {
		      audio.pause();
		  }
  	  }
    })
    
    // H5å¼€å§‹æ’­æ”¾[aié™ªç»ƒ]
    $('#play_botton1').click(function (e) {
    	addhit(2000005)
        $(this).toggleClass('active')
        if ($(this).hasClass('active')) {
            audio.play(audition_longtime);
            
            if(!adv_time){
            	adv_time = setTimeout(function () {
                	$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app.html?v1.8"></iframe>');
                }, 3000);
            }
        } else {
            audio.pause();
        }
    })
    
    // H5å¼€å§‹æ’­æ”¾[ç€‘å¸ƒæµ]
    $('#play_botton2').click(function (e) {
    	addhit(2000005)
        $(this).toggleClass('active')
        if ($(this).hasClass('active')) {
            audio.play(audition_longtime);
            
            if(!adv_time){
            	adv_time = setTimeout(function () {
                	$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app.html?v1.8"></iframe>');
                }, 3000);
            }
        } else {
            audio.pause();
        }
    })
    
    // AIæ’­æ”¾
    $('.play_botton_ai').click(function (e) {
    	if(!newWindow.Player){
  	      $.message({
  	        message:'AIæ›²è°±è¿˜åœ¨åŠ è½½ä¸­å“Ÿ~',
  	        type:'warning'
  	      });
  		  return  
  	    }
    	
    	addhit(2000004)
    	$(this).toggleClass('active')
    	if(newH5Window.Player.isPlayerReady()){
    		newH5Window.Player.setLocked(true);
    		newH5Window.Player.playOrPause();

    		if(!adv_time_ai){
    			adv_time_ai = setTimeout(function () {
                	$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app.html?v1.8"></iframe>');
                }, 6000);
    		}
    	}
    })
    $('.score_details_h5_box a').click(function (e) {
    	addhit(2000002)
    	loadInstall()
		return
    })
    $('.score_details_h5_box .uitls_box .right').click(function (e) {
    	addhit(2000003)
    	loadInstall()
		return
    })
    $('.info_box .name a').click(function (e) {
    	addhit(2000006)
    })
    $('.info_box .name2 a').click(function (e) {
    	addhit(2000007)
    })
    $('.types_box a:eq(0)').click(function (e) {
    	addhit(2000008)
    })
    $('.types_box a:eq(0)').click(function (e) {
    	addhit(2000009)
    })
    // åŠ è½½è¯„è®º
    $('.more-box a').click(function(){
    	$(this).html('åŠ è½½ä¸­...')
    	
    	comment_timer = setTimeout(function(){
    		$(this).html('æŸ¥çœ‹æ›´å¤š')
		}, 1000);
    	
    	loadComment(comment_page)
	})
	$('ul.tabs-box').click(function (e) {
		$('#play_botton').removeClass('active')
		$('.play_botton_ai').removeClass('active')
		audio.pause()
		if(newH5Window.Player.isPlayerReady()){
    		newH5Window.Player.setLocked(true);
    		newH5Window.Player.pausePlay();
    	}
    })

    // å…¨å±
	const element = document.getElementById('line-spectrum-box');
	document.getElementById('s_d_fullBtn').addEventListener('click', function () {
		if (!!window.ActiveXObject || "ActiveXObject" in window){
			$.message({
	  	        message:'IEä¸æ”¯æŒå…¨å±ï¼Œè¯·å‰å¾€APPæŸ¥çœ‹',
	  	        type:'warning'
	  	    });
			$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.5"></iframe>');
			return
		}
	
		if(!identity.getUid()){
			if(isMobile()){
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			}else{
				$("body").append('<iframe class="login-iframe" src="/sheetplayer/login.html?v1.0"></iframe>');
			}
			return;
		}
		
		if(price > 0 && !identity.getIsVip() && has_buy != '1'){
    	    vip();
  		    return;
  	    }
		
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	});
	// é€€å‡ºå…¨å±
	$(".type-switch-play").on('click',function(e){
		if (element.exitFullscreen) {
			element.exitFullscreen();
		} else if (element.mozCancelFullScreen) {
			element.mozCancelFullScreen();
		} else if (element.webkitCancelFullScreen) {
			element.webkitCancelFullScreen();
		} else if (element.msCancelFullScreen) {
			element.msCancelFullScreen();
		}
	});
	
	var fullarr = ['fullscreenchange','webkitfullscreenchange','mozfullscreenchange'];
	for(var i=0;i < fullarr.length;i++){
		var item = fullarr[i];
		window.addEventListener(item, function (e) {
			if (!screenfull.isFullscreen) {
				//æŽ¨å‡ºå…¨å±
				$('.line-spectrum-box').removeClass("full");
				$('#scoreSwiper .img').css({"width":initw,"height":"auto","display":"block","margin-left":"0","margin-top":"0"});
				
				mySwiper1.swipeTo(0, 200, false);
				$('.opern-detail .tool-tab-box-page span:eq(0)').text(1);
				$('.full-out').hide();
			} else {
				//ç‚¹å‡»å…¨å±
				$('.line-spectrum-box').addClass("full");
				$('#scoreSwiper .img').css({"width":"500px","height":"9.07rem !important","display":"block","margin":"0 auto"});
				$('.full-out').show();
				
				setTimeout(function(){
					var h = $('.line-spectrum-box').height();
					var imgh = $('#scoreSwiper .img').height();
					var imgtop = (h - imgh) / 2;
					
					imgtop = imgtop > 0 ? imgtop : -imgtop;
					imgtop = imgtop + 'px';
					
					$('#scoreSwiper .img').css({"margin-top":imgtop});
				}, 200);
			}
		});
	}
	
    loadPlaydoing()
    function loadPlaydoing(){
    	$('.type-switch .defalut').before('<div class="defalut type-switch-play"><div class="type"><img src="https://s201.lzjoy.com/public/web_static/images/default/ai2.png">AIé™ªç»ƒ</div></div>');
    	$('.s-u-b-buy-box .tips-box').after('<div style="color: red;margin-top: 19px;font-size: 14px;">æ–°ç”¨æˆ·ä¸‹è½½appï¼Œæ³¨å†Œå³é€70å…ƒçº¢åŒ…</div>');
    }
    
    $(".type-switch-play").on('click',function(e){
    	e.stopPropagation();
    	$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.5"></iframe>');
    });
    
    $(".ladder-player").on('click',function(e){
    	e.stopPropagation();
    	$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.5"></iframe>');
    });
    
    $('.s-d-m-b-blockstyle .more').on('click',function(e){
    	$('.opern-introduce').css({"height":"auto"});
    	$('.opern-introduce').css({"overflow":"auto"});
    	$('.opern-introduce').css({"-webkit-line-clamp":"inherit"});
    	$('.opern-introduce').css({"-webkit-box-orient":"inherit"});
    	$(this).hide();
    });
    
    $(".img-mask").on('click',function(e){
    	$(".openvip").click();
    });
    
    $(".ai-btn").on('click',function(e){
    	if (!!window.ActiveXObject || "ActiveXObject" in window){
    		$.message({
	  	        message:'IEä¸æ”¯æŒAIæ¨¡å¼ï¼Œè¯·å‰å¾€APPæŸ¥çœ‹',
	  	        type:'warning'
	  	    });
    		$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/down_app_v2.html?v1.5"></iframe>');
			return
		}
    	
    	$(this).toggleClass('active');
        swiperInit();
        $('#line-spectrum-box').toggleClass('active');
        
        audio.stop(); 
        
        $('#audio_play').css('display', 'block');
    	$('#audio_pause').css('display', 'none');
    	
    	puType = "1";
    	
    	$('.audio_ai_utils').css('display','flex');
    	$('.audio_mp3_utils').css('display','none');
    	
    	$('.img-btn').css('right','.25rem');
    	$('.jianpu-btn').css('right','.75rem');
    	$('.ladder-player').css('right','1.25rem');
    	$('.tool-tab-box').css('width','58.3333%');
    	
    	$(this).hide();
    	$('.tool-tab-box-m').hide();
    	$('.s_d_fullBtn').hide();
    	$('.tool-audio-box span').hide();
    	$('.img-btn').show();
    	$('.tool-tab-box-m-bak').show();
    });
    
    $(".img-btn").on('click',function(e){
    	$(this).toggleClass('active');
        swiperInit();
        $('#line-spectrum-box').toggleClass('active');
        
        audio.stop(); 
        
        $('#audio_play').css('display', 'block');
    	$('#audio_pause').css('display', 'none');
    	
    	puType = "0";
    	$('.audio_ai_utils').css('display','none');
    	$('.audio_mp3_utils').css('display','flex');
    	
    	$('.ladder-player').css('right','1.75rem');
    	$('.jianpu-btn').css('right','1.25rem');
    	$('.img-btn').css('right','.9rem');
    	$('.tool-tab-box').css('width','33.333333%');
    	
    	$(this).hide();
    	$('.tool-tab-box-m-bak').hide();
    	$('.tool-tab-box-m').show();
    	$('.s_d_fullBtn').show();
    	$('.ai-btn').show();
    	$('.tool-audio-box span').show();
    	$('.ladder-player').show();
    	
    	if(newWindow.Player.isPlayerReady()){
    		newWindow.Player.resetPlay();
		}
    });
    
    $('.jianpu-btn').on('click',function(e){
    	window.open("/jianpu/" + new_opern_id + '.htm');
    });
    
    $('.ladder-player').pt({
    	position: 'b',
    	content: 'AIé™ªç»ƒ',
    	width: 70,
    	align: 'c',
    });
    
    $('.ai-btn').pt({
    	position: 'b',
    	content: 'AIæ¨¡å¼',
    	width: 70,
    	align: 'c',
    });
    
    $('.img-btn').pt({
    	position: 'b',
    	content: 'å›¾ç‰‡æ¨¡å¼',
    	width: 80,
    	align: 'c',
    });
    
    $('.s_d_fullBtn').pt({
    	position: 'b',
    	content: 'å…¨å±',
    	width: 60,
    	align: 'c',
    });
    
    $('#ai-cycle').pt({
    	position: 'b',
    	content: 'å¾ªçŽ¯',
    	width: 60,
    	align: 'c',
    });
    
    $('#ai-metronome').pt({
    	position: 'b',
    	content: 'èŠ‚æ‹å™¨',
    	width: 70,
    	align: 'c',
    });
    
    $('#ai-bothhands').pt({
    	position: 'b',
    	content: 'åˆæ‰‹',
    	width: 60,
    	align: 'c',
    });
    
    $('#ai-WaterfallFlow').pt({
    	position: 'b',
    	content: 'ç€‘å¸ƒæµ',
    	width: 70,
    	align: 'c',
    });
    
    $('#ai-speed-plus').pt({
    	position: 'b',
    	content: 'åŠ é€Ÿ',
    	width: 60,
    	align: 'c',
    });
    
    $('#ai-speed-reduce').pt({
    	position: 'b',
    	content: 'å‡é€Ÿ',
    	width: 60,
    	align: 'c',
    });
    
    $('.jianpu-btn').pt({
    	position: 'b',
    	content: 'ç®€è°±',
    	width: 60,
    	align: 'c',
    });
    
    $("#disabledSelect").change(function(){
    	var currency = $(this).val();
    	setVipPrise(currency);
    	setPayChannel(currency);
    	setPayPrise();
	});
    
    function setVipPrise(currency = ''){
    	if(currency){
    		var rate = 0;
    		var is_float = true;
        	for(var i=0;i<currencyCodeList.length;i++){
        		if(currencyCodeList[i].code == currency){
        			rate = currencyCodeList[i].rate;
        			is_float = currencyCodeList[i].is_float;
        		}
        	}
        	
        	if(rate <= 0){
        		$.message({
    	  	        message:'æ±‡çŽ‡èŽ·å–å¤±è´¥',
    	  	        type:'warning'
    	  	    });
        		return;
        	}
        	
        	$('.vip_recharge_box .set_meal > ul li').each(function(){
        		var index = $(this).index();
        		if(is_float == true){
        			var price = accDiv(viplist[index].price, rate);
            		var price = Math.ceil(price * 100) / 100;
        		}else{
        			var price = accDiv(viplist[index].price, rate);
            		var price = Math.ceil(price * 1) / 1;
        		}
        		
        		$(this).find('p.num1').html('<span>' + price + '</span>(' + currency + ')');
        		$(this).find('p.num2').html('');
        		$(this).find('.tips').css('display', 'none');
        		$(this).find('.line').css('display', 'none');
        		$(this).find('p.num1').css('margin-top', '0.2rem');
        		$(this).find('p.num1 span').css('font-size', '.213333rem');
        	});
    	}else{ 
        	$('.vip_recharge_box .set_meal > ul li').each(function(){
        		var index = $(this).index();
        		var price = viplist[index].price;
        		$(this).find('p.num1').html('Â¥<span>' + price + '</span>');
        		$(this).find('p.num2').html(viplist[index].desc);
        		$(this).find('.tips').css('display', 'block');
        		$(this).find('.line').css('display', 'block');
        		$(this).find('p.num1').css('margin-top', '0');
        		$(this).find('p.num1 span').css('font-size', '.413333rem');
        	});
    	}
    }
    
    function setPayChannel(currency = ''){
    	var unipinPayChannel = ccgt_domain + '/?urlparam=common/vip/unipinPayChannel';
  	  	$.ajax({
          type: "GET",
          dataType:"json",
          url: unipinPayChannel,
          data: {
          	service_type: 'ccgq',
          	platform:'web-ccgq',
          	service_uid: identity.getServiceUid(),
          	service_key: identity.getServiceKey(),
          	ccgq_uuid: identity.getCcgqUid(),
          	service_type: identity.getServiceType(),
          	uid: identity.getUid(), 
          	currency_code: currency,
          },
          beforeSend: function(){
        	layer.load(0, { shade: [0.01, '#fff'] });
          },
          success: function(res) {
        	  layer.closeAll();
              if(res.returnCode == '0000'){
            	var channelList = res.list;
              	
              	$('.vip_pay_unipin ul').empty(); 
              	for (var i=0;i<channelList.length;i++){
              		var item = res.list[i];
              		$('.vip_pay_unipin ul').append("<li data-code='" +item.code+ "'><img src='" +item.logo+ "'/>" +item.name+ " ç»“è´¦</li>");
              	}
              }
              else{
              	$.message({
      		        message: res.returnMsg,
      		        type: 'error'
      		    }); 
              }
          }
        });
    }
    
    //unipinä¸‹å•
    $(document).on('click','.vip_pay_unipin ul li',function(){
    	var channelCode = $(this).attr('data-code');
    	var currency = $('#disabledSelect').val();
    	
		placeOrderForVip(viplist[vip_type_index].vip_id,vip_paytype_data,currency,channelCode);
    });
    
    function setPayPrise(){
      $('.money .num1').hide();
    	var h = $('.vip_recharge_box .vip li.active .num1').html();
    	if(couponList && viplist.length > 0 && vip_type_index == 0 && (vip_paytype_data == 2 || vip_paytype_data == 3)){
    		var prise = parseInt(viplist[vip_type_index].price - couponList.discount_desc);
    		h = 'Â¥' + prise;

        if(couponList.discount_desc > 0){
          $('.money .num1').show();
        }
    	}
    	
    	$('#vipMoneyNum').html(h);
    }
    
    $('.problem span').click(function (params) {
		$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/payCustomerServicePopup.html?v1.2"></iframe>');
    })
    
    $('.error-top').click(function (params) {
		$("body").append('<iframe class="wechat-code" src="https://www.gangqinpu.com/sheetplayer/customerServicePopup.html?v1.2"></iframe>');
    })
    
    getCouponList();
    function getCouponList(){
    	var getMyCouponList = domain_str + '/home/coupon/getMyCouponList';
  	  	$.ajax({
          type: "GET", 
          dataType:"json",
          url: getMyCouponList,
          data: {
          	service_type: 'ccgq',
          	platform:'web-ccgq',
          	service_uid: identity.getServiceUid(), 
          	service_key: identity.getServiceKey(),
          	ccgq_uuid: identity.getCcgqUid(),
          	service_type: identity.getServiceType(),
          	uid: identity.getUid(), 
          },
          success: function(res) {
              if(res.returnCode == '0000'){
            	couponList = res.datas.list.length > 0 ? res.datas.list[0] : null;
            	
            	if(couponList){
            		if(couponList.vtype == '10002'){
            			$('.coupon .right p label').text('æ–°äººä¸“äº« Â¥' +couponList.discount_desc+ ' çº¢åŒ…');
            		}else{
            			$('.coupon .right p label').text('ä¸“å±žVIPç»­è´¹æŠ˜æ‰£åˆ¸ Â¥' +couponList.discount_desc+ ' çº¢åŒ…');
            			setCookie('ccgq_new_coupon', 0);
            		}
            		
            		if(couponList.expire_time_bak){
	            		setInterval(function(){
	                    	var countdown = timeFn(couponList.expire_time_bak);
	                    	$('.coupon .right p span').text('è·ç»“æŸ ' + countdown);
	                    }, 1000);
            		}
            		
            		setPayPrise();
            		$('.coupon').show();
            		$('.payment').css('margin-top', '.366667rem');
            	}else{
            		$('.coupon').hide();
            		$('.payment').css('margin-top', '1.2rem');
            		setCookie('ccgq_new_coupon', 0);
            	}
              }
          }
        });
    }
    
    function timeFn(dateBegin){ //èŽ·å–è¿‡æœŸæ—¶é—´å·®
    	dateBegin = dateBegin.replace(/-/g,"/");
    	var dateEnd = new Date();
        var dateBegin = new Date(dateBegin);
        var dateDiff = dateBegin.getTime() - dateEnd.getTime();
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
        var leave1 = dateDiff%(24*3600*1000);
        var hours = Math.floor(leave1/(3600*1000));
        hours = hours < 10 ? '0' + hours : hours;
        //è®¡ç®—ç›¸å·®åˆ†é’Ÿæ•°
        var leave2 = leave1%(3600*1000);
        var minutes = Math.floor(leave2/(60*1000));
        minutes = minutes < 10 ? '0' + minutes : minutes;
        //è®¡ç®—ç›¸å·®ç§’æ•°
        var leave3 = leave2%(60*1000);
        var seconds = Math.round(leave3/1000);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        var timeFn = hours+":"+minutes+":"+seconds;
        return timeFn;
    }
    
    function addDownload(opern_id = 0){
    	if(!opern_id){
    		$.message({
                message: 'è¯¥æ›²è°±æ‰¾ä¸åˆ°äº†',
                type: 'error'
            });
    		return;
    	}
    	
    	var getBalanceListApi = domain_str +'/home/shortvideo/addDownload';
    	$.ajax({
            type: "GET",
            dataType:"json",
            url: getBalanceListApi,
            data: {
            	service_type: 'ccgq',
            	platform:'web-ccgq',
            	service_uid: identity.getServiceUid(),
            	service_key: identity.getServiceKey(),
            	ccgq_uuid: identity.getCcgqUid(),
            	service_type: identity.getServiceType(),
            	uid: identity.getUid(),
            	orginal_key: opern_id,
            	orginal_type: 2,
            },
            success: function(res) {
                if(res.returnCode == '0000'){
              	    $.message({
                        message: 'å·²ä¸‹è½½ï¼Œè¯·åœ¨ä¸ªäººä¸­å¿ƒæŸ¥çœ‹',
                        type: 'success'
                    });
              	    $('.play-down').attr('src', 'https://s201.lzjoy.com/public/web_static/images/score_details/play-down-active.png');
                }else{
                	$.message({
        		        message: res.returnMsg,
        		        type: 'error'
        		    });
                }
            }
        });
    }
    
    //popupVip();
    function popupVip(){
    	if(isMobile() && !identity.getIsVip()){
    		$("body").append('<div class="popup-main" style="position: fixed;width: 4rem;right: -.6rem;bottom: 3rem;z-index: 999;"><img style="width: 100%;height: 100%;cursor: pointer;" onclick="toBuyVipPageH5()" src="http://s101.lzjoy.com/res/statics/fileupload/10b6265450b200608de96da62e56715d.png"></div>');
    	}
    }
    
    $('.to-vip').click(function(){
    	if(!identity.getUid()){
    		$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			return;
		}
    	
    	window.location.href = "/sheetplayer/ccgq_h5.html";
		return;
    });
    
    //é™ªç»ƒ
    var ladder_player_time = null;
    $('.ladder-player01').click(function(){
    	$('.img_type').hide();
		$('.ai_type').hide();
    	$('.pl').show();
    	
    	ladder_player_time = setTimeout(function(){
    		$("body").append('<iframe class="wechat-code" src="/sheetplayer/ladder_player.html?v1.1"></iframe>');
    	}, 5000);
    });
    $('.plmain').click(function(){
    	clearTimeout(ladder_player_time);
    	$("body").append('<iframe class="wechat-code" src="/sheetplayer/ladder_player.html?v1.1"></iframe>');
    });
    
    //å…¨å±
    $('.to-qupu').click(function(){
    	if(!identity.getUid()){
			$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			return;
		}
    	
    	if ($('.play-jianpu').hasClass('active')) {
    		$('.play-jianpu').click();
    	}
    	
    	if(is_lock_num == 1){
	    	$("body").append('<iframe class="wechat-code" src="/sheetplayer/code.html?v1.0"></iframe>');
			return
	    }
    	
    	if (price > 0) {
            if (has_buy == "1" || identity.getIsVip()) {
            	$('#scoreSwiper2').addClass('full-screen');
            	$('.close-full-screen').show();
            } else {
            	vip();
      		    return;
            }
        } else {
        	$('#scoreSwiper2').addClass('full-screen');
        	$('.close-full-screen').show();
        }
    })
    $('.close-full-screen').click(function(){
    	$('#scoreSwiper2').removeClass('full-screen');
     	$('.close-full-screen').hide();
    })
    
    //ä¸‹è½½
    $('.play-down').click(function(){
    	if(!identity.getUid()){
			$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			return;
		}
    	
    	if(is_lock_num == 1){
	    	$("body").append('<iframe class="wechat-code" src="/sheetplayer/code.html?v1.0"></iframe>');
			return
	    }
    	
    	var opern_id = $('.opern_name').attr('data-oid');
    	if (price > 0) {
            if (has_buy == "1" || identity.getIsVip()) {
            	addDownload(opern_id);
            } else {
            	vip();
      		    return;
            }
        } else {
        	addDownload(opern_id);
        }
    })
    
    //æ‰“å°
    $('.play-print').click(function(){
		if(!identity.getUid()){
			$("body").append('<iframe class="login-iframe" src="/sheetplayer/login_h5.html?v1.1"></iframe>');
			return;
		}
		
		if(is_lock_num == 1){
	    	$("body").append('<iframe class="wechat-code" src="/sheetplayer/code.html?v1.0"></iframe>');
			return
	    }
		
		if (price > 0) {
            if (has_buy == "1" || identity.getIsVip()) {
            	$('.play-print').attr('data-clipboard-text', pdfUrl);
            	
            	var clipboard = new Clipboard('.play-print');
                clipboard.on('success', function(e) {
                	$.message({
                        message:'å·²å¤åˆ¶PDFåœ°å€ï¼Œè¯·åœ¨æµè§ˆå™¨æ‰“å¼€è¿›è¡Œæ‰“å°',
                        type:'success'
                    });
                });
                clipboard.on('error', function(e) {
                	window.location.href = pdfUrl;
                });
            } else {
            	vip();
      		    return;
            }
        } else {
            if (pdfUrl) {
            	$('.play-print').attr('data-clipboard-text', pdfUrl);
            	
            	var clipboard = new Clipboard('.play-print');
                clipboard.on('success', function(e) {
                	$.message({
                        message:'å·²å¤åˆ¶PDFåœ°å€ï¼Œè¯·åœ¨æµè§ˆå™¨æ‰“å¼€è¿›è¡Œæ‰“å°',
                        type:'success'
                    });
                });
                clipboard.on('error', function(e) {
                	window.location.href = pdfUrl;
                });
            } else {
                $.message({
                    message: 'è¯¥ä¹è°±æš‚æœªæä¾›PDFä¸‹è½½ï¼Œè¯·å°è¯•ä¸‹è½½å…¶ä»–ç‰ˆæœ¬',
                    type: 'error'
                });
            }
        }
    })
    
    //äº”çº¿è°±/ç®€è°±åˆ‡æ¢
    $('.play-jianpu').click(function(){
    	$('.play_botton').removeClass("active");
    	audio.stop(); 
    	if(newH5Window.Player && newH5Window.Player.isPlayerReady()){
    		newH5Window.Player.resetPlay();
		}
    	
    	$(this).toggleClass('active');
    	
    	if ($(this).hasClass('active')) {
    		$('.pl').hide();
    		$('.img_type').hide();
    		$('.ai_type').show();
        } else {
        	$('.pl').hide();
        	$('.ai_type').hide();
    		$('.img_type').show();
        }
    })
    
})();
