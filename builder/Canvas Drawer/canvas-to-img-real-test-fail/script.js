const btnDisplay = document.querySelector("#btnDisplay");
const btnDownload = document.querySelector("#btnDownload");
const imgConverted = document.querySelector("#imgConverted");
const myCanvas = document.querySelector("#myCanvas");
const ctx = myCanvas.getContext("2d");

ctx.font = "50px Roboto";
ctx.fillStyle = "red";
ctx.fillText("dcode", 100, 100);
ctx.fillRect(200, 150, 150, 75);

btnDisplay.addEventListener("click", function () {
  const dataURI = myCanvas.toDataURL("image/png");
  imgConverted.src = dataURI;
  console.log(dataURI);
  });

btnDownload.addEventListener("click", function () {
  const a = document.createElement("a");
  
  document.body.appendChild(a);
  a.href = myCanvas.toDataURL();
  a.download = "camvas-image.png";
  a.click();
  document.body.removeChild(a);
  });