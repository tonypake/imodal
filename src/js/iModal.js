if (typeof jQuery === 'undefined') {
  throw new Error('Dialog\'s JavaScript requires jQuery');
}

;(function($){
	//jQuery版本判断，最低1.9
	var version = $.fn.jquery.split(' ')[0].split('.');
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
		throw new Error('Dialog\'s JavaScript requires jQuery version 1.9.1 or higher');
	}
	var cssPrefix = "imodal";
	var iModalOptions = {
		/****以下属性以驼峰是写法，可以在调用show()方法前设置值****/
		id : "",
        title : "",										//弹出层的标题，如果为空，则没有弹出层的标题
		width : 500,									//弹出层的宽
		height : 300,									//弹出层的高
        clsName:'',										//弹出层最外层的样式，可以选择覆盖，也可以追加新样式
        animateCls:'',									//弹出层弹出时的动画样式
        backdrop: false,									//点击遮罩层关闭
        zIndex : 900,									//弹出层的平面位置
		url : null,										//弹出层的内容可以是某个url路径，优先级最高
        innerHtml : "",									//弹出层的内容可以是某个html内容，优先级其次
        invokeElementId : "",							//弹出层的内容可以是页面某ID元素，优先级最低
        keyboard : true,								//键盘上的 esc 键被按下时关闭模态框
        onLoad : null,
		top : "50%",
		left : "50%",
		okEvent : null, //点击确定后调用的方法
		cancelEvent : null, //点击取消及关闭后调用的方法
		showButtonRow : false,
		messageIcon : "window.gif",
		messageTitle : "",
		message : "",
		showMessageRow : false,
		drag : true,
		autoClose : null,
		showCloseButton : true,

		/****以下属性不要自行改变****/
        $modal : null,
        $back : null,
        $parentDom : null,
        $modalTitle : null,
		InnerFrame : null,
		InnerWin : null,
		InnerDoc : null,
		CancelButton : null,
		OKButton : null
	};
	var iModalMethods = {
		init : function(arg){
			var $this = this;
			this.options = arg;
			this.$modal = $('<div id="imodal'+(arg.id ? arg.id : "" )+'" tabindex="1" class="'+cssPrefix+'-container" style="'+(arg.zIndex ? 'z-index:'+arg.zIndex : "")+'">'+
				'<div class="'+cssPrefix+'-backdrop" style=""></div>'+
				'<div class="'+cssPrefix+'-popup '+cssPrefix+'-show '+ arg.clsName + (arg.animateCls ? 'animated '+arg.animateCls : '') +'" style="">'+
					'<div class="'+cssPrefix+'-content">'+
						'<div class="'+cssPrefix+'-header">'+
						'	<button type="button" class="'+cssPrefix+'-close" data-dismiss="modal"><span aria-hidden="true">×</span></button>'+
						'   <div class="'+cssPrefix+'-title" id="">'+ (arg.title ? arg.title : "")+'</div>'+
						'</div>'+
						'<div class="'+cssPrefix+'-body"></div>'+
						'<div class="'+cssPrefix+'-footer">'+
                		'	<button type="button" class="'+cssPrefix+'-btn">确&nbsp;&nbsp;认</button>'+
						'	<button type="button" class="'+cssPrefix+'-btn" data-dismiss="modal">取&nbsp;&nbsp;消</button>'+
						'</div>'+
					'</div>'+
				'</div>'+
            '</div>');
			this.isShown = true;
            this.$parentDom = $(this);
			this.$parentDom.append(this.$modal);
            this.$back  = $("."+cssPrefix+"-backdrop",this.$modal);
            this.$header= $("."+cssPrefix+"-header",this.$modal);
            this.$footer= $("."+cssPrefix+"-footer",this.$modal);
            this.$bodyer= $("."+cssPrefix+"-body",this.$modal);
            //设置弹出层的内容
            if(arg.url){
                this.$bodyer.append('<iframe width="100%" height="100%" frameborder="0" style="border:none 0;" allowtransparency="true" id="iModalFrame" src="' + arg.url + '"></iframe>');
			}else{
                if(arg.innerHtml){
                    this.$bodyer.append(arg.innerHtml);
                }else{
                    if(arg.invokeElementId){
                        this.$bodyer.append($("#"+arg.invokeElementId).clone().show().prop("outerHTML"));
                    }
				}
			}
            this.$popup= $("."+cssPrefix+"-popup",this.$modal);
            this.$modalTitle = $("."+cssPrefix+"-title",this.$modal);

            //设置弹出层的标题
            if(!arg.title){
                this.$modalTitle.hide();
			}

            //判断是否支持点击遮罩层关闭弹出层
            var closeSelector = "."+cssPrefix+"-close";
            if(arg.backdrop){
                closeSelector += ",."+cssPrefix+"-backdrop";
			}
            //关闭弹出层
            $(closeSelector,this.$modal).on("click.imodal",function(){
                iModalMethods.hidden.call($this)
			});

            //设置弹出层的宽高
            iModalMethods.resize.call(this,arg.width,arg.height);
            iModalMethods.escape.call(this);
		},
		hidden  : function(){
            this.$modal.hide();
		},
        resize : function(width,height){
            var w = width || this.options.width;
            var h = height || this.options.height;
			if(w){
                w = w < 300 ? 300 : w;
                this.$popup.width(w).css("marginLeft",("-"+ w/2 +"px"));
			}
            if(h){
                h = h < 300 ? 300 : h;
                this.$popup.height(h).css("marginTop","-"+ h/2 +"px");
                var hh = this.$header.outerHeight(true),fh = this.$footer.outerHeight(true);
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
	var iModal = $.fn.iModal = function(){
		var arg1 = arguments[0];
		if( arg1 && $.isFunction(arg1)){
			if(iModalMethods[arg1]){
				return arg1.call(this);
			}else{
				$.error( 'Method ' +  arg1 + ' does not exist on jQuery.Dialog' );
			}
		} else {
			var options = iModalOptions;
			if(arg1 && $.isPlainObject(arg1)){
				options = $.extend(iModalOptions,arg1);
			}
			
			var dom = this;
			if(this == $) dom = $("body");
			return dom.each(function () {
                iModalMethods.init.call(this,options);
			});
		}
	};
	$.extend({ iModal : iModal });
})(jQuery);
