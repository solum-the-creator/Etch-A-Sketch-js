

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
createGrid(16);


function addEvents() {
    const gridList = document.querySelectorAll('.grid-item');
let mouseActive = false;



gridList.forEach((node) => {
    node.addEventListener('mousedown', (e) => mouseActive=true);
    node.addEventListener('mousemove',paintSquare);
    node.addEventListener('mouseup',(e) => mouseActive = false);
    node.addEventListener('dragstart',(e)=> e.preventDefault());
});

function paintSquare(e){
    if(mouseActive)
    this.style.backgroundColor = "black";

}

}

// let COLOR_FROM_WHITE = rgba(0, 0, 0, 0);



// function fromWhite() {
//     if(COLOR_FROM_WHITE === rgba(0, 0, 0, 1)) COLOR_FROM_WHITE = rgba(0, 0, 0, 0);


// }




const rangeGrid = document.querySelector('#sizeGrid');

rangeGrid.addEventListener('change',changeSize);

function changeSize(e) {
    let size = this.value;
    deleteGrid();
    createGrid(size);
    const sizeP = document.querySelector('.grid-size').firstElementChild;
    sizeP.textContent = size + ' x ' + size;
}

function deleteGrid() {
    const gridBox = document.querySelector('.content-grid');
    gridBox.remove();
    const grid = document.querySelector('.grid');
    const newGridBox = document.createElement('div');
    newGridBox.classList.add('content-grid');
    grid.append(newGridBox);
}