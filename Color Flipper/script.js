const body = document.getElementsByTagName("body")[0]; //[0] to call the first element of the array which is the only one (body)

function setColor(color){
    body.style.backgroundColor = color; //set the background color to the parameter color sent from the html file
}

const bodycolor = getComputedStyle(body).backgroundColor; // a constant variable that gets the background color of the body and stores it
function removeColor(){
    body.style.backgroundColor = bodycolor; //convert the body background back to original when remove color button is clicked
}

function randomColor(){
    //let the RGB get random numbers each (0-255 , 0-255 , 0-255) and round them to prevent getting floats;
    const R = Math.round(Math.random()*255);
    const G = Math.round(Math.random()*255);
    const B = Math.round(Math.random()*255);

    //change the rgb from numbers to string by using String interpolation
    const color = `rgb(${R} ${G} ${B})`;
    body.style.backgroundColor = color;
}