var dog, dogImage, happyDogImage, database, foodS, foodStock;

    function preload()
    {
      dogImage = loadImage("images/dogImg.png");
      happyDogImage = loadImage("images/dogImg1.png");
    }

    function setup() 
    {
      createCanvas(500, 500);
      
      database = firebase.database();

      dog = createSprite(250, 250, 100, 100);
      dog.addImage(dogImage);
      dog.scale = 0.3;

      foodStock = database.ref('Food');
      foodStock.on("value", readStock)
      
    }

function draw() 
{ 
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogImage)
  }  

  drawSprites();

  fill("white");
  textSize(20);
  stroke("white");
  text("press UP arrow key to make the dog drink milk", 50, 50);
  text("Food Remaining: " + foodS, 50, 450)
}

function readStock(data)
{
  foodS = data.val();
}
function writeStock(x)
{
  if(x <= 0)
  {
    x = 0;
  }
  else
  {
    x = x - 1;
  }
  
  database.ref('/').update({Food: x})
}