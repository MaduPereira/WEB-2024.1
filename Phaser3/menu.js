
class menu extends Phaser.Scene
{
    constructor()
    {
        super("menu");
    }

    preload() {
        //menu
        this.load.image("fundo", "Assets/Fundo_Menu.png")
        this.load.image("btnJogar", "Assets/Btn_Play.png") 
    }
    
    create() {
        //adc fundo
        const background = this.add.image(0, 0, "fundo");
        background.setOrigin(0, 0); // Definir a origem no canto superior esquerdo
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Ajustar o tamanho da imagem

        //adc bt
        const btnJogar = this.add.image(0, 0, "btnJogar");
        btnJogar.setOrigin(0, 0); // Definir a origem no centro do botão
        btnJogar.setInteractive();
        
        // Posicionar o botão no centro da tela
        const buttonWidth = btnJogar.displayWidth;
        const buttonHeight = btnJogar.displayHeight;
        btnJogar.setPosition(this.cameras.main.width / 2 + 350, this.cameras.main.height / 2 - 60).setScale(1.4);

        // Adicionar o clique do botão
        btnJogar.on("pointerdown", () => this.scene.start("jogo"));
    }
}
 