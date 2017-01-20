if (typeof jQuery === 'undefined') {
  throw new Error('Dialog\'s JavaScript requires jQuery');
}

;(function($){
	//jQuery版本判断，最低1.9
	var version = $.fn.jquery.split(' ')[0].split('.');
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
		throw new Error('Dialog\'s JavaScript requires jQuery version 1.9.1 or higher');
	}
    /****以下私有属性****/
    var iModalPrivate = {
        $modal : null,
        $back : null,
        $parentDom : null,
        $modalTitle : null,
        $InnerFrame : null,
        $InnerWin : null,
        $InnerDoc : null,
        $CancelButton : null,
        $OKButton : null
    }
    var iModalOption = {
        /****以下属性以驼峰是写法，可以在调用show()方法前设置值****/
        id : "",
        show : true,									//是否立即显示
        title : "",										//弹出层的标题，如果为空，则没有弹出层的标题
        width : 500,									//弹出层的宽
        height : 300,									//弹出层的高
        clsName:'',										//弹出层最外层的样式，可以选择覆盖，也可以追加新样式
        animateCls:'',									//弹出层弹出时的动画样式
        modal : true,									//是否有遮罩层
        backdrop: true,									//点击遮罩层关闭
        zIndex : 900,									//弹出层的平面位置
        url : null,										//弹出层的内容可以是某个url路径，优先级最高
        innerHtml : "",									//弹出层的内容可以是某个html内容，优先级其次
        invokeElementId : "",							//弹出层的内容可以是页面某ID元素，优先级最低
        keyboard : true,								//键盘上的 esc 键被按下时关闭模态框
        top : "50%",
        left : "50%",
        showButtonRow : false,
        messageIcon : "window.gif",
        messageTitle : "",
        message : "",
        showMessageRow : false,
        drag : true,
        autoClose : null,
        showCloseButton : true,

        //以下是事件的配置
        onLoad : null,
        okEvent : null, 								//点击确定后调用的方法
        cancelEvent : null 								//点击取消及关闭后调用的方法
	}
	var iModal = function($targets,options){
        this.options = options;
        var $this = this,csspre = iModal.CssPrefix,arg = options;
        var $modal = $('<div id="imodal'+(arg.id ? arg.id : "" )+'" tabindex="1" class="'+csspre+'-container" style="">'+
            '<div class="'+csspre+'-content">'+
            '<div class="'+csspre+'-header">'+
            '	<button type="button" class="'+csspre+'-close" data-dismiss="modal"><span aria-hidden="true">×</span></button>'+
            '   <div class="'+csspre+'-title" id=""></div>'+
            '</div>'+
            '<div class="'+csspre+'-body"></div>'+
            '<div class="'+csspre+'-footer">'+
            '	<button type="button" class="'+csspre+'-btn">确&nbsp;&nbsp;认</button>'+
            '	<button type="button" class="'+csspre+'-btn" data-dismiss="modal">取&nbsp;&nbsp;消</button>'+
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
        this.show();
	};
    iModal.Version = "1.0.0";								//版本号
    iModal.CssPrefix = "imodal";							//css前缀
    iModal.Namespace = "sma.imodal";						//命名空间

    iModal.prototype = {
		show    : function(){
            var $this = this,csspre = iModal.CssPrefix,arg = this.options;
            $this.$modal.show();
            $this.$back.show();
			//设置动画效果
			if(arg.animateCls) $this.$modal.addClass('animated '+arg.animateCls);
            //设置弹出层样式
            if(arg.clsName) $this.$modal.addClass(clsName);
			//设置是否有遮罩层
            if(!arg.modal) $this.$back.hide();
            //设置弹出层的标题
            if(!arg.title) $this.$title.hide();
            else $this.$title.html(arg.title);
            //设置弹出层平面位置
			if(arg.zIndex) $this.$modal.css("zIndex",arg.zIndex);
            if(arg.zIndex) $this.$back.css("zIndex",arg.zIndex-1);

            //设置弹出层的内容
            $this.$bodyer.html("");
            if(arg.url){
                $this.$bodyer.append('<iframe width="100%" height="100%" frameborder="0" style="border:none 0;" scrolling="auto" allowtransparency="true" id="iModalFrame" src="' + arg.url + '"></iframe>');
            }else{
                if(arg.innerHtml){
                    $this.$bodyer.append(arg.innerHtml);
                }else{
                    if(arg.invokeElementId) $this.$bodyer.append($("#"+arg.invokeElementId).clone().show().prop("outerHTML"));
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
		},
		hidden  : function(){
            this.$modal.hide();
            this.$back.hide();
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
                    this.$modal.css({"marginLeft":("-"+ w/2 +"px")});
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
                    this.$modal.css({"marginTop":("-"+ h/2 +"px")});
                }
                if((h - hh - fh) > 0){
                    this.$bodyer.height(h - hh - fh);
                }
            }
		},
        escape : function(){
        	var $this = this;
        	var modal = this.$modal;
            if (this.isShown && this.options.keyboard) {
                modal.trigger('focus');
                modal.on('keydown.imodal', function (e) {
                    e.which == 27 && iModalMethods.hidden.call($this);
                });
                $("iframe",modal).load(function(){
                    $(this.contentWindow.document).on("keydown.imodal",function(e){
                        e.which == 27 && iModalMethods.hidden.call($this);
                    });
                });
            } else if (!this.isShown) {
                modal.off('keydown.imodal')
            }
		}
	};

	$.fn.iModal = function(option,parameter){
		var $this = this,data = this.data(iModal.Namespace);

        if (typeof option == 'object') {
            var options = $.extend({}, iModalOption,$this.data(), option);

            if(!data) {
            	$this.data(iModal.Namespace, (data = new iModal(this, options)));
            } else {
            	data.options = options;
            	data.show();
            }
            return data;
        }else if (typeof option == 'string' && data) {
			if(data[option]) return data[option](parameter);
			else $.error('Method '+ option +' does not exist on iModal');
		}else{
            $.error('Please check configuration parameters');
        }
	};
    $.fn.iModal.Constructor = iModal;
})(jQuery);
