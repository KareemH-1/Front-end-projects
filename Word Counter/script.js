const result = document.getElementById("result");

function analyzeText() {
    const text = document.getElementById("text").value;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const letterCount = text.replace(/[^a-zA-Z]/g, "").length;
    const lineCount = text.split("\n").length;
    const sentenceCount = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    if(wordCount === 0) result.textContent = "No text entered";
    else{
    result.textContent = `The text you entered contains: 
    Words: ${wordCount} , Letters: ${letterCount} , Lines: ${lineCount} and Sentences: ${sentenceCount}`;
    }
}