if (typeof jQuery === 'undefined') {
  throw new Error('Dialog\'s JavaScript requires jQuery');
}

;(function($){
	//jQuery版本判断，最低1.9
	var version = $.fn.jquery.split(' ')[0].split('.');
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
		throw new Error('Dialog\'s JavaScript requires jQuery version 1.9.1 or higher');
	}
	var dialogOptions = {
		/****以下属性以驼峰是写法，可以在调用show()方法前设置值****/
		id : null,
		width : 500,									//弹出层的宽
		height : 300,									//弹出层的高
		className:'',									//弹出层最外层的样式，可以选择覆盖，也可以追加新样式
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
		/****以下属性以大写开头，不要自行改变****/
		DialogDiv : null,
		BGDiv : null,
		ParentWindow : null,
		InnerFrame : null,
		InnerWin : null,
		InnerDoc : null,
		CancelButton : null,
		OKButton : null
	};
	var dialogMethods = {
		init : function(arg){
			var parentDom = this;
			
			if(this === $){
				parentDom = body;
			}
		}
	};
	var dialog = $.fn.dialog = function(){
		var arg1 = arguments[0];

		if( arg1 && $.isFunction(arg1)){
			if(dialogMethods[arg1]){
				return arg1.call(this);
			}else{
				$.error( 'Method ' +  arg1 + ' does not exist on jQuery.Dialog' );
			}
		} else {
			var options = dialogOptions;
			if(arg1 && $.isPlainObject(arg1)){
				options = $.extend(dialogOptions,arg1);
			}
			if(this == $) {
				this = body;
			}
			
			return this.each(function () {
				console.log(this);
				dialogMethods.init.call(this,options);
			});
		}
	};
	$.extend({ dialog : dialog });
})(jQuery);
