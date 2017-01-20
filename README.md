# [iModal](https://github.com/smachen/iModal.git) #
### 演示地址： [imodal.github.io](https://imodal.github.io) ###

## 哪些功能 ##
  - [x] 自定义弹出层的配置
    - 自定义标题
    - 遮罩层大小修改
    - 支持无遮罩
    - 点击遮罩关闭
    - 自定义弹出样式
    - 弹出层的平面位置
  - [x] 支持使用animate.css的css3动画样式,实现弹出层展示
  - [x] 键盘上的 esc 键被按下时关闭模态框或点击遮罩层可关闭弹出框
  - [ ] 代替window open,alert,confirm提供良好的用户体验
  - [ ] 兼容ie6/7/8、firefox2/3、Opera 弹出框在ie6下不会被select控件穿透
  - [ ] 对iframe下的应用作了充分考虑，适合复杂的系统应用
  - [x] 弹出层显示的内容
    - 指向一个URL的iframe窗口 
    - 页面内隐藏的元素中的html内容 
    - 直接输出一段html内容

## 包依赖 ##
- [normalize](https://github.com/necolas/normalize.css) (样式重置库)
- [animate.css](https://github.com/daneden/animate.css)(CSS3动画效果,可选)
- [jquery](https://github.com/jquery/jquery) (1.9.1以上,必须)

## 使用方法 ##
```html 
<script src="./src/js/imodal.js"></script>
<link href="./src/css/imodal.css" rel="stylesheet">
```
```javascript
$(document).iModal(属性或方法);
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
        <th width="82%" align="left">描述</th>
        <th width="10%" align="center">参数</th>
	</tr>
</table>
