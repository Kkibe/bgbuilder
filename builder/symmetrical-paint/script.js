//ninivert, September 2016

/**/
/*VARIABLES*/
/**/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var mouse = {
    down: false,
    drag: false,
    posX: canvas.width/2,
    posY: canvas.height/2,
    oldX: canvas.width/2,
    oldY: canvas.height/2
};
var options = {
    color: '#000000',
    bg: '#ffffff',
    crosshair: false,
    eraser: false,
    lineWidth: 15,
    lineMode: false
};
var symCoord = {
    new: {
        x: [0, 0, 0, 0],
        y: [0, 0, 0, 0]
    },
    old: {
        x: [0, 0, 0, 0],
        y: [0, 0, 0, 0]
    }
};

/**/
/*IMAGE*/
/**/

/**/
/*Update whether the mouse is down or not*/
/**/

canvas.onmousedown = function(ev) {
    mouse.down = true;
    update(ev);
};
canvas.ontouchstart = function(ev) {
    mouse.down = true;
    update(ev);
}
canvas.onmouseup = function(ev) {
    mouse.down = false;
    update(ev);
};
canvas.ontouchend = function(ev) {
    mouse.down = false;
    update(ev);
};

canvas.onmousemove = function(ev) {
    mouse.drag = (mouse.down) ? true : false;
    update(ev);
};
canvas.ontouchmove = function(ev) {
    update(ev);
};

/**/
/*Drawing*/
/**/

function update(ev) {
    if (mouse.down) {

        mouse.posX = ev.pageX - canvas.offsetLeft;
        mouse.posY = ev.pageY - canvas.offsetTop;

        if (window.requestAnimationFrame) {
            requestAnimationFrame(render);
        } else {
            render();
        }
    }
}

function render() {
    //upper left quarter
    symCoord.old.x[0] = symCoord.new.x[0];
    symCoord.old.y[0] = symCoord.new.y[0];
    symCoord.new.x[0] = canvas.width - mouse.posX;
    symCoord.new.y[0] = canvas.height - mouse.posY;
    draw(0);
    
    //upper right quarter
    symCoord.old.x[1] = symCoord.new.x[1];
    symCoord.old.y[1] = symCoord.new.y[1];
    symCoord.new.x[1] = mouse.posX;
    symCoord.new.y[1] = canvas.height - mouse.posY;
    draw(1);
    
    //bottom left quarter
    symCoord.old.x[2] = symCoord.new.x[2];
    symCoord.old.y[2] = symCoord.new.y[2];
    symCoord.new.x[2] = mouse.posX;
    symCoord.new.y[2] = mouse.posY;
    draw(2);
    
    //bottom right quarter
    symCoord.old.x[3] = symCoord.new.x[3];
    symCoord.old.y[3] = symCoord.new.y[3];
    symCoord.new.x[3] = canvas.width - mouse.posX;
    symCoord.new.y[3] = mouse.posY;
    draw(3);
}

function draw(i) {
    
    //mouse.drag so it can't create unwanted lines between old position and new (moved) position
    if (options.lineMode && mouse.drag) {
        ctx.beginPath();
        ctx.moveTo(symCoord.old.x[i], symCoord.old.y[i]);
        ctx.lineTo(symCoord.new.x[i], symCoord.new.y[i]);
    
        ctx.lineWidth = options.lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = (options.eraser === true) ? options.bg : options.color;
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.arc(symCoord.new.x[i], symCoord.new.y[i], options.lineWidth/2, 0, 2*Math.PI);
    
        ctx.fillStyle = (options.eraser === true) ? options.bg : options.color;
        ctx.fill();
    }
}

/**/
/*SETTINGS*/
/**/

/*Line color*/

document.getElementById('drawColor').onclick = function() {
    hideModals();
    document.getElementById('drawColorModal').classList.remove('hiddenModal');
};

document.getElementById('drawColorPicker').oninput = function() {
    options.color = this.value;
    document.getElementById('drawColorDisplay').style.background = this.value;
};
document.getElementById('drawColorInput').oninput = function() {
    options.color = this.value;
    document.getElementById('drawColorDisplay').style.background = this.value;
};

/*Background color*/

document.getElementById('bgColor').onclick = function() {
    hideModals();
    document.getElementById('bgColorModal').classList.remove('hiddenModal');
};

