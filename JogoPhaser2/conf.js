var game;

window.onload = function()
{
    let gameConfig =
    {
        type: Phaser.AUTO, 
        scale:{
            width:1200,
            heigth:600,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: 'arcade', // Defina o sistema de física aqui, se necessário
            arcade: {
                gravity: { y: 300 }, // Configuração de gravidade, se necessário
                debug: false // Ative para depuração visual das colisões
            }
        },

        // backgroundColor: '#9FFB98',
        scene:[menu, jogo]
    };

    game = new Phaser.Game(gameConfig);

    window.focus();
}