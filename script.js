$(function(){
    var difficulty = 4;
    var linker = {};

    for(var i=0; i<difficulty; i++){
        var companion;
        do {
            companion = Math.floor(Math.random() * difficulty);
        }while(companion == i);
        linker[i] = companion;

        var piece = $('<div class="piece"><button>X</button></div>');
        piece.attr('id', 'p-'+i);
        $('#board').append(piece);
    }

    $('.piece').on('click', function(event){
        console.log(event);
        var piece = (event.currentTarget);
        var index = piece.attr('id').substring(2);
        var companion = $('#p-' + linker[index]);
        flip(piece);
        flip(companion);
    });

    function flip(piece){
        var childButton = $(piece.children()[0]);
        childButton.text(childButton.text() == 'X' ? 'O' : 'X')
    }

    function checkWin(){

    }
});