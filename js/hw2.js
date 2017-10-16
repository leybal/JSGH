let i = 0,
    str = '',
    n = 0,
    m = 0;

for (i = 0; i < 7; i++) {
    str += '#';
    console.log(str);
}
console.log(str.length);

for (i=1; i < 101; i++) {
    if (i % 3 == 0) {
        console.log('Fizz');
    } else if ( i % 5 == 0 ) {
        console.log('Buzz');
    }
}

for (i=1; i < 101; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
        console.log('Fizz Buzz');
    }
}

str = '';
n = 8;
m = n + 1;
for (i=1; i <= n*n; i++) {
    if (i % m == 0) {
        str += '\n\r';
    } else if (i % 2 != 0) {
        str += '#';
    } else {
        str += ' ';
    }
}
console.log(str);

let min = function(a, b) {
    return a < b ? a : b;
};
console.log('function min return:', min(4,5));

let isEven = function(number) {
    if(number % 2 === 0){
        return true;
    }else if(isNaN(number)){
        return "is Nan";
    }else{
        return false;
    }
};
console.log('50:', isEven(50));
console.log('47:', isEven(47));
console.log('-1:', isEven(-1));

let countBs = function(text) {
    let result = text.match(/[B]/g).length;
    return result;
};
console.log('String "Bear and bird" has', countBs('Bear and bird'), 'symbol(s) B');

let countChar = function(text, sym) {
    let arr = text.match(new RegExp(sym, "g")),
        result = '';
    result = ( arr || []).length;
    return result;
};
console.log('String "Bear and bird" has', countChar('Bear and bird', 'a'), 'symbol(s) a');