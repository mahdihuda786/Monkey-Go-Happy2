var monkey , monkey_running,monkey_collided;
var ground;
var bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score
var bg,bgImage;
var gameOver,gameOverImg;
var restart, restartImg;

var score = 0;  
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadAnimation("sprite_2.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  bgImage = loadImage("unnamed.jpg");
  
  gameOverImg = loadImage("game over img.png");
  restartImg = loadImage("restart Img.png");
  
 
}



function setup() {
  createCanvas(600,600);
  
  bg = createSprite(300,300,600,600);
  bg.addImage(bgImage);
  bg.scale = 3;
  
  monkey = createSprite(50,530,13,13);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.15;
  
  
  ground = createSprite(300,590,600,30);
  ground.visible = false;
  
  gameOver = createSprite(300,300,13,13);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,400,13,13);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  
  
  
  FoodGroup = new Group();
  obstacleGroup =  new Group(); 
  

  
}


function draw() {
  background("green");
  
  monkey.velocityY = monkey.velocityY +0.5; 
  monkey.collide(ground);
  
  if (gameState === PLAY)
  {
    gameOver.visible = false;
    restart.visible = false;
    
    bg.velocityX = -3;
    
    if(bg.x < -200)
    {
      bg.x=bg.width/2; 
    }
    
    
    if (keyDown("space") && monkey.y >= 500)
    {
    monkey.velocityY = -15;
    }
    
    
    if(obstacleGroup.isTouching(monkey))
    { 
     gameState = END;
    }
    
    if(FoodGroup.isTouching(monkey))
    {
      FoodGroup.destroyEach(); 
    }
    
    score = score + Math.round(getFrameRate()/60);
    
    food();
    obstacles();
  }
  
  else if (gameState === END)
  {
    gameOver.visible = true;
    restart.visible = true;
    
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    monkey.changeAnimation("collided",monkey_collided);
    bg.velocityX = 0;
  }
  
  if (mousePressedOver(restart))
  {
    reset();
  }
  
    drawSprites();
  
  fill("White");
  textSize(20);
  text("Survival Time: " + score,400,50);
  
}



function food()
{

    if (frameCount % 80 === 0)
    {
      var banana = createSprite(550,300,10,10);
      banana.y = Math.round(random(270,350));
      banana.addImage(bananaImage);
      banana.velocityX = -3;
      banana.scale = 0.1;
      banana.lifteime = 200;

   
      FoodGroup.add(banana);
    }                
  
}


function obstacles()
{
  if (frameCount % 200 === 0)
  {
    var obstacle = createSprite(550,560,13,13);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.scale = 0.15  ;
    
    obstacleGroup.add(obstacle);
  }

}



function reset()
{
  gameState = PLAY;
  monkey.changeAnimation("running",monkey_running);
  score = 0;


}