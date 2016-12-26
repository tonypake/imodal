# [iModal](https://github.com/cleverchens/imodal)
支持iframe的弹出层，自定义样式

## 包依赖
- [animate.css](https://github.com/daneden/animate.css)(实现动画效果)
- [jquery](https://github.com/jquery/jquery) (1.9.1 and greater)
- [selectize](https://github.com/selectize/selectize.js) (dist/js/standalone)

## 使用方法
```js
$.iModal(options);
```
#### IE8浏览器支持
```html
<!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/es5-shim/2.0.8/es5-sham.js"></script><![endif]
-->
```

## 实现目标
- 多层弹出
- 实现alert,confirm,prompt功能
- 实现多级Iframe中弹出
