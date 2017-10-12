(function() {
	var numArr = [];
	for (var i = 0; i < 5; i++) {
		numArr[i] = i + 1;
	}
	function showArray(arr) {
		console.log(arr);
		return true;	
	};
	
	showArray(numArr);

	console.log("pop method return:", numArr.pop());
	showArray(numArr);

	console.log("push method return:", numArr.push(10));
	showArray(numArr);

	console.log("shift method return:", numArr.shift());
	showArray(numArr);

	console.log("unshift method return:", numArr.unshift(11));
	showArray(numArr);

	var strArr = ['Apple', 'Pineapple', 'Orange'],
	str = strArr.join(';');

	console.log( "join method return:", str, 'Type is', typeof(str) );

	str += ';Pear';
	strArr = str.split(';')
	console.log("split method:", strArr);

	console.log("delete method return:", delete strArr[2]);
	showArray(strArr);

	console.log("splice method (as delete) return:", strArr.splice(1, 1) );
	showArray(strArr);

	console.log("splice method (as incert) return:", strArr.splice(1, 0, "Dog", "Cat") );
	showArray(strArr);

	console.log("slice method return:", strArr.slice(0, 2));
	console.log("slice method with 1 argument return:", strArr.slice(1));

	console.log("sort method return:", strArr.sort());
	numArr = numArr.sort(function(a,b){
		return a - b;
	});
	console.log("sort method for numbers:", numArr);

	console.log("reverse method return:", numArr.reverse());
	
	showArray(numArr);
	console.log("indexOf method return (search 10):", numArr.lastIndexOf(10));
	numArr.push(10);
	showArray(numArr);
	console.log("lastIndexOf method return (search 10):", numArr.lastIndexOf(10));

	console.log("concat method return:", numArr.concat(strArr));

	strArr.forEach(function(e, i, arr){
		console.log(i, e, arr);
	})

	function isBigEnough(value) {
  		return value > 3;
	}
	var filtered = numArr.filter(isBigEnough);
	console.log("filter method:", filtered);


	function getElement(element, index, array) {
		return element > 3;
	}
	console.log("find method:",numArr.find(getElement));


	var doubles = numArr.map(function(num) {
  		return num * 2;
	});
	console.log("map method:", doubles);

})();