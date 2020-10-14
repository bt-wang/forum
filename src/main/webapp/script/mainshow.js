$(function(){
function addZero(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}
function getMyDate(str) {
    var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth()+1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSen = oDate.getSeconds(),
    /*oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay) +' '+ addZero(oHour) +':'+
addZero(oMin) +':'+addZero(oSen);*/
    oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay);
    return oTime;
}
	$.post("/forum/logintime", null, function(data){
		//alert("您上次登录的日期是"+data.userregdate+"。");
		var dateTime = getMyDate(parseInt(data.userregdate));
		alert("您上次登录的日期是"+dateTime+"。");
	}, "json");


	$("#logout").click(function(){
		$.post("/forum/logout");
		top.location="/forum/";
	});

	
	$("#fuserid").html("");
	$("#fusername").html("");
	 $.post("/forum/getnowuser",null, function (data) {
		 
		 if (null!=data) {
		     // 名字写在页面上
		     $("#fusername").html(data.username);
		     //            // 将当前用户的id藏在页面上(要求隐藏起来标签)
		     //            $("#curid").val(data.userid);
		     // 将当前用户的id写在页面上
		     $("#fuserid").html(data.userid);

			  //将当前用户的头像打在页面上
			  $("#head").attr("src",data.userimage);
			  
		 }
		 
	 }, "json");
	
	
	
});