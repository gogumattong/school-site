$(function(){	
	//tab
	subTab();
	if($('div[class^="tab_st"]').length > 0){
		reactTab();
	}

	// 메뉴 텍스트 7글자 이상일 경우 적용되는 클래스
	$('#gnb .depth01 > ul > li > a > span').each(function() {
        if ($(this).text().length >= 9) {
          $(this).addClass('long');
        }
	});

	// 만약 리스트의 갯수가 1개 이하라면
	if($('.visual .item').length < 2) {
		// 컨트롤 버튼 숨기기
		$('.visual .control').hide();		
	}
});

var check = false;

$(window).resize(function() {
	this.resizeTO = setTimeout(function() {
		$(this).trigger('resizeEnd');
	}, 150 );
}).resize();

$(window).on('resizeEnd', function() {
	$w_w = $(window).innerWidth();
	resetImgZoom();
});

/** 이미지 확대보기 **/
function resetImgZoom(){
	var win_w = $(window).innerWidth();
	var zwObj =  $('.rsp_img');
	
	if(win_w<=768){
		zwObj.each(function(){
			var this_s = $(this);
			var zwObjImg = this_s.find("img");
			var zwObjUrl = zwObjImg.attr("src");

			if(check == false){
				this_s.append("<a href='" + zwObjUrl + "' class='btn-zoom' target='_blank' title='새창열림'><span class='blind'>이미지 확대보기</span></a>");
				zwObjImg.addClass("zoom");
			}
		});
		check = true;
	} else {
		zwObj.each(function(){
			var this_s = $(this);
			var zwObjImg = this_s.find("img");
			if(check == true){
				$(".btn-zoom, .btn-down", $(this).parent()).remove();
				zwObjImg.removeClass("zoom");
			}
		});
		check = false;
	}
}



// tab
function reactTab(){
	var $tab = $('div[class^="tab_st"]');

	$(window).resize(function() {
		this.resizeTO = setTimeout(function() {
			$(this).trigger('resizeEnd');
		},100 );
	}).resize();
	
	$(window).on('resizeEnd', function() {
		$tab.each(function(){
			if($(window).width() < 1241){
				$(this).addClass('reactTab');
			}else{
				$(this).removeClass('reactTab').find('> ul').removeAttr('style');
			}
		});
	});


	$tab.each(function(idx){
		var $link = $(this).find(' > ul > li.on > a');
		var $linkCopy = $link.addClass('select').clone();

		$link.attr('title', '선택된 페이지');
		$(this).find('> ul').before($linkCopy);
	});

	$(document).on('click', '.reactTab > a.select', function (e) {

		var $tabBox = $(this).next('ul');
		$tabBox.slideToggle();

		return false;
	});
}



// 서브페이지 탭
function subTab() {
	$('.useTab .tabBtn ul a').click(function(e){
		var idx = $(this).parent('li').index();

		$(this).parents('.tabBtn').find('li').removeClass('on').children('a').removeAttr('title');
		$(this).attr('title', '선택된 메뉴').parent('li').addClass('on');
		$(this).parents('.useTab').find('.tabCon > .conBox').eq(idx).addClass('active').siblings().removeClass('active');
		e.preventDefault();

		if ($(this).parents('.useTab').find('.tabCon > .conBox .slick-initialized').length) {
			$(this).parents('.useTab').find('.tabCon > .conBox .slick-initialized').slick('setPosition');
		}
	});
}
