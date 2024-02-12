let main = document.getElementById("main");
let arr = [];
let hue = 0;
let size = 100;

const paintTouch = (e) => {
    e.preventDefault();
    let myLocation = e.changedTouches[0];
    let realTarget = document.elementFromPoint(
        myLocation.clientX,
        myLocation.clientY
    );
    drop(realTarget);
}

function change(e){
    e.state = (e.state === 1) ? 0 : 1;
}

function drop(e){
    if(e.state === 0){
        e.state = 1;
        e.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        hue = (hue+1) % 360;
    }
}

function newgrid(size) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        arr[i] = [];
        for (let j = 0; j < size; j++) {
            let item = document.createElement("div");
            item.classList.add("item");
            item.state = 0;
            item.addEventListener('mouseover', () => drop(item));
            row.appendChild(item);
            arr[i][j] = item;
        }
        main.appendChild(row);
    }
    main.addEventListener('touchmove', paintTouch);
    main.addEventListener('touchstart', paintTouch);
}

newgrid(size);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updatec() {
    while(true) {
        for(let i = size-2; i >= 0; i--){
            for(let j = size-1; j >= 0; j--){
                if(arr[i][j].state === 1 && arr[i+1][j].state === 0){
                    change(arr[i][j]);
                    change(arr[i+1][j]);
                    arr[i+1][j].style.backgroundColor = arr[i][j].style.backgroundColor;
                    arr[i][j].style.backgroundColor = "gray";
                }
                else if(arr[i][j].state === 1 && j+1 < size && arr[i+1][j+1].state === 0){
                    change(arr[i][j]);
                    change(arr[i+1][j+1]);
                    arr[i+1][j+1].style.backgroundColor = arr[i][j].style.backgroundColor;
                    arr[i][j].style.backgroundColor = "gray";
                }
                else if(arr[i][j].state === 1 && j-1 > 0 && arr[i+1][j-1].state === 0){
                    change(arr[i][j]);
                    change(arr[i+1][j-1]);
                    arr[i+1][j-1].style.backgroundColor = arr[i][j].style.backgroundColor;
                    arr[i][j].style.backgroundColor = "gray";
                }
                if(arr[i][j].hover === true){
                    drop(arr[i][j]);
                }
            }
        }
        await sleep(25);
    }
}

updatec();