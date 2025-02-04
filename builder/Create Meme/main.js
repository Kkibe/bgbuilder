const imageFileInput = document.querySelector("#imageFileInput");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");
const canvas = document.querySelector("#meme");
document.querySelector(".input").onclick = () => {
    imageFileInput.click();
};

let image;

imageFileInput.addEventListener('change', ()=>{
    //if(imageFileInput.value)
    const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);
    
    image = new Image();
    image.src = imageDataUrl;

    image.addEventListener("load", ()=>{
        updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
    }, {once: true});
});

topTextInput.addEventListener('change', ()=>{
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
})

bottomTextInput.addEventListener('change', ()=>{
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
})

function updateMemeCanvas(canvas, image, topText, bottomText){
    if(image){
        document.querySelector("main").classList.remove("disable");
        document.querySelector("section").classList.add("section-hidden");
    }
    const ctx = canvas.getContext('2d');
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;

    //update canvas background 
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0)

    //Prepare textAlign
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${ fontSize }px sans-serif`;

    //Add top text 
    ctx.textBaseline = "top";
    ctx.strokeText(topText, width / 2, yOffset);
    ctx.fillText(topText, width / 2, yOffset);

        //Add bottom text 
        ctx.textBaseline = "top";
        ctx.strokeText(bottomText, width / 2, height - yOffset);
        ctx.fillText(bottomText, width / 2, height - yOffset);

}