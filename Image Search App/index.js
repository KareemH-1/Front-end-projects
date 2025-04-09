const accessKey = "c2RW-O90f7G9uebVgFHrPSGpRq735UQJtB66m2kvv_E";

const form = document.querySelector("form");
const searchInput = document.getElementById("search");
const results = document.getElementById("results");
const showMoreButton = document.getElementById("show-more-button");

let info = "";
let page = 1;
let totalPages = 0;

function createPaginationControls() {
    const paginationDiv = document.createElement("div");
    paginationDiv.classList.add("pagination");
    
    const prevButton = document.createElement("button");
    prevButton.classList.add("pagination-button");
    prevButton.textContent = "Previous";
    prevButton.id = "prev-button";
    prevButton.disabled = page <= 1;
    
    const pageInfo = document.createElement("span");
    pageInfo.classList.add("pagination-info");
    pageInfo.textContent = `Page ${page}/${totalPages || 1}`;
    pageInfo.id = "page-info";
    
    const nextButton = document.createElement("button");
    nextButton.classList.add("pagination-button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.disabled = page >= totalPages;
    
    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(pageInfo);
    paginationDiv.appendChild(nextButton);
    
    return paginationDiv;
}

async function searchImages() {
    info = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${info}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        totalPages = Math.ceil(data.total / 12);
        
        results.innerHTML = "";
        
        const searchResults = data.results;
        
        searchResults.forEach((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");
            
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;
            
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;
            
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            results.appendChild(imageWrapper);
        });
        
        if (document.querySelector(".pagination")) {
            document.querySelector(".pagination").remove();
        }
        
        const paginationControls = createPaginationControls();
        document.body.insertBefore(paginationControls, showMoreButton);
        
        showMoreButton.style.display = "none";
        
        document.getElementById("prev-button").addEventListener("click", () => {
            if (page > 1) {
                page--;
                searchImages();
            }
        });
        
        document.getElementById("next-button").addEventListener("click", () => {
            if (page < totalPages) {
                page++;
                searchImages();
            }
        });
        
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.style.display = "none";