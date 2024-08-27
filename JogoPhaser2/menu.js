var chao
var fundo
class menu extends Phaser.Scene
{
    constructor()
    {
        super("menu");
    }

    preload() {
        //menu
        this.load.image("fundo", "assets/fundo.png")
        this.load.image("btnJogar", "assets/btnPlay.png") 
        this.load.image("chao", "assets/chao.png")
        this.load.image("personagem", "assets/jogadorCapa.png")
    }
    
    create() {
        //adc fundo
        fundo = this.add.image(0, 0, "fundo");
        fundo.setOrigin(0, 0); // Definir a origem no canto superior esquerdo
        fundo.setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Ajustar o tamanho da imagem

        chao = this.add.image(this.cameras.main.width/2, this.cameras.main.height-100, "chao").setScale(1.5);

        this.add.image(this.cameras.main.width-350,this.cameras.main.height/2,"personagem");

        //adc bt
        const btnJogar = this.add.image(0, 0, "btnJogar");
        btnJogar.setOrigin(0.5, 0.5); // Definir a origem no centro do botão
        btnJogar.setInteractive();
        
        // Posicionar o botão no centro da tela
        const buttonWidth = btnJogar.displayWidth;
        const buttonHeight = btnJogar.displayHeight;
        btnJogar.setPosition(this.cameras.main.width / 2, this.cameras.main.height/2 - 70);

        // Adicionar o clique do botão
        btnJogar.on("pointerdown", () => this.scene.start("jogo"));
    }
}
 