const paintCanvas = document.querySelector('.js-paint');
const context = paintCanvas.getContext('2d');
context.lineCap = 'round';

const colorPicker = document.querySelector('.js-color-picker');

colorPicker.addEventListener('change', event => {
    context.strokeStyle = event.target.value; 
} );

const lineWidthRange = document.querySelector('.js-line-range');
const lineWidthLabel = document.querySelector('.js-range-value');

lineWidthRange.addEventListener('input', event => {
    const width = event.target.value;
    lineWidthLabel.innerHTML = width;
    context.lineWidth = width;
} );

let x = 0, y = 0;
let isMouseDown = false;

const stopDrawing = () => { isMouseDown = false; }
const startDrawing = event => {
   isMouseDown = true;   
   [x, y] = [event.offsetX, event.offsetY];  
}

// Modification code initial pour l'historique > Nouvelle fonctionnalité
let lineHistory = [];

const drawLine = event => {
    if ( isMouseDown ) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(newX, newY);
        context.stroke();
        lineHistory.push(
            [x, y],
            [event.offsetX, event.offsetY],
        );
        x = newX;
        y = newY;
    }
}

// Clear the canvas > nouvelle fonctionnalité
const clearButton = document.querySelector('#clearCanvas');
clearButton.addEventListener('click', ()=>{
    // console.log("Le canvas va être effacé !"); // juste pour le debug
    context.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
    lineHistory = []; // supprimer l'historique quand on efface
})

// Undo canvas > nouvelle fonctionnalité
const undoButton = document.querySelector('#undoCanvas');
undoButton.addEventListener("click", ()=>{
    context.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
    alert("fonctionnalité bientôt disponible !");
    // console.log("1. On efface tout pour commencer");context.beginPath();
    // context.beginPath();
    // // context.moveTo(300, 200);
    // // context.lineTo(500, 50); 
    // context.moveTo(433, 80);
    // context.lineTo(430, 82); 
    // context.stroke();

})

// const coordinates = [
//     [464, 51],
//     [462, 51],
//     [462, 51],
//     [440, 65],
//     [440, 65],
//     [325, 111],
//     [325, 111],
//     [226, 168],
//     [226, 168],
//     [121, 218],
//     [121, 218],
//     [53, 249],
//     [53, 249],
//     [27, 266],
//     [27, 266],
//     [22, 273]
//   ];
  

// context.lineCap = 'round';
// context.strokeStyle = 'black'; // Set the desired color

// function drawLine(x1, y1, x2, y2) {
// context.beginPath();
// context.moveTo(x1, y1);
// context.lineTo(x2, y2);
// context.stroke();
// }

// for (let i = 0; i < coordinates.length; i += 2) {
// const [x1, y1] = coordinates[i];
// const [x2, y2] = coordinates[i + 1];
// drawLine(x1, y1, x2, y2);
// }



// enregistrement de l'Image en SVG

// const generateSvg = (coordinates) => {
// let svgContent = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300">';

// for (let i = 0; i < coordinates.length; i += 2) {
//     const [x1, y1] = coordinates[i];
//     const [x2, y2] = coordinates[i + 1];
    
//     svgContent += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" />`;
// }

// svgContent += '</svg>';
// return svgContent;
// };

// const downloadSvg = () => {
// const svgData = generateSvg(coordinates);

// const blob = new Blob([svgData], { type: 'image/svg+xml' });
// const url = URL.createObjectURL(blob);

// const a = document.createElement('a');
// a.href = url;
// a.download = 'drawing.svg';
// document.body.appendChild(a);
// a.click();
// document.body.removeChild(a);
// URL.revokeObjectURL(url);
// };

// downloadSvg();
  


paintCanvas.addEventListener( 'mousedown', startDrawing );
paintCanvas.addEventListener( 'mousemove', drawLine );
paintCanvas.addEventListener( 'mouseup', stopDrawing );
paintCanvas.addEventListener( 'mouseout', stopDrawing );