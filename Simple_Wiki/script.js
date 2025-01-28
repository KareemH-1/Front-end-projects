document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const welcomeMessage = `Hello ${name}! Welcome to this simple Wikipedia website, code is at: "https://github.com/KarXB/Front-End-Projects"`;
    alert(welcomeMessage);
});