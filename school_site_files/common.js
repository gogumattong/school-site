$(function(){
   gnb();
   fullMenu(); //20230203 추가
   mNav();
   mlnb();
   footerSiteLink();
   snsBox();
   ftMdLnk();
   tabBtn();
   sCale();
   siteMap();
   userMsch();


   //자동로그아웃
   var pathname = window.location.pathname;
   const arr = pathname.split("/");
   var sysId = arr[1];
   var reqServiceCheck = false;

   if(pathname.indexOf("/pr/printPage.do") == -1 && pathname.indexOf("/tp/tempPage") == -1)
   {
      var timeLimitVal = 60;
      var timeLimit = 1000 * 60 * timeLimitVal; //자동로그아웃 체크( 'timeLimitVal' 분 )
      var LogOutTimer = function(){
         var S =
         {
            timer : null,
            limit : timeLimit ,
            fnc   : function(){

            },
            start : function(){
               S.timer = window.setTimeout(S.fnc, S.limit);
            },
            reset : function(){
               window.clearTimeout(S.timer);
               S.start();
            }
         };
         document.onmousemove = function(){
            if(reqServiceCheck) S.reset();
         };
         document.onkeypress = function(){
            if(reqServiceCheck) S.reset();
         };
         return S;
      }();

      // 로그아웃 체크시간 설정
      LogOutTimer.limit = timeLimit;

      // 로그아웃 함수 설정
      LogOutTimer.fnc = function(){
         $.ajax({
            type: "POST",
            url: "/"+sysId+"/lo/login/loginChk.do",
            dataType: "json",
            success:function(result)
            {
               location.href="/"+sysId+"/lo/login/timeLogout.do";
            },
            error:function(data){
               console.log("오류가 발생하였습니다.\n관리자에게 문의하세요.");
            }
         });
      }

      $.ajax({
         type: "POST",
         url: "/"+sysId+"/lo/login/loginChk.do",
         dataType: "json",
         success:function(data){
            if(data.result == "Y")
            {
               reqServiceCheck = true;
               // 로그아웃 타이머 실행
               LogOutTimer.start();
            }
         },
         error:function(data){
            console.log("오류가 발생하였습니다.\n관리자에게 문의하세요.");
         }
      });
   }

	$ptBoard = $('.bbsV_cont .slider-view > div');
	$ptBoardCount = $ptBoard.length;
	$ptBoard.clone().appendTo('.bbsV_cont .slider-nav');

	if($ptBoardCount > 4){
		$ptBoardCount = 4;
	}

   setTimeout(function(){
		if($ptBoardCount > 0){
			$('.bbsV_cont .slider-view').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				adaptiveHeight: true,
				asNavFor: '.slider-nav'
			});

			$('.bbsV_cont .slider-nav').slick({
				slidesToShow: $ptBoardCount,
				slidesToScroll: 1,
				focusOnSelect: true,
				asNavFor: '.slider-view',
				responsive: [
					{ breakpoint: 1200, settings: { slidesToShow: 3 }},
					{ breakpoint: 860, settings: { slidesToShow: 2 }},
					{ breakpoint: 540, settings: { slidesToShow: 1 }}
				]
			});
		}
	},100);

   //즐겨찾기 온/오프_20230203 추가
   $(".btnBookmark").click(function(){
       if($(this).hasClass("on")) {
           $(this).addClass("off").removeClass("on");
       } else {
           $(this).addClass("on").removeClass("off");
       }
   });

   if($('#lnb').length > 0){
      lnb();
   }

   if($('#quickMenu').length > 0){
      quickMenu();
   }

   // HASH 버튼
   var hashtarget = '';
   $('.hash').on('click', function(e){
      $(this.hash).fadeIn(200).find('a').first().focus();
      hashtarget = $(this);
      e.preventDefault();
   });

   $('.dialogAllBannerList').on('click', function(e){
      $(this.hash).fadeIn(200).find('a').first().focus();
      hashtarget = $(this);
      e.preventDefault();
   });
   /*
   $('.hashClose').on('click focusout', function(e){
   - focusout해둔 이유가 .. ? 접속자 집계 클릭하면 바로 꺼져서 없앰
   */
   $('.hashClose').on('click', function(e){
      $(this.hash).fadeOut(200);
      hashtarget.focus();
      hashtarget = '';
      e.preventDefault();
   });

   // HASH TOGGLE 버튼
   $('.hashToggle').on('click', function(e){
      ($(this).hasClass('active') == true)? $(this).removeClass('active') : $(this).addClass('active');
      $(this.hash).slideToggle(200);
      e.preventDefault();
   });

   //slick-hidden 새로고침 방지
   $(document).on('click', '.slick-arrow', function(e){
      e.preventDefault();
   });

   //Language
   if($('#langList').length > 0){
      $('#langList li').last().find('a').focusout(function(){
         $('#langList').slideUp(200);
         $('#header .lang > a').removeClass('active').prop('title','언어선택 열기').focus();
      });

      $('#header .lang > a').on('click', function(){
         ($(this).hasClass("active")) ? $(this).prop('title','언어선택 닫기')  : $(this).prop('title','언어선택 열기');
      });
   }

   //moblie search
   $("#mSearchOpen").click(function (e) {
      e.preventDefault();
      $("#mSearch").addClass('active');
   });
   $("#mSearch .btnClose").click(function (e) {
      e.preventDefault();
      $("#mSearch").removeClass('active');
   });

   //resize reset
   $(window).resize(function () {
      var winWidth = $(window).width();
      if (winWidth > 1024) {
            $("#mNav, #mSearch, #lnb h2").removeClass("active");
         $('body').removeClass('bodyFix');
      }else{
         $('#gnbblind').hide();
         $('#nav').find('.active').removeClass('active');
         $('#nav').find('.on').removeClass('on');
      }
    });

   // footer top button
   $('.btn_top').click(function(e){
      e.preventDefault();
      $('html, body').stop().animate({scrollTop:0}, 400);
   });

   // [행정기관] 청렴온도계 그래프
   var barNum = $('.clean_bar .graph em strong').text();
   var barTit = $('.clean_bar .tit span');
   var barTxt = $('.clean_bar .txt');
   var graph = $('.clean_bar .graph');
   var graphWidth = $('.clean_bar .graph strong').text();

   graph.attr("style", "width"+":"+graphWidth+"%");

   if(barNum < 20){ //안전단계
      $('.clean_bar').addClass('step01');
      barTit.text("'안전'");
      barTxt.text("청렴 온도가 매우 안전합니다. 계속 청렴한 상태를 유지하세요.");
   }else if(barNum > 20 && barNum < 51 ){ //주의단계
      barTit.text("'주의'");
      $('.clean_bar').addClass('step02');
      barTxt.text("청렴한 편이지만 주의가 요구됩니다. 조금만 노력하면 안전 단계로 올라갈 수 있습니다.");
   }else if(barNum > 50 && barNum < 81 ){ //경보단계
      $('.clean_bar').addClass('step03');
      barTit.text("'경보'");
      barTxt.text("청렴과 부패를 구분할 수 있지만 부패에 쉽게 현혹될 수 있습니다. 스스로를 위해 각별히 노력해야 합니다.");
   }else{ //심각단계
      $('.clean_bar').addClass('step04');
      barTit.text("'심각'");
      barTxt.text("부패의 위험도가 상당히 높습니다. 청렴 의식의 즉각적인 변화가 요구됩니다.");
   }
});

