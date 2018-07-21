/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-07-20 12:14:17
 * @version $Id$
 */



(function(window,document){
 		var Hint = function(options){
 			if(!(this instanceof Hint)) return new Hint(options);
 			this.initOpt = {
 				// title:'系统消息',
 				// confirmText:'确认',
 				// closeText:'取消',
 				confirmFn: function(){},
 				closeFn: function(){}
 			};
 			this._options = this.extend(options, this.initOpt)
 			this.init()
 		}

 		Hint.prototype = {
 			//初始化方法
 			init: function () {
 				this.createDom();
 				this.bindEvent();
 				this.setHint();
 			},
 			//对象扩展方法
 			extend: function (obj1,obj2){
 				for (var k in obj2){
 					if(obj1[k]) continue;
 					obj1[k] = obj2[k];
 				}
 				return obj1
 			},
 			
 			//生成dom结构
 			createDom: function (){
 				var tpl = `<div class="dialog" style="display:none">
                      <div class="dialog-overlay"></div>
                      <div class="dialog-box">
                        <div class="dialog-header">
                          <h3></h3>
                          <span class="btn-close">x</span>
                        </div>
                        <div class="dialog-content"></div>
                        <div class="dialog-footer">
                          <a href="#" class="btn btn-confirm">确定</a>
                          <a href="#" class="btn btn-close">取消</a>
                        </div>
                      </div>
                    </div>`;
        this.$Hint = $(tpl);
        $('.dialog').remove()
        $('body').append(this.$Hint);
        this.showHint()
 			},

 			//绑定事件
 			bindEvent: function (){
 				var _this = this;
 				//取消按钮事件
 				_this.$Hint.find('.btn-close').on('click',function(e){
 					e.preventDefault();
 					_this.hideHint();
 					_this._options.closeFn();
 				})
 				//确认按钮事件
 				_this.$Hint.find('.btn-confirm').on('click',function(e){
 					e.preventDefault();
 					_this.hideHint();
 					_this._options.confirmFn();
 				})

 			},
 			hideHint: function () {
 				this.$Hint.hide()
 			},

 			showHint: function () {
 				this.$Hint.show()
 			},

 			setHint: function(){
 				var $Hint = this.$Hint;
 				this._options.title ? $Hint.find('.dialog-header').show() : $Hint.find('.dialog-header').hide();
 				this._options.isShowConfirmBtn ?  $Hint.find('.btn-confirm').show() : $Hint.find('.btn-confirm').hide();
 				this._options.isShowCloseBtn ?  $Hint.find('.btn-close').show() : $Hint.find('.btn-close').hide();
 				$Hint.find('.dialog-header h3').text(this._options.title);
 				$Hint.find('.dialog-content').html(this._options.message)
 			}

 		}

 		window.Hint = Hint;
 })(window,document)
