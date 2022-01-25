
// Project Setup

const canvas =document.querySelector('canvas')
const c = canvas.getContext('2d')
//To get witdh and hieght of window
canvas.width=window.innerWidth
canvas.height=window.innerHeight
const gravity = 4.5
//Player
class Player{
    constructor(){
        this.position={
            x:100,
            y:100
        }
        this.velocity={
            x:0,
            y:0
        }
        this.width=30
        this.heigth=30

    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.heigth)
        
    }
    update(){
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        if(this.position.y+this.heigth+this.velocity.y<=canvas.height)
         this.velocity.y+=gravity
        else this.velocity.y=0
         
        
    }


}
class Platform{
    constructor({x,y}){
        this.position={
            x,
            y

        }
        this.width=200
        this.height=20
    }
    darw(){
        c.fillStyle='yellow'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}



const player = new Player()
const platforms = [new Platform({x:300,y:100})
   , new Platform({x:500,y:200}) 
]
const keys ={
    right:{
        pressed:false
    },
    left:{
        pressed:false
    },
}
scrolloffset=0

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    player.update()
    platforms.forEach(platform=>{
        platform.darw()
    })
    
    if(keys.right.pressed && player.position.x<400){
        player.velocity.x=5
    }
    else if(keys.left.pressed && player.position.x>100){
        player.velocity.x=-5
    }
    else{
        player.velocity.x=0
        if(keys.right.pressed){
            scrolloffset+=5
            platforms.forEach(platform=>{
                platform.position.x-=5
            })
            
        }
        else if (keys.left.pressed){
            scrolloffset-=5
            platforms.forEach(platform=>{
                platform.position.x+=5
            })
            
        }
    //win scenario
    if(scrolloffset> 2000){
        console.log("You win")
    }
    }

    //platform collision detection
    platforms.forEach(platform=>{
       if(player.position.y+player.heigth<=platform.position.y
    &&player.position.y+player.heigth+player.velocity.y>=platform.position.y
    &&player.position.x+player.width>=platform.position.x
    &&player.position.x<=platform.position.x+platform.width)
    {
        player.velocity.y=0
    }
    })
    
}
animate()
addEventListener('keydown',({keyCode}) =>{
 
 switch(keyCode){
     case 65:
         console.log("left")
         keys.left.pressed=true
         break
    case 83:
        console.log("down")
        break
    case 68:
        console.log("right")
        keys.right.pressed=true
        break
   case 87:
        player.velocity.y-=45
        break
 }
})
addEventListener('keyup',({keyCode}) =>{
 
    switch(keyCode){
        case 65:
            console.log("left")
            keys.left.pressed=false
            break
       case 83:
           console.log("down")
           break
       case 68:
           console.log("right")
           keys.right.pressed=false
           break
      case 87:
           player.velocity.y-=0
           break
    }
   })