/* eslint-disable no-unused-vars */
import Phaser from "phaser";
import { useRef, useEffect } from "react";

//useStartGame hook - contains the game ---------------------------------------------------------------------------------------------
function useStartGame() {
  // References and config variables
  const isBallActive = useRef(false);

  const isLoaded = useRef(false);

  const screenWidth = 1280;
  const screenHeight = 720;

  //Begin Phaser Scene ---------------------------------------------------------------------------------------------
  class Example extends Phaser.Scene {
    // Preload Section ---------------------------------------------------------

    // Assets loaded from express server
    preload() {
      this.load.setCORS = true;
      this.load.setBaseURL("http://localhost:5173/");
      this.load.image("player", "control.png");
      this.load.image("enemy", "red.png");
    }

    // Create Section ---------------------------------------------------------

    create() {

      // Create player
      this.player = this.physics.add.image(
        Math.trunc(screenWidth / 2),
        Math.trunc(screenHeight / 2),
        "player"
      );

      // Physics properties for player
      this.player.setBounce(0.1);
      this.player.setCollideWorldBounds(true);

      // Old way that I spawned a ball - here for reference
      // this.enemy = this.physics.add.image(
      //   Math.trunc(screenWidth / 5),
      //   Math.trunc(screenHeight / 5),
      //   "enemy"
      // );
      // this.enemy.setVelocity(600, 400);
      // this.enemy.setBounce(1, 1);
      // this.enemy.setCollideWorldBounds(true);

      // Create keys for arrow keys, space, shift
      this.cursors = this.input.keyboard.createCursorKeys();

      // Capture inputs for created keys
      this.input.keyboard.addCapture([32, 16, 37, 38, 39, 40]);

      // Initialize ball
      this.ball = null;

      // Create physics group for balls
      this.balls = this.physics.add.group({
        key: "enemy",
        frameQuantity: 1200,
        maxSize: 1200,
        active: false,
        visible: false,
        enable: false,
        collideWorldBounds: true,
        bounceX: 1,
        bounceY: 1,
        dragX: 0,
        dragY: 0,
      });

      // Physics overlap between player and ball
      this.physics.add.overlap(
        this.player,
        this.balls,
        this.hitBall,
        null,
        this
      );
    }

    // Update Section ---------------------------------------------------------

    update() {

      // Movement speed
      let moveSpeed = 300;
      let negMoveSpeed = -300;

      // Hold shift to modify movement speed
      if (this.cursors.shift.isDown) {
        moveSpeed = 600;
        negMoveSpeed = -600;
      } else {
        moveSpeed = 300;
        negMoveSpeed = -300;
      }

      // Left/Right movement controls
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(negMoveSpeed);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(moveSpeed);
      } else {
        this.player.setVelocityX(0);
      }

      // Up/Down movement controls
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(negMoveSpeed);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(moveSpeed);
      } else {
        this.player.setVelocityY(0);
      }

      // Spacebar to spawn a ball
      if (this.cursors.space.isDown && !isBallActive.current) {
        this.createBall(100, 100, 200, 200);
        isBallActive.current = true;
      }
    }

    // hitBall - Function triggered when player touches ball
    hitBall(player, enemy) {
      this.ball.disableBody(true, true);
      this.ball = null;
      isBallActive.current = false;
    }

    // createBall - Function to spawn a ball
    createBall(x, y, vx, vy) {
      if (!isBallActive.current) {
        this.ball = this.balls.get();
      } else if (!this.ball) {
        return;
      }
      this.ball.enableBody(true, x, y, true, true).setVelocity(vx, vy);
    }
  }

  // Config Section -----------------------------------------------------------

  const config = {
    type: Phaser.CANVAS,
    parent: 'gameContainer',
    // width: screenWidth,
    // height: screenHeight,

    autoCenter: Phaser.Scale.CENTER_BOTH,
    autoRound: Boolean,
    baseSize: Phaser.Structs.Size.ENVELOP,
    zoom: Number.MAX_ZOOM,
    transparent: false,
    scene: Example,
    physics: {
      default: "arcade",
      arcade: {},
    },
  };

  // useEffect to prevent multiple copies of the game from rendering
  useEffect(() => {
    if (!isLoaded.current) {
      const game = new Phaser.Game(config);
      isLoaded.current = true;
    }
  });
}

export default useStartGame;
