let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0];

function calculateAge() {
    let birthDate = new Date(userInput.value);
    
    // Check if the input date is valid
    if (isNaN(birthDate)) {
        document.getElementById("age").innerHTML = "Enter proper date!";
        return;
    }

    let day1 = birthDate.getDate();
    let month1 = birthDate.getMonth() + 1;
    let year1 = birthDate.getFullYear();
    
    let today = new Date();

    let day2 = today.getDate();
    let month2 = today.getMonth() + 1;
    let year2 = today.getFullYear();
    
    let year = year2 - year1;
    let month = month2 - month1;
    let day = day2 - day1;

    // Adjust if the current month is earlier than the birth month or if day2 is earlier than day1
    if (month < 0 || (month === 0 && day < 0)) {
        year--;
        month = 12 + month; // Adjust months
    }
    
    if (day < 0) {
        month--;
        day = getDays(year1, month1) + day2 - day1;
    }
    
    // when the month goes negative
    if (month < 0) {
        month = 11;
        year--;
    }
    if (year < 0) {
        document.getElementById("age").innerHTML = "Enter a proper date!";
    } else {
        document.getElementById("age").innerHTML = `You are <span>${year}</span> years, <span>${month}</span> months and <span>${day}</span> days old.`;
    }
}

function getDays(year, month) {
    return new Date(year, month, 0).getDate(); // Returns number of days in a month
}
