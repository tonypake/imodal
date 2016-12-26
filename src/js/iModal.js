if (typeof jQuery === 'undefined') {
  throw new Error('Dialog\'s JavaScript requires jQuery');
}

;(function($){
	//jQuery版本判断，最低1.9
	var version = $.fn.jquery.split(' ')[0].split('.');
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
		throw new Error('Dialog\'s JavaScript requires jQuery version 1.9.1 or higher');
	}
	var iModalOptions = {
		/****以下属性以驼峰是写法，可以在调用show()方法前设置值****/
		id : null,
		width : 500,									//弹出层的宽
		height : 300,									//弹出层的高
		clsName:'',										//弹出层最外层的样式，可以选择覆盖，也可以追加新样式
        animateCls:'',									//弹出层弹出时的动画样式
		url : null,
		onLoad : null,
		innerHtml : "",
		invokeElementId : "",
		top : "50%",
		left : "50%",
		title : "",
		okEvent : null, //点击确定后调用的方法
		cancelEvent : null, //点击取消及关闭后调用的方法
		showButtonRow : false,
		messageIcon : "window.gif",
		messageTitle : "",
		message : "",
		showMessageRow : false,
		modal : true,
		drag : true,
		autoClose : null,
		showCloseButton : true,
		animator : true,
		zIndex : 900,
		/****以下属性不要自行改变****/
        modal : null,
        back : null,
        parentDom : null,
		InnerFrame : null,
		InnerWin : null,
		InnerDoc : null,
		CancelButton : null,
		OKButton : null
	};
	var iModalMethods = {
		init : function(arg){
			var $this = this;
			this.parentDom = $(this);
			this.dom = $('<div id="myModal" class="imodal">'+
				'<div class="imodal-backdrop"></div>'+
				'<div class="imodal-dialog imodal-show '+ arg.clsName + (arg.animateCls ? 'animated '+arg.animateCls : '') +'">'+
					'<div class="imodal-content">'+
						'<div class="imodal-header">'+
						'	<button type="button" class="imodal-close" data-dismiss="modal"><span aria-hidden="true">×</span></button>'+
						'   <div class="imodal-title" id="myModalLabel">iModal Title</div>'+
						'</div>'+
						'<div class="imodal-body">'+
						'	<h4>Overflowing text to show scroll behavior</h4>'+
							'<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>'+
							'<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>'+
							'<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>'+
						'</div>'+
						'<div class="imodal-footer">'+
						'	<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
						'	<button type="button" class="btn btn-primary">Save</button>'+
						'</div>'+
					'</div>'+
				'</div>'+
            '</div>');

			this.parentDom.append(this.dom);
            this.modal  = $(".imodal",this.parentDom);
            this.back  = $(".imodal-backdrop",this.parentDom);

            $(".imodal-close",this.modal).on("click",function(){
                $this.modal.hide();
			});
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