//화면 scale
function sCale(){
   var zoomSize = 1;

   $('#scaleDown').on('click', function(e){
      if(zoomSize < 0.8){
         zoomSize = zoomSize;
		  alert("더 이상 축소할 수 없습니다.");
      }else{
         zoomSize = zoomSize - (0.1);
      }
      $('body').css('zoom', zoomSize);
      e.preventDefault();
   });

   $('#scaleUp').on('click', function(e){
      if(zoomSize > 1.3){
         zoomSize = zoomSize;
		 alert("더 이상 확대할 수 없습니다.");
      }else{
         zoomSize = zoomSize + (0.1);
      }
      $('body').css('zoom', zoomSize);
      e.preventDefault();
   });

   $('#scaleReset').on('click', function(e){
      $('body').css('zoom', 1);
	  zoomSize = 1;
      e.preventDefault();
   });
}


// web navigation
function gnb(){
   var $nav = $('#nav');
      $gnb = $('#gnb');
      $depth01 = $gnb.find('.depth01');
      $depth02 = $gnb.find('.depth02');
      $depth03 = $gnb.find('.depth03');
      $depth01.li = $depth01.find('> ul > li');
      $depth02.li = $depth02.find('> ul > li');
      $depth03.li = $depth03.find('> ul > li');
      defaultHeight = $depth01.li.innerHeight();

   //setting
   $gnb.find('li').each(function(){
      ($(this).find('> div > ul').length > 0)? $(this).addClass('dep') : '';
   });
   $gnb.find('li').last().find('> a').addClass('lastGnb');
	$depth02.find('> ul > li.dep > a').each(function(){
		$(this).prop('title', '하위메뉴 열기');
	});

   //show
   $(document).on('click', '#gnb li.dep > a',function(e){
	  var href = $(this).attr("href");
      var $this_li = $(this).parent('li');
      $this_li.toggleClass('active');
      $gnb.find('li').not($this_li).removeClass('active');
	  if(href == "#check"){
		  e.preventDefault();
	  }
		$depth02.find('> ul > li.dep > a').each(function(){
			$(this).prop('title', '하위메뉴 열기');
		});
		if($this_li.hasClass('active')){
			$(this).attr('title', '하위메뉴 닫기');
		}
   });
   $depth01.find('> ul > li > a').on('focus mouseover', function(){
      $(this).parent().addClass('on').siblings().removeClass('on');
   });

   $depth01.li.find('> a').on('focus mouseover', function(){
      $gnb.addClass('active');
      $('#gnbblind').fadeIn(100);
   });

   //fullDown show
   $(document).on('click', '#nav.fullDown .depth02 li.dep > a',function(e){
      $(this).parents('.depth02').parent('li').addClass('on').siblings().removeClass('on');
   });

   //hide
   $gnb.on('mouseleave', function(){
      gnbHide();
   });

	// 키보드로 포커스 이탈 시 숨김 처리 
	$gnb.on('focusout', function(){
		setTimeout(() => {
			var focusedElement = $(document.activeElement);
			if (!$gnb.find(focusedElement).length) {
				gnbHide();
			}
		}, 0);
	});

   /*$(document).on('focusout', '#gnb .lastGnb', function(){
      gnbHide();
   });*/

   function gnbHide(){
      $gnb.removeClass('active').find('li').removeClass('on');
      ($nav.hasClass('oneDown')==true)? $depth02.li.removeClass('active') : '';
      $('#gnbblind').fadeOut(100);
   }
}

