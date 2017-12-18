$(function($) {
    let results = JSON.parse(localStorage.getItem('results')) || [],
        size = 0,
        name = '';
        start = new Date,
        flag = false;

    let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    let getXY = i => 'x'+( ((i-1) % size)+1 )+'y'+Math.ceil( (i)/ size);

    let setStyle = i => {
        let x = ((i-1) % size) * 70,
            y = (Math.ceil( (i)/ size) - 1) * 70,
            currentClass = getXY(i);
        $('.' + currentClass).css({left: x + 'px', top: y + 'px'});
    };
    let changeStyle = (currentClass) => {
        let x = ( parseInt(currentClass[1]) - 1) * 70,
            y = ( parseInt(currentClass[3]) - 1) * 70;
        $('.' + currentClass).css({left: x + 'px', top: y + 'px'});
    };


    function create() {
        let boardSize = 70 * size - 4;
        $('#board').css({width: boardSize + 'px', height: boardSize + 'px'});

        for(let i=1; i<= size * size - 1; i++) {
            $('#board').append('<div class="block block-'+i+' '+getXY(i)+'">'+i+'</div>');
            setStyle(i);
        }
    }


    function move(from, to) {
        if( !$('.'+to).length && flag ) {
            $('.'+from).removeClass(from)
                .addClass(to);
            changeStyle(to);
            return true;
        } else {
            return false;
        }
    }


    function validCoordinates(a, b) {
        if (a > 0 && a <= size && b > 0 && b <= size) {
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

        for(let a = 1; a <= size; a++) {
            for(let b = 1; b <= size-1; b++) {
                switch(type) {
                    case 'up':
                        from = 'x'+a+'y'+(b+1);
                        to   = 'x'+a+'y'+b;
                        break;
                    case 'down':
                        from = 'x'+a+'y'+(size - b);
                        to   = 'x'+a+'y'+(size + 1 - b);
                        break;
                    case 'left':
                        from = 'x'+(b+1)+'y'+a;
                        to   = 'x'+b+'y'+a;
                        break;
                    case 'right':
                        from = 'x'+(size - b)+'y'+a;
                        to   = 'x'+(size + 1 - b)+'y'+a;
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
        for(let i=1; i <= size * size; i++) {
            if( $('.block-'+i).hasClass( getXY(i) ) ) overlap++;
        }
        if(overlap == size * size - 1 && flag === true) {
            flag = false;
            let time = new Date - start,
                result = {
                    name: name,
                    time: time,
                    size: size
                };
            results.push(result);
            localStorage.setItem('results', JSON.stringify(results));
            showTable();

            $('<h4 id="congr">Winner winner chicken dinner!</h4>').insertBefore('#board');
        }
    }


    (function () {
        $('#new').click(function () {
            name = $('#name').val();

            if (!name.length) {
                alert("Enter your name.");
                return;
            }

            $('#congr').remove();

            flag = true;

            $('#board').removeClass( "hidden" );
            $('#board').empty();
            size = parseInt($("#size").val());
            create();
            if ( $('#win').is(':checked') ) {
                mix(3);
            } else {
                mix(1000);
            }

            window.addEventListener('keydown', keyboardEvent, false);
        });
    })();

    $('#board').click(function (e) {
        mouseClick(e.target.classList[2]);
    });


    function addRow(name, time, size) {
        let tr = document.createElement('tr');

        for (let i = 0; i < 3; i++) {
            let td = document.createElement('td');
            switch (i) {
                case 0:
                    td.innerHTML = name;
                    break;
                case 1:
                    td.innerHTML = time;
                    break;
                case 2:
                    td.innerHTML = size;
                    break;
            }
            tr.appendChild(td);
        }
        $('#winners table').append(tr);
    }

    function showTable(){
        let winners = $('#winners');

        $(winners).empty();
        $(winners).append('<table></table>');

        results.forEach(function(val, i){
            addRow(results[i].name, results[i].time, results[i].size);
        });
    }

    showTable();
});