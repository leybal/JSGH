let arr = ['a', 'b', 'c', 4, 5, 6];

function WorkWithArrays() {
    this.pop = function() {
        let lastEl = this[this.length - 1];
        delete this[this.length - 1];

        return lastEl;
    };

    this.push = function(e) {
        this[this.length] = e;

        return this.length;
    };

    this.slice = function(begin, end) {
        let i,
            result = [];
        if (arguments.length === 0) {
            result = new Array(this.join(', '));
        } else if (arguments.length === 1) {
            for (i = begin; i < this.length; i++) {
                result[result.length] = this[i];
            }
        } else if (arguments.length === 2) {
            for (i = begin; i < end; i++) {
                result[result.length] = this[i];
            }
        }

        return result;
    };

    this.join = function(sym) {
        let result = '';
        this.forEach(function(e, i, arr){
            result += e;
            if (i < arr.length - 1) result += sym;
        });

        return result;
    };

    this.reverse = function() {
        let result = [];
        this.forEach(function(e, i, arr){
            result[arr.length - 1 - i] = e;
        });

        return result;
    };
}

let changeArray = new WorkWithArrays();

console.log('pop() method return:', changeArray.pop.call(arr));
console.log(arr);

console.log('push() method return:', changeArray.push.call(arr, 7));
console.log(arr);

console.log('slice() method return:', changeArray.slice.call(arr, 1));
console.log(arr);

console.log('join() method return:', changeArray.join.call(arr, ';'));
console.log(arr);

console.log('reverse() method return:', changeArray.reverse.call(arr));
console.log(arr);

console.warn('The prototype solution');

Array.prototype.pop = changeArray.pop;
Array.prototype.push = changeArray.push;
Array.prototype.slice = changeArray.slice;
Array.prototype.join = changeArray.join;
Array.prototype.reverse = changeArray.reverse;

arr = ['a', 'b', 'c', 4, 5, 6];

console.log('pop() method return:', arr.pop());
console.log(arr);

console.log('push() method return:', arr.push(7));
console.log(arr);

console.log('slice() method return:', arr.slice(1));
console.log(arr);

console.log('join() method return:', arr.join(';'));
console.log(arr);

console.log('reverse() method return:', arr.reverse());
console.log(arr);


console.warn('The sum() method for numbers');

Number.prototype.sum = function(val) {
    if (isNaN(val)) {
        console.warn('Expected number as an argument');
        return false;
    }

    return this + val;
};

console.log(3..sum(2));


console.warn('Recursion');

function factorialis(val) {
    if (val !== 1) {
        return val * factorialis(val - 1);
    } else {
        return val;
    }
}

console.log ('factorialis:', factorialis(10));

function power(x, y) {
    if (y > 1) {
        return x * power(x, y - 1);
    } else {
        return x;
    }
}

console.log ('power:', power(2, 5));

function combine(val) {
    if (val.toString().length > 1) {
        return +val.toString()[0] + +combine(val.toString().slice(1));
    } else {
        return val;
    }
}

console.log ('combine:', combine(3456));


console.warn('Recursion calculation time vs loop calculation time');

let time = performance.now();
for(let i = 0; i < 10000; i++) {
    factorialis(10);
}
console.log('factorialis time (recursion):', performance.now() - time);

time = performance.now();
for(let i = 0; i < 10000; i++) {
    let n = 10,
        res = 1;
    while (n--) {
        res *= n + 1;
    }
}
console.log('factorialis time (loop): ', performance.now() - time);


time = performance.now();
for(let i = 0; i < 10000; i++) {
    power(2, 5);
}
console.log('power time (recursion):', performance.now() - time);

time = performance.now();
for(let i = 0; i < 10000; i++) {
    let x = 2,
        y = x;
        n = 5;
    for (let i = 1; i < n; i++) {
        y *= x;
    }
}
console.log('power time (loop): ', performance.now() - time);


time = performance.now();
for(let i = 0; i < 10000; i++) {
    combine(3456);
}
console.log('combine time (recursion):', performance.now() - time);

time = performance.now();
for(let i = 0; i < 10000; i++) {
    let str = '3456',
        num = 0;
    for (let i = 0; i < str.length; i++) {
        num += +str[i];
    }
}
console.log('combine time (loop): ', performance.now() - time);


function additionalTask() {
    let arr = [2,1,5,0,3,4,7,2,3,1,0];

    function getPuddleVolume(arr) {
        let max = Math.max.apply(null, arr),
            volume = 0;

        for (var y = 1; y <= max; y++) {
            let inside = false,
                gaps = 0;

            for (var x = 0; x < arr.length; x++) {
                if (arr[x] >= y) {
                    if (inside) {
                        inside = false;
                        volume += gaps;
                        x--;
                    } else {
                        inside = true;
                        gaps = 0;
                    }
                } else {
                    gaps++;
                }
            }
        }

        return volume;
    }

    console.log(getPuddleVolume(arr));
    console.log(getPuddleVolume(arr.reverse()));
}