//moblie navigation
function mNav(){
   // setting
   var gnb = $('#gnb > .depth01').clone();
   var headerUtil = $('#header .util').clone();

   $('#mNav .snb').append(headerUtil);

   $('#mgnb').append(gnb).find('li').removeAttr('style').find('.titBox').remove();

   // open & close
   $("#mNavOpen").click(function (e) {
      $("#mNav").addClass('active');
      $('body').addClass('bodyFix');
      e.preventDefault();
   });

   $("#mNavClose").click(function (e) {
      $("#mNav").removeClass('active');
      $('body').removeClass('bodyFix');
      e.preventDefault();
   });

   //show
   $(document).on('click', '#mNav #mgnb li.dep > a',function(e){
      $(this).parent('li').toggleClass('active').siblings().removeClass('active');
      e.preventDefault();
   });
}
// 회원홈페이지 모바일 메뉴
function mlnb(){
   // setting
   var mlnbwrap = $('.lnb_wrap').clone();

   $('#mlnb').append(mlnbwrap);

   // $('#mgnb').append(gnb).find('li').removeAttr('style').find('.titBox').remove();

   // // open & close
   // $("#mNavOpen").click(function (e) {
   //    $("#mNav").addClass('active');
   //    $('body').addClass('bodyFix');
   //    e.preventDefault();
   // });

   // $("#mNavClose").click(function (e) {
   //    $("#mNav").removeClass('active');
   //    $('body').removeClass('bodyFix');
   //    e.preventDefault();
   // });
}

// 회원홈페이지 모바일 메뉴
function userMsch(){
   // setting
   var userMsch = $('#searchFrm').clone();

   $('.userMsearch .mSearch_wrap').append(userMsch);
}
// 쿠키조회
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}
// sub navigation
function lnb(){

   $('#lnb li').each(function(e){
      if($(this).find('ul').length > 0){
         $(this).addClass("dep");
         ($(this).hasClass("active")) ? $(this).find('> a').prop('title','메뉴열림')  : $(this).find('> a').prop('title','메뉴닫힘');
      }
   });

   //선택된 왼쪽메뉴 상위 클래스 부여
   var currMenuId = $('#leftCurrMi').val();

   $("#"+currMenuId).addClass('active');
   if ( $("#"+currMenuId).parent().parent().hasClass('dep')) {
      $("#"+currMenuId).parent().parent().addClass('active');
   }

   if ( $("#"+currMenuId).parent().parent().parent().parent().hasClass('dep')) {
      $("#"+currMenuId).parent().parent().parent().parent().addClass('active');
   }

   //선택된 탭메뉴 상위메뉴 클래스 부여
   var tabBaseMi = $('#tabBaseMi').val();

   $("#"+tabBaseMi).addClass('active');
   if ( $("#"+tabBaseMi).parent().parent().hasClass('dep')) {
      $("#"+tabBaseMi).parent().parent().addClass('active');
   }

   if ( $("#"+tabBaseMi).parent().parent().parent().parent().hasClass('dep')) {
      $("#"+tabBaseMi).parent().parent().parent().parent().addClass('active');
   }

   $('#lnb li').each(function(e){
	  if($(this).hasClass("dep")){
		if($(this).hasClass("active")){
			$(this).find('> a').prop('title','메뉴열림');
		}
		else{
			$(this).find('> a').prop('title','메뉴닫힘');
		}
	  }
   });


   var active = false;
   $(document).on('click', '#lnb li.dep > a', function(e){

      var $li = $(this).parent('.dep');
      if($li.hasClass('active') == true){
         $li.removeClass('active').find('> a').attr('title','메뉴닫힘');
      }else{
         $li.addClass('active').find('> a').attr('title','메뉴열림');
         $li.siblings(".dep").removeClass('active').find('> a').attr('title', '메뉴닫힘');
      }

      // var $li = $(this).parent();
      // active = !active;
      // $li.toggleClass('active').siblings().removeClass('active');
      // $(this).attr('title', active ? "메뉴닫힘" : "메뉴열림");

      e.preventDefault();
   });

   $(document).on('click', '#lnb h2', function(e){
      if($(window).width() < 1241){
         $(this).toggleClass('active');
         $('#lnb nav').slideToggle();
      }
      e.preventDefault();
   });

   //resize reset
   var delta = 10;
   var timer = null;
   $(window).on('resize', function(){
      clearTimeout(timer);
      timer = setTimeout( resizeDone, delta );
   }).resize();
   function resizeDone() {
      if($(window).width() > 1239){
         $('#lnb nav').removeAttr('style');
      }
   }

}

