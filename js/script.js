
let backGrid = document.querySelector('.content-grid');
let color_grid = window.getComputedStyle(backGrid).backgroundColor;




const COLOR_BLACK = 'rgb(20,20,20)';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;
const BACKGROUND_COLOR = color_grid;

let current_size = DEFAULT_SIZE;
let current_color = COLOR_BLACK;
let current_mode = DEFAULT_MODE;



function createGrid(numRows) {
    const gridBox = document.querySelector('.content-grid');
    let widthBox = gridBox.clientWidth;
    let widthItem = widthBox/numRows;
    const gridArr = [];
    for(let i =0; i<numRows**2; i++){
        let gridItem = document.createElement('div');
        gridArr.push(gridItem);
    }
    gridArr.forEach((item) => { 
        item.classList.add('grid-item');
        item.style.minWidth = widthItem +'px';
        item.style.minHeight = widthItem +'px';

    });
    gridBox.append(...gridArr);
    addEvents();
}
createGrid(current_size);

function addEvents() {
    const gridList = document.querySelectorAll('.grid-item');
let mouseActive = false;

gridList.forEach((node) => {
    node.addEventListener('mousedown', (e) => mouseActive=true);
    node.addEventListener('mouseover',paintSquare);
    node.addEventListener('mouseup',(e) => mouseActive = false);
    node.addEventListener('dragstart',(e)=> e.preventDefault());
});

    function paintSquare(e){
        if(mouseActive){
        if(current_mode === 'color'){
            this.style.backgroundColor = current_color;
        }
        if(current_mode === 'rainbow') {
            this.style.backgroundColor = paintRainbow();
        }
        if(current_mode === 'eraser') {
            this.style.backgroundColor = BACKGROUND_COLOR;
        }
        }
    }
}

function paintRainbow() {
    let color_r = getRandom(256);
    let color_g = getRandom(256);
    let color_b = getRandom(256);
    return 'rgb('+color_r+','+color_g+','+color_b+')';
}



function getRandom(num) {
    return Math.floor(Math.random()*num);
}


const rangeGrid = document.querySelector('#sizeGrid');

rangeGrid.addEventListener('change',changeSize);
rangeGrid.addEventListener('mousemove', updateSizeValue);


function updateSizeValue(e) {
    let size = this.value;
    const sizeP = document.querySelector('.grid-size').firstElementChild;
    sizeP.textContent = size + ' x ' + size;
}

function changeSize(e) {
    let size = this.value;
    current_size = size;
    deleteGrid();
    createGrid(size);
    
}

function deleteGrid() {
    const gridBox = document.querySelector('.content-grid');
    gridBox.remove();
    const grid = document.querySelector('.grid');
    const newGridBox = document.createElement('div');
    newGridBox.classList.add('content-grid');
    grid.append(newGridBox);
}

// CHANGE PAINT MOD

const colorButton = document.querySelector('.color-button');
const rainbowButton = document.querySelector('.rainbow-button');
const eraserButton = document.querySelector('.eraser-button');

colorButton.addEventListener('click',swapMode);
rainbowButton.addEventListener('click', swapMode);
eraserButton.addEventListener('click', swapMode);

function swapMode(e) {
    current_mode = this.dataset.mode;

}

// function setColorMode(e) {
//     current_mode = 'color';
// }

// function setRainbowMode(e) {
//     current_mode = 'rainbow';
// }

// function setEraserMode(e) {
//     current_mode = 'eraser';
// }


//CLEAR GRID

const clearButton = document.querySelector('.clear-button');

clearButton.addEventListener('click',clearGrid);

function clearGrid(e) {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach((item) => {
        item.style.backgroundColor = BACKGROUND_COLOR;
    });
}

//Pick color from input
const pickColor = document.querySelector('#pick-color');
pickColor.value = current_color;

pickColor.addEventListener('input',updateColor);

function updateColor(e) {
    let pickColor = this.value;
    current_color = pickColor;
}