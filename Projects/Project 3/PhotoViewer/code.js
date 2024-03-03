'use strict'; 

let photoArr = new Array();

function main() {
    document.querySelector("#LPbutton").onclick = loadPhoto;
}

function loadPhoto() {
    let folder = document.querySelector("#photo-folder").value;
    let name = document.querySelector("#photo-name").value;
    let start = Number(document.querySelector("#startNum").value);
    console.log(start);
    let end = Number(document.querySelector("#endNum").value);
    console.log(end);

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
    for(let idx = start; idx < end; idx++) {
        photoArr.push(folder + name + idx + ".jpg");
    }

    console.log(photoArr);

    let imageElement = document.getElementById("photo");
    let combinedString = folder + name;
    imageElement.setAttribute("src", combinedString);
}