// 사이트맵
function siteMap(){

   var mapTog = $('.siteMap .depth02 ul li');
   $(mapTog).each(function(e){
      if($(this).find('ul').length > 0){
         $(this).addClass("dep").find('a').attr('title', '메뉴닫힘');
      }
      $(".siteMap .dep > a").attr('href','#none');

      $(document).on('click', '.siteMap .dep > a', function(e){

         var $li = $(this).parent('.dep');

         if($li.hasClass('active') == true){
            $li.removeClass('active').children('a').attr('title','메뉴닫힘');
         }else{
            $li.addClass('active').children('a').attr('title','메뉴열림');
            $li.siblings(".dep").removeClass('active').children('a').attr('title', '메뉴닫힘');
         }
         e.preventDefault();
      });
   });




}

function createNavi(sysId){

   var menuLevel = $('#leftCurrLv').val();
   var currMenuId = "";
   if (menuLevel < 4) {
      currMenuId = $('#leftCurrMi').val();
   } else {
      currMenuId = $('#tabBaseMi').val();
   }

   var menuNms = new Array();
   for (var menu = $("#" + currMenuId); menu.length > 0; menu = menu.closest("ul").parent("li").children("a")) {
      menuNms.push(menu.text());
   }
   menuNms.push($("#leftMenuSj").text());
   menuNms.reverse();

    var naviHtml = "";
   naviHtml += "<ul>";
   naviHtml += "<li><a href='/"+sysId+"/main.do'><i class=\"xi-home\" aria-hidden=\"true\"></i>HOME</a></li>";

   for (var i=0; menuNms.length > i; i++){
      naviHtml += "<li>"+menuNms[i]+"</li>";
   }
   naviHtml += "</ul>";

   $("#webNavi").html(naviHtml);
}

// sub snsBox
function snsBox(){
   $(document).on('click', '.snsBox .btnShare', function(e){
      if($('#snsMore').hasClass('active') == true){
         $('#snsMore').removeClass('active');
      }else{
         $('#snsMore').addClass('active').find('a').first().focus();
      }
      e.preventDefault();
   });
   $(document).on('click', '.snsBox .close', function(e){
      snsHide();
      e.preventDefault();
   });

   $('#snsMore a.snsClose').on('click', function(e){
      snsHide();
      e.preventDefault();
   });

   $('#snsMore a:last-child').on('focusout', function(){
      snsHide();
   });

   function snsHide(){
      $('#snsMore').removeClass('active');
      $('.snsBox .btnShare').removeClass('active').focus();
   }
}

// Footer 링크 모달창
function ftMdLnk(){
   $(document).on('click', '.footer_link .mdOpn', function(e){
        $(this).parents('li').siblings('li').removeClass('actv');
      $(this).parents('li').addClass('actv').find('.mdBox').find('a').first().focus();
      e.preventDefault();
   });

   $(document).on('click', '.footer_link .mdCls', function(e){
      $('.footer_link li').removeClass('actv');
      $(this).parent('.mdBox').prev('.mdOpn').focus();
   });

   $('.footer_link .mdCls').on('focusout', function(){
      $('.footer_link li').removeClass('actv');
      $(this).parent('.mdBox').prev('.mdOpn').focus();
   });
}

//footer 사이트링크
function footerSiteLink(){
   $(document).on('click', '#siteLink button', function(e){
      $(this).parent().siblings().find('button').removeClass('active').next('.lst').slideUp();
      $(this).toggleClass('active').next('.lst').slideToggle();
	  $('#siteLink button').attr('title', '하위메뉴 열기');
      if($(this).hasClass('active')){
		$(this).attr('title', '하위메뉴 닫기');
      }
      return false;
   });
   $(document).on('focusout', '#siteLink .lst li:last-child > a', function(e){
      $('#siteLink .lst').slideUp();
   });
	$('#siteLink button').attr('title', '하위메뉴 열기');
}

// 퀵메뉴
function quickMenu(){
   $(document).on('click', '#quickMenuBtn', function(e){
      $('#quickMenu').toggleClass('active');
      if($('#quickMenu').hasClass('active')){
         $('#quickMenuBtn span').text('영역 닫기');
      }else{
         $('#quickMenuBtn span').text('영역 열기');
      }
      return false;
   });

   $(document).on('focusout', '#quickMenu li:last-of-type > a', function(e){
      $('#quickMenu').removeClass('active');
      $('#quickMenuBtn span').text('영역 열기');
   });
}

/* function valueEmpty */
jQuery.fn.valueEmpty = function() {
    if (jQuery.trim(jQuery(this).val()).length < 1 ) {
        return true;
    } else {
        return false;
    }
};

