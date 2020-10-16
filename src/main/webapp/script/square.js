$(function(){
	 $.post("/forum/getalltips", $("[name]").serialize(),function (data) {
            if (data) {
                $("#total").html(data.total);
                $("#pages").html(data.pages);
                $("#curpage").html(data.pageNum);
                $("#resulttable tr:gt(0)").remove();
                for (var i = 0; i < data.list.length; i++) {
                    var userinfo = data.list[i];
                    var oTr = $("<div></div>").addClass("media well") ;
                    $("<h4> </h4>").addClass("media-heading").html(userinfo.tiptopic).appendTo(oTr);
                    $("<div></div>").html(userinfo.tipcontent).appendTo(oTr);
      //               $("<td></td>").html(new Date(userinfo.userbirthday).format("yyyy-MM-dd")).appendTo(oTr);
      //               $("<td></td>").html(userinfo.usersex).appendTo(oTr);
					 // $("<td></td>").html(userinfo.useremail).appendTo(oTr);
      //               $("<td></td>").html(new Date(userinfo.userregdate).format("yyyy-MM-dd")).appendTo(oTr);
                
              
					
					   
		
					oTr.appendTo("#tiptable");
					
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
        },"json");
});