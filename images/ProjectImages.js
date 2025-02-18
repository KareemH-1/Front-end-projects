document.addEventListener("DOMContentLoaded", function () {
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach(function (thumbnail) {
        thumbnail.addEventListener("click", function () {
            const fullscreenDiv = document.createElement("div");
            fullscreenDiv.classList.add("fullscreen");

            const titleDiv = document.createElement("div");
            titleDiv.classList.add("fullscreen-title");
            titleDiv.textContent = this.alt || "Untitled Image";

            const img = document.createElement("img");
            img.src = this.src;

            fullscreenDiv.appendChild(titleDiv);
            fullscreenDiv.appendChild(img);

            const closeBtn = document.createElement("div");
            closeBtn.classList.add("close-btn");
            closeBtn.innerHTML = "✖";
            closeBtn.addEventListener("click", function () {
                document.body.removeChild(fullscreenDiv);
            });

            fullscreenDiv.appendChild(closeBtn);
            document.body.appendChild(fullscreenDiv);
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const imageViewer = document.querySelector(".image-viewer");

    let scrollAmount = 0;
    let scrolling = false;

    imageViewer.addEventListener("wheel", (event) => {
        event.preventDefault();
        if (!scrolling) {
            scrolling = true;
            requestAnimationFrame(() => {
                imageViewer.scrollLeft += event.deltaY * 2; 
                scrolling = false;
            });
        }
    });
});
