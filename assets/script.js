var fileUpload = document.getElementById("file_upload");
fileUpload.addEventListener("change", function(){
	var fileSvg = fileUpload.files[0];
	var reader = new FileReader();
	reader.readAsText(fileSvg);	
	reader.onload = function(){
		document.getElementById("svg_preview").innerHTML = reader.result;
		document.getElementById("svg_form").style.display = "block";
	}
});

var playGround = function(){
	var resizeWidthValue = document.getElementById("resize_width_value").value;
	var resizeHeightValue = document.getElementById("resize_height_value").value;
	document.getElementsByTagName("svg")[0].setAttribute("id","svg_resize");
	document.getElementsByTagName("svg")[0].setAttribute("width", resizeWidthValue);
	document.getElementsByTagName("svg")[0].setAttribute("height", resizeHeightValue);
	document.getElementById("download_wrapper").style.display = "block";
	var fileRename = "icon-" + resizeWidthValue + "x" + resizeHeightValue + "px.png";
	document.getElementById("data").setAttribute("download", fileRename);
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
