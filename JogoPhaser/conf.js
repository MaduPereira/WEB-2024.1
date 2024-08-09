var game;

window.onload = function()
{
    let gameConfig =
    {
        scale:{
            width:800,
            heigth:600,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },

        // backgroundColor: '#9FFB98',
        scene:[menu]
    };

    game = new Phaser.Game(gameConfig);

    window.focus();
}