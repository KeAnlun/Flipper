$(function(){
    var difficulty = 10;
    var linker = {};

    for(var i=0; i<difficulty; i++){
        var companion;
        do {
            companion = Math.floor(Math.random() * difficulty);
        }while(companion == i);
        linker[i] = companion;

        var randomColor = Math.floor(Math.random()*16777215).toString(16);

        var panel = $('<button class="panel">X</button>').css('background-color', '#'+randomColor);
        var piece = $('<div class="piece"></div>').append(panel);
        piece.attr('id', 'p-'+i);
        $('#board').append(piece);
    }

    $('.piece').on('click', function(event){
        console.log(event);
        var piece = $(event.currentTarget);
        var index = piece.attr('id').substring(2);
        var companion = $('#p-' + linker[index]);
        flip(piece);
        flip(companion);

        if(checkWin()){
            window.alert('You won!');
        }
    });

    function flip(piece){
        var childButton = $(piece.children()[0]);
        childButton.text(childButton.text() == 'X' ? 'O' : 'X')
    }

    function checkWin(){
        var won = true;
        var pieces = $('.piece');
        for (var i=0; i<pieces.length; i++){
            if($($(pieces[i]).children()[0]).text() == 'X'){
                won = false;
            }
        }
        return won;
    }

    $('#reset').on('click', function(event){
        var pieces = $('.piece');
        for (var i=0; i<pieces.length; i++){
            $($(pieces[i]).children()[0]).text('X')
        }
    })
});