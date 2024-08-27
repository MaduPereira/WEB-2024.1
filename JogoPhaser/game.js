var score = 0;
var scoreText;
var player;
var cursors;
var facas;
var inimigos;
var chave;

class jogo extends Phaser.Scene {
    constructor() {
        super("jogo");
    }

    preload() {
        // Carregar imagens
        this.load.image("fundo", "Assets/Fundo.png");
        this.load.image("plataforma", "Assets/Plataforma.png");
        this.load.image("chao", "Assets/Chao.png");
        this.load.spritesheet("player", "Assets/player.png", { frameWidth: 25, frameHeight: 32 });
        this.load.image("inimigo", "Assets/inimigo.png");
        this.load.image("chave", "Assets/chave.png");
        this.load.image("faca", "Assets/faca.png");
    }

    create() {
        // Adicionar fundo
        const background = this.add.image(0, 0, "fundo");
        background.setOrigin(0, 0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Adicionar plataformas
        const plataformas = this.physics.add.staticGroup();
        plataformas.create(200, 430, "plataforma").setScale(2.5).refreshBody();
        plataformas.create(515, 300, "plataforma").setScale(2.5).refreshBody();
        plataformas.create(900, 200, "plataforma").setScale(2.5).refreshBody();

        // Adicionar o chão
        const chao = this.physics.add.staticGroup();
        const chaoWidth = this.cameras.main.width;
        const chaoHeight = 200;
        chao.create(chaoWidth / 2, this.cameras.main.height - chaoHeight / 2, 'chao').setScale(3).refreshBody();

        // Adicionar o personagem
        player = this.physics.add.sprite(100, 450, "player");
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(2);
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
        this.physics.add.collider(player, chao);

        // Configurar controles
        cursors = this.input.keyboard.createCursorKeys();

        // Configurar o grupo de facas
        facas = this.physics.add.group({
            key: "faca",
            repeat: 3,
            setXY: { x: 100, y: 0, stepX: 340 }
        });

        facas.children.iterate(child => {
            // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
            child.setScale(1.5); // Aumentar a escala das facas
        });

        this.physics.add.collider(facas, plataformas);
        this.physics.add.collider(facas, chao);
        this.physics.add.overlap(player, facas, this.collectFacas, null, this);

        // Configurar o grupo de inimigos
        inimigos = this.physics.add.group({
            key: "inimigo",
            repeat: 3,
            setXY: { x: 240, y: 0, stepX: 242 }
        });

        inimigos.children.iterate(child => {
            // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
            child.setScale(1.5); // Aumentar a escala dos inimigos
        });

        this.physics.add.collider(inimigos, plataformas);
        this.physics.add.collider(inimigos, chao);
        this.physics.add.overlap(player, inimigos, this.hitInimigo, null, this);

        chave = this.physics.add.staticGroup();
        chave.create(880, 150, "chave").setScale(3);
        this.physics.add.collider(chave,plataformas);
        this.physics.add.overlap(player,chave,this.collectChave, null, this);

        // // Exibir a pontuação
        // scoreText = this.add.text(16, 16, "SCORE: 0", { fontSize: "32px", fill: "#000" });

        // Exibir a pontuação
        scoreText = this.add.text(16, 16, "SCORE: 0", {
            fontSize: "32px",
            fill: "#fff", // Cor branca
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

    collectFacas(player, faca) {
        faca.disableBody(true, true);

        score += 10;
        scoreText.setText("SCORE: " + score);
    }

    hitInimigo(player, inimigo) {
        // Parar movimento e animações do jogador
        player.setVelocity(0);
        player.setAcceleration(0);
        player.setAngularVelocity(0);
        player.anims.stop();

        // Pausar o jogo
        this.physics.pause();

        // Alterar a cor do jogador para indicar que ele foi atingido
        player.setTint(0xff0000);

        // Exibir mensagem de game over
        scoreText.setText("GAME OVER! SCORE: " + score);
        
        // Reiniciar a cena após 1 segundo
        this.time.delayedCall(1000, () => {
            this.scene.restart();
        });
    }

    collectChave(player, chave)
    {
        if(score==40)
        {
            chave.disableBody(true, true);
            // Exibir mensagem de game over
            scoreText.setText("Parabéns! SCORE: " + score);
        
            // Reiniciar a cena após 1 segundo
            this.time.delayedCall(1000, () => {
                this.scene.start("menu");
            });
            
        }
    }
}