// 문서뷰어 호출
function fn_synapViewer(ctx, bbsTy){
   $.ajax({
      type : 'post',
      url : '/'+ctx+'/ft/indvdlView/synapViewer.do',
      dataType : 'json',
      data : { bbsTy : bbsTy },
      success : function(data) {
         if(data.dwldUrl != "" && data.fileSn != ""){
            var filePath = data.dwldUrl;
            var fid = data.fileSn;
            synapDocumentViewer(fid, filePath);
         } else {
            var txt = "";
            if(bbsTy == "INDVDL"){
               txt = "개인정보처리방침";
            } else if(bbsTy == "VIDOPER"){
               txt = "영상정보처리기기운영방침";
            }
            alert("등록 된 " + txt + "이 없습니다.");
            return false;
         }
      },
      error : function() {
         alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
      }
   });
}

// Synap Document View(문서 뷰어 공통 모듈 2022.01.25 추가)
function synapDocumentViewer(fid, filePath) { // fid: File ID, filePath: File Download URL
    var convertType = "0";

    // localhost
    /*var localhost = "http://localhost:8088";
    var dwldUrl = "/common/nttFileDownload.do?fileKey=" + filePath;

    var flpth = localhost + dwldUrl;

    var fileType = "URL";
    var encodedUrl = encodeURIComponent(flpth);
    var requestUrl = "http://localhost:9090/SynapDocViewServer/job?fid=" + fid // Server Address Setting
                            + "&filePath=" + encodedUrl
                            + "&convertType=" + convertType + "&fileType=" + fileType;
    window.open(requestUrl, "preview");*/

    // 가오픈 서버
    var localhost = "http://218.50.200.23:80";   // 218.50.200.23:80, 218.50.200.24:80, 218.50.200.25:80
    var dwldUrl = "/common/nttFileDownload.do?fileKey=" + filePath;

    var flpth = localhost + dwldUrl;

    var fileType = "URL";
    var encodedUrl = encodeURIComponent(flpth);
    var requestUrl = "http://schoolhpdoc.sje.go.kr:8080/SynapDocViewServer/job?fid=" + fid // Server Address Setting
                            + "&filePath=" + encodedUrl
                            + "&convertType=" + convertType + "&fileType=" + fileType;
    window.open(requestUrl, "preview");
}

// 개인, 영상정보처리방침 게시판 이동
function fn_bbsMvmn(ctx, bbsTy){
   $.ajax({
      type : 'post',
      url : '/'+ctx+'/ft/indvdlView/bbsMvmn.do',
      dataType : 'json',
      data : {
            sysId : ctx,
            bbsTy : bbsTy
         },
      success : function(data) {
         window.open(data.url);
      },
      error : function() {
         alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
      }
   });
}

//첨부파일 다운(팝오버)
$(document).on('click', '.viewerPop', function(){
   var obj = $(this);
   var bbsTy = $(this).attr("data-bbsTy");
   var ctx = $(this).attr("data-ctx");

   chk = obj.attr('chk');

   if (chk == null) {
         obj.attr('chk','1');
         chk = 1;
   }

   if (chk == 1) {
      obj.popover({
         title : '상세보기',
         html : true,
         container : "body",
         toggle : "popover",
         //trigger: 'focus',   // 클릭한 요소 이외의 부분을 클릭하면 팝업 삭제 되는 속성
         placement : "top",
         content : function(){
         html = "";
            // 문서뷰어 호출 synapDocumentViewer(fid, filePath)
            html += "<a href='javascript:' onClick=\"fn_synapViewer('" + ctx + "','" + bbsTy + "')\" class='btn_view' target='_blank'><i class='xi-search' aria-hidden='true'></i>바로보기</a>";
            // 이전 내역 게시판 이동
            html += "<a href='javascript:' onClick=\"fn_bbsMvmn('" + ctx + "','" + bbsTy + "')\" class='btn_view'><i class='xi-document' aria-hidden='true'></i>이전 게시글 보기</a>";

            return html;
         }
      }).popover('show');
      obj.attr('chk','0');
   } else {
      obj.popover('hide');
      obj.attr('chk','1');
   }
});

// 마이페이지 클릭 시 사용자 정보 페이지 이동
$(document).on('click', '.myPage', function(){
   var ctx = $(this).attr("data-id");

   $.ajax({
      type : 'post',
      url : '/'+ctx+'/my/myPage/selectSbscrbInfo.do',
      dataType : 'json',
      data : {
            sysId : ctx
         },
      success : function(data) {
         if(data.url != ""){
            var url = data.url;
            location.href = url;
         }else{
            alert("등록 된 마이페이지 메뉴가 없습니다.");
         }
      },
      error : function() {
         alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
      }
   });
});

$(document).on('keyup', '#topSearch_1', function(key) {
   if(key.keyCode == 13) {
      commonSearch();
   }
});

$(document).on('click', 'form[name=siteSearchForm] > button', function() {
   commonSearch();
});

