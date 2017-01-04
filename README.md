# [iModal](https://github.com/cleverchens/imodal)
- 支持animate.css的css3动画效果弹出
- 实现多级Iframe中弹出,对iframe下的应用作了充分考虑，适合复杂的系统应用；
- 代替window.open、window.alert、window.confirm提供良好的用户体验；
- 兼容ie6/7/8、firefox2/3、Opera；弹出框在ie6下不会被select控件穿透；
- 无外部css文件，引用Dialog.js即可使用；
- 显示的内容（三种）：1、指向一个URL的iframe窗口；2、页面内隐藏的元素中的html内容；3、直接输出一段html内容；
- 按ESC键可关闭弹出框；

## 开发包依赖
- [animate.css](https://github.com/daneden/animate.css)(实现动画效果)
- [jquery](https://github.com/jquery/jquery) (1.9.1 and greater)
- [selectize](https://github.com/selectize/selectize.js) (dist/js/standalone)

## 使用方法
```js
$.iModal(options);
```
#### IE8浏览器支持
```html
<!--[if lt IE 9]><script src="//cdn.bootcss.com/es5-shim/2.0.8/es5-sham.js"></script><![endif]-->
```


