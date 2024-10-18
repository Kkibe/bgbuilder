"use strict";

$(function() {
  // ******** Table of Contents ************
  // 0. Variables
  // 1. Functions
  // 2. Canvas operations & functionality
  // 3. Grid size/input settings functionality
  // 4. Grid size/input validations
  // 5. Recent color object functionality
  // 6. Canvas top row settings & functions
  // ***************************************

  // 0. ********* Variables ***********************************************************

  // Form inputs
  const $inputHeightField = $("#inputHeight");
  const $inputWidthField = $("#inputWidth");
  const $createGridButton = $("#createGridButton");
  const $canvasTopRow = $('.canvas-top-row');

  // Main grid/canvas area
  const $canvas = $("#pixelCanvas");
  const $innerCircleButton = $('#innerCircleButton');
  const $eraserButton = $('#eraserButton');

  // Color controls
  const $colorInput = $("#colorPicker");
  let $colorValue = $colorInput.val();
  let $lastRecentColor;
  let $recentColorLength;
  let $colorBeforeErasing;

  let $currentHeight;
  let $currentWidth;
  let mousedown = false;
  let eraserOn = false;


  // 1. ********* Functions ***********************************************************

  // Create a string from the grid values and display it next to canvas header
  function placeGridNumbers(height, width) {
    let gridSizeString = height + " x " + width;

    $('#canvasArea h2').children().remove();

    $('#canvasArea h2').append('<span class="gridSizeString">' + gridSizeString + '</span>');
  }

  // Sets the current height/width values on data-currentheight/width and adds those values to input fields
  function setCurrentHeightAndWidth(newGridHeight, newGridWidth) {
    $inputHeightField.data('currentheight', newGridHeight);
    $inputWidthField.data('currentwidth', newGridWidth);

    $inputHeightField.val(newGridHeight);
    $inputWidthField.val(newGridWidth);

    $currentHeight = $inputHeightField.data('currentheight');
    $currentWidth = $inputWidthField.data('currentwidth');
  }

  // makeGrid() creates a grid/table/canvas based on user values
  function makeGrid(height, width) {
    setCurrentHeightAndWidth(height, width);

    // Don't allow 0 height; this means no rows!
    if (height < 1 || width < 1) {
      alert('Please select a value greater than 0!');
      return;
    }

    // If either width or height size is higher than 100, alert user and end program
    if ((Number(height)) > 100 || (Number(width)) > 100) {
      alert('100 is the max size!');
      return;
    }

    // Display selected grid values beside canvas heading
    placeGridNumbers(height, width);

    // Clear any grids from the page
    $canvas.html('');

    // Initiate variable for creating a 'row', create amount of rows requested via 'height' variable
    let $row;

    // forLoop to put columns into row
    for (let i = 0; i < height; i++) {

      // 1. Create a row element (<tr>) until 'height' is met
      $row = $('<tr></tr>');

      // 2. make the necessary amount of columns (<tds>) & append them to each row      
      for (let j = 0; j < width; j++) {
        $row.append('<td></td>');
      }

      // 3. Append those rows (including <td>s) to the canvas
      $canvas.append($row);
    }

    // Reveal the bottom of the canvas that was hidden on window load
    $canvasTopRow.removeClass('away').addClass('fadeIn');

    $canvas.addClass('fadeIn');
  } // end of makeGrid()

  // Place currently selected color in a 'Recent Colors" div
  function addRecentColor(recentColor) {
    // Create a recent color object and color it with the currently selected AND used color

    let $recentColorObject = $('<div class="recent-color-object animated"></div>').css('background', recentColor);

    $('#recentColors').prepend($recentColorObject);
    $recentColorObject.addClass('fadeIn');

    // monitor recent colors length
    $recentColorLength = $('#recentColors').children().length;

    // If the recent color count is betwen 0 and 19, display the number next to 'Recent Colors' heading
    if ($recentColorLength > 0 && $recentColorLength <= 18) {
      if ($recentColorLength == 1) {
        $('#recentColorArea h2').html('<span class="recent-colors-length">' + $recentColorLength + '</span> Recent Color');

      } else {
        $('#recentColorArea h2').html('<span class="recent-colors-length">' + $recentColorLength + '</span> Recent Colors');
      }

    } else {
      // If count attempts to go past 18, start cutting off the last child
      $('#recentColors .recent-color-object:last-child').remove();
    }
  }

  // Color the selected tile with the current color
  function colorElement(element) {
    $(element.target).css("background", $colorValue);
  }

  // Refresh canvas, stick to the grid sizes
  function resetCanvas(e) {
    e.preventDefault();
    makeGrid($currentHeight, $currentWidth);
  }

  // convert rgb color code to hex code
  function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }

  function turnEraserOn() {
    eraserOn = true;

    // Grab the last color selected before using the eraser  tool
    $colorBeforeErasing = $colorValue;

    // Change erase button content to paintbrush content
    $eraserButton.removeClass('pink lighten-2').addClass('purple darken-2');
    $eraserButton.html(' <i class="material-icons">brush</i> Brush');
  }

  function turnEraserOff() {
    eraserOn = false;

    // If there was a color selected before using eraser tool, enable that color again for the paint brush tool
    if ($colorBeforeErasing) {
      $colorValue = $colorBeforeErasing;
    }
    // Change paintbrush button content to eraser content
    $eraserButton.removeClass('purple darken-2').addClass('pink lighten-2');
    $eraserButton.html('  <span class="eraser"></span> Eraser');
  }

  // #### Initialize a grid on start up based on default grid size values
  makeGrid($inputHeightField.val(), $inputWidthField.val());

  // Add class to animate hex color code
  $('.color-code').text($colorValue).addClass('bounceInLeft').css('color', $colorValue);
  $('#canvasArea h2').css('color', $colorValue);
  $canvas.css('border-color', $colorValue);

  // #### Change current color to new, selected color
  $colorInput.on('input', function() {
    $colorValue = $colorInput.val();

    // Change color code text to current color code
    $('.color-code').text($colorValue);

    // Change the current color of some elements to currently selected paint brush color
    $('#colorPickArea .show-at-min, #colorPickArea .hide-at-min i, .color-code, #canvasArea h2').css('color', $colorValue);

    // Change table border color to current paint brush color
    $canvas.css('border', '2px solid ' + $colorValue);
  });

  // 2. ********* Canvas operations & functionality ***********************************************************

  // When you mouse down on a tile, apply chosen color
  $canvas.on('mousedown', 'td', function(e) {
    mousedown = true;

    // If the mouse is down when the eraser is 'ON', color tiles #fffff (white)
    if (mousedown && eraserOn) {
      $colorValue = '#ffffff';
      colorElement(e);
    } else {
      // The most recent color is the first color in the #recentColors section
      $lastRecentColor = $('#recentColors').children().first().css('backgroundColor');

      // If there are no recent colors...
      if (!$lastRecentColor) {

        // The most recent color will be the value of the color input field
        $lastRecentColor = $colorValue;

        // ...draw the color on the canvas and add it to the #recentColors div
        colorElement(e);
        addRecentColor($colorValue);

      } else {
        // If there is a recent color, convert that rgb code to a hex value
        $lastRecentColor = rgb2hex($lastRecentColor);

        // If the color selected matches the most recent color, still color tile, no need to add to #recentColors area
        if ($colorValue === $lastRecentColor) {
          colorElement(e);
        } else {
          colorElement(e);
          addRecentColor($colorValue);
        }
      }
    }
  });

  // If you mouse over a tile when the mouse is still down, continue coloring
  $canvas.on('mouseover', 'td', function(e) {
    if (mousedown) {
      colorElement(e);
    }
  });

  $canvas.on('mouseup', function() {
    mousedown = false;
  });

  // when the mouse leaves the canvas, pick the mouse up
  $canvas.mouseleave(function() {
    mousedown = false;
  });

  // 3. ********* Grid size/input settings functionality ****************************************************

  // #### 'Enter key' functionality on number input fields
  $('#inputHeight, #inputWidth').keypress(function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();

      makeGrid($inputHeightField.val(), $inputWidthField.val());
      turnEraserOff();
    }
  });

  // #### 'Create grid' button functionality
  $createGridButton.click(function(e) {
    e.preventDefault()

    makeGrid($inputHeightField.val(), $inputWidthField.val());
    turnEraserOff();
  });

  // #### 'Prebuilt grid size' button functionality
  $('[data-gridscale]').click(function(e) {
    e.preventDefault();

    turnEraserOff();

    // scaleByNumber is the scale depicted on the button
    let $scaleByNumber = $(this).data('gridscale');

    // Set both width and height input field values to scaleBynumber...
    $inputHeightField.val($scaleByNumber);
    $inputWidthField.val($scaleByNumber);

    // Set current width and height of data-currentheight/currentwidth
    setCurrentHeightAndWidth($scaleByNumber);

    makeGrid($scaleByNumber, $scaleByNumber);
  });

  $('#resetButton').click(resetCanvas);

  // 4. ********* Grid size/input validations ***************************************************************

  // #### If 0 is the first key pressed, alert user about selecting a higher number
  $('input[type=number]').keydown(function(e) {
    if (e.keyCode === 48) {

      if (this.value < 1) {

        alert('Select a higher number!');

        $(this).val('1');
      }
    }
  });

  // #### Error if the value is less than 1, when losing number input focus
  $('input[type=number]').change(function() {
    if ($(this).val() < 1) {
      alert('You must enter a number greater than zero!');
    }
  });

  // 5. ********* Recent color object functionality *********************************************************

  $('#recentColors').on('click', '.recent-color-object', function() {
    // make current color the color of selected recent color object
    $colorValue = rgb2hex($(this).css('backgroundColor'));

    // make color value same as selected recent color
    $colorInput.val($colorValue);

    // make paint icon same color as current color
    $('#colorPickArea .show-at-min, #colorPickArea .hide-at-min i').css('color', $colorValue);
  });

  // 6. ********* Canvas top row settings & functions *******************************************************

  // "Inner circle" buttons adds border-radius to table, making a circle of its box-shadow in the background
  $('#innerCircleButton').click(function() {
    let $originalHtml = $('#innerCircleButton').html();

    $('table').toggleClass('inner-circle');

    if ($('table').hasClass('inner-circle')) {
      $innerCircleButton.html('<i class="material-icons">close</i> No Circle');
    } else {
      $innerCircleButton.html('<i class="material-icons">center_focus_strong</i> Inner Circle');
    }
  });

  // swap "paint brush" for "eraser" using jQuery Awesome Cursor plugin when "eraser tool" is clicked
  $eraserButton.click(function() {
    eraserOn == false ? turnEraserOn() : turnEraserOff();
  });
}); //end of $ (jQuery)