var score = 0;
var scoreText;
var player;
var cursors;
var joias;
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
        this.load.image("fundoFase", "Assets/Fundo2.png");
        this.load.image("plataforma", "Assets/Plataforma.png");
        this.load.spritesheet("player", "Assets/player.png", { frameWidth: 25, frameHeight: 32 });
        this.load.image("inimigo", "Assets/inimigo.png");
        this.load.image("mandala", "Assets/Mandala.png");
        this.load.image("joia", "Assets/Esmeralda.png");
        this.load.image("vida", "Assets/coracao_vida.png");
    }

    create() {
        // Adicionar fundo
        const background = this.add.image(0, 0, "fundoFase");
        background.setOrigin(0, 0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Adicionar plataformas
        const plataformas = this.physics.add.staticGroup();
        plataformas.create(this.cameras.main.width/2, this.cameras.main.height - 80 /2, "plataforma").setScale(3).refreshBody();
        plataformas.create(800, 550, "plataforma").setScale(2).refreshBody();
        plataformas.create(1000, 350, "plataforma").setScale(2).refreshBody();
        plataformas.create(1250, 200, "plataforma").setScale(2).refreshBody();

        // Adicionar o personagem
        player = this.physics.add.sprite(100, 450, "player");
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(2.5);
        player.setFrame(8);

        // Criar animações
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "player", frame: 8 }],
            frameRate: 20
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", { start: 9, end: 16 }),
            frameRate: 10,
            repeat: -1
        });

        // Configurar colisões
        this.physics.add.collider(player, plataformas);

        // Configurar controles
        cursors = this.input.keyboard.createCursorKeys();

        joias = this.physics.add.group();
        joias.create(500,600, "joia").setScale(1.5);
        joias.create(750,600, "joia").setScale(1.5);
        joias.create(950,600, "joia").setScale(1.5);

        joias.create(750,450, "joia").setScale(1.5);
        joias.create(950,450, "joia").setScale(1.5);

        joias.create(900,250, "joia").setScale(1.5);
        joias.create(1100,250, "joia").setScale(1.5);

        this.physics.add.collider(joias, plataformas);
        this.physics.add.overlap(player, joias, this.collectJoias, null, this);

        // Configurar o grupo de inimigos
        inimigos = this.physics.add.group({
            key: "inimigo",
            repeat: 2,
            setXY: { x: 240, y: 100, stepX: 242 }
        });

        inimigos.children.iterate(child => {
            // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
            child.setScale(1.5); // Aumentar a escala dos inimigos
        });

        this.physics.add.collider(inimigos, plataformas);
        this.physics.add.overlap(player, inimigos, this.hitInimigo, null, this);

        chave = this.physics.add.staticGroup();
        chave.create(1050, 90, "mandala").setScale(2);
        this.physics.add.collider(chave,plataformas);
        this.physics.add.overlap(player,chave,this.collectChave, null, this);

        score = 0;
        vidas = 2;

        // Exibir a pontuação
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
                player.anims.play("left", true);
            } else if (cursors.right.isDown) {
                player.setVelocityX(160);
                player.anims.play("right", true);
            } else {
                player.setVelocityX(0);
                player.anims.play("turn");
            }


            if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-350);
            }
        }
    }

    collectJoias(player, joias) {
        joias.disableBody(true, true);

        score += 10;
        scoreText.setText("Pontuação: " + score);
    }

    hitInimigo(player, inimigo) {
        inimigo.disableBody(true, true);

        if (vidas > 0) {
            if (vidas === 2) {
                vida3.children.iterate(child => child.destroy());
            } else if (vidas === 1) {
                vida2.children.iterate(child => child.destroy());
            } else {
                vida1.children.iterate(child => child.destroy());
            }
            // Parar movimento e animações do jogador
            player.setVelocity(0);
            player.setAcceleration(0);
            player.setAngularVelocity(0);
            player.anims.stop();

            // Alterar a cor do jogador para vermelho
            player.setTint(0xff0000);
    
            vidas -= 1;
    
            // Reiniciar o estado do jogador após 1 segundo
            this.time.delayedCall(1000, () => {
                // Remover o tint
                player.clearTint();

                // Restaurar a movimentação
                player.setVelocity(0);
                player.setAcceleration(0);
                player.setAngularVelocity(0);
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
                this.scene.restart();
            });
        }
    }

    collectChave(player, chave)
    {
        if(score==70)
        {
            chave.disableBody(true, true);
            // Exibir mensagem de game over
            scoreText.setText("Parabéns! Pontuação: " + score);
        
            // Reiniciar a cena após 1 segundo
            this.time.delayedCall(1000, () => {
                this.scene.start("menu");
            });
            
        }
        else {

            player.setVelocity(0);
            player.setAcceleration(0);
            player.setAngularVelocity(0);
            player.anims.stop();
            player.setTint(0xff0000);
            scoreText.setText("GAME OVER! SCORE: " + score);

            this.physics.pause();

            this.time.delayedCall(1000, () => {
                this.scene.restart();
            });
        }
    }
}