//통합검색
function commonSearch() {

   $('form[name=siteSearchForm]').attr('onSubmit', 'return false;');

   var url = window.location.href;
   var sysId = url.split('/')[3];

   var searchText = $('#topSearch_1').val();

   location.href = "/search/front/Search.jsp?sysId="+sysId+"&qt="+searchText;
}

//full menu_20230203 추가
function fullMenu(){
   // setting
   var gnb = $('#gnb > .depth01').clone();
   var headerlogo = $('#header h1').clone();
   var headerLogin = $('#header .link').clone();

   $('#fullMenuArea .snb').append(headerlogo,"<div class='fullMenu_tit'><em>세종학교</em> 사이트맵</div>", headerLogin);
   $('#fullMenu').append(gnb);

   // open & close
   $("#fullMenuOpen").click(function (e) {
      $("#fullMenuArea").fadeIn(100);
      $('body').addClass('bodyFix');
      e.preventDefault();
   });

   $("#fullMenuClose").on('click focusout', function(e){
      $("#fullMenuArea").fadeOut(100);
      $('body').removeClass('bodyFix');
      e.preventDefault();

      $('#fullMenuOpen').focus();
   });

   //show
   $(document).on('click', '#fullMenu li.dep > a',function(e){
    $(this).parent('li').toggleClass('active').siblings().removeClass('active');
      e.preventDefault();
   });

   $(document).on('focus mouseover', '#fullMenu .depth02',function(e){
    if($(window).width() > 1240){
        $(this).parent('li').addClass('active').siblings().removeClass('active');
    }
   });

   $(document).on('mouseleave', '#fullMenu .depth01 > ul',function(e){
    if($(window).width() > 1240){
        $('#fullMenu .depth01 > ul > li').removeClass('active');
    }
   });
}

// 즐겨찾기 등록 및 삭제
function fn_bkmkManage(sysId, baseMenuId, currMenuId, mberId, accessUrl, bkmkAt){

   $.ajax({
      type : "post",
      url : "/" + sysId + "/my/myPage/bkmkManage.do",
      dataType : "json",
      data : {
            sysId : sysId,
            baseMenuId : baseMenuId,
            currMenuId : currMenuId,
            mberId : mberId,
            accessUrl : accessUrl,
            bkmkAt : bkmkAt
         },
      success : function(data) {
         if(data.resultAt == "I"){
            alert("즐겨찾기 등록이 완료되었습니다.");
            location.reload();
         } else {
            alert("즐겨찾기 삭제가 완료되었습니다.");
            location.reload();
         }
      },
      error : function() {
         alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
      }
   });
}

/* 탭 버튼 */
function tabBtn() {
   $(document).ready(function() {
      $("#con_com_box > div").hide(); // Initially hide all content
      $("#tabs li:first").addClass('on').children("a").prepend('<em class="hid">선택된 페이지 </em>'); // Activate first tab
      $("#con_com_box > div:first").fadeIn(); // Show first tab content

      $('#tabs a').click(function(e) {
         e.preventDefault();
         $("#con_com_box > div").hide(); //Hide all content
         $("#tabs li").removeClass('on').find("em").remove(); //Reset id's
         $(this).prepend('<em class="hid">선택된 페이지 </em>').parent().addClass('on'); // Activate this
         $('#' + $(this).attr('title')).fadeIn(); // Show content for current tab
      });
   });
}

// 메뉴 접근 권한 체크
function menuAccessCheck(mi, sysId, obj)
{
   var url = "/" + sysId + "/mn/menu/menuAccess.do"
   var host = location.href.toLowerCase();
   var target = $(obj).attr("target");
   $(obj).removeAttr("target");

   //메뉴접근 확인후 해당 메뉴 들어와서 다른곳으로 이동할때 계속 그 페이지에만 머무는 거 막음
   if(host.indexOf(mi) > -1){
      return false;
   }

   $.ajax({
      type : "post",
      url : url,
      data : {
         menuId : mi
      },
      dataType : "json",
      success : function(data) {
         var accessVal = JSON.parse(data.accessVal);
         if (accessVal == "Y") {
			 // 2025.05.02. 모바일 이면 하위 메뉴가 있으면 페이지 이동 안되게
			 if ($(obj).closest('#mNav').length > 0) {
				 if ($(obj).next().is('div')) {
					 return false;
				 }
			 }

            var accessUrl = JSON.parse(data.menuUrl);
            if(target != "_blank") {
               location.href = accessUrl;
            } else {
               window.open(accessUrl);
            }
         } else {
            alert("접근 권한이 없습니다.");
            return false;
         }
      },
      error : function(data) {
         alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
      }
   });
}

function goBkmk(sysId, mi)
{
   var menuUrlAddr = $(location).attr('href');
   console.log("url : " + url);
   var url = "/" + sysId + "/co/my/insertBkmkInfo.do"
   $.ajax({
      type : "post",
      url : url,
      data : {
         menuUrlAddr : menuUrlAddr,
         sysId : sysId,
         menuId : mi
      },
      dataType : "json",
      success : function(data)
      {
         if(data.resultAt == "Y")
         {
            alert("자주가는 메뉴로 등록되었습니다.");
            return false;
         }
         else
         {
            alert("로그인 정보가 없습니다.\n로그인을 해주세요.");
            return false;
         }
      },
      error : function(data) {
         alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
      }
   });
}

