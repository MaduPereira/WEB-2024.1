var score = 0;
var scoreText;
var player;
var cursors;
var bananas;
var inimigos;
var chave;
var vida1;
var vida2;
var vida3;
var vidas = 2;

class jogo extends Phaser.Scene {
    constructor() {
        super("jogo");
    }

    preload() {
        // Carregar imagens
        this.load.image("fundoFase", "Assets/floresta.png");
        this.load.image("player", "Assets/macaco.png")
        this.load.image("inimigo", "Assets/cobra.png");
        this.load.image("banana", "Assets/banana.png");
        this.load.image("vida", "Assets/vida.png");
    }

    create() {

        score = 0;
        vidas = 2;

        this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);

        // Adicionar fundo
        const background = this.add.image(0, 0, "fundoFase");
        background.setOrigin(0, 0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Adicionar o personagem
        player = this.physics.add.sprite(100, 450, "player");
        player.setCollideWorldBounds(true);

        // Configurar controles
        cursors = this.input.keyboard.createCursorKeys();

        //add bananas
        bananas = this.physics.add.staticGroup();
        bananas.create(450,350, "banana");
        bananas.create(750,650, "banana");
        bananas.create(1000,200, "banana");
        bananas.create(1200,550, "banana");
        bananas.create(1350,280, "banana");
        bananas.create(1750,580, "banana");

        this.physics.add.overlap(player, bananas, this.collectBananas, null, this);

        //add inimigos
        inimigos = this.physics.add.staticGroup();
        inimigos.create(300,350, "inimigo");
        inimigos.create(650,650, "inimigo");
        inimigos.create(650,550, "inimigo");
        inimigos.create(980,330, "inimigo");
        inimigos.create(1200,250, "inimigo");
        inimigos.create(1200,350, "inimigo");
        inimigos.create(1100,550, "inimigo");
        inimigos.create(1500,610, "inimigo");
        inimigos.create(1600,550, "inimigo");

        this.physics.add.overlap(player, inimigos, this.hitInimigo, null, this);

        // Exibir a pontuacao
        scoreText = this.add.text(30, 16, "Pontuação: 0", {
            fontSize: "32px",
            fill: "#fff", // Cor branca
            fontStyle: "bold" // Negrito
        });

        vida1 = this.physics.add.staticGroup()
        vida1.create(50, 100, "vida").setScale(1.5);
        vida2 = this.physics.add.staticGroup()
        vida2.create(150, 100, "vida").setScale(1.5);
        vida3 = this.physics.add.staticGroup()
        vida3.create(250, 100, "vida").setScale(1.5);

    }

    update() {
        if (player && !player.isPaused) {

            if (cursors.left.isDown) {
                player.setVelocityX(-160);
                player.setScale(-1, 1); // Inverte 
            } else if (cursors.right.isDown) {
                player.setVelocityX(160);
                player.setScale(1, 1); // Restaura 
            } else {
                player.setVelocityX(0);
            }
    
            if (cursors.up.isDown) {
                player.setVelocityY(-160);
            } else if (cursors.down.isDown) {
                player.setVelocityY(160);
            } else {
                player.setVelocityY(0);
            }
        }
    }
    

    collectBananas(player, bananas) {
        bananas.disableBody(true, true);

        score += 20;
        scoreText.setText("Pontuação: " + score);

        if(score>=120)
        {
            // Exibir mensagem de game over
            scoreText.setText("Parabéns! Pontuação: " + score);
        
            // Reiniciar a cena após 1 segundo
            this.time.delayedCall(1000, () => {
                this.scene.start("menu");
            });
            
        }
    }

    hitInimigo(player, inimigo) {
        player.setPosition(player.x - 100, player.y); //fiz um hit 

        if (vidas > 0) {
            if (vidas === 2) {
                vida3.children.iterate(child => child.destroy());
            } else if (vidas === 1) {
                vida2.children.iterate(child => child.destroy());
            } else {
                vida1.children.iterate(child => child.destroy());
            }
    
            vidas--;
            player.setVelocity(0);
            player.setAcceleration(0);
            player.setAngularVelocity(0);
            player.anims.stop();
    
            player.setTint(0xff0000);
            this.time.delayedCall(2000, () => {
                player.clearTint();
                player.setVelocity(0);
                this.physics.resume();
            });
    
        } else {
            vida1.children.iterate(child => child.destroy());
    
            player.setVelocity(0);
            player.setAcceleration(0);
            player.setAngularVelocity(0);
            player.anims.stop();
            player.setTint(0xff0000);
            scoreText.setText("GAME OVER! SCORE: " + score);
    
            this.physics.pause();
    
            this.time.delayedCall(1000, () => {
                score = 0;
                vidas = 2;
                this.scene.restart();
            });
        }
    }
}
