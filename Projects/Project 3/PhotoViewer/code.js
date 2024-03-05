'use strict'; 

let photoArr = new Array();
let currIdx = 0;
let x = 0;
let animationId, slideShowStarted, randomSlideShowStarted = false;
const speed = 1000;

document.querySelector("#LoPbutton").addEventListener("click", loadPhoto);
document.querySelector("#LJbutton").addEventListener("click", loadJSON);
document.querySelector("#PPbutton").addEventListener("click", previousPhoto);
document.querySelector("#NPbutton").addEventListener("click", nextPhoto);
document.querySelector("#photo").addEventListener("click", nextPhoto);
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
    if (end < start) {
        let statusElement = document.querySelector("#photo-status");
        statusElement.textContent = "Error: Invalid Range";
        return;
    } 

    photoArr = new Array();                                         // to reset maybe?? does JS auto collect garbage like java??
    for(let idx = start; idx < end + 1; idx++) {
        photoArr.push(folder + name + idx + ".jpg");
    }

    currIdx = 0;
    displayPhoto();
}

function previousPhoto() {
    if (photoArr.length == 0) {
        let statusElement = document.querySelector("#photo-status");
        statusElement.textContent = "Error: you must load data first";
        return;
    }

    if (currIdx - 1 < 0) {
        currIdx = photoArr.length - 1;
    } else {
        currIdx--;
    }
    displayPhoto();
}

function nextPhoto() {
    if (photoArr.length == 0) {
        let statusElement = document.querySelector("#photo-status");
        statusElement.textContent = "Error: you must load data first";
        return;
    }

    if (currIdx + 1 == photoArr.length) {
        currIdx = 0;
    } else {
        currIdx++;
    }
    displayPhoto();
}

function firstPhoto() {
    if (photoArr.length == 0) {
        let statusElement = document.querySelector("#photo-status");
        statusElement.textContent = "Error: you must load data first";
        return;
    }

    setIdxToZero();
    displayPhoto();
}

/* LAMBDA */ /* LAMBDA */ /* LAMBDA */ 
let setIdxToZero = () => currIdx = 0;

function lastPhoto() {
    if (photoArr.length == 0) {
        let statusElement = document.querySelector("#photo-status");
        statusElement.textContent = "Error: you must load data first";
        return;
    }

    currIdx = photoArr.length - 1;
    displayPhoto();
}

function displayPhoto() {
    let statusElement = document.querySelector("#photo-status");
    statusElement.textContent = "Photo Viewer System";

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
    if (photoArr.length == 0) {
        let statusElement = document.querySelector("#photo-status");
        statusElement.textContent = "Error: you must load data first";
        return;
    }

    if (!slideShowStarted && !randomSlideShowStarted) { 
        animationId = setInterval("nextPhoto()", speed);
        slideShowStarted = true;
    }
}

function randomSlideShow() {
    if (photoArr.length == 0) {
        let statusElement = document.querySelector("#photo-status");
        statusElement.textContent = "Error: you must load data first";
        return;
    }

    if (!slideShowStarted && !randomSlideShowStarted) { 
        animationId = setInterval("randomPhoto()", speed);
        randomSlideShowStarted = true;
    }
}



function randomPhoto() {
    currIdx = Math.floor(Math.random() * photoArr.length); 
    displayPhoto();
}

function stopSlideShow() {
    if (photoArr.length == 0) {
        let statusElement = document.querySelector("#photo-status");
        statusElement.textContent = "Error: you must load data first";
        return;
    }

    if (slideShowStarted || randomSlideShowStarted) {
        clearInterval(animationId);
        slideShowStarted = false;
        randomSlideShowStarted = false;
    }
}