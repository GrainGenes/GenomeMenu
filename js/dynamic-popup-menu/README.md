# popmenu
基于 jQuery 的鼠标点击弹出菜单，仅仅一个函数调用，能满足一些基本要求

支持 FontAwesome 自定义菜单图标样式（选项配置）

### 引用
```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/tianlunvip/popmenu/popmenu.css">
<script src="//cdn.jsdelivr.net/gh/tianlunvip/popmenu/popmenu.min.js"></script>
```

### 调用

```javascript
popmenu(options);
```

### 选项 options 

```javascript
{
	X: 100,	// 弹出菜单 X 坐标
	Y: 100,	// 弹出菜单 Y 坐标
	items : {
		menu1 : {		    // 菜单 ID 
			name : '菜单一', 	// 菜单名称
			icon : '<i class="fa fa-arrow-right"></i>', // 菜单图标，可自定义
			divid : true	    // 菜单分割线
		},
		menu2 : {name : '菜单二', icon : '<i class="fa fa-arrow-left"></i>'},
		menu3 : {name : '菜单三'},
	},
	callback: function(item) {
		// 点击菜单回调函数
		var id = $(item).attr('id');
		if(id === "menu1") {
			alert("菜单一");
		}else if(id === "menu2") {
			alert("菜单二");
		}else if(id ==="menu3") {
			alert("菜单三");
		}
	}
}
```
items 选项格式
```
id : {name: "菜单名称"， icon : '图标样式，可选'，divid : '分割线，可选'}
```
#### 回调函数 callback
```
callback: function(item) {...}
// 参数 item 为被单击元素对象
```
### 关于右键点击弹出菜单事项

绑定 contextmenu 事件时，函数需返回 false ，防止冒泡事件

在其它事件中，适当使用 event.preventDefault(); 忽略事件

使用方法可参考 [演示地址](//www.tianlunvip.com/demo/popmenu.html "演示地址")
