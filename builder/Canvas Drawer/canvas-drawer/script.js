const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
const canvasArray = new Array(); //用來存放當前狀態的陣列
const cirs = document.querySelectorAll(".cl");
const extra = document.querySelector(".extra");
const paint = document.querySelector(".paint");
const brush = document.querySelector("#brush");
const eraser = document.querySelector("#eraser");
let colorNow = 1;
let color = "white";
let step = -1; //計算步數
let isDrawing = false;
let lastX = 0,
	lastY = 0;
let lineWidth = 10;
let topDirection = true,
	bottomDirection = true,
	extraShow = false;
let mouseX = 0,
	mouseY = 0;
let mode = "brush";

function draw(e) {
	//確認是否正在繪製 p.s滑鼠按住移動
	if (!isDrawing) return;
	ctx.beginPath();
	ctx.lineWidth = lineWidth;
	ctx.moveTo(lastX, lastY); //先將繪圖點移動到滑鼠當前位置
	ctx.lineTo(e.offsetX, e.offsetY); //連線到滑鼠目前位置
	ctx.strokeStyle = color;
	ctx.stroke(); //這個分號很重要，因為 ES6 神奇的特性 OTZ
	[lastX, lastY] = [e.offsetX, e.offsetY]; //更改滑鼠目前位置
}
function push() {
	step++;
	if (step < canvasArray.length) canvasArray.length = step;
	canvasArray.push(canvas.toDataURL()); //將當前影像存成 Base64 編碼的字串並放入陣列
	// console.log(canvasArray)
}
function undo() {
	if (step > 0) {
		step--;
		const pic = new Image(); //建立新的 Image
		pic.src = canvasArray[step]; //載入影像
		pic.onload = function () {
			ctx.drawImage(pic, 0, 0);
		}; //將影像繪出 0, 0 表示座標起始位置
		// console.log(step)
	}
}
function redo() {
	if (step < canvasArray.length - 1) {
		step++;
		const pic = new Image();
		pic.src = canvasArray[step];
		pic.onload = function () {
			ctx.drawImage(pic, 0, 0);
		};
		// console.log(step)
	}
}
function selectColor() {
	colorNow = parseInt(this.className.slice(5, 6)); //判斷當前選擇的顏色
	cirs.forEach((cir, index) => {
		cir.classList.remove("active");
		if (index + 1 === colorNow) {
			cir.classList.add("active");
			color = this.dataset.color;
		}
	});
}
function selectPen(e) {
	extraShow = !extraShow;
	if (extraShow) {
		extra.style.bottom = "132px";
		extra.style.left = `${e.clientX - 60}px`;
		extra.style["z-index"] = "0";
	} else {
		hideUnderTools();
	}
}
function changeIcon(e) {
	const pic = new Image(); //建立新的 Image
	if (isDrawing) return;
	// ctx.fillStyle = '#e8e8e8'
	// ctx.fillRect(0, 0, ww, wh)
	mouseX = e.clientX || mouseX;
	mouseY = e.clientY || mouseY;

	pic.src = canvasArray[step]; //載入影像
	pic.onload = function () {
		ctx.drawImage(pic, 0, 0);
	};

	ctx.beginPath();
	if (mode === "brush") {
		ctx.fillStyle = color;
		ctx.arc(mouseX, mouseY, lineWidth / 2, 0, Math.PI * 2);
	} else {
		ctx.fillStyle = "#e8e8e8";
		color = "#e8e8e8";
		ctx.arc(mouseX, mouseY, lineWidth / 2, 0, Math.PI * 2);
	}
	ctx.fill();

	requestAnimationFrame(changeIcon);
}
function hideUnderTools() {
	extraShow = false;
	extra.style.bottom = "92px";
	extra.style["z-index"] = "-1";
}
function download() {
	const dataURL = canvas.toDataURL("image/png"); //將影像轉成指定格式的 URL 字串
	this.href = dataURL;
}
function initCanvas() {
	ww = canvas.width = window.innerWidth;
	wh = canvas.height = window.innerHeight;
	canvasArray.splice(0);
	step = -1;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	ctx.fillStyle = "#e8e8e8";
	ctx.fillRect(0, 0, ww, wh);
	push();
	// console.log(canvasArray)
}
function loaded() {
	initCanvas();
}

canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousemove", changeIcon);
canvas.addEventListener("mouseup", () => {
	isDrawing = false;
	push();
});
canvas.addEventListener("mouseout", () => {
	isDrawing = false;
});
document.querySelector(".clear").addEventListener("click", initCanvas);
document.querySelector(".undo").addEventListener("click", undo);
document.querySelector(".redo").addEventListener("click", redo);
document
	.querySelector(".size")
	.children[0].addEventListener("change", function () {
		lineWidth = this.value;
	});
document.querySelector(".top-arrow").addEventListener("click", function () {
	topDirection = !topDirection;
	if (!topDirection) {
		document.querySelector(".topTools").style.transform = "translateY(-100%)";
		this.style.top = "-10px";
		this.innerHTML = '<i class="fas fa-angle-down">';
	} else {
		document.querySelector(".topTools").style.transform = "translateY(0%)";
		this.style.top = "50px";
		this.innerHTML = '<i class="fas fa-angle-up">';
	}
});
document.querySelector(".under-arrow").addEventListener("click", function () {
	bottomDirection = !bottomDirection;
	if (!bottomDirection) {
		document.querySelector(".underTools").style.transform = "translateY(150%)";
		this.style.bottom = "40px";
		this.style.width = "42px";
		this.style.height = "42px";
		this.style.alignItems = "center";
		this.innerHTML = '<i class="fas fa-paint-brush">';
	} else {
		document.querySelector(".underTools").style.transform = "translateY(0%)";
		this.style.bottom = "112px";
		this.style.width = "32px";
		this.style.height = "32px";
		this.style.alignItems = "flex-start";
		this.innerHTML = '<i class="fas fa-angle-down">';
	}
});
document.querySelector(".save").addEventListener("click", download);
cirs.forEach((cir) => cir.addEventListener("click", selectColor));
paint.addEventListener("click", selectPen);
eraser.addEventListener("click", () => {
	paint.innerHTML = '<i class="fas fa-eraser"></i>';
	mode = "eraser";
	hideUnderTools();
});
brush.addEventListener("click", () => {
	paint.innerHTML = '<i class="fas fa-paint-brush">';
	mode = "brush";
	cirs.forEach((cir, index) => {
		if (index + 1 === colorNow) color = cir.dataset.color;
	});
	hideUnderTools();
});
window.addEventListener("load", loaded);
window.addEventListener("resize", initCanvas);