/**
 * pc端弹出层组件
 * @authors Your Name (you@example.org)
 * @date    2018-07-19 14:34:53
 * @version $Id$
 */

 (function(window,document){
 		var Hint = function(dom,options){
 			if(!(this instanceof Hint)) return new Hint(dom, options);
 			this.initOpt = {
 				title:'系统消息',
 				okText:'确认',
 				onText:'取消'
 			};
 			this.extend(options, this.initOpt)
 			this.init()
 		}

 		Hint.prototype = {
 			constructor = Hint;
 			//初始化方法
 			init: function () {
 				
 			},
 			//对象扩展方法
 			extend: function (obj1,obj2){
 				for (var k in obj2){
 					if(obj1[k]) break;
 					obj1[k] = obj2[k];
 				}
 				return obj1
 			},
 			
 			//生成dom结构
 			createDom: function (){
 				var hintBox = document.createElement('div'),
 					  hintHeader = document.createElement('div'),
 					  hintTitle = document.createElement('h2'),
 					  hintClose = document.createElement('span'),
 					  hintContent = document.createElement('div'),
 						hintText = document.createElement('span'),
 						hintOk = document.createElement('button'),
 						hintNo = document.createElement('button');

 				hintTitle.innerHTML = this.options.title;	
 			}

 		}


 })(window,document)
