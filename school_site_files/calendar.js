		
// 달력 조회기간
$(document).ready(function() {
	 
	//******************************************************************************
	// 상세검색 달력 스크립트
	//******************************************************************************
	$("#beginDt, #endDt, #beginDtm, #endDtm, #beginDt2, #endDt2, #rgsrDt, #intvDtm1, #lendDtm1, #sptExprnBeginDtm, #sptExprnEndDtm, #dlbrtDtm, #applcntBrthdy, #smsDt").datepicker({
		dateFormat: 'yy/mm/dd',
		closeText: '닫기',
		prevText: '이전 달',
		nextText: '다음 달',
		currentText: '오늘',
		yearRange: 'c-100:c+10',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		firstDay: 0,
		isRTL: false,
		buttonImageOnly: true, //이미지표시
		showMonthAfterYear: true,
		showButtonPanel: true, 
		changeMonth: true, 
		changeYear: true,
		clearVal: '지우기'
	});

	//******************************************************************************
	// 상세검색 달력 스크립트(달력이미지 포함)
	//******************************************************************************
	$("#searchBgnde, #searchEndde").datepicker({
		showOn: "both",
		buttonImage: "/images/com/btn_calendar.png",
		//buttonImage: "/images/com/btn_calendar.gif",
		buttonImageOnly: true, //이미지표시
		dateFormat: 'yy/mm/dd',
		closeText: '닫기',
		prevText: '이전 달',
		nextText: '다음 달',
		currentText: '오늘',
		yearRange: 'c-100:c+10',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		showButtonPanel: true, 
		changeMonth: true, 
		changeYear: true,
	});
	
	//******************************************************************************
	// 상세검색 달력 스크립트(현재날짜 이후만 선택 가능)
	//******************************************************************************
	$("#hopeComptDtm, #comptPlanDtm").datepicker({
		showOn: "both",
		buttonImage: "/images/com/btn_calendar.png",
		//buttonImage: "/images/com/btn_calendar.gif",
		buttonImageOnly: true, //이미지표시
		dateFormat: 'yy/mm/dd',
		closeText: '닫기',
		prevText: '이전 달',
		nextText: '다음 달',
		currentText: '오늘',
		yearRange: 'c-100:c+10',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		showButtonPanel: true, 
		changeMonth: true, 
		changeYear: true,
		minDate: 0,
	});
});

//달력 조회기간
var calendar = {};
(function() {
	'use strict';
	$(document).ready(function() {
		// ******************************************************************************
		// 상세검색 달력 스크립트
		// ******************************************************************************
		calendar.addCalendar = function(selector) {
			$(selector).datepicker({
			dateFormat : 'yy/mm/dd',
			closeText : '닫기',
			prevText : '이전 달',
			nextText : '다음 달',
			currentText : '오늘',
			yearRange : 'c-100:c+10',
			monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			dayNames : ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesShort : ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
			weekHeader : 'Wk',
			firstDay : 0,
			isRTL : false,
			buttonImageOnly : true, // 이미지표시
			showMonthAfterYear : true,
			showButtonPanel : true,
			changeMonth : true,
			changeYear : true,
			});
		};
		// 문자열 변환, YYYY/MM/DD 포맷
		calendar.toString = function(date) {
			var retStr = "";
			switch (calendar.isValidDate(date)) {
				case true :
					break;
				default :
					return "";
			}
			try {
				var curYear = date.getFullYear();
				retStr += curYear;
				retStr += "/";
				var curMonth = date.getMonth() + 1;
				retStr += curMonth;
				retStr += "/";
				var curDate = date.getDate();
				retStr += curDate;
			} catch (e0) {
				retStr = "";
			}
			return retStr;
		};
		// Date 값 확인
		calendar.isValidDate = function(date) {
			return date instanceof Date && !isNaN(date);
		}
		calendar.addCalendar("#beginDt, #endDt");
	});
});

