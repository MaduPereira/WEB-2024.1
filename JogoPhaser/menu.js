
class menu extends Phaser.Scene
{
    constructor()
    {
        super("menu");
    }

    preload() {
        //menu
        this.load.image("fundo", "Assets/Fundo.png")
        this.load.image("btnJogar", "Assets/btn_jogar.png") 
    }
    
    create() {
        //adc fundo
        this.add.image(0,0,"fundo").setOrigin(0,0);

        //adc bt
        let btnJogar = this.add.image(259,200,"btnJogar").setOrigin(0,0);
        btnJogar.setInteractive();

        //Adicionar o cliqye do botao
        btnJogar.on("pointerdown", () => this.scene.start("Jogar"));
    }
}
 