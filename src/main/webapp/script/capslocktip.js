//密码大写输入提示
    function capitalTip(id){
        $('#' + id).after('<div class="capslock" id="capital_password"><span>大写锁定已开启</span></div>');
        var capital = false; //聚焦初始化,防止刚聚焦时点击Caps按键提示信息显隐错误
        
        // 获取大写提示的标签,并提供大写提示显示隐藏的调用接口
        var capitalTip = {
            $elem: $('#capital_'+id),
            toggle: function (s) {
                if(s === 'none'){
                    this.$elem.hide();
                }else if(s === 'block'){
                    this.$elem.show();
                }else if(this.$elem.is(':hidden')){
                    this.$elem.show();
                }else{
                    this.$elem.hide();
                   }
            }
        }
        $('#' + id).on('keydown.caps',function(e){
            if (e.keyCode === 20 && capital) { // 点击Caps大写提示显隐切换
                capitalTip.toggle();
            }
        }).on('focus.caps',function(){capital = false}).on('keypress.caps',function(e){capsLock(e)}).on('blur.caps',function(e){
            
            //输入框失去焦点,提示隐藏
            capitalTip.toggle('none');
        });
        function capsLock(e){
            var keyCode = e.keyCode || e.which;// 按键的keyCode
            var isShift = e.shiftKey || keyCode === 16 || false;// shift键是否按住
            if(keyCode === 9){
                capitalTip.toggle('none');
            }else{
              //指定位置的字符的 Unicode 编码 , 通过与shift键对于的keycode,就可以判断capslock是否开启了
              // 90 Caps Lock 打开,且没有按住shift键
              if (((keyCode >= 65 && keyCode <= 90) && !isShift) || ((keyCode >= 97 && keyCode <= 122) && isShift)) {
                  // 122 Caps Lock打开,且按住shift键
                  capitalTip.toggle('block'); // 大写开启时弹出提示框
                  capital = true;
              } else {
                  capitalTip.toggle('none');
                  capital = true;
              }
            }
        }
    };