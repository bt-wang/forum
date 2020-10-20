$(function(){
	$("#registerusername").blur(function(){
	    //验证用户名输入
	    var registerusername = $(this).val();
	    if(!registerusername){
	        return;
	    }
	    //ajax操作
	    $.post("/forum/checkname","username="+registerusername,function(data){
	        if(data == true){
	            $("#registerusernamecheck").show().css("color","white").html("该名字可用").fadeOut(2000);
	        }
	        else{
	            $("#registerusernamecheck").show().css("color","white").html("该名字不可用").fadeOut(2000);
	        }
	    })
	});
	$("#registeremail").blur(function(){
	    //验证用户名输入
	    var registeremail = $(this).val();
		var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
	    if(myReg.test(registeremail)){
	         $("#registeremailcheck").show().css("color","white").html("邮箱格式正确").fadeOut(2000);
	    }
	   
	        else{
	             $("#registeremailcheck").show().css("color","white").html("邮箱格式不正确").fadeOut(2000);
	        }
	   
	});
	
	$("#loginok").click(function(){
		var loginusername=$("#loginusername").val();
		var loginuserpwd=$("#userloginpassword").val();
		if(!loginusername){
			alert("写用户名");
			return;
		}
		if(!loginuserpwd){
			alert("写密码");
			return;
		}
		$.post("/forum/login","username="+loginusername+"&userpassword="+loginuserpwd,function(data){
			if(data){
				alert("密码正确");
				window.location.href="/forum/mainshow.html";
			}
			else{
				alert("密码错误");
			}
			
		},"text");
		
	});
	
	$("#adminloginok").click(function(){
		var adminloginusername=$("#adminloginusername").val();
		var adminloginpassword=$("#adminloginpassword").val();
		if(!adminloginusername){
			alert("写用户名");
			return;
		}
		if(!adminloginpassword){
			alert("写密码");
			return;
		}
		$.post("/forum/adminlogin","adminname="+adminloginusername+"&adminpassword="+adminloginpassword,function(data){
			if(data){
				alert("密码正确");
				window.location.href="/forum/admin.html";
			}
			else{
				alert("密码错误");
			}
			
		},"text");
		
	});
	
	
	$("#registerok").click(function(){
		
		var registerusername=$("#registerusername").val();
		var registeruserbirthday=$("#registeruserbirthday").val();
		var registerFile=$("#exampleInputFile").val();
		var registersex="";
		var registersex=$("input[name='gender']:checked").val();
		var registeremail=$("#registeremail").val();
		
		var registeruserpwd=$("#registeruserpwd").val();
		var registeragainuserpwd=$("#registeragainuserpwd").val();
		var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
		if(!registerusername){
			alert("请输入用户名");
			return;
		}
		if(registeruserpwd!=registeragainuserpwd){
			alert("两次密码不一致");
			return;
		}
		if(!registeruserpwd){
			alert("请输入密码");
			return;
		}
		if(!registeremail){
			alert("请输入邮箱");
			return;
		}
		if(!myReg.test(registeremail)){
		    alert("邮箱格式错误");
		    return;
		}
		
			$.post("/forum/register","username="+registerusername+"&userpassword="+registeruserpwd+"&userbirthday="+registeruserbirthday+"&usersex="+registersex+"&userimage="+registerFile+"&useremail="+registeremail,function(data){
				 if(data){
				 	alert("注册成功");
					$("#tologin").click();
				}
				 else{
					alert("注册失败");
				 }
				
			},"text");
		
	});
	
	$("#forgetok").click(function(){
		
		var forgetusername=$("#forgetusername").val();
		var forgetuserpwd=$("#forgetuserpwd").val();
		var forgetagainuserpwd=$("#forgetagainuserpwd").val();
		var forgetemail=$("#forgetemail").val();
		if(forgetuserpwd!=forgetagainuserpwd){
			alert("两次密码不一致");
			return;
		}
		
			$.post("/forum/checkemail", "username="+forgetusername+"&email="+forgetemail, function (data) {
                    if (true == data) {
						$.post("/forum/modpwdbyusername","username="+forgetusername+"&userpwd="+forgetuserpwd,function(data){
							if(data==true)
							{
								alert("密码修改成功");
							}
							else{
								alert("修改失败，请重试");
							}
						});
                        
                        $("#cancel").click();
                    } else {
                        alert("邮箱错误");
                    }
                }, "json");
		
	});
	
	
	
	
	
});