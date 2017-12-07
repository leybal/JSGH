$(function($) {
    let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    let getXY = i => 'x'+( ((i-1) % 4)+1 )+'y'+Math.ceil( (i)/4);


    function create() {
        for(let i=1; i<=15; i++) {
            $('#board').append('<div class="block block-'+i+' '+getXY(i)+'">'+i+'</div>');
        }
    }


    function move(from, to) {
        if( !$('.'+to).length ) {
            $('.'+from).removeClass(from)
                .addClass(to);
            return true;
        } else {
            return false;
        }
    }


    function validCoordinates(a, b) {
        if (a > 0 && a < 5 && b > 0 && b < 5) {
            return true;
        } else {
            return false;
        }
    }


    function keyboardEvent(e) {
        switch(e.keyCode) {
            case 38: key('up');    break;
            case 40: key('down');  break;
            case 37: key('left');  break;
            case 39: key('right'); break;
        }
        checkWin();
    }


    function mouseClick(from) {
        let a = 0,
            b = 0;

        a = parseInt(from[1]);
        b = parseInt(from[3]) + 1;
        if (validCoordinates(a, b)) move(from, 'x'+a+'y'+b);

        a = parseInt(from[1]) + 1;
        b = parseInt(from[3]);
        if (validCoordinates(a, b)) move(from, 'x'+a+'y'+b);

        a = parseInt(from[1]);
        b = parseInt(from[3]) - 1;
        if (validCoordinates(a, b)) move(from, 'x'+a+'y'+b);

        a = parseInt(from[1]) - 1;
        b = parseInt(from[3]);
        if (validCoordinates(a, b)) move(from, 'x'+a+'y'+b);

        checkWin();
    }


    function key(type) {
        let from = '',
            to = '';

        for(let a = 1; a <= 4; a++) {
            for(let b = 1; b <= 3; b++) {
                switch(type) {
                    case 'up':
                        from = 'x'+a+'y'+(b+1);
                        to   = 'x'+a+'y'+b;
                        break;
                    case 'down':
                        from = 'x'+a+'y'+(4-b);
                        to   = 'x'+a+'y'+(5-b);
                        break;
                    case 'left':
                        from = 'x'+(b+1)+'y'+a;
                        to   = 'x'+b+'y'+a;
                        break;
                    case 'right':
                        from = 'x'+(4-b)+'y'+a;
                        to   = 'x'+(5-b)+'y'+a;
                        break;
                }
                if (move(from, to)) return;
            }
        }
    }


    function mix(j) {
        for(let i=1; i <= j; i++) {
            switch( getRandomInt(1 , 4) ) {
                case 1: key('up');    break;
                case 2: key('down');  break;
                case 3: key('left');  break;
                case 4: key('right'); break;
            }
        }
    }


    function checkWin() {
        let overlap = 0;
        for(let i=1; i <= 15; i++) {
            if( $('.block-'+i).hasClass( getXY(i) ) ) overlap++;
        }
        if(overlap == 15) alert('Victory!');
    }


    function init() {
        create();
        mix(1000);

        window.addEventListener('keydown', keyboardEvent, false);
        $('#board').click(function (e) {
            mouseClick(e.target.classList[2]);
        });

        $('#new').click(function () {
            $('#board').empty();
            create();
            if ( $('#win').is(':checked') ) {
                mix(3);
            } else {
                mix(1000);
            }
        });
    }

    init();
});