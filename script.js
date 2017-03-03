$(function(){
    var moves = 0;
    var difficulty = 4;
    var linker = {};
    var highScores = parseCookie(document.cookie);
    updateScoreTable();

    function updateScoreTable(){
        $('#table-body').empty();
        for (var key in highScores) {
            var newRow = $('<tr></tr>').append('<td>' + key +'</td>').append('<td>' + highScores[key] + '</td>');
            $('#table-body').append(newRow);
        }
    }

    function parseCookie(cookie){
        if(cookie == null || cookie =='')
            return {};
        else{
            return JSON.parse(cookie);
        }
    }

    createBoard();

    function createBoard(){
        $('#message').hide();
        var moves = 0;
        var board = $('#board');
        board.empty();
        for(var i=0; i<difficulty; i++){
            var companion;
            do {
                companion = Math.floor(Math.random() * difficulty);
            }while(companion == i);
            linker[i] = companion;

            var randomColor = Math.floor(Math.random()*16777215).toString(16);

            var front = $('<div class="front">X</div>').css('background-color', '#'+randomColor);
            randomColor = Math.floor(Math.random()*16777215).toString(16);
            var back = $('<div class="back">O</div>').css('background-color', '#'+randomColor);
            var card = $('<div class="card"></div>').append(front).append(back);
            card.flip({
                axis: 'y',
                trigger: 'manual'
            });
            card.attr('id', 'p-'+i);
            board.append(card);
        }

        $('.card').on('click', function(event){
            clickHandler(event);
        });
    }


    function clickHandler(event){
        moves++;
        var card = $(event.currentTarget);
        var index = card.attr('id').substring(2);
        var companion = $('#p-' + linker[index]);

        card.flip('toggle');
        companion.flip('toggle', function(){
            if(checkWin()){
                $('.card').off();
                if(moves < highScores[difficulty] || highScores[difficulty] == null){
                    highScores[difficulty] = moves;
                    document.cookie = JSON.stringify(highScores);
                    updateScoreTable();
                    window.alert('You won and got a new best score!');
                }
                else{
                    window.alert('You won!');
                }
                $('#message').show();
            }
        });
    }

    function checkWin(){
        var won = true;
        var cards = $('.card');
        for (var i=0; i<cards.length; i++){
            if(!$(cards[i]).data('flip-model').isFlipped){
                won = false;
            }
        }
        return won;
    }

    $('#reset').on('click', function(event){
        createBoard();
    });

    $('#retry').on('click', function(event){
        $('.card').flip(false);
        $('.card').on('click', function(event){
            clickHandler(event);
        });
    });

    var newgame = function(){
        difficulty = $('#input').val();
        createBoard();
    };
    $('#start').on('click', newgame);

    $('#input').keypress(function(e) {
        if(e.which == 13) {
            newgame();
        }
    });
});