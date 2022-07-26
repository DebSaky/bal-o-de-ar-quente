var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop,obsTop1,obsTop2,obsTop3;
var obstacleBottom,obsBottom1,obsBottom2,obsBottom3;
var topObstaclesGroup,bottomObstaclesGroup,barGroup;
var score = 0
//estados de jogo 
var PLAY = 1;
 var END = 0; 
 var gameState = PLAY;

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")
obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")


}

function setup(){

//imagem de plano de fundo
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//criando canto superior e inferior
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//criando o balão     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

topObstaclesGroup=new Group()
bottomObstaclesGroup=new Group()
barGroup = new Group()
}

function draw() {
  
  background("black");
   if (gameState == PLAY) {
     //fazendo o balão de ar quente pular
     if(keyDown("space")) {
      balloon.velocityY = -6 ;
      
    }

    //adicionando gravidade
     balloon.velocityY = balloon.velocityY + 2;
      spawnObstaclesTop()
      spawnObstaclesBottom()
      Bar()

      if (topObstaclesGroup.isTouching(balloon)||
          balloon.isTouching(topGround)||
          balloon.isTouching(bottomGround)||
          bottomObstaclesGroup.isTouching(balloon)) {
        gameState = END
      }
   }     
     
   if (gameState == END) {
    balloon.velocityX = 0
    balloon.velocityY = 0
    topObstaclesGroup.setVelocityXEach(0)
    bottomObstaclesGroup.setVelocityXEach(0)
    barGroup.setVelocityXEach(0)
    topObstaclesGroup.setLifetimeEach(-1)
    balloon.y=200
    bottomObstaclesGroup.setLifetimeEach(-1)
   }

   Score()
  drawSprites();
        
}

function spawnObstaclesTop() {
  if (frameCount%60===0) {
    obstacleTop = createSprite(400,50,40,50)
    obstacleTop.scale = 0.1
    obstacleTop.velocityX = -4
    obstacleTop.y=Math.round(random(10,100))
    var rand = Math.round(random(1,2))

switch (rand) {
  case 1:obstacleTop.addImage(obsTop1)
    break;
  case 2:obstacleTop.addImage(obsTop2)
    break;

  default:
    break;
}
obstacleTop.lifetime = 100;
balloon.depth = balloon.depth+1 
topObstaclesGroup.add(obstacleTop)
    }
}

function spawnObstaclesBottom(){
  if (frameCount%60==0) {
    obstacleBottom = createSprite(400,350,40,50)
    obstacleBottom.addImage(obsBottom1)
    obstacleBottom.scale=0.07
    obstacleBottom.velocityX = -4
    var rand=Math.round(random(1,3))
    switch (rand) {
      case 1:obstacleBottom.addImage(obsBottom1)
        break;
      case 2:obstacleBottom.addImage(obsBottom2)
        break;
      case 3:obstacleBottom.addImage(obsBottom3)
      break;
      default:
        break;
    }
    obstacleBottom.lifetime = 100;
    balloon.depth = balloon.depth + 1;

    bottomObstaclesGroup.add(obstacleBottom)
  }
}

function Bar(){
  if (frameCount%60==0) {
    var bar = createSprite(400,200,10,800)
    bar.velocityX = -6
    bar.lifetime = 70
    bar.depth = balloon.depth;
    barGroup.add(bar)
  }

}
function Score(){
  if (balloon.isTouching(barGroup)) {
    score = score +5

 
  }
textFont("impact")
textSize(30)
fill("black")
text("pontuação: "+score,250,50)
}