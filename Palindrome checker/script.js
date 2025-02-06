const input = document.getElementById("input");

function check(){
    const value = input.value;
    const statue = reverse(value);
    if(statue){
        alert("The word you entered is a palindrome");
    }
    else{
        alert("The word you entered isn't a palindrome");
    }
}

function reverse(value){
    let j = 0;
    let isrev = true;
    
    for(let i = value.length - 1; i >= 0; i--){
        if(value[i] !== value[j]){
            isrev = false; 
            break;
        }
        j++;
    }

    return isrev;
}
