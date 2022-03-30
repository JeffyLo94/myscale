var fileUpload = document.getElementById("file_upload");
fileUpload.addEventListener("change", function() {
  var fileSvg = fileUpload.files[0];
  var reader = new FileReader();
  reader.readAsText(fileSvg);
  reader.onload = function() {
    document.getElementById("svg_preview").innerHTML = reader.result;
    var doc = new DOMParser().parseFromString(reader.result, 'application/xml');
    var viewBox = doc.documentElement.viewBox.baseVal;
    document.getElementById("detail_width").innerHTML = viewBox.width;
    document.getElementById("detail_height").innerHTML = viewBox.height;
    document.getElementById("svg_details").style.display = "flex";
    document.getElementById("svg_sizing_options").style.display = "flex";
  }
});

var showCustomResizeForm = function() {
  document.getElementById("svg_form").style.display = "flex";
}

var hideCustomResizeForm = function() {
  document.getElementById("svg_form").style.display = "none";
}

var showDownloadContainer = function () {
  document.getElementById("download_wrapper").style.display = "block";
}

var hideDownloadContainer = function () {
  document.getElementById("download_wrapper").style.display = "none";
}

var playGround = function(filename='', multiplier = 1, hasCustomResize=false) {
  var resizeWidthValue = 0;
  var resizeHeightValue = 0;
  var svgWidth = document.getElementsByTagName("svg")[0].getAttribute("width");
  var svgHeight = document.getElementsByTagName("svg")[0].getAttribute("height");
  console.log(`orig: ${svgWidth} X ${svgHeight} ${typeof(svgWidth)}`);

  var w = parseInt(svgWidth)
  var h = parseInt(svgHeight)
  if( !hasCustomResize ){
    

    resizeWidthValue = parseInt(svgWidth) * multiplier;
    resizeHeightValue = parseInt(svgHeight) * multiplier;
    console.log(`multiplier:\nw: ${resizeWidthValue}\nh: ${resizeHeightValue}`);
  } else {
    resizeWidthValue = document.getElementById("resize_width_value").value;
    resizeHeightValue = document.getElementById("resize_height_value").value;
    console.log(`resizeWidth: ${resizeWidthValue}\nresizeHeight: ${resizeHeightValue}`);
  }
  setPreview( resizeWidthValue, resizeHeightValue, filename );
}

var setPreview = function( newWidth, newHeight, fileName='' ) {
  console.log(`setting w${newWidth} h${newHeight}`);
  document.getElementsByTagName("svg")[0].setAttribute("id", "svg_resize");
  document.getElementsByTagName("svg")[0].setAttribute("width", newWidth);
  document.getElementsByTagName("svg")[0].setAttribute("height", newHeight);
  document.getElementById("detail_width").innerHTML = newWidth;
  document.getElementById("detail_height").innerHTML = newHeight;
  if (fileName === '') {
    var fileRename = "icon-" + newWidth + "x" + newHeight + ".png";
    document.getElementById("data").setAttribute("download", fileRename);
  } else {
    var fileRename = fileName + ".png";
    document.getElementById("data").setAttribute("download", fileRename);
  }
}

// SVG to DATA URL Library

function exportResizedSvg() {
  var svg = document.getElementById("svg_resize");
  var img = document.getElementById("fromcanvas");
  svg.toDataURL("image/png", {
    callback: function(data) {
      img.setAttribute("src", data)
      var a = document.querySelector("#data")
      a.href = data
    }
  })
}
