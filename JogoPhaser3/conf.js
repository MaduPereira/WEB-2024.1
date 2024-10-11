var game;

window.onload = function()
{
    let gameConfig =
    {
        type: Phaser.AUTO, 
        scale:{
            width:1860,
            heigth:720,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: 'arcade', //fisica
            arcade: {
                gravity: { y: 0}, 
                debug: true // colisao
            }
        },

        // backgroundColor: '#9FFB98',
        scene:[menu, jogo]
    };

    game = new Phaser.Game(gameConfig);

    window.focus();
}