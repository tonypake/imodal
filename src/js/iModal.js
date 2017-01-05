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
		id : null,
        title : "",										//弹出层的标题，如果为空，则没有弹出层的标题
		width : 500,									//弹出层的宽
		height : 300,									//弹出层的高
        clsName:'',										//弹出层最外层的样式，可以选择覆盖，也可以追加新样式
        animateCls:'',									//弹出层弹出时的动画样式
        backdrop: true,									//点击遮罩层关闭
        zIndex : 900,									//弹出层的平面位置
		url : null,										//弹出层的内容可以是某个url路径，优先级最高
        innerHtml : "",									//弹出层的内容可以是某个html内容，优先级其次
        invokeElementId : "",							//弹出层的内容可以是页面某ID元素，优先级最低
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
        modal : null,
        back : null,
        parentDom : null,
        modalTitle : null,
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
			this.parentDom = $(this);
			this.modal = $('<div id="imodal'+arg.id+'" class="'+cssPrefix+'-container" style="">'+
				'<div class="'+cssPrefix+'-backdrop" style="'+(arg.zIndex ? 'z-index:'+arg.zIndex : "")+'"></div>'+
				'<div class="'+cssPrefix+'-popup '+cssPrefix+'-show '+ arg.clsName + (arg.animateCls ? 'animated '+arg.animateCls : '') +'" style="'+(arg.zIndex ? 'z-index:'+arg.zIndex : "")+'">'+
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

			this.parentDom.append(this.modal);
            this.back  = $("."+cssPrefix+"-backdrop",this.modal);
            this.header= $("."+cssPrefix+"-header",this.modal);
            this.footer= $("."+cssPrefix+"-footer",this.modal);
            this.bodyer= $("."+cssPrefix+"-body",this.modal);
            //设置弹出层的内容
            if(arg.url){
                this.bodyer.append('<iframe width="100%" height="100%" frameborder="0" style="border:none 0;" allowtransparency="true" id="iModalFrame" src="' + arg.url + '"></iframe>');
			}else{
                if(arg.innerHtml){
                    this.bodyer.append(arg.innerHtml);
                }else{
                    if(arg.invokeElementId){
                        this.bodyer.append($("#"+arg.invokeElementId).clone().show().prop("outerHTML"));
                    }
				}
			}
            this.popup= $("."+cssPrefix+"-popup",this.modal);
            this.modalTitle = $("."+cssPrefix+"-title",this.modal);

            //设置弹出层的标题
            if(!arg.title){
                this.modalTitle.hide();
			}

            //判断是否支持点击遮罩层关闭弹出层
            var closeSelector = "."+cssPrefix+"-close";
            if(arg.backdrop){
                closeSelector += ",."+cssPrefix+"-backdrop";
			}
            //关闭弹出层
            $(closeSelector,this.modal).on("click",function(){
                $this.modal.hide();
			});

            //设置弹出层的宽高
            iModalMethods.setSize.call(this,arg.width,arg.height);
		},
		setSize : function(width,height){
			if(width){
                if(width < 300){
                    width = 300;
                }
                this.popup.width(width).css("marginLeft",("-"+width/2+"px"));
			}
            if(height){
                if(height < 300){
                	height = 300;
                }
                this.popup.height(height).css("marginTop","-"+height/2+"px");
                var hh = this.header.outerHeight(true),fh = this.footer.outerHeight(true);
                if((height - hh - fh) > 0){
                    this.bodyer.height(height - hh - fh);
                }
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
