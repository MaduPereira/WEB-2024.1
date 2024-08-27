var score = 0;
var scoreText;
var player;
var cursors;
var rochas;
var baus;
var contBau=0;

class jogo extends Phaser.Scene {
    constructor() {
        super("jogo");
    }

    preload() {
        this.load.spritesheet("player", "assets/dude.png", { frameWidth: 32, frameHeight: 48 });
        this.load.image("bau", "assets/bau.png");
        this.load.image("rocha","assets/rocha.png");
    }

    create() {
        //adc fundo
        fundo = this.add.image(0, 0, "fundo");
        fundo.setOrigin(0, 0); // Definir a origem no canto superior esquerdo
        fundo.setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Ajustar o tamanho da imagem

        chao = this.physics.add.staticGroup();
        chao.create(this.cameras.main.width/2, this.cameras.main.height-100, 'chao').setScale(1.5).refreshBody();

        // Adicionar o personagem
        player = this.physics.add.sprite(200, 450, "player");
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(2);
        player.setFrame(4);

        // Criar animações
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "player", frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Configurar colisões
        this.physics.add.collider(player, chao);

        // Configurar controles
        cursors = this.input.keyboard.createCursorKeys();

        // Configurar o grupo de facas
        baus = this.physics.add.group({
            key: "bau",
            repeat: 3,
            setXY: { x: 50, y: 580, stepX: 370 }
        });

        baus.children.iterate(child => {
            // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
            child.setScale(1.5); // Aumentar a escala das facas
        });

        this.physics.add.collider(baus, chao);
        this.physics.add.overlap(player, baus, this.collectBaus, null, this);

        rochas = this.physics.add.group({
            key: "rocha",
            repeat: 2,
            setXY: { x: 300, y: 580, stepX: 340 }
        });

        rochas.children.iterate(child => {
            // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
            child.setScale(1.5); // Aumentar a escala dos inimigos
        });

        this.physics.add.collider(rochas, chao);
        this.physics.add.overlap(player, rochas, this.hitRocha, null, this);

        // // // Exibir a pontuação
        // // scoreText = this.add.text(16, 16, "SCORE: 0", { fontSize: "32px", fill: "#000" });
        score = 20;
        // Exibir a pontuação
        scoreText = this.add.text(16, 16, "SCORE: "+ score, {
            fontSize: "32px",
            fill: "#000", // Cor preta
            fontStyle: "bold" // Negrito
        });
    }

    update() {
        if (player && !player.isPaused) {
            // Controle de movimento do jogador
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

            // Controle de salto
            if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-350);
            }
        }

    }

    collectBaus(player, baus) {
        baus.disableBody(true, true);

        contBau += 1;

        score += 20;
        scoreText.setText("SCORE: " + score);

        if(contBau == 4)
            {
                // Exibir mensagem de game over
                scoreText.setText("Parabéns! SCORE: " + score);
            
                // Reiniciar a cena após 1 segundo
                this.time.delayedCall(1000, () => {
                    this.scene.start("menu");
                });
            }
    }

    hitRocha(player, rochas) {

        rochas.disableBody(true, true);

        if(score==0)
        {
            // Parar movimento e animações do jogador
            player.setVelocity(0);
            player.setAcceleration(0);
            player.setAngularVelocity(0);
            player.anims.stop();
            // Pausar o jogo
            this.physics.pause();
            // Alterar a cor do jogador para indicar que ele foi atingido
            player.setTint(0xff0000);
            scoreText.setText("GAME OVER! SCORE: " + score);
            
            // Reiniciar a cena após 1 segundo
            this.time.delayedCall(1000, () => {
                this.scene.restart();
            });
        }
        else{
            // Parar movimento e animações do jogador
            player.setVelocity(0);
            player.setAcceleration(0);
            player.setAngularVelocity(0);
            player.anims.stop();

            // Alterar a cor do jogador para vermelho
            player.setTint(0xff0000);

            // Diminuir a pontuação
            score -= 20;
            scoreText.setText("SCORE: " + score);

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
        }
        
    }
}
