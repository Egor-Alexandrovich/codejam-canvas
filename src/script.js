let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let picture = new Image();
let cellSize = 0;

let myJson32 = [];
let myJson =[];

 fetch('./data/4x4.json')
  .then(response => response.json())
  .then(body => body.forEach(element => element.forEach(item => myJson.push('#'+item))));

fetch('./data/32x32.json')
  .then(response => response.json())
  .then(body => body.forEach(element => element.forEach(item => myJson32.push(item))));

 
  
  document.querySelectorAll('.button').forEach( btn => btn.addEventListener('click',function(){
      if (btn.textContent === 'image') {
        picture.src = './data/image.png';
        picture.onload = function() { 
            ctx.drawImage(picture, 0, 0, 512, 512); 
        }
      } else if (btn.textContent === '4x4'){
            ctx.clearRect(0,0,512,512);
            cellSize = 4;
            fillCanvas(myJson, cellSize);

      }
      else {
      ctx.clearRect(0,0,512,512);
      cellSize = 32;
      let k =0;
        for (let i = 0; i < cellSize; i++) {
        for(let j =0; j < cellSize; j++) {
            ctx.fillStyle = `rgb(${myJson32[k][0]},${myJson32[k][1]},${myJson32[k][2]})`;
            ctx.fillRect(i*(512/cellSize), j*(512/cellSize), (512/cellSize), (512/cellSize));
            k++;
            }
        }
      
    }
  }))
 
  function fillCanvas(arr, cellSize) {
      let k =0;
    for (let i = 0; i < cellSize; i++) {
    for(let j =0; j < cellSize; j++) {
        ctx.fillStyle = arr[k];
        ctx.fillRect(i*(512/cellSize), j*(512/cellSize), (512/cellSize), (512/cellSize));
        k++;
    }
}}

  





/*for (let i = 0; i < myJson.length; i++) {
    console.log(myJson[i]);
}*/
/*for (let i = 0; i < myJson.length; i++) {
    for(let j =0; j < myJson.length; j++) {
        console.log(myJson[i][j]);
    }
}*/
/*fetch('./data/4x4.json')
                .then(response => response.json())
                .then(data => data.map(arr => { return arr.map(item =>{ return '#'+item})}))*/