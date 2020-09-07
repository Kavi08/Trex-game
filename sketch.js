var trex,ground,groundImage,trexImage,invisibleGround,ObstaclesGroup,CloudsGroup,gameOver,restart,count,gameOverImage,restartImage,trex_colliderImage,cloudImage,rand,obstacle1Image,obstacle2Image,obstacle3Image,obstacle4Image,obstacle5Image,obstacle6Image,checkpointsound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload() {
  groundImage = loadImage("ground2.png");
  trexImage = loadAnimation("trex1.png","trex3.png","trex4.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  //trex_colliderImage = loadImage("trex_collider.png");
  cloudImage = loadImage("cloud.png");
  obstacle1Image = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
  obstacle3Image = loadImage("obstacle3.png");
  obstacle4Image = loadImage("obstacle4.png");
  obstacle5Image = loadImage("obstacle5.png");
  obstacle6Image = loadImage("obstacle6.png");
  //checkpointsound = loadSound("");
}

function setup() {
  //initiate Game STATEs

createCanvas(600,200);
  
//create a trex sprite
trex = createSprite(200,180,20,50);
trex.addAnimation("trexAnimation",trexImage);

//set collision radius for the trex
trex.setCollider("circle",0,0,30);

//scale and position the trex
trex.scale = 0.5;
trex.x = 50;

//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("groundAnimation",groundImage);
ground.x = ground.width /2;

//invisible Ground to support Trex
invisibleGround = createSprite(200,185,400,5);
invisibleGround.visible = false;

//create Obstacle and Cloud Groups
ObstaclesGroup = createGroup();
CloudsGroup = createGroup();

//place gameOver and restart icon on the screen
gameOver = createSprite(200,100);
restart = createSprite(200,140);
gameOver.addImage("gameOverAnimation",gameOverImage);
gameOver.scale = 0.5;
restart.addImage("restartAnimation",restartImage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);

//score
count = 0;
 
}

function draw() {
  //set background to white
  background("white");
  //display score
  text("Score: "+ count, 250, 25);
  //console.log(gameState);
 
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count += Math.round(getFrameRate()/60);
    //console.log(getFrameRate);
   
    if (count>0 && count%100 === 0){
      //playSound("checkPoint.mp3");
    }
   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
      //playSound("jump.mp3");
    }
   
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
   
    //spawn the clouds
    spawnClouds();
 
    //spawn obstacles
    spawnObstacles();
   
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      //playSound("jump.mp3");
      gameState = END;
      //playSound("die.mp3");
    }
  }
 
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
   
    //change the trex animation
    //trex.addAnimation("trex_colliderAnimation",trex_collidedImage);
   
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
   
   
  }
 
  if(mousePressedOver(restart)) {
    restartGame();
  }
 
  //console.log(trex.y);
 
  //stop trex from falling down
  trex.collide(invisibleGround);
 
  drawSprites();
}

function restartGame(){
  gameOver.visible = false;
  restart.visible = false;
  count = 0;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  gameState = PLAY;
  trex.changeAnimation("trexAnimation",trexImage);
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
   
    //generate random obstacles
    
    rand = Math.round(random(1,6))
    
    console.log(rand);
    
    switch(rand) {
    
      case 1:
      obstacle.addImage(obstacle1Image);
      break;
        
      case 2:
      obstacle.addImage(obstacle2Image);
      break;
      
      case 3:
      obstacle.addImage(obstacle3Image);
      break;
        
      case 4:
      obstacle.addImage(obstacle4Image);
      break;
        
      case 5:
      obstacle.addImage(obstacle5Image);
      break;
        
      case 6:
      obstacle.addImage(obstacle6Image);
      break;
      
      default:break;
        
    }
    
    
    //assign scale and lifetime to the obstacle          
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(100,150));
    cloud.addAnimation("cloudAnimation",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
     //assign lifetime to the variable
    cloud.lifetime = 200;
   console.log(cloud.y);
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
   
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
 
}