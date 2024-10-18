$(document).ready(function() {
  // Initialize variables
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  var watermarkImg = new Image();
  var watermarkOpacity = 0.5;
  var watermarkSize = 0.5;
  var watermarkPadding = 5;
  var dragging = false;
  var watermarkDragging = false;
  var watermarkX = canvas.width - watermarkImg.width - watermarkPadding;
  var watermarkY = canvas.height - watermarkImg.height - watermarkPadding;
  var startX;
  var startY;

  // Set up file input to load image
  $('#file-input').on('change', function(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  });

  // Set up dropdown to load watermark image
  $('#watermark-select').on('change', function(e) {
    watermarkImg.onload = function() {
      //drawWatermark();
      handleWatermark();
    }
    watermarkImg.src = e.target.value;
  });

  // Set up canvas mouse events
  $('#canvas').on('mousedown', function(e) {
    startX = e.pageX - this.offsetLeft;
    startY = e.pageY - this.offsetTop;
    if (e.ctrlKey) {
      watermarkDragging = true;
    } else {
      dragging = true;
    }
  }).on('mouseup', function(e) {
    dragging = false;
    watermarkDragging = false;
  }).on('mousemove', function(e) {
    if (dragging) {
      var x = e.pageX - this.offsetLeft;
      var y = e.pageY - this.offsetTop;
      var dx = x - startX;
      var dy = y - startY;
      startX = x;
      startY = y;
      ctx.drawImage(img, dx, dy);
      drawWatermark();
    } else if (watermarkDragging) {
      watermarkX = e.pageX - this.offsetLeft - watermarkImg.width / 2;
      watermarkY = e.pageY - this.offsetTop - watermarkImg.height / 2;
      drawWatermark();
    }
  }).on('dblclick', function(e) {
    watermarkX = canvas.width - watermarkImg.width - watermarkPadding;
    watermarkY = canvas.height - watermarkImg.height - watermarkPadding;
    drawWatermark();
  });

  // Set up save button to post image to server
  $('#save-btn').on('click', function(e) {
    var dataURL = canvas.toDataURL('image/png');
    $.ajax({
      type: 'POST',
      url: 'https://photos.bobclark.com/watermark/output/save.php',
      data: {image: dataURL},
      success: function(response) {
        window.location.href = response;
      }
    });
  });

  // Function to draw watermark on canvas
  function drawWatermark() {
    ctx.globalAlpha = watermarkOpacity;
    ctx.drawImage(watermarkImg, watermarkX, watermarkY, watermarkImg.width * watermarkSize, watermarkImg.height * watermarkSize);
    ctx.globalAlpha = 1;
  }
  
  function handleWatermark() {
    watermarkImg.draggable({
      containment: "#canvas",
      drag: function(event, ui) {
        watermarkImg.x = ui.position.left;
        watermarkImg.y = ui.position.top;
        drawWatermark();
      }
    });

    watermarkImg.resizable({
      containment: "#canvas",
      handles: "n, e, s, w, ne, se, sw, nw",
      resize: function(event, ui) {
        watermarkImg.width = ui.size.width;
        watermarkImg.height = ui.size.height;
        drawWatermark();
      }
    });
  }  
});