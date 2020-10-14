 













                //先把表格中原有的记录行删掉
                $("#resulttable tr:gt(0)").remove();
                //遍历结果集，添加数据行
                for (var i = 0; i < data.list.length; i++) {
                    var workorder = data.list[i];
                    //创建一行，生成tr元素
                    var oTr = $("<tr></tr>");
                    //创建单元格，生成td元素，放到tr中
                    $("<td></td>").html(workorder.workid).appendTo(oTr);
                    $("<td></td>").html(workorder.planid).appendTo(oTr);
                    $("<td></td>").html(workorder.macid).appendTo(oTr);
                    $("<td></td>").html(new Date(workorder.workbegin).format("yyyy-MM-dd")).appendTo(oTr);




















$(function () {
    //
    $.post("/mavendemo/getcuruser", null, function (data) {
        // 将用户信息放到页面上
        if (data) {
            // 名字写在页面上
            $("#curname").html(data.username);
            // 将当前用户的id藏在页面上
            $("#curid").val(data.userid);
        }
    }, "json");
})

// 分页查询的功能实现
$(function () {
    $("#resultdiv").hide();
    $("#pagectrl").hide();
    $("#searchBtn").click(function () {
        //发送ajax请求
        $.post("searchuser", $("[name]").serialize(), function (data) {
            //真正查到数据了
            if (data && data.size > 0) {
                $("#gopage").val($("#curPage"));
                $("#resultdiv").show();
                $("#pagectrl").show();
                // 1.动态添加各种信息
                // 添加总记录条数
                $("#total").html(data.total);
                //添加总页数
                $("#pages").html(data.pages);
                //添加当前页数
                $("#curpage").html(data.pageNum);
                // 2.添加记录
                // 先把表格中原有的记录航删除
                $("#resulttable tr:gt(0)").remove();
                // 遍历结果集，添加数据行
                for (var i = 0; i < data.list.length; i++) {
                    var userinfo = data.list[i];
                    // 创建一行，生成tr元素
                    var oTr = $("<tr></tr>");
                    // 创建单元格，生成td元素，放到tr中
                    $("<td></td>").html(userinfo.userid).appendTo(oTr);
                    $("<td></td>").html(userinfo.username).appendTo(oTr);
                    $("<td></td>").html(userinfo.userpwd).appendTo(oTr);
                    
                    var oTd = $("<td></td>").appendTo(oTr);
                    
                    ///~ 添加修改按钮
                    $("<input type ='button' value='修改'>").click(function(){
                        if($(this).val() == "修改"){
                            //如果当前按钮上的文本是修改，用户点击的是修改功能
                            // 1.将用户名变为可编辑状态
                            // 1.1 获取当前用户名
                            // 获取当前行的第二个单元格对象
                            var oTd2 = $(this).parent().parent().find("td:eq(1)");
                            // 获取其中的文本
                            var username = oTd2.html();
                            // 1.2 清空单元格
                            oTd2.empty();
                            // 1.3 动态生成一个文本框，将用户名初始化到其中，并将其放到oTd2中
                            $("<input type='text'>").css("width", "50px").val(username).appendTo(oTd2);
                            // 2. 将密码变为可编辑状态
                            // 2.1 获取当前密码
                            // 获取当前行的第三个单元格对象
                            var oTd3= $(this).parent().parent().find("td:eq(2)");
                            // 获取其中的文本
                            var userpwd = oTd3.html();
                            // 2.2 清空单元格
                            oTd3.empty();
                            // 2.3 动态生成一个文本框，将用户名初始化到其中，并将其放到oTd3中
                            $("<input type='text'>").css("width", "50px").val(userpwd).appendTo(oTd3);
                            // 3. 将按钮变为确定按钮
                            $(this).val("确定");
                        }
                        else if($(this).val() == "确定"){
                            // 如果当前按钮上的文字是确定，用户点击的是确定功能
                            // 1. 页面验证
                            // 1.1 验证用户名是否填写
                            // 获取到当前行第二个单元格中的文本框对象
                            var oText2 = $(this).parent().parent().find("td:eq(1) input");
                            var username = oText2.val();
                            if(!username){
                                alert("请输入用户名");
                                oText2.focus();
                                return;
                            }
                            // 1.2 验证密码是否填写
                            // 获取到当前行第三个单元格中的文本框对象
                            var oText3 = $(this).parent().parent().find("td:eq(2) input");
                            var userpwd = oText3.val();
                            if(!userpwd){
                                alert("请输入密码");
                                oText3.focus();
                                return;
                            }
                            
                            // 2. 发送ajax请求进行修改
                            var userid = $(this).parent().parent().find("td:eq(0)").html();
                            
                            var oBtn = $(this);
                            
                            $.post("/mavendemo/moduser","userid=" + userid + "&username=" + username + "&userpwd=" + userpwd, function(data){
                                if(data == "true"){
                                    // 修改成功
                                    // 1. 将用户名还原成不可编辑状态
                                    var oTd2 = oBtn.parent().parent().find("td:eq(1)");
                                    var oText2 = oTd2.find("input");
                                    // 获取用户输入的用户名
                                    var username = oText2.val();
                                    // 清空单元格
                                    oTd2.empty();
                                    // 将用户名添回单元格中
                                    oTd2.html(username);
                                    // 2. 将密码还原成不可编辑状态
                                    var oTd3 = oBtn.parent().parent().find("td:eq(2)");
                                    var oText3 = oTd3.find("input");
                                    // 获取用户输入的用户名
                                    var userpwd = oText3.val();
                                    // 清空单元格
                                    oTd3.empty();
                                    // 将密码添回单元格中
                                    oTd3.html(userpwd);
                                    // 3. tn把当前按钮变成修改按钮
                                    oBtn.val("修改");
                                    // 4. 提示信息
                                    alert("修改成功");
                                }else{
                                    // 修改失败
                                    alert("用户名冲突，请重试");
                                }
                            },"text")
                            // 修改成功
                        }
                    }).appendTo(oTd);
                    
                    //:~ 修改按钮添加结束
                    
                     //动态生成删除按钮，如果是当前用户则不能操作
                    var curid = $("#curid").val();
                    // 只要不是当前用户，则需要生成删除按钮
                    if(curid != userinfo.userid){
                        $("<input type='button' value='删除'>").click(function(){
                        // 进行二次确认
                        var isOK = confirm("您是真的要删除吗？");
                            if(isOK){
                                //发送ajax请求，删除数据
                                // ??如何获取删除用户的id呢？
                                var userid = $(this).parent().parent().find("td:eq(0)").html();
                                $.post("/mavendemo/deluser","userid="+userid,function(data){
                                    if(data == "true"){
                                        $("#searchBtn").click();
                                        alert("删除成功");
                                        
                                    }
                                    else{
                                        alert("删除失败，请重试");
                                    }
                                },"text")
                            }
                        }).appendTo(oTd);
                    }
                    
                    // 将tr放入表格中
                    oTr.appendTo("#resulttable");
                }
                // 3.页面的控制
                // 结果表格 和 分页控制 按钮的显示
                $("#resultdiv").show();
                $("#pagectrl").show();
                // 上一页 下一页 按钮的控制
                if (data.isFirstPage == true) {
                    //当前是第一页
                    $("#prePage").hide();
                    $("#prePageSpan").show();
                } else {
                    //不是第一页
                    $("#prePage").show();
                    $("#prePageSpan").hide();
                }
                if (data.isLastPage == true) {
                    //当前是末一页
                    $("#nextPage").hide();
                    $("#nextPageSpan").show();
                } else {
                    //不是末一页
                    $("#nextPage").show();
                    $("#nextPageSpan").hide();
                }
            } else {
                //没有查到数据，结果表格 分页控制按钮 需要隐藏
                $("#resultdiv").hide();
                $("#pagectrl").hide();
                alert("没有查到数据");
            }
        }, "json");
    });
})

$(function () {
    // 完成上一页功能
    $("#prePage").click(function () {
        // 将页面上隐藏的pageNum的值-1
        var pageNum = $("#pageNum").val();
        $("#pageNum").val(pageNum - 1);
        //再进行一查询的操作，点击一次查询按钮
        $("#searchBtn").click();
    });
    // 完成下一页功能
    $("#nextPage").click(function () {
        // 将页面上隐藏的pageNum的值+1
        var pageNum = $("#pageNum").val();
        $("#pageNum").val(pageNum * 1 + 1);
        // 再进行一查询的操作，点击一次查询按钮
        $("#searchBtn").click();
    });
    
    // 完成Go按钮的功能
    $("#goBtn").click(function() {
        // 获取跳转的页数
        var gopage = $("#gopage").val() * 1;
        // 判断用户的输入
        if (gopage < 1) {
            gopage = 1;
        }
        // 页码大于最后一页
        // 获取总页数
        var pages = $("#pages").html();
        if (gopage > pages * 1) {
            gopage = pages;
        }
        $("#gopage").val(gopage);

        // 将页面上用户隐藏的pageNum设定为gopage
        $("#pageNum").val(gopage);
        //点击一次查询按钮
        $("#searchBtn").click();
    })
});
