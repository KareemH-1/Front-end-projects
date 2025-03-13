const result = document.getElementById("result");

function analyzeText() {
    const text = document.getElementById("text").value;
    const ignoreSpaces = document.querySelector("input[type='checkbox']").checked;

    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    let letterCount;
    if (ignoreSpaces) {
        letterCount = text.replace(/\s+/g, "").length; 
    } else {
        letterCount = text.length; 
    }

    const lineCount = text.split("\n").length;

    if (wordCount === 0) {
        result.textContent = "No text entered";
    } else {
        result.textContent = `The text you entered contains:
        Words: ${wordCount}, Letters: ${letterCount}, and Lines: ${lineCount}`;
    }
}