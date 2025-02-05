const toggleButton = document.getElementById('darkModeToggle');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const elementsToToggle = [
        document.querySelector('nav'),
        document.querySelector('header'),
        document.querySelector('footer'),
        ...document.querySelectorAll('section'),
        ...document.querySelectorAll('nav a')
    ];
    
    elementsToToggle.forEach(element => {
        if (element) {
            element.classList.toggle('dark-mode');
        }
    });

    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = '🌙';  // Change to moon emoji in light mode
    } else {
        toggleButton.textContent = '🌞';  // Change to sun emoji in dark mode
    }


});