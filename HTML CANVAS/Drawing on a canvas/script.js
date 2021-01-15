let canvas = document.querySelector("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
let maxRadius = 50;
let balloonToCursorDistance = 100;
let colorArray = [
    "#1E69A6", "#375873", "#103859", "#ee0c0c", "#507FA6", " #2C99F2"];


let mouse = {
    x:undefined,
    y:undefined
}





class Rectangle{
    constructor (x,y,wd,ht,dx,dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.wd = wd;
        this.ht = ht;
        this.maxWidth = 250;
        this.minWidth=wd
        this.touched = false;
        this.color=colorArray[Math.floor(Math.random()*colorArray.length)]
    }

    draw () {
        c.beginPath();
        c.fillStyle = this.color
        c.fillRect(this.x, this.y,this.wd, this.ht);
        c.fill() 
    }

    update () {
        if (this.x+this.wd/2>innerWidth || this.x-this.wd/2<0) {
            this.dx=-this.dx 
         }
         if (this.y+this.ht/2>innerHeight || this.y-this.ht/2<0) {
             this.dy=-this.dy
          }
         this.x += this.dx;
        this.y += this.dy;

        if (this.distance() < balloonToCursorDistance) {
            if (this.wd < this.maxWidth) {
                this.wd += 1;
            }
       
            this.touched=true
        } else if (this.touched && this.wd > this.minWidth) {
            this.wd -= 1;
       }
        
        this.draw()
        //  console.log(c)
    }
    distance () {
        return Math.sqrt((this.x-mouse.x)**2 +(this.y-mouse.y)**2)
    }
}



class Circle{
    constructor (x,y,radius,dx,dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.minRadius = radius;
        this.dx = dx;
        this.dy = dy;
        this.touched = false;
        this.color=colorArray[Math.floor(Math.random()*colorArray.length)]
    }

    draw () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;   
        c.fill() 
    }

    update () {
        if (this.x+this.radius>innerWidth || this.x-this.radius<0) {
            this.dx=-this.dx 
         }
         if (this.y+this.radius>innerHeight || this.y-this.radius<0) {
             this.dy=-this.dy
          }
         this.x += this.dx;
        this.y += this.dy;

        if (this.distance() < balloonToCursorDistance) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
       
            this.touched=true
        } else if (this.touched && this.radius > this.minRadius) {
            this.radius -= 1;
       }
        
        this.draw()
        //  console.log(c)
    }
    distance () {
        return Math.sqrt((this.x-mouse.x)**2 +(this.y-mouse.y)**2)
    }
}

window.addEventListener("mousemove", function (event) {
    mouse = {
        x: event.x,
        y: event.y
    }

})
// console.log(balloonArray)

let balloonArray = [];
function init () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
    for (let i = 0; i < 800; i++){
    let radius = 2
    let x = Math.random() * (innerWidth - 2 * radius) + radius;
    let y = Math.random() * (innerHeight - 2 * radius) + radius;
        let dx = Math.random() * 2;
        let dy = Math.random() * 3;
        balloonArray.push(new Circle(x,y,radius,dx,dy))
    } 

}
init()

let rectArray=[]
function init2 () {
    for (let n = 0; n < 20; n++){
        let wd = 15;
        let ht = 100;
        let x = Math.random() * (innerWidth - wd);
        let y = Math.random() * (innerHeight - ht);
    
        rectArray.push(new Rectangle(x,y,wd,ht,2,2))
    }

}
init2()


function animate () {
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    balloonArray.forEach(balloon => {
       balloon.update()
    })
    rectArray.forEach(rect => {
        rect.update()
    })
}
animate ()