const body = document.getElementsByTagName("body")[0];

function setColor(color){
    body.style.backgroundColor = color;
}

function randomColor(){
    const R = Math.round(Math.random()*255);
    const G = Math.round(Math.random()*255);
    const B = Math.round(Math.random()*255);

    const color = `rgb(${R} ${G} ${B})`;
    body.style.backgroundColor = color;
}