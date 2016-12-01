if (typeof jQuery === 'undefined') {
  throw new Error('Dialog\'s JavaScript requires jQuery');
}

;(function($){
	//jQuery�汾�жϣ����1.9
	var version = $.fn.jquery.split(' ')[0].split('.');
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
		throw new Error('Dialog\'s JavaScript requires jQuery version 1.9.1 or higher');
	}
	var dialogOptions = {
		/****�����������շ���д���������ڵ���show()����ǰ����ֵ****/
		id : null,
		width : 500,									//������Ŀ�
		height : 300,									//������ĸ�
		className:'',									//��������������ʽ������ѡ�񸲸ǣ�Ҳ����׷������ʽ
		url : null,
		onLoad : null,
		innerHtml : "",
		invokeElementId : "",
		top : "50%",
		left : "50%",
		title : "",
		okEvent : null, //���ȷ������õķ���
		cancelEvent : null, //���ȡ�����رպ���õķ���
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
		/****���������Դ�д��ͷ����Ҫ���иı�****/
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
