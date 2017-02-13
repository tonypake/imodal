# [iModal](https://github.com/smachen/iModal.git) # ![Project Icon](./favicon.ico)
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
  - [x] 对iframe下的应用作了充分考虑，适合复杂的系统应用
  - [x] 弹出层显示的内容
    - 指向一个URL的iframe窗口 
    - 页面内隐藏的元素中的html内容 
    - 直接输出一段html内容
  - [ ] 代替window open,alert,confirm提供良好的用户体验
  - [ ] 兼容ie6/7/8、firefox2/3、Opera 弹出框在ie6下不会被select控件穿透

## 包依赖 ##
- [normalize](https://github.com/necolas/normalize.css) (样式重置库)
- [animate.css](https://github.com/daneden/animate.css)(CSS3动画效果,可选)
- [jquery](https://github.com/jquery/jquery) (1.9.1以上,必须)

## 使用方法 ##
```html 
<script src="./src/js/imodal.js"></script>
<script src="../node_modules/jquery/jquery.min.js"></script>
<link href="./src/css/imodal.css" rel="stylesheet">
```
```javascript
//初始化
var im = $("body").iModal({属性名:属性值,事件名:function(){}});
//方法调用，参数为属性名
var value = im.getAttr(属性名);
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
	<tr>
    	<td align="center">title</td>
    	<td>标题，如果为空，则标题那块的元素隐藏显示</td>
    	<td align="center">""</td>
    </tr>
    <tr>
        <td align="center">width</td>
        <td>弹出层的宽度，单位为px，支持%</td>
        <td align="center">500</td>
    </tr>
    <tr>
        <td align="center">height</td>
        <td>弹出层的高度度，单位为px，支持%</td>
        <td align="center">300</td>
    </tr>
    <tr>
        <td align="center">clsName</td>
        <td>弹出层最外层的样式，可以选择覆盖，也可以追加新样式</td>
        <td align="center">""</td>
    </tr>
    <tr>
        <td align="center">animateCls</td>
        <td>弹出层弹出时的动画样式，使用此功能必须引入animate.css</td>
        <td align="center">""</td>
    </tr>
    <tr>
        <td align="center">backdrop</td>
        <td>点击遮罩层时关闭弹出层</td>
        <td align="center">true</td>
    </tr>
    <tr>
        <td align="center">zIndex</td>
        <td>弹出层的平面位置</td>
        <td align="center">900</td>
    </tr>
    <tr>
        <td align="center">isModal</td>
        <td>弹出层是否有遮罩层</td>
        <td align="center">true</td>
    </tr>
    <tr>
        <td align="center">isShow</td>
        <td>弹出层是否立即显示</td>
        <td align="center">false</td>
    </tr>
    <tr>
        <td align="center">isDebug</td>
        <td>弹出层是否打开debug，一般用于开发环境</td>
        <td align="center">false</td>
    </tr>
    <tr>
        <td align="center">isDrag</td>
        <td>弹出层是否支持按住标题拖拽</td>
        <td align="center">true</td>
    </tr>
    <tr>
        <td align="center">isShowBtn</td>
        <td>弹出层是否显示确认取消按钮</td>
        <td align="center">true</td>
    </tr>
    <tr>
        <td align="center">url</td>
        <td>弹出层的内容可以是url路径,html内容，ID元素选择器，url的优先级最高</td>
        <td align="center">null</td>
    </tr>
    <tr>
        <td align="center">innerHtml</td>
        <td>弹出层的内容可以是html内容，优先级其次</td>
        <td align="center">""</td>
    </tr>
    <tr>
        <td align="center">invokeElemId</td>
        <td>弹出层的内容可以是ID元素选择器，优先级最低</td>
        <td align="center">""</td>
    </tr>
    <tr>
        <td align="center">keyboard</td>
        <td>弹出层支持键盘操作，如 esc 键被按下时关闭模态框</td>
        <td align="center">true</td>
    </tr>
    <tr>
        <td align="center">okBtn</td>
        <td>弹出层底部第一个按钮的文字</td>
        <td align="center">确认</td>
    </tr>
    <tr>
        <td align="center">cancelBtn</td>
        <td>弹出层底部第二个按钮的文字</td>
        <td align="center">取消</td>
    </tr>
</table>

<table width="100%">
    <tr>
        <th colspan="3" align="left" width="100%">
            <a href="#meths" name="meths">事件</a>
        </th>
    </tr>
	<tr>
		<th width="10%" align="center">名称</th>
        <th width="90%" align="left">描述</th>
	</tr>
	<tr>
        <td align="center">onLoad</td>
        <td>弹出层加载完毕后进行的操作，如果内容是iframe新页面，则是页面加载完毕后的操作</td>
    </tr>
    <tr>
        <td align="center">okEvent</td>
        <td>弹出层点击确认按钮的事件</td>
    </tr>
    <tr>
        <td align="center">cancelEvent</td>
        <td>弹出层点击取消按钮的事件</td>
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
	<tr>
        <td align="center">hidden</td>
        <td>弹出层关闭隐藏方法</td>
        <td align="center"></td>
    </tr>
    <tr>
        <td align="center">getAttr</td>
        <td>获取弹出层配置属性的方法</td>
        <td align="center">属性名称(string)</td>
    </tr>
</table>
