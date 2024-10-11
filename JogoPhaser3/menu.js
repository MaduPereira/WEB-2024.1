
class menu extends Phaser.Scene
{
    constructor()
    {
        super("menu");
    }

    preload() {
        //menu
        this.load.image("fundo", "Assets/menu.png")
        this.load.image("btnJogar", "Assets/play.png") 
    }
    
    create() {
        //adc fundo
        const background = this.add.image(0, 0, "fundo");
        background.setOrigin(0, 0); // Definir a origem no canto superior esquerdo
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Ajustar o tamanho da imagem

        //adc bt
        const btnJogar = this.add.image(0, 0, "btnJogar");
        btnJogar.setOrigin(0, 0); // Definir a origem no centro do botao
        btnJogar.setInteractive();
        
        // Posicionar o boao no centro da tela
        const buttonWidth = btnJogar.displayWidth;
        const buttonHeight = btnJogar.displayHeight;
        btnJogar.setPosition(this.cameras.main.width / 2 + 50, this.cameras.main.height / 2 - 60);

        // Adicionar o clique do botao
        btnJogar.on("pointerdown", () => this.scene.start("jogo"));
    }
}
 