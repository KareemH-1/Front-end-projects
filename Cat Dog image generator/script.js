const catImg = document.getElementById("cat");
const dogImg = document.getElementById("dog");
const catBreed = document.getElementById("catBreed");
const dogBreed = document.getElementById("dogBreed");
const catContainer = document.getElementById("catContainer");
const dogContainer = document.getElementById("dogContainer");
const btn = document.querySelector(".btn");

let lastCatImage = "";
let lastDogImage = "";

btn.addEventListener("click", async () => {
    catContainer.style.opacity = 1;
    dogContainer.style.opacity = 1;
    
    catBreed.textContent = "Loading...";
    dogBreed.textContent = "Loading...";
    
    catImg.parentElement.classList.add("loading");
    dogImg.parentElement.classList.add("loading");
    
    try {
        const [catData, dogData] = await Promise.all([
            fetchCatImage(),
            fetchDogImage()
        ]);
        
        if (catData && catData.url !== lastCatImage) {
            catImg.src = catData.url;
            catBreed.textContent = catData.breed;
            catImg.style.display = "block";
            lastCatImage = catData.url;
        } else {
            catBreed.textContent = "No new image found";
        }
        
        if (dogData && dogData.url !== lastDogImage) {
            dogImg.src = dogData.url;
            dogBreed.textContent = dogData.breed;
            dogImg.style.display = "block";
            lastDogImage = dogData.url;
        } else {
            dogBreed.textContent = "No new image found";
        }
    } catch (error) {
        catBreed.textContent = "Failed to load";
        dogBreed.textContent = "Failed to load";
    } finally {
        catImg.parentElement.classList.remove("loading");
        dogImg.parentElement.classList.remove("loading");
    }
});

async function fetchCatImage() {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?size=small&include_breeds=true", {
            headers: { "x-api-key": "live_0sHDBpz4FxGXhBbzZSAle6kmRfRPyaJWPpwlyLXnzPJ09N9PCPsiBYs6l3016ELO" }
        });
        
        const data = await response.json();
        return data.length > 0 ? { 
            url: data[0].url, 
            breed: data[0].breeds && data[0].breeds.length ? data[0].breeds[0].name : "Unknown Breed" 
        } : null;
    } catch {
        return null;
    }
}

async function fetchDogImage() {
    try {
        const response = await fetch("https://api.thedogapi.com/v1/images/search?size=small&include_breeds=true", {
            headers: { "x-api-key": "live_8Xrs1QnLyBLHWcyvSWY6FG4G0SbP8LMgwlFhrCdh3igZomahyrPjngyEB1UQpC4S" }
        });
        
        const data = await response.json();
        return data.length > 0 ? { 
            url: data[0].url, 
            breed: data[0].breeds && data[0].breeds.length ? data[0].breeds[0].name : "Unknown Breed" 
        } : null;
    } catch {
        return null;
    }
}