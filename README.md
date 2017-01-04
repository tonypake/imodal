# :sparkles:[iModal](https://github.com/cleverchens/imodal):sparkles: ##
## 哪些功能 ##
  - [x] 自定义弹出层的样式
  - [ ] 按ESC键或点击遮罩层可关闭弹出框
  - [ ] 支持使用animate.css的css3动画样式,实现弹出层展示
  - [ ] 代替window open,alert,confirm提供良好的用户体验
  - [ ] 兼容ie6/7/8、firefox2/3、Opera 弹出框在ie6下不会被select控件穿透
  - [ ] 对iframe下的应用作了充分考虑，适合复杂的系统应用
  - [ ] 弹出层显示的内容
    - 指向一个URL的iframe窗口 
    - 页面内隐藏的元素中的html内容 
    - 直接输出一段html内容


## 包依赖 ##
- [animate.css](https://github.com/daneden/animate.css)(实现动画效果)
- [jquery](https://github.com/jquery/jquery) (1.9.1 and greater)

## 开发包依赖 ##
- [selectize](https://github.com/selectize/selectize.js) (dist/js/standalone)

## 使用方法 ##
```html 
<script src="./src/js/imodal.js"></script>
<link href="./src/css/imodal.css" rel="stylesheet">
```
```javascript
$.iModal(options);
```
#### IE8浏览器支持 ##
```html 
<!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/es5-shim/2.0.8/es5-sham.js"></script><![endif]
-->
```


<table width="100%">
    <tr>
        <th colspan="3" align="left" width="100%">
            <a href="#props" name="props">属性</a>
        </th>
    </tr>
	<tr>
		<th width="8%" align="center">属性</th>
		<th width="82%" align="left">描述</th>
		<th width="10%" align="center">默认值</th>
	</tr>
</table>

<table width="100%">
    <tr>
        <th colspan="3" align="left" width="100%">
            <a href="#meths" name="meths">方法</a>
        </th>
    </tr>
	<tr>
		<th width="8%" align="center">名称</th>
		<th width="90%" align="left">描述</th>
		<th width="12%" align="center">参数</th>
	</tr>
</table>
