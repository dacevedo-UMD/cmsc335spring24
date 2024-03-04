'use strict'; 

let photoArr = new Array();
let currIdx = 0;
let animationId, slideShowStarted, randomSlideShowStarted = false;
const speed = 1000;

document.querySelector("#LoPbutton").addEventListener("click", loadPhoto);
document.querySelector("#LJbutton").addEventListener("click", loadJSON);
document.querySelector("#PPbutton").addEventListener("click", previousPhoto);
document.querySelector("#NPbutton").addEventListener("click", nextPhoto);
document.querySelector("#FPbutton").addEventListener("click", firstPhoto);
document.querySelector("#LaPbutton").addEventListener("click", lastPhoto);
document.querySelector("#SSbutton").addEventListener("click", slideShow);
document.querySelector("#RSSbutton").addEventListener("click", randomSlideShow);
document.querySelector("#SSSbutton").addEventListener("click", stopSlideShow);

function loadPhoto() {
    let folder = document.querySelector("#photo-folder").value;
    let name = document.querySelector("#photo-name").value;
    let start = Number(document.querySelector("#startNum").value);
    let end = Number(document.querySelector("#endNum").value);

    // checks to make sure that both start and end are in range
    if (start < 1 || end > 6 || end - start < 0) {
        let statusElement = document.querySelector("#photo-status");
        statusElement.textContent = "Error: Invalid Range";
        return;
    } else {
        let statusElement = document.querySelector("#photo-status");
        statusElement.textContent = "Photo Viewer System";
    }

    photoArr = new Array();                                         // to reset maybe??
    for(let idx = start; idx < end + 1; idx++) {
        photoArr.push(folder + name + idx + ".jpg");
    }

    currIdx = 0;
    displayPhoto();
}

function previousPhoto() {
    if (currIdx - 1 < 0) {
        currIdx = photoArr.length - 1;
    } else {
        currIdx--;
    }
    displayPhoto();
}

function nextPhoto() {
    if (currIdx + 1 == photoArr.length) {
        currIdx = 0;
    } else {
        currIdx++;
    }
    displayPhoto();
}

function firstPhoto() {
    currIdx = 0;
    displayPhoto();
}

function lastPhoto() {
    currIdx = photoArr.length - 1;
    displayPhoto();
}

function displayPhoto() {
    if (photoArr.length == 0) {
        let statusElement = document.querySelector("#photo-status");
        statusElement.textContent = "Error: you must load data first";
    }

    let imageElement = document.getElementById("photo");
    imageElement.setAttribute("src", photoArr[currIdx]);

    var imageName = document.getElementById("photoName");
    imageName.value = photoArr[currIdx];
}

function loadJSON() {
    let photoURL = document.querySelector("#photoURL").value;
    fetch(photoURL)
        .then(response => response.json())
        .then(json => {
            const images = json.images;
            photoArr = new Array();                                //reset array...
            for (let i = 0; i < images.length; i++) {
                photoArr.push(images[i].imageURL);
            }
            displayPhoto();
        });
}

function slideShow() {
    if (!slideShowStarted && !randomSlideShowStarted) { // preventing execuiting setInterval multiple times before stopping animation
        animationId = setInterval("nextPhoto()", speed);
        slideShowStarted = true;
    }
}

function randomSlideShow() {
    if (!slideShowStarted && !randomSlideShowStarted) { // preventing execuiting setInterval multiple times before stopping animation
        animationId = setInterval("displayPhoto()", speed);
        randomSlideShowStarted = true;
    }
}

function stopSlideShow() {
    if (slideShowStarted || randomSlideShowStarted) {
        clearInterval(animationId);
        slideShowStarted = false;
        randomSlideShowStarted = false;
    }
}