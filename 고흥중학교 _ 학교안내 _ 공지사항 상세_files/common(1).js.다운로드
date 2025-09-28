// 필수입력오류체크
function cmnErrCertChk(reqForm, reqName, reqFoucs)
{
	if(reqForm.value == "")
	{
		alert(reqName +" 입력해주세요");
		reqForm.value = "";
		if(reqForm != null && reqFoucs != "N")
			reqForm.focus();
		return false;
	}
	return true;
}

// 숫자입력오류체크
function numErrChk(reqForm, reqMsg)
{
	if(isNaN(reqForm.value) || reqForm.value=="")
	{
		if(reqMsg == null ) reqMsg = "";
		alert(reqMsg+"숫자만 입력할수 있습니다");
		reqForm.value = "0";
		reqForm.focus();
		return false;
	}
	return true;
}

// 영문유효성체크
function engErrChk(reqForm, reqMsg)
{
	var eng_check = /^[a-zA-Z]+$/;

	if(!eng_check.test(reqForm.value) )
	{
		if(reqMsg == null ) reqMsg = "";
		alert(reqMsg+"영문만 입력할 수 있습니다.");
		
		return false;
	}
	return true;
}
	
function CheckEMail (emailStr) 
{  
	// 전자메일 패턴. 사용자이름@도메인 의 형식을 검사함  
	var emailPat=/^(.+)@(.+)$/;
	// 포함되지 말아야할 특수문자들 ( ) < > @ , ; : \ " . [ ]  
	var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";  
	// 포함될 수 있는 특수문자들 (나머지)  
	var validChars="\[^\\s" + specialChars + "\]";  
	// 아래의 경우는 사용자 이름에 따옴표가 있는 경우. RFC표준사항임  
	var quotedUser="(\"[^\"]*\")"; 
	// 도메인 대신 IP를 사용할 수있음  
	// 예를 들어 laday@[210.120.253.10]은 올바른 메일 주소 "[", "]"이 반드시 필요 
	var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;  
	// 기본적인 아토믹에 해당됨  
	var atom=validChars + '+';  
	// 사용자로 사용될 수 있는 문자를 나타냄  
	var word="(" + atom + "|" + quotedUser + ")";  
	// 사용자의 패턴을 나타냄. 위의 워드가 .단위로 여러개 올 수있음  
	var userPat=new RegExp("^" + word + "(\\." + word + ")*$");  
	// 아래의 것은 일반적인 도메인 패턴에 해당됨  
	var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");  
	// @을 기준으로 사용자와 도메인으로 나눔. 편의를 위함  
	var matchArray=emailStr.match(emailPat);  
	if (matchArray==null) 
	{    
	// 두개 이상 또는 @이 아예 없는 경우   
		alert("메일주소 형식이 잘못되어 있습니다 (공백 및 @과 .을 확인해 보세요)");    
		return false; 
	}  
	var user=matchArray[1];  
	var domain=matchArray[2];  
	// 사용자 부분이 제대로 되었는지 검사  
	if (user.match(userPat)==null) 
	{    
		alert("메일 아이디가 올바르지 않습니다");    
		return false;  
	} 
	// 도메인 부분이 IP로 되어 있는 경우 
	var IPArray=domain.match(ipDomainPat);  
	if (IPArray!=null) 
	{    
		for (var i=1;i<=4;i++) 
		{      
			if (IPArray[i]>255) 
			{        
				alert("IP 주소 형식이 올바르지 않습니다");        
				return false;      
			}    
		}    
		return true;  
	}  
	// 도메인 이름이 심볼릭 네임인 경우 올바르지 않음  
	var domainArray=domain.match(domainPat);  
	if (domainArray==null) 
	{    
		alert("도메인 형식이 올바르지 않습니다");   
		return false; 
	}  
	// 도메인 형식 검사에 통과했더라도, 마지막 세개 또는 두개의 문자(com, net, kr등등)  
	// 까지 올바른지 검사. 최상위 도메인은 반드시 세글자 아니면 두 글자임  
	var atomPat=new RegExp(atom,"g");  
	var domArr=domain.match(atomPat);  
	var len=domArr.length;  
	if (domArr[domArr.length-1].length<2 ||    domArr[domArr.length-1].length>3) 
	{    
		alert("도메인 주소의 마지막 필드는 반드시 세글자 도메인 또는 두글자 나라이어야 합니다.");    
		return false; 
	}  
	// 호스트이름이 있는지 검사  
	if (len<2) 
	{    
		alert("호스트 이름이 존재하지 않습니다. 호스트 이름은 반드시 2글자 이상이어야 합니다");    
		return false;  
	}  
	
	return true;
}

function onNextFocus(nextID){
	if (event.keyCode == 13) {
		$("#"+nextID).focus(); 
	}
}

function onNextFunc(nextFunc){
	if (event.keyCode == 13) {
		eval(""+nextFunc);
	}
}

function fnCancel(){
	history.back(-2);
}

function fnUrlCancel(url){
	location.href = url;
}

function fnTextareaPrint(fnNttCn){
	fnNttCn = fnNttCn.split("\u0020").join("&nbsp;");
	fnNttCn = fnNttCn.split("\r\n").join("<br/>");
	fnNttCn = fnNttCn.split("\n").join("<br/>");
	return fnNttCn;
}

function fnReplaceAll(val,beforeVal,afterVal){
	fnNttCn = val.split(beforeVal).join(afterVal);
	return fnNttCn;
}

function fnSplit(val,splitVal){
	arrayVal = val.split(splitVal);
	return arrayVal;
}