function goPrint(sysId) {
   var popW = 1000;  // 팝업창 넓이
   var popH = 900;  // 팝업창 높이
   var popX  = (document.body.clientWidth / 2) - (popW / 2) + window.screenLeft; // 팝업창 X 좌표 계산
   var popY  = (document.body.clientHeight / 2) - (popH) + window.screenTop; // 팝업창 Y 좌표 계산
   var referer = encodeURIComponent(location.href);

   window.open("/"+sysId+"/pr/printPage.do?referer="+referer, "printPage",'top='+popY+',left='+popX+',width='+popW+',height='+popH+',scrollbars=yes');
}


//파일 다운로드
function mfn_fileDownload(fileKey){
   if(fileKey != "" || fileKey == null){
      location.href="/common/fileDownload.do?fileKey="+fileKey;
   }
};

//팝업 쿠키 저장(하루설정시 현시점에서 다음날00시까지)
function setCookie(cookieName, value,closePd){
    var todayDate = new Date();

   //GMT15:00:00 -> 대한민국시간기준 다음날 00:00:00
   //20/03/12T15:00:00 -> 20/03/13 00:00:00
   //closePd를 -1처리
   todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
   if ( todayDate > new Date() ){
      closePd = closePd - 1;
   }
   todayDate.setDate( todayDate.getDate() + parseInt(closePd) );

   document.cookie = cookieName + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

// 쿠키조회
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

// 팝업 닫기(쿠키설정)
$(document).on('click', '.popupCookieSet', function() {
   var popValue = $(this).attr("data-seq");
   var closepd = $(this).attr("data-closepd");
   var cookieNM = "popCookie"+popValue;

   setCookie(cookieNM, "hide", closepd);
   //팝업리스트, 슬라이드팝업, 상단팝업, 일반팝업 구분
   if(popValue.indexOf('popCookiePopUpList_') > -1){
      $("#lPopList").parent().remove();
   }else if(popValue.indexOf('popCookiePopUpSlide_') > -1){
      $("#SPopList").parent().remove();
   }else if(popValue.indexOf('popCookiePopUpTop_') > -1){
      $('#wrap').removeClass('openPop');
   }else{
      $("#popupNormal"+popValue).parent().remove();
   }
});


//텍스트 입력 후 커서 변경시 글자수 체크
function lengthCheck(obj, length) {
    if(Number(byteCheck($(obj))) > Number(length)) {
        alert("입력가능문자수("+length+"Byte)를 초과하였습니다.\n입력문자 "+Number(byteCheck($(obj)))+"Byte");
        $(obj).val($(obj).val().substring(0,length));
        $(obj).focus();
        return false;
    }
}

//바이트수 체크
function byteCheck(el){
    var codeByte = 0;
    for (var idx = 0; idx < el.val().length; idx++) {
        var oneChar = escape(el.val().charAt(idx));
        if ( oneChar.length == 1 ) {
            codeByte ++;
        } else if (oneChar.indexOf("%u") != -1) {//한글
            codeByte += 3;
        } else if (oneChar.indexOf("%") != -1) {
            codeByte ++;
        }
    }
    return codeByte;
}

var KakaoInitYN = 'N';
function goSns(shareTy){
	var htmlTitle = $("#snsHtmlTitle").val();
	var title = '';
	var menuTitle = $("#snsMenuTitle").val();
	var mi = $("#snsCurrMenuId").val();

	var _br2  = encodeURIComponent('\n');
	var linkUrl = location.href;

	if(linkUrl.indexOf('?') > -1) {
		if(linkUrl.indexOf('mi=') < 0) {
			linkUrl = linkUrl + '&mi=' +mi
		}
	} else {
		if(linkUrl.indexOf('mi=') < 0) {
			linkUrl = linkUrl + '?mi=' +mi
		}
	}

	linkUrl = encodeURIComponent(linkUrl);

	if(menuTitle != '메뉴명없음') {
		title = htmlTitle + ' : ' + menuTitle;
	} else {
		title = htmlTitle;
	}

	title = encodeURIComponent(title);

	if(shareTy == "fbook") {
		window.open('https://www.facebook.com/sharer/sharer.php?u='+ linkUrl, 'facebook', 'width=626,height=436');
	} else if(shareTy == "twt") {
		window.open('https://twitter.com/intent/tweet?url='+ linkUrl + '&text=' + title + '&original_referer=' + linkUrl, 'twitter', 'width=626,height=436');
	} else if(shareTy == "kkot") {
		
		if(KakaoInitYN == 'N'){
			/*kakao developer에 어플리케이션 등록 후 키 변경  필요*/
			Kakao.init('ac8a22821c8cc29adbd8fe2b3f4bd411');
			KakaoInitYN = 'Y';
		}
		
		var description = '#전라남도교육청교육원구정보원 #학교홈페이지 #기관홈페이지';
		//var description = '#'+$('.header h1 a').attr('title');
		var title = $('.title').text();
		if(title == "") {
			title = document.title;
		}
		
		Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
				title: title, //제목
				description: description, // 로고 title 값(sysNM), 설명
				imageUrl: 'https://www.jnei.go.kr/images/co/na/kakao.jpg', //이미지URL
				link: {
					mobileWebUrl: location.href, //공유할 URL
					webUrl: location.href //공유할 URL
				}
			},
			/* social: {
				likeCount: 286,
				commentCount: 45,
				sharedCount: 845
			}, */
			buttons: [
			  	{
			  		title: '자세히보기',
			  		link: {
			  			mobileWebUrl: location.href,
			  			webUrl: location.href
			  		}
			  	}
			  	/*, {
			  		title: '링크 보기',
			  		link: {
			  			mobileWebUrl: linkUrl,
			  			webUrl: linkUrl
			  		}
			  	} */
			 ]
	    });

	//} else if(shareTy == "kkot") {
		//window.open('https://story.kakao.com/s/share?url='+ linkUrl + '&text=' + title, 'kakaostory', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
	} else if(shareTy == "naver") {
		window.open('http://band.us/plugin/share?body='+ title + _br2 + linkUrl + '&route=' + linkUrl, 'band', 'width=410, height=540, resizable=no');
	}
}


