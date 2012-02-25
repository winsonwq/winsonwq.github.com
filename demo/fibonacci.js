require(
	['./Mr.Async/lib/Mr.Async.js', 
	'./Mr.Async/lib/Recoder/Mr.Async.Interpreter.js'], 
	function(Mr, interpreter){
		
		Mr.Async = interpreter;
		
		$(function(){		
			function once(dom, event){
				var de = Mr.Deferred();
				
				$(dom).one(event, function(){
					de.resolve();
				});
				
				return de.promise();
			}
			
			function print(number){
				$('<div></div>').addClass('number').text(number).appendTo(document.body);
			}
					
			var code = Mr.Async.recode(function(){
				$await(once(document.body, 'click'));
				print(0);
				
				$await(once(document.body, 'click'));
				print(1);
				
				var a = 0, current = 1;
				while(true){
					var b = a;
					a = current;
					current = a + b;
					
					$await(once(document.body, 'click'));
					print(current);
				}
				
			});
			
			var fibonacci = eval(code).start();
		});
});