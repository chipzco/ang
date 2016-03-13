myApp.factory('curryService', function ($log) {
    var curryfns = {};
    
    
    // this is doing binding and partial function application, 
	// so I thought bind was a more appropriate name
	// The goal is that when you execute the returned wrapped version of fn, its this will be scope
    curryfns.bind=function(fn, scope) {
	  // arguments is an implicit variable in every function that contains a full list
	  // of what was passed in. It is important to note that javascript doesn't enforce arity.
	  // since arguments is not a true array, we need to make it one.
	  // a handy trick for this is to use the slice function from array,
	  // since it will take arguments, and return a real array.
	  // we are storing it in a variable, because we will need to use it again.
    	var slice =  Array.prototype.slice,
	    	// use slice to get an array of all additional arguments after the first two
    		//that have been passed to this function.
	     args = slice.call(arguments, 2);
    	$log.debug("in outer curry");
    	$log.debug(args);
    	var myinitnumber=args[0] +100;
    	$log.debug("initnumber = "  + myinitnumber);
	  // we are returning a function mostly as a way to delay the execution.
	  // as an aside, that this is possible in a mainstream language is a minor miracle
	  // and a big part of why i love javascript.
		  return function() {
		    // since functions are objects in javascript, they can actually have methods.
		    // this is one of the built in ones, that lets you execute a function in a different
		    // context, meaning that the this variable inside the 
		    // function will actually refer to the first argument we pass in.
	
		    // the second argument we are jamming together the arguments from the first function
		    // with the arguments passed in to this wrapper function, and passing it on to fn.
		    // this lets us partially apply some arguments to fn when we call bind.
			  var newint=myinitnumber +50;
			  $log.debug("in inner  curry with new int"  + newint);
			$log.debug(arguments);
		    return fn.apply(scope, args.concat(slice.call(arguments)));
		  };
	  };
    
   

    return curryfns;
});
