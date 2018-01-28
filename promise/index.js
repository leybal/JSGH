function perform() {
    var res = new Promise((resolve, reject) => {
        console.log(arguments);

        var func = arguments[1];
        var locArgument = arguments[0];
        resolve(func(locArgument));
    });
    return res;
}

perform(null, function(value) { // value === null
    var param = 1;
    console.log(param); // 1
    return param;
})
    .then(function(param) { // param === 1
        console.log(++param); // 2
        return param;
    })
    .then(function(param) { // param === 2
        console.log(++param); // 3
        return param;
    });