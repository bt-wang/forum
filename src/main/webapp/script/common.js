$(function () {
    $(".dropdown-menu").find("a").each(function () {
        var c = $(this).html();
        if (c == "查看信息") {
            $(this).hide();
        } else if (c == "退出") {
            $(this).click(function () {
                session.invalidate();
                window.location.replace("login.html");
            });
        } else if(c == "修改密码") {
            $(this).click(function () {
                window.location.replace("modpwd.html");
            });
    };
});
});