$(function(){
	$.post("/forum/getalltips", $("[name]").serialize(),function (data) {
	       if (data) {
	           $("#total").html(data.total);
	           $("#pages").html(data.pages);
	           $("#curpage").html(data.pageNum);
	           $("#tiptable").empty();
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
		  
		$("#hidebutton").click(function () {
					 
					$.post("/forum/getalltips", $("[name]").serialize(),function (data) {
					       if (data) {
					           $("#total").html(data.total);
					           $("#pages").html(data.pages);
					           $("#curpage").html(data.pageNum);
					           $("#tiptable").empty();
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
		
		$("#inputsubmit").click(function () {
				
			 var inputtopic= $("#inputtopic").val();
			  var inputcontent= $("#inputcontent").val();
			$.post("/forum/addtip", "tiptopic=" + inputtopic + "&tipcontent=" + inputcontent,function (data) {
				if (data) {
				    alert("发帖成功");
				} else {
				    alert("发帖失败");
				}
				
				
			},"text");
			
		});
		
});

$(function () {
    //完成上一页功能
    //javascript遇到减号自动转换成数字
    $("#prePage").click(function () {
        //将页面上隐藏的pageNum的值减一
        var pageNum = $("#pageNum").val();
        $("#pageNum").val(pageNum - 1);
        //再进行一次查询的操作,点击一次查询按钮
        $("#hidebutton").click();

    });
    //完成下一页功能
    $("#nextPage").click(function () {
        //将页面上隐藏的pageNum的值加一
        var pageNum = $("#pageNum").val();
        $("#pageNum").val(pageNum * 1 + 1); //"1"+"1"->"11"
        //再进行一次查询的操作,点击一次查询按钮
        $("#hidebutton").click();

    });
    //完成go按钮的功能
    $("#goBtn").click(function () {
        //获取跳转的页数
        var gopage = $("#gopage").val() * 1;
        //如果用户输入的页码小于第一页
        if (gopage < 1) {
            gopage = 1;
        }
        //如果页码大于最后一页
        //获取总页数
        var pages = $("#pages").html();
        if (gopage > pages * 1) {
            gopage = pages;
        }

        //将页面上用户隐藏的pageNum设定为gopage


    });

});