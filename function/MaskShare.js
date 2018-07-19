/**
 * 遮罩分享层
 * @authors Jason
 * @date    2018-07-18 22:50:44
 * @version 1.0
 */

 (function(window,document) {
	//辅助工具
	var isDom = (typeof HTMLElement === 'object') ? 
			function(obj){
				return (obj instanceof HTMLElement)
			} 
			:
			function (obj) {
				return  (obj && typeof obj == 'object' && obj.nodeType == 1 && typeof obj.nodeName == 'string')
			}

		/*
		@dom:       被点击的目标元素
		@options:   传入参数
			@src :      传入图片的地址
			@imgStyle: 	图片的附加样式
			@divStyle:  外层容器的额外样式
			@open():  	打开图片后的回调函数
			@close():   关闭图片后的回调函数
		*/
	var MaskShare = function (dom, options) {
		//判断是否是由new操作符生成对象
		if (!(this instanceof MaskShare)) return new MaskShare(dom, options)
		//参数合并
		this.options = this.extend({
			//默认参数
		}, options);

		//判断参数dom的值是字符串还是dom对象
		if (typeof dom == 'string') {
			this.dom = document.querySelector(dom)
		}else if(isDom(dom)){
			this.dom = dom
		}

		//创建遮罩容器及其图片,及其设置样式
		var oDiv = document.createElement('div');
		var oImg = document.createElement('img');
		oDiv.style.cssText = "display: none;position: absolute;left: 0;top: 0;width: 100%;height:100%;background-color: rgba(0,0,0,0.8);z-index:9999;";
		oImg.style.cssText ="margin-top:20px;width: 100%;";

		//外部扩张样式
		if(this.options.divStyle){
			this.setStyle(oDiv, this.options.divStyle)
		}
	if(this.options.imgStyle){
	 	this.setStyle(oImg, this.options.imgStyle)
	}
	oImg.src = this.options.src
	oDiv.appendChild(oImg)
	this.oDiv = oDiv
	//调用初始化样式
		this.init();

	}

	MaskShare.prototype = {

		//初始化
		init () {
			this.event()
		},

		//选项扩展
		extend (obj1,obj2) {
			for (var k in obj2){
					obj1[k] = obj2[k]
			}
			return obj1
		},

		//设置样式
		setStyle (dom, style) {
			for (var k in style) {
				dom.style[k] = style[k]
			}
		},

		//事件相关操作
		event () {
			var _this = this;
		
			//打开遮罩层
			this.dom.addEventListener('click', function(){
				document.body.appendChild(_this.oDiv)
				_this.oDiv.style.display = 'block';

				_this.options.open && _this.options.open()
			}, false)

			//关闭遮罩
			this.oDiv.addEventListener('click', function(){
				_this.oDiv.style.display = 'none';

				_this.options.close && _this.options.close()
			}, false)

		}
	}

	window.MaskShare = MaskShare;
 })(window,document)

