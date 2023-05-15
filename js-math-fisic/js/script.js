const canvas = document.getElementById('canvas1')
const contexto = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let arrayDosPontos = []

//handle mouse
const mouse = {
 x: null,
 y: null,
 radius: 250
}

window.addEventListener('mousemove', function(event){
  mouse.x = event.x
  mouse.y = event.y
  
})

contexto.fillStyle = 'green'
contexto.font = '125% helvetica'
contexto.fillText('JavaScript', 0, 50)
const coordenadasDoTexto = contexto.getImageData(0, 0, 100, 100)

class Pontos{
  constructor(x, y){
    this.x = x
    this.y = y
    this.size = 3
    this.baseX = this.x
    this.baseY = this.y
    this.density = (Math.random() * 40) + 5 
  }
  draw(){
    contexto.fillStyle = 'Orange'
    contexto.beginPath()
    contexto.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    contexto.closePath()
    contexto.fill()
  }
  update(){
    let direcaoX = mouse.x - this.x 
    let direcaoY = mouse.y - this.y 
    let distancia = Math.sqrt(direcaoX * direcaoX + direcaoY * direcaoY)
    let focaDeDirecaoX = direcaoX / distancia
    let focaDeDirecaoY = direcaoY / distancia
    let maxdistancia = mouse.radius
    let forca = (maxdistancia - distancia) / maxdistancia
    let directionX = focaDeDirecaoX * forca * this.density
    let directionY = focaDeDirecaoY * forca * this.density


    if(distancia < mouse.radius){
      this.x -= directionX
      this.y -= directionY
     
    }else{
      
      if(this.x !== this.baseX){
        let direcaoX = this.x - this.baseX
        this.x -= direcaoX/5 
      }
      if(this.y !== this.baseY){
        let direcaoY = this.y - this.baseY
        this.y -= direcaoY/5 
      }
    }  
  }
}



function init(){
  arrayDosPontos = []
  for(let  y = 0, y2 = coordenadasDoTexto.height; y < y2; y++){
    for(let x = 0, x2 = coordenadasDoTexto.width; x < x2; x++){
      if(coordenadasDoTexto.data[(y * 4 * coordenadasDoTexto.width) + (x * 4) + 3] > 128){
        let positionX = x
        let positionY = y
        arrayDosPontos.push(new Pontos(positionX * 10, positionY * 10))
      }
    }
  }
}
init()
console.log(arrayDosPontos)//comentar o console linha 17

function animate(){
  contexto.clearRect(0, 0, canvas.width, canvas.height)
  for(let i = 0; i < arrayDosPontos.length; i++){
    arrayDosPontos[i].draw()    
    arrayDosPontos[i].update()    
  }
  requestAnimationFrame(animate)
}
animate()

