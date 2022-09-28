// Key Listener

let KEY_SPACE = false; // 32
let KEY_UP = false; // 38
let KEY_DOWN = false; //  40
let KEY_RIGHT = false; // 39
let KEY_LEFT = false; // 41
// Darstellung canvas
let canvas; // zugriff auf canvas
let ctx; //  damit auf canvas dargestellt werden kann

let backgroundImage = new Image();

// Objekte    Rakete, Ufo´s, Schüsse
let rocket = {
  x: 50,
  y: 200,
  width: 100,
  height: 50,
  src: "./image/rocket-flame_640.png",
};

let ufos = [];
let shots = [];
document.onkeydown = function (e) {
  if (e.keyCode == 32) {
    // evtl.ändern  Leertaste gedrückt
    KEY_SPACE = true;
  }

  if (e.keyCode == 38) {
    // evtl.ändern  UP gedrückt
    KEY_UP = true;
  }

  if (e.keyCode == 40) {
    // evtl.ändern  Down gedrückt
    KEY_DOWN = true;
  }
  if (e.keyCode == 39) {
    // evtl.ändern  Right gedrückt
    KEY_RIGHT = true;
  }
  if (e.keyCode == 37) {
    // evtl.ändern  Left gedrückt
    KEY_LEFT = true;
  }
};

document.onkeyup = function (e) {
  if (e.keyCode == 32) {
    // evtl.ändern   Leertaste ungedrückt
    KEY_SPACE = false;
  }

  if (e.keyCode == 38) {
    // evtl.ändern   UP ungedrückt
    KEY_UP = false;
  }

  if (e.keyCode == 40) {
    // evtl.ändern   DOWN ungedrückt
    KEY_DOWN = false;
  }

  if (e.keyCode == 39) {
    // evtl.ändern  Right gedrückt
    KEY_RIGHT = false;
  }
  if (e.keyCode == 37) {
    // evtl.ändern  Right gedrückt
    KEY_LEFT = false;
  }
};

function startGame() {
    canvas = document.getElementById('canvas'); // zugriff auf canvas
    ctx = canvas.getContext('2d'); //  damit auf canvas dargestellt werden kann
    loadImages();
    setInterval (update,1000 / 25); 
    setInterval (createUfos, 500)
    setInterval (checkForCrash, 1000 / 25)
    setInterval (checkShoot, 1000 /15)
    draw();
}



function checkForCrash() {
    ufos.forEach(function(ufo){


        if(rocket.x + rocket.width > ufo.x
        && rocket.y + rocket.height > ufo.y
        && rocket.x < ufo.x
        && rocket.y < ufo.y ) {
            
            console.log("Crash")
            ufo.img.src = './image/explosion1.png'
           
            rocket.img.src = './image/pow1.png'
            
            setTimeout(() => {
              ufos = ufos.filter(u => u != ufo); // löscht das aktuelle Ufo ( das was kollidiert )   
             rocket.img.src = './image/rocket-flame_640.png'   ; // löscht das aktuelle Ufo ( das was getroffen wurde )  
             },500);
        } 
        

        
            shots.forEach(function(shot){


                if(shot.x + shot.width > ufo.x
                && shot.y + shot.height > ufo.y
                && shot.x < ufo.x
                && shot.y < ufo.y + ufo.height)
                {
                    ufo.img.src = './image/pow1.png'
                    ufo.hit = true;
                    console.log("Hit");

                    setTimeout(() => {
                       ufos = ufos.filter(u => u != ufo); // löscht das aktuelle Ufo ( das was getroffen wurde )  
                    },1500);
                } 
            });

    });
}

function createUfos() {
    let ufo = {
        x: 700,  // Ufo startet ausserhalb des canvas bereiches
        y: Math.random() * 500,
        width: 100,
        height: 40,
        src: "./image/aliens-36912.svg",
        img: new Image()
    }
    ufo.img.src = ufo.src; // Ufo-Bild wird geladen
    ufos.push(ufo)
}

function checkShoot() {
    if (KEY_SPACE) {
        let shot = {
            x: rocket.x + 110,
            y: rocket.y + 22,
            width: 50 ,
            height: 40,
            src: "./image/laser-shot-blue.png",
            img: new Image()
        }
        shot.img.src = shot.src;
        shots.push(shot)
    }
}

function update() {
    if (KEY_UP) {
        rocket.y -= 6;
    }
    if (KEY_DOWN) {
        rocket.y += 6;
    }
    if (KEY_RIGHT) {
        rocket.x += 6;
    }
    if (KEY_LEFT) {
        rocket.x -= 6;
    }


    ufos.forEach(function(ufo){
        ufo.x -= 5;
        ufo.y -= 2;
        if(ufo.hit) {
            ufo.y += 10;
        }

    })

    shots.forEach(function(shot) {
        shot.x += 15
    });
}

function loadImages() {
  backgroundImage.src = "image/background.jpg";
  rocket.img = new Image();
  rocket.img.src = rocket.src;  // Raketen-Bild wird geladen


  
}

// Draw()  methode zur Darstellung der Grafik im CANVAS  Feld des Browsers

function draw() {
    ctx.drawImage(backgroundImage, 0, 0,) // image darstellen an Position x-0,  y-0 des Canvas-feldes
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height) // Rakete wird mit den parametern aus -let rocket- dargestellt
   
    ufos.forEach(function(ufo) {
        ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height)
    })

    shots.forEach(function(shot) {
        ctx.drawImage(shot.img, shot.x, shot.y, shot.width, shot.height)
    })
  requestAnimationFrame(draw);
}