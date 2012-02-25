require(
	['./Mr.Async/lib/Mr.Async.js', 
	'./Mr.Async/lib/Recoder/Mr.Async.Interpreter.js'], 
	function(Mr, interpreter){

	var config = {
		width : 20,
		valueToPixel : 2,
		interval : 10,
		color : 'yellowgreen'
	};
	
	Mr.Async = interpreter;
	
	var values = [40, 50, 11, 44, 55, 98, 33, 89, 53, 20, 24, 55, 77, 43, 20, 86, 22];
	
	function initialize(array){
		var objs = []
		var leftValue = 0;
		$(array).each(function(idx, val){
			var $el = $('<li></li>').attr({
				id : 'obj' + idx
			})
			.css({
				width : config.width,
				height : config.valueToPixel * val,
				left : leftValue,
				'background-color' : config.color
			})
			.appendTo('#canvas').append('<span>' + val + '</span>');
			
			objs.push({
				$el : $el,
				left : leftValue,
				val : val
			});

			leftValue += config.interval + config.width;
		});
		
		return objs;
	}
	
	function asyncSwap(arr, i, ii){
		var de = Mr.Deferred();
		
		var leftFrom = arr[i].left;
		var leftTo = arr[ii].left;
		
		arr[i].$el.addClass('active');
		arr[ii].$el.addClass('active');
		
		setTimeout(function(){
			arr[i].$el.animate({ left : leftTo }, 500);
			arr[ii].$el.animate({ left : leftFrom }, 520, function(){

				arr[i].left = leftTo;
				arr[ii].left = leftFrom;
								
				var temp = arr[i];
				arr[i] = arr[ii];
				arr[ii] = temp;
			
				arr[i].$el.removeClass('active');
				arr[ii].$el.removeClass('active');
			
				de.resolve();
			});
		}, 1000);
						
		return de.promise();
	}
	
	$(function(){
		var objs = initialize(values);
		var c = 0;
		var bubbleSort = eval(Mr.Async.recode(function(array){
			for(var i = 0, len = array.length; i < len - 1 ; i++){
				for(var ii = 0; ii < len - i - 1 ; ii++){
					if(array[ii].val > array[ii + 1].val){
						$await(asyncSwap(array, ii, ii + 1));
					}
				}
			}
		}));
		
		bubbleSort.start(objs);
	});
});