document.getElementById('bgColorPicker').oninput = function() {
    options.bg = this.value;
    document.getElementById('bgColorDisplay').style.background = this.value;
    ctx.fillStyle = options.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
document.getElementById('bgColorInput').oninput = function() {
    options.bg = this.value;
    document.getElementById('bgColorDisplay').style.background = this.value;
    ctx.fillStyle = options.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/*Line width*/

document.getElementById('lineWidth').onclick = function() {
    hideModals();
    document.getElementById('lineWidthModal').classList.remove('hiddenModal');
};

document.getElementById('lineWidthInput').oninput = function() {
    options.lineWidth = this.value;
    
    //preview
    var clw = document.getElementById('lineWidthDisplay');
    var ctxlw = clw.getContext('2d');
    ctxlw.clearRect(0, 0, clw.width, clw.height);
    ctxlw.fillStyle = options.bg;
    ctxlw.fillRect(0, 0, clw.width, clw.height);
    ctxlw.fill();
    ctxlw.beginPath();
    ctxlw.arc(clw.width/2, clw.height/2, options.lineWidth/2, 0, 2*Math.PI);
    ctxlw.fillStyle = options.color;
    ctxlw.fill();
};

/*Line mode*/

document.getElementById('lineMode').onclick = function() {
    options.lineMode = !options.lineMode;
    
    if (options.lineMode) {
        this.classList.remove('fa-minus');
        this.classList.add('fa-ellipsis-h');
        this.firstChild.innerHTML = 'Dot Mode';
    } else {
        this.classList.remove('fa-ellipsis-h');
        this.classList.add('fa-minus');
        this.firstChild.innerHTML = 'Smooth Mode';
    }
};

/*Eraser*/

document.getElementById('eraser').onclick = function() {
    options.eraser = !options.eraser;
    
    if (options.eraser) {
        this.classList.remove('fa-eraser');
        this.classList.add('fa-pencil');
        this.firstChild.innerHTML = 'Drawing Mode';
    } else {
        this.classList.remove('fa-pencil');
        this.classList.add('fa-eraser');
        this.firstChild.innerHTML = 'Eraser Mode';
    }
};

/*Crosshair*/

document.getElementById('crosshair').onclick = function() {
    options.crosshair = !options.crosshair;
    
    if (document.getElementById('crosshairElement').style.display === 'block') {
        document.getElementById('crosshairElement').style.display = 'none';
    } else {
        document.getElementById('crosshairElement').style.display = 'block';
    }
};

/*Canvas reset*/

document.getElementById('delete').onclick = function() {
    var c = confirm('DELETE DRAWING\nAre you sure?\nOK to confirm, CANCEL to go back to drawing');
    
    if (c) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
};

/*Saving*/

document.getElementById('save').onclick = function() {
    var img = canvas.toDataURL('image/png');
    var w = window.open('', '_blank');
    w.document.write('<img style="box-shadow: 0 0 1em 0 dimgrey; width: 100%;" src="' + img + '"/>');
    w.document.write('<h1 style="font-family: Helvetica; font-weight: 300">Right Click > Save As<h1>');
};

/*Toolbar control*/

document.getElementById('toolbarClose').onclick = function() {
    if (this.classList.contains('fa-chevron-down')) {
        this.parentElement.style.bottom = '-60px';
        this.style.position = 'fixed';
        this.style.right = '0';
        this.style.bottom = '0';
        this.classList.remove('fa-chevron-down');
        this.classList.add('fa-chevron-up');
        this.firstChild.innerHTML = 'Open Toolbar';
    } else {
        this.parentElement.style.bottom = '0';
        this.style.position = 'relative';
        this.style.right = '';
        this.style.bottom = '';
        this.classList.remove('fa-chevron-up');
        this.classList.add('fa-chevron-down');
        this.firstChild.innerHTML = 'Close Toolbar';
    }
};

/**/
/*DETECT MODALS AND ADD CLOSE BUTTON*/
/**/

for (var i = 0; i < document.querySelectorAll('.modal').length; i++) {
    var fragment = document.createDocumentFragment();
    var span = document.createElement('span');
    span.setAttribute('onclick', 'this.parentElement.classList.toggle("hiddenModal")');
    span.innerHTML = 'X';
    fragment.appendChild(span);
    document.querySelectorAll('.modal')[i].appendChild(fragment);
}

function hideModals() {
    for (var i = 0; i < document.querySelectorAll('.modal').length; i++) {
        document.querySelectorAll('.modal')[i].classList.add('hiddenModal');
    }
}

/**/
/*REAJUST CANVAS AFTER RESIZE*/
/**/

window.onresize = function() {
    //location.reload();
};