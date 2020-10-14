$(function () {
	
	$("#searchBtnShow").click(function(){
		$("#pageNum").val(1);
		$("#searchBtn").click();
	});
	

    $("#searchBtn").click(function () {
        $.post("/forum/getallusers", $("[name]").serialize(),function (data) {
            if (data) {
                $("#total").html(data.total);
                $("#pages").html(data.pages);
                $("#curpage").html(data.pageNum);
                $("#resulttable tr:gt(0)").remove();
                for (var i = 0; i < data.list.length; i++) {
                    var userinfo = data.list[i];
                    var oTr = $("<tr></tr>");
                    $("<td></td>").html(userinfo.userid).appendTo(oTr);
                    $("<td></td>").html(userinfo.username).appendTo(oTr);
                    $("<td></td>").html(new Date(userinfo.userbirthday).format("yyyy-MM-dd")).appendTo(oTr);
                    $("<td></td>").html(userinfo.usersex).appendTo(oTr);
					 $("<td></td>").html(userinfo.useremail).appendTo(oTr);
                    $("<td></td>").html(new Date(userinfo.userregdate).format("yyyy-MM-dd")).appendTo(oTr);
                
              
					var oTd=$("<td></td>").appendTo(oTr);
					   
		
					oTr.appendTo("#resulttable");
					
                }
                $("#resultdiv").show();
                $("#pagectrl").show();
                if (data.isFirstPage) {
					$("#prePage").hide();
					$("#prePageSpan").show();
                   
                } 
                else {
                   $("#prePage").show();
                   $("#prePageSpan").hide();
                }
                if (data.isLastPage) {
                    $("#nextPage").hide();
					$("#nextPageSpan").show();
                } 
                else {
                   $("#nextPage").show();
                   $("#nextPageSpan").hide();
                }
            } 
            else {
                $("#resultdiv").hide();
                $("#pagectrl").hide();
                alert("没有查到数据");
            }
        }, "json");

    });
});



$(function(){
	
	$("#prePage").click(function(){
		var pageNum=$("#pageNum").val();
		$("#pageNum").val(pageNum-1);
		$("#searchBtn").click();
	});
	$("#nextPage").click(function(){
		var pageNum=$("#pageNum").val();
		$("#pageNum").val(pageNum*1+1);
		$("#searchBtn").click();
	});
	
	$("#goBtn").click(function(){
		
		var gopage=$("#gopage").val()*1;
		
			if(gopage<1){
				gopage=1;
			}
			var pages=$("#pages").html()*1;
			if(gopage>pages){
				gopage=pages;
			}
			$("#pageNum").val(gopage);
			$("#searchBtn").click();
		
	});
	
});


