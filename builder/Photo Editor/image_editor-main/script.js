const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-area img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");
let brightness = "100", saturation = "100", inversion = "0", grayscale = "0",sepia = "0", blur = "0", contrast = "100", opacity= "100" ;

let rotate = 0, flipHorizontal = 1, flipVertical = 1;
const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
        document.querySelector(".preview-area").classList.add("preview-hidden");
    });
}
const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) sepia(${sepia}%) opacity(${opacity}%) contrast(${contrast}%) blur(${blur}px)`;
}
filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;
        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else if(option.id === "grayscale") {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        } else if(option.id === "sepia") {
            filterSlider.max = "100";
            filterSlider.value = sepia;
            filterValue.innerText = `${sepia}%`;
        } else if(option.id === "contrast") {
            filterSlider.max = "200";
            filterSlider.value = contrast;
            filterValue.innerText = `${contrast}%`;
        } else if(option.id === "opacity") {
            filterSlider.max = "100";
            filterSlider.value = opacity;
            filterValue.innerText = `${opacity}%`;
        } else {
            filterSlider.max = "50";
            filterSlider.value = blur;
            filterValue.innerText = `${blur}px`;
        }
    });
});
const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");
    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else if(selectedFilter.id === "grayscale") {
        grayscale = filterSlider.value;
    } else if(selectedFilter.id === "sepia") {
        sepia = filterSlider.value;
    } else if(selectedFilter.id === "contrast") {
        contrast = filterSlider.value;
    } else if(selectedFilter.id === "opacity") {
        opacity = filterSlider.value;
    } else {
        blur = filterSlider.value;
        filterValue.innerText = `${filterSlider.value}px`;
    } 
    applyFilter();
}
rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});
const resetFilter = () => {
    brightness = "100", saturation = "100", inversion = "0", grayscale = "0",sepia = "0", blur = "0", contrast = "100", opacity= "100" ;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
}
const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) sepia(${sepia}%) opacity(${opacity}%) contrast(${contrast}%) blur(${blur}px)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());





const checkForImage = () => {
    if(newImage.src === ''){
        document.querySelectorAll('.control > input').forEach(item => { 
            item.setAttribute('disabled', 'true');
        })
    } else {
        document.querySelectorAll('.control > input').forEach(item => { 
            item.removeAttribute('disabled')
            document.querySelector('#btnDownload').style.display = 'flex';
        })
    }
}


function ascii(){
	RGBAtoGray();
	let data = c.getImageData(0,0,canvas.width,canvas.height);
	
	let chars = ["@","%","#","*","+","=","-",":","."," "];
	let chars2 = ["$","@","B","%","8","&","W","M","#","*","o","a","h","k","b","d","p","q","w","m","Z","O",
								"0","Q","L","C","J","U","Y","X","z","c","v","u","n","x","r","j","f","t","/","\\","|","(",
								")","1","{","}","[","]","?","-","_","+","~","\<","\>","i","!","l","I",";",":",",","\"","^",
								"`","'","."," "];
	let string = "";
	let grayStep = Math.ceil( 255 / chars.length );
	c.fillStyle = "white";
	c.fillRect(0,0,canvas.width,canvas.height);
	c.font = "5px Courier";
	c.fillStyle = "black";
	for(let i = 0; i < canvas.height*4; i+=4){
		for(let j = 0; j < canvas.width*4; j+=4){
			for(let x = 0; x < chars.length; x++){
				if( data.data[( i * canvas.width + j)*4] < (x*grayStep)+grayStep ){
					c.fillText( chars[x], j, i );
					break;
				}
			}
		}
	}
}