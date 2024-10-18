//title animation
const path = MorphSVGPlugin.pathDataToBezier("#motionPath");

TweenMax.to(".hex-container", 25, {
	bezier: { values: path, type: "cubic" },
	ease: Linear.easeNone,
	repeat: -1
});
///////////////-------////////
console.clear();

//animated hex example
const slideContainer = document.querySelector(".slide-down");
const slider = slideContainer;
const colorArray = ["#957575", "#9575A5", "#95752E", "#95755F"];
const anifn = () => {
	const first = slider.querySelector("li");
	document
		.querySelectorAll("[data-active]")
		.forEach(el => el.removeAttribute("data-active"));
	first.setAttribute("data-active", true);
};
const changeColor = () => {
	const hex = document.querySelectorAll();
};
let i = 0;

setInterval(() => {
	const oldChild = slider.querySelector("li");
	slider.removeChild(oldChild);
	slider.append(oldChild);
	anifn();
	const block = document.querySelector(".color-block");
	block.style.setProperty("--color-block-bg", `${colorArray[i]}`);

	i++;
	if (i > 3) {
		i = 0;
	}
}, 2000);

//////-----------//////////
//converter
const newError = msg => {
	const errorTag = document.querySelector(".error");
	errorTag.innerHTML = msg;
};
const removeError = () => {
	const errorTag = document.querySelector(".error");
	errorTag.innerHTML = "";
};
const base16 = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	a: 10,
	b: 11,
	c: 12,
	d: 13,
	e: 14,
	f: 15
};

const convertBtn = document.querySelector("#converter button");
convertBtn.addEventListener("click", function() {
	removeError();
	const input = document.querySelector("#converter input").value;
	if (input.length !== 6) return newError("must have exactly 6 values");
	const hex = input.split("");
	const r = hex
		.splice(0, 2)
		.map((n, index) => (index === 1 ? base16[n] : 16 * base16[n]))
		.reduce((total, n) => total + n, 0);
	const g = hex
		.splice(0, 2)
		.map((n, index) => (index === 1 ? base16[n] : 16 * base16[n]))
		.reduce((total, n) => total + n, 0);
	const b = hex
		.splice(0, 2)
		.map((n, index) => (index === 1 ? base16[n] : 16 * base16[n]))
		.reduce((total, n) => total + n, 0);

	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		return newError("not a valid Hexcode");
	}

	const block = document.querySelector("#converter .color-block");
	function ccRGB(rgb) {
    rgb = rgb.match(/\w+/g);
    let r = 0.2126 * rgb[1],
        g = 0.7152 * rgb[2],
        b = 0.0722 * rgb[3];
    return (r + g + b) >= 128 ? "black" : "white";
}

block.style.color = ccRGB(`rgb(${r}, ${g}, ${b})`);

	block.style.setProperty("--converter-color", `rgb(${r} , ${g} , ${b})`);
	block.innerHTML = window.getComputedStyle(block).backgroundColor;
});