var validation = function(Ty){
	var $item = $(".nullFalse");
	var chk = true;
	$.each($item, function(index, val){
		var title = $(this).attr("title");
		var type = $(this).attr("type");
		if(type == "checkbox"){
		var name = $(this).attr("name");
			if(!$('input:checkbox[name='+name+']').is(":checked")){
				alert(title+"을(를) 입력해주세요.");
				$(this).focus();
				chk = false;
				return false;
			}
		}

		if(!$(this).val())
		{
			alert(title+"을(를) 입력해주세요.");
			$(this).focus();
			chk = false;
			return false;
		}
	});
	return chk;
}


var validationExc = function(Ty){

	if(Ty.indexOf(",")){
		Ty = Ty.split(",");
	}

	var chk = true;
	$.each(Ty, function(index, val){
		var title = $(Ty[index]).attr("title");
		var type = $(Ty[index]).attr("type");
		if(type == "checkbox"){
		var name = $(Ty[index]).attr("name");
			if(!$('input:checkbox[name='+name+']').is(":checked")){
				alert(title+"을(를) 입력해주세요.");
				$(Ty[index]).focus();
				chk = false;
				return false;
			}
		}

		if(!$(Ty[index]).val())
		{
			alert(title+"을(를) 입력해주세요.");
			$(Ty[index]).focus();
			chk = false;
			return false;
		}
	});
	return chk;
}


//통합예약 연락처 체크(관리자페이지에서 사용)
function checkTelNum(telNum, focusObj, itemNm){
	var pnum = telNum;
	pnum=pnum.replace(/-|\s/g,'');
	if(pnum.length<10 || pnum.length>11) {
		alert("잘못된 "+itemNm+" 입니다.");
		focusObj.focus();
		return false;
	} else if(pnum.length == 10) {
		pnum=pnum.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
	} else if(pnum.length == 11) {
		pnum=pnum.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3") 
	}
	var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
	if ( !regExp.test( pnum ) ) {
		alert("잘못된 "+itemNm+" 입니다.");
		focusObj.focus();
		return false;
	}
	
	return true;
}



// 2025.03.11. 미리보기 기능
function helpDocTransView(fileKey){
	// 데이터 로드
	loadingStart();	    
	setTimeout("hlepfileView('"+fileKey+"')", 300);
}

function helpfileView(dwldUrl) {
	/*기본정보*/
	$.ajax({
		type : "post",
		url : "/help/na/ntt/selectDocFileInfoCk.do",
		data : { 
			fileKey : dwldUrl
		},
		dataType : "json",
		success : function(data) {
				console.log(data);
			var val = "";
			if(data.fileCk =="Y"){
				val = data.value;
				val = val.replace(/"/g, '');
				window.open("https://doc.jne.kr/streamdocs/view/sd;streamdocsId="+val);
				loadingEnd();
			}else{
				alert("파일이 존재하지 않습니다");	
				//loadingEnd();
			}
			
		},
		error : function(data) {
			alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
			loadingEnd();
		}		
	});	
}


$(function() {
	$('span.ico img').on('mouseover', function(e){
		e.preventDefault();
		var imgname = $(this).attr('alt');
	$(this).after('<span class="subtit">' + imgname + '</span>');
	});
	$('span.ico img').on('mouseleave', function(e){
		$(this).next('span').remove();
	});
});


// 2025.06.23. alert메시지 바꾸기
(function() {
	var originalAlert = window.alert;

	window.alert = function(message) {
		if (message === " Invalid Domain. ") {
		  // 이 메시지는 무시
		  //console.warn('Blocked alert:', message); // 로그 남기고 무시 (선택 사항)
		  return;
		}
		originalAlert(message); // 원래 alert 동작 수행
	};
})();