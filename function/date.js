

var datePicker = (function(){
     function DatePicker($dom){
     	this.$dom = $dom;
     	this.init();
     }

     DatePicker.prototype = {
     	//初始化
     	init: function(){
     		this.date = new Date();
     		this.watchDate = new Date();
     		this.render();
     		this.setDate();
     		this.bindEvent();
     	},
     	//渲染
     	render: function(){
     		var tpl = `<div class="ui-date-picker" style="display:none">
                        <div class="header">
                          <span class="pre caret-left"></span>  
                          <span class="cur header-date"></span>
                          <span class="next caret-right"></span>
                        </div>
                        <table class="panel">
                          <thead>
                            <tr>
                              <th>日</th>
                              <th>一</th>
                              <th>二</th>
                              <th>三</th>
                              <th>四</th>
                              <th>五</th>
                              <th>六</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>`;
        this.$datePicker = $(tpl);
        this.$datePicker.insertAfter(this.$dom).css({
        	'position': 'absolute',
        	'left': this.$dom.offset().left,
        	'top':this.$dom.offset().top + this.$dom.height(true)
        })
                      
     	},
     	//设置时间
     	setDate: function(){
     		this.$datePicker.find('tbody').html('');

     		var fristDay = this.getFristDay(this.watchDate),
     				lastDay = this.getLastDay(this.watchDate);

     		var dateArr = [];
     		for(var i = fristDay.getDay();i > 0;i--) {
     			//得到显示在本月的上月日期,并且加入数组
     			var d = new Date(fristDay.getTime() - i*60*60*24*1000);
     			dateArr.push({type:'pre',date:d})
     		};
     		for(var k = 0;k < lastDay.getDate() - fristDay.getDate()+1;k++){
     			//得到这个月的实际日期并且加入数组
     			var d = new Date(fristDay.getTime() + k*60*60*24*1000);
     			dateArr.push({type:'cur',date:d})
     		};
     		for(var j = 1;j<7 - lastDay.getDay();j++){
     			//得到下月显示在本月的日期,并且加入数组
     			var d = new Date(lastDay.getTime()+j*60*60*24*1000);
     			dateArr.push({type:'next',date:d})
     		}
     		//得到面板头部的显示的当前日期
     		this.$datePicker.find('.header-date').text(this.watchDate.getFullYear()+'年'+(this.watchDate.getMonth()+1) +'月')

     		//处理表格
     		var tpl = '',
     				len = dateArr.length;
     		for(var i = 0;i<len;i++){
     			if(i%7===0){
     				tpl = '<tr>' + tpl;
     			}
     			tpl += '<td class="';
     			if(dateArr[i].type === 'pre'){
     				tpl +='pre-month"';
     			}else if(dateArr[i].type === 'cur'){
     				tpl +='cur-month"';
     			}else if (dateArr[i].type === 'next') {
     				tpl +='next-month"';
     			}
     			tpl += 'data-data="' + this.getYYMMDD(dateArr[i].date)+'">'
     			tpl += this.toFixed(dateArr[i].date.getDate())+'</td>' 
     			if(i%7===6){
     				tpl+='</tr>'
     			}

     		}
     		this.$datePicker.find('tbody').append(tpl)


     	},
     	//绑定事件
     	bindEvent: function(){
     		var _this = this;
     		this.$datePicker.find('.pre').on('click',function(){
     			_this.watchDate = _this.getPreFristDay(_this.watchDate);
     			_this.setDate()
     		});
     		this.$datePicker.find('.next').on('click',function(){
     			_this.watchDate = _this.getNextFirstDay(_this.watchDate)
     			_this.setDate()
     		})
     		this.$datePicker.on('click', '.cur-month', function(){
     			_this.$dom.val($(this).attr('data-data'));
     			_this.$datePicker.hide();
     		});

     		this.$datePicker.on('click', function(e){
            e.stopPropagation();
        });
        this.$dom.on('click', function(e){
          e.stopPropagation();
          _this.$datePicker.show();
        });
     		$(window).on('click',function(){
     			_this.$datePicker.hide();
     		})

     	},
     	//获取data所在月份的第一天的时间对象
     	getFristDay: function(date){
     		var year = date.getFullYear(),
     				month = date.getMonth();
     		return new Date(year, month, 1);		
     	},
     	//获取data所在月份的最后一天的时间随想
     	getLastDay: function(date){
     		var nextMonthFristDay = this.getNextFirstDay(date);
     		return new Date(nextMonthFristDay.getTime() - 60*60*24*1000)
     	},
     	//获取上月第一天的时间对象
     	getPreFristDay: function(date){
     		var year = date.getFullYear(),
     				month = date.getMonth();
     		month--;
     		console.log(1)
     		if(month < 0){
     			month = 11;
     			year --;
     		}
     		return new Date(year, month, 1)

     	},
     	//获得下个月第一天的时间对象
     	getNextFirstDay: function(date){
     		var year = date.getFullYear(),
     				month = date.getMonth();
     		month ++ ;
     		if(month>11){
     			month = 0;
     			year++
     		}		
     		return new Date(year, month, 1)
     	},
     	getYYMMDD: function(date){
     			var yy = date.getFullYear(),
     					mm = date.getMonth()+1,
     					dd = date.getDate();
     			return yy +'-'+ this.toFixed(mm) +'-'+this.toFixed(dd)		
     	},
     	toFixed: function(n){
     		return (n+'').length === 1 ? ('0'+n+'') : (n+'') 
     	}
     }

    $.fn.DatePicker = function() {
    	this.each(function() {
    		 new DatePicker($(this));
    	});
		}

})()