/**
 * 	刘天赐：修改密码页面需要的js
 */

$(function () {
    $("#ok").attr("disabled", true);
    $("#userpwd1").blur(function () {
        var pwd = $(this).val();
        var r = /^(\w){6,20}$/;
        if (r.exec(pwd)) {
            $("#msg1").show().css("color", "green").html("该密码可用").fadeOut(2000);
            $("#userpwd2").mouseout(function () {
                if ($(this).val() == $("#userpwd1").val()) {
                    $("#msg2").show().css("color", "green").html("两次密码一致").fadeOut(2000);
                    $("#ok").attr("disabled",false);
                } else {
                    $("#msg2").show().css("color", "red").html("两次密码不一致").fadeOut(2000);
                    $("#ok").attr("disabled", true);
                }
            })
        } else {
            $("#userpwd2").unbind("mouseout");
            $("#msg1").show().css("color", "red").html("只能输入6-20个字母、数字、下划线").fadeOut(2000);
            $("#ok").attr("disabled", true);
        }
    })
    //下面这行用来登录，是单独调试修改密码这一功能时候用的
    //$.post("/forum/login", "username=3&userpwd=4", null, "json");
    $("#curname").html("");
    $("#curid").html("");
    $.post("/forum/getnowuser", null, function (data) {
        // 将用户信息放到页面上
        if (null!=data) {
            // 名字写在页面上
            $("#curname").html(data.username);
            //            // 将当前用户的id藏在页面上(要求隐藏起来标签)
            //            $("#curid").val(data.userid);
            // 将当前用户的id写在页面上
            $("#curid").html(data.userid);
        }
    }, "json");

    $("#ok").click(function () {
        $.post("/forum/checklogin", "username=" + $("#curname").html() + "&userpassword=" + $("#userpwd").val(), function (data) {
            if (true == data) {
                $.post("/forum/modpwd", "userid=" + $("#curid").html() + "&userpwd=" + $("#userpwd2").val(), function (data) {
                    if (true == data) {
                        alert("密码修改成功");
                        $("#cancel").click();
                    } else {
                        alert("修改失败，请重试");
                    }
                }, "json");
            } else {
                alert("原有密码输入错误，请重新输入");
                $("#userpwd").val("");
            }
        }, "json")
    })


    //logout    
    //    $.post("/forum/logout", null, function(data){
    //        if(true==data){
    //            alert("成功退出");
    //        }
    //        else{
    //            alert("没有成功退出");
    //        }
    //    }, "json");
})
