var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop,obsTop1,obsTop2,obsTop3;
var obstacleBottom,obsBottom1,obsBottom2,obsBottom3;

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



}

function draw() {
  
  background("black");
        
          //fazendo o balão de ar quente pular
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adicionando gravidade
           balloon.velocityY = balloon.velocityY + 2;
   
        drawSprites();
        
}

function spawnObstaclesTop() {
  if (frameCount%60===0) {
    obstacleTop = createSprite(400,50,40,50)
    obstacleTop.scale = 0.1
    obstacleTop.velocityX = -4
  }
}
