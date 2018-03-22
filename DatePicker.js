(function() {
		var datepicker = {};
        var warpper;
		datepicker.getMonthDate = function(year, month) {
			var ret = [];

			if (!year || !month) {
				var today = new Date();
				year = today.getFullYear();
				month = today.getMonth()+1;
			}

			var firstDay = new Date(year, month-1, 1);
			var firstDayOfWeek = firstDay.getDay();
			if (firstDayOfWeek === 0) firstDayOfWeek = 7;
			var preDay = firstDayOfWeek - 1;
			
			var lastDayOfLastMonth=new Date(year,month-1,0);
            var lastDateOfLastMonth=lastDayOfLastMonth.getDate();

			var lastDay = new Date(year, month, 0);
			var lastDate = lastDay.getDate();

			for (var i = 0; i < 7*6; i++) {
				var date = i +1- preDay;
				var showDate = date;
				var thisMonth = month;
				if (date <= 0) {
					thisMonth = month - 1;
					showDate = lastDateOfLastMonth + date;
				}
				if (date > lastDate) {
					thisMonth - month + 1;
					showDate = date - lastDate;
				}
				if (thisMonth === 0) thisMonth = 12;
				if (thisMonth === 13) thisMonth = 0;

				ret.push({
					month: thisMonth,
					date: date,
					showdate: showDate
				});
			}
			return {
				year:year,
				month:month,
				days:ret
			};
		};
			 var monthDate;
			 var wrapper;
			datepicker.buildUI = function(year,month) {
                monthDate  = datepicker.getMonthDate(year,month);
				var html = '<div class="datepiker-header">' +
					'<a class="datepiker-prevBtn" href="#">&lt;</a>' +
					'<a class="datepiker-nextBtn" href="#">&gt;</a>' +
					'<span class="datepiker-curmonth">'+monthDate.year+'-'+monthDate.month+'</span>' +
					'</div>'+
			'<div class="datepiker-body">'+
				'<table class="datepiker-title">'+
					'<thead>'+
						'<tr>'+      
						'<th>一</th>'+
						'<th>二</th>'+
						'<th>三</th>'+
						'<th>四</th>'+
						'<th>五</th>'+
						'<th>六</th>'+
						'<th>日</th>'+
						'</tr>'+     
					'</thead>'+
					'<tbody class="datepiker-date">';
                     for(var i=0;i<monthDate.days.length;i++)
                     {
                     	if(i%7===0)
                     	{
                     		html+='<tr>';
                     	}
                     	html+='<td data-date="'+monthDate.days[i].date+'">'+monthDate.days[i].showdate+'</td>';
                     	if(i%7===6)
                     	{
                     		html+='</tr>';
                     	}
                     }
					html+='</tbody></table></div>';
					return html;
	    };	
	    
	datepicker.render=function(direction)
	{
	   var year,month;
	   if(monthDate)
	   {
	   	 year=monthDate.year;
	   	 month=monthDate.month;
	   }
	   if(direction==='next')
	   {
	   	  month++;
	   	  if(month===12)
	   	  {
	   	  	year++;
	   	  	month=1;
	   	  }
	   }
	   if(direction==='prev') 
	   {
	   	 month--;
	   	 if(month===0)
	   	 {
	   	 	year--;
	   	 	month=12;
	   	 }
	   }
	   var html = datepicker.buildUI(year,month);
       wrapper = document.querySelector('.datepiker-wrapper');
       if(!wrapper)
       {
       	 wrapper=document.createElement('div');
       	 wrapper.className='datepiker-wrapper';
       	 document.body.appendChild(wrapper);
       }      
       wrapper.innerHTML=html;
       
	} 
	
	datepicker.init=function(input)
    {
       datepicker.render();
       var $input=document.querySelector(input);
       var isOpen=false;
       
       $input.addEventListener('click',function(){
       	   if(isOpen)
       	   {
       	   	   wrapper.classList.remove('datepiker-wrapper-show');
       	   	   isOpen=false;
       	   }
       	   else
       	   {
       	   	 	wrapper.classList.add('datepiker-wrapper-show'); 
       	   	 	var left=$input.left;
       	   	 	var top=$input.offsetTop+$input.offsetHeight;
       	   	 	wrapper.style.left=left;
       	   	 	wrapper.style.top=top+2+'px';
       	   	 	isOpen=true;
       	   }    	
       },false);
       
       wrapper.addEventListener('click',function(e){
       	  var $target=e.target;
       	  
       	  if($target.classList.contains('datepiker-prevBtn'))
       	  {
       	  	  datepicker.render('prev');
       	  }
       	  
       	  if($target.classList.contains('datepiker-nextBtn'))
       	  {
       	  	 datepicker.render('next');
       	  }
       	  
       },false);
       
       
         wrapper.addEventListener('click',function(e){
       	  var $target=e.target;
       	  
       	  if($target.tagName.toLowerCase()=='td')
       	  {
       	  	var date=new Date(monthDate.year,monthDate.month-1,$target.dataset.date);
       	  	$input.value=formatDate(date);
       	  	wrapper.classList.remove('datepiker-wrapper-show');
       	   	isOpen=false;
       	  }      	        	
       	  
       },false);
       
    };	
    
    function formatDate(date)
    {
    	var dateValue='';
    	function padding(num)
    	{
    		if(num<10) return '0'+num;
    		return num;
    	}
    	
    	dateValue+=date.getFullYear()+'-';
    	dateValue+=padding(date.getMonth()+1)+'-';
    	dateValue+=padding(date.getDate());
    	return dateValue;
    }
        window.datepicker=datepicker;        			
})();

		
	    
	

