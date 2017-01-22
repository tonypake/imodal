if (typeof jQuery === 'undefined') {
  throw new Error('Dialog\'s JavaScript requires jQuery');
}

;(function($){
	//jQuery版本判断，最低1.9
	var version = $.fn.jquery.split(' ')[0].split('.');
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
		throw new Error('Dialog\'s JavaScript requires jQuery version 1.9.1 or higher');
	}
    var DEFAULT = {
        /****以下属性以驼峰是写法，可以在调用show()方法前设置值****/
        id : "",
        title : "",										//标题，如果为空，则没有弹出层的标题
        width : 500,									//宽
        height : 300,									//高
        clsName:'',										//弹出层最外层的样式，可以选择覆盖，也可以追加新样式
        animateCls:'',									//弹出层弹出时的动画样式
        backdrop: true,									//点击遮罩层关闭
        zIndex : 900,									//弹出层的平面位置
        isModal: true,									//是否有遮罩层
        isShow : false,									//是否已经显示
        isDebug: true,                                  //debug是否打开
        isDrag : true,                                  //是否支持拖拽
        url : null,										//弹出层的内容可以是某个url路径，优先级最高
        innerHtml : "",									//弹出层的内容可以是某个html内容，优先级其次
        invokeElementId : "",							//弹出层的内容可以是页面某ID元素，优先级最低
        keyboard : true,								//键盘上的 esc 键被按下时关闭模态框
        okBtn : "确定",                                  //按钮的名称
        cancelBtn : "取消",                              //按钮的名称
        top : "50%",
        left : "50%",
        showButtonRow : false,
        messageIcon : "window.gif",
        messageTitle : "",
        message : "",
        showMessageRow : false,
        autoClose : null,
        showCloseButton : true,

        //以下是事件的配置
        onLoad : function(){                            //弹出层加载完毕，主要是iframe加载
        },
        okEvent : null, 								//点击确定后调用的方法
        cancelEvent : null 								//点击取消及关闭后调用的方法
	}
	var iModal = function($targets,options){
        var $this = this;
        $this.options = options;
        if($targets) this.show($targets);
	};

    iModal.prototype = {
        version : "1.0.0",								//插件版本号
        cssPrefix:"imodal",							    //css前缀
        nameSpace: "sma.imodal",						//命名空间
		show    : function($targets){
            var $this = this,csspre = this.cssPrefix,arg = this.options;

            var $modal = $('<div id="imodal'+(arg.id ? arg.id : "" )+'" tabindex="1" class="'+csspre+'-container" style="">'+
                '<div class="'+csspre+'-content">'+
                '<div class="'+csspre+'-header">'+
                '	<button type="button" class="'+csspre+'-close" data-dismiss="modal"><span aria-hidden="true">×</span></button>'+
                '   <div class="'+csspre+'-title" id=""></div>'+
                '</div>'+
                '<div class="'+csspre+'-body"></div>'+
                '<div class="'+csspre+'-footer">'+
                '	<button type="button" class="'+csspre+'-btn">确&nbsp;&nbsp;认</button>'+
                '	<button type="button" class="'+csspre+'-btn" data-close="true">取&nbsp;&nbsp;消</button>'+
                '</div>'+
                '</div>');
            var $back = $('<div id="backdrop'+(arg.id ? arg.id : "" )+'" class="'+csspre+'-backdrop" style=""></div>');
            $targets.append($modal);
            $targets.append($back);
            this.$targets = $targets;
            this.$back  = $back;
            this.$modal = $modal;
            this.$header= $("."+csspre+"-header",$modal);
            this.$footer= $("."+csspre+"-footer",$modal);
            this.$bodyer= $("."+csspre+"-body",$modal);
            this.$title = $("."+csspre+"-title",$modal);

            arg.isShow = true;
			//设置动画效果
			if(arg.animateCls) $this.$modal.addClass('animated '+arg.animateCls);
            //设置弹出层样式
            if(arg.clsName) $this.$modal.addClass(arg.clsName);
			//设置是否有遮罩层
            if(!arg.isModal) $this.$back.hide();
            //设置弹出层的标题
            if(!arg.title) $this.$title.hide();
            else $this.$title.html(arg.title);
            //设置弹出层平面位置
			if(arg.zIndex) $this.$modal.css("zIndex",arg.zIndex);
            if(arg.zIndex) $this.$back.css("zIndex",arg.zIndex-1);

            //设置弹出层的内容
            //$this.$bodyer.html("");
            if(arg.url){
                $this.$bodyer.append('<iframe width="100%" height="100%" frameborder="0" style="border:none 0;" scrolling="auto" allowtransparency="true" id="iModalFrame" src="' + arg.url + '"></iframe>').css("overflow","");
            }else{
                if(arg.innerHtml){
                    $this.$bodyer.append(arg.innerHtml).css("overflow","auto");
                }else{
                    if(arg.invokeElementId) $this.$bodyer.append($("#"+arg.invokeElementId).clone().show().prop("outerHTML")).css("overflow","auto");
                }
            }

            //判断是否支持点击遮罩层关闭弹出层
            var closeSelector = "."+csspre+"-close";
            if(arg.backdrop) closeSelector += ",."+csspre+"-backdrop";
            //关闭弹出层
            $(closeSelector,$this.$modal).on("click.imodal",function(){
                $this.hidden();
            });
            //窗口调整
            $this.resize();
            //键盘事件支持
            $this.escape();
            $this.console("Onload 开始加载...");
            if(!arg.url) {
                arg.onLoad();
                $this.console("Onload 加载完毕...");
            }else{
                $("iframe",$this.$modal).load(function(){
                    arg.onLoad();
                    $this.console("Onload 加载完毕...");
                });
            }

            if(arg.isDrag) {
                //是否支持标图拖拽
                $this.$title.css("cursor","move");
                $this.drag($this.$modal);
            }
		},
		hidden  : function(){
            this.options.isShow = false;
            this.$modal.hide().remove();
            this.$back.hide().remove();
		},
		getAttr : function (arg) {
			var $this = this;
			if(typeof arg == 'function') $.error( arg +' is not a correct attribute');
			if(typeof arg != 'string' || !$this.options[arg]) $.error( arg +' does not exist on iModal attribute' );
			return $this.options[arg];
        },
        resize	: function(width,height){
            var w = width || this.options.width;
            var h = height || this.options.height;
			if(w){
                w = w < 300 ? 300 : w;
                this.$modal.width(w);
                if(w == "100%"){
                    this.$modal.css({"left":0,"marginLeft":0});
				}else{
                    this.$modal.css({"left":"50%","top":"50%","marginLeft":("-"+ w/2 +"px")});
                }
			}
            if(h){
                h = h < 300 ? 300 : h;
                this.$modal.height(h);
                var hh = this.$header.outerHeight(true),fh = this.$footer.outerHeight(true);
                if(h == "100%"){
                    h = this.$modal.outerHeight();
                    this.$modal.css({"top":0,"marginTop":0});
                }else{
                    this.$modal.css({"left":"50%","top":"50%","marginTop":("-"+ h/2 +"px")});
                }
                if((h - hh - fh) > 0){
                    this.$bodyer.height(h - hh - fh);
                }
            }
		},
        escape : function(){
        	var $this = this;
        	var modal = $this.$modal,arg = $this.options;
            if (arg.keyboard) {
                modal.trigger('focus');
                modal.on('keydown.'+$this.namespace, function (e) {
                    e.which == 27 && arg.isShow && $this.hidden();
                });
                $("iframe",modal).load(function(){
                    $(this.contentWindow.document).on('keydown.'+$this.namespace,function(e){
                        e.which == 27 && arg.isShow && $this.hidden();
                    });
                });
            } else {
                modal.off('keydown.'+$this.namespace)
            }
		},
        //-----以下是工具方法，全局调用
        //拖拽方法
        drag : function($tar){
            var $this = this,_x = 0,_y = 0,_move=false;//_move移动标记 ,_x,_y鼠标离控件左上角的相对位置
            $tar.click(function(){
                //alert("click");//点击（松开后触发）
            }).mousedown(function(e){
                _move = true;
                _x = e.pageX - parseInt($(this).position().left);
                _y = e.pageY - parseInt($(this).position().top);
                $(this).fadeTo(20, 0.5);//点击后开始拖动并透明显示
            });
            $(document).on({'mousemove' : function(e){
                if(_move){
                    var x = e.pageX - _x;//移动时根据鼠标位置计算控件左上角的绝对位置
                    var y = e.pageY - _y;
                    $tar.css({top : y,left : x});//控件新位置
                }
            },'mouseup' : function(){
                _move = false;
                $tar.fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
            }});
        },
        //判断是否是打印
        console : function (arg){
            if(!this.options || this.options.isDebug){
                if(window.console) {
                    console.info("[iModal] "+arg);
                } else {

                }
            }
        },
        //判断是否是方法
        isFunction : function(arg){
            if($.isFunction(arg)){
                return true;
            }else{
                $.error('请检查'+arg+'是否是一个正确的方法');
            }
        }
	};

	$.fn.iModal = function(option,parameter){
		var $this = this,data = this.data($this.namespace);

        if (typeof option == 'object') {
            var options = $.extend({}, DEFAULT,$this.data(), option);
            options.id = (new Date()-0)%10086;
            return data = new iModal(this, options);
        }else if (typeof option == 'string' && data) {
			if(data[option]) return data[option](parameter);
			else $.error('Method '+ option +' does not exist on iModal');
		}else{
            $.error('Please check configuration parameters');
        }
	};
    $.fn.iModal.Constructor = iModal;
    window.iModal = new iModal();
})(jQuery);
