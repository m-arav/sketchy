function createGridItem() {
    let gItem = document.createElement("div");
    gItem.className = 'grid-item';
    gItem.onmouseenter = function () { setOnMouseEnterColor(event); };
    return gItem;
}

function createGrid(gridSize) {
    numberOfGridItems = gridSize * gridSize;
    let grid = document.querySelector(".grid");
    for (let step = 0; step < numberOfGridItems; step++) {
        grid.appendChild(createGridItem());
    }
}

function clearGrid(message) {
    document.querySelector(".grid").innerHTML = null
}

function setGridSize(gSzie) {
    let grid = document.querySelector(".grid");
    cssRule = `grid-template-columns: repeat(${gSzie}, 1fr);
                grid-template-rows: repeat(${gSzie}, 1fr);`;
    grid.style.cssText = cssRule;
}

function setOnMouseEnterColor(event) {
    event.target.style.cssText = `background-color: #${currentColor()};`
}

function currentColor() {
    let color = document.querySelector("#grid-color").value;
    if (color == 'rainbow') {
        return Math.floor(Math.random() * 16777215).toString(16);
    } else {
        return color;
    }
}

function resetGrid(gSize = document.querySelector("#grid-size").value) {
    clearGrid();
    setGridSize(gSize);
    createGrid(gSize);
}

document.querySelector("#grid-size").addEventListener('change', (event) => {
    let gSize = event.target.value;
    resetGrid(gSize);
});

createGrid(16);