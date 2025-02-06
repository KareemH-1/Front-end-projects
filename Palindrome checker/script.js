const input = document.getElementById("input"); //letting the variable be equal to the what we got from user input
function check(){
    const value = input.value.toUpperCase(); // Convert input to uppercase to make sure that the returned bool will be correct even if the user enters lowercase or uppercase , letting a variable be equal to the string we got from the user
    const statue = reverse(value); //letting the variable be equal to the returned bool from the checking function  (we sent the string as the parameter which is to be checked)
    //if the variable is true
    if(statue){
        alert("The word you entered is a palindrome");
    }
    //if its false
    else{
        alert("Palindrome!");
    }
}

function reverse(value){
    let j = 0;
    let isrev = true;
    
    //loop to check if the end is equal to the beginning 
    for(let i = value.length - 1; i >= 0; i--){
        if(value[i] !== value[j]){
            isrev = false; 
            break;
        }
        j++;
    }

    return isrev;
}
