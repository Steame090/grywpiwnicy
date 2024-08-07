var $dir = $(".dir").clone();
var curSelection = $(".dir").eq(0).addClass("selected");
var cols = 2;

for (i=0;i<40;i++) {
	$dir.clone().appendTo("#list-dir")
}

$(".dir").on("click", function(e) {
	if(e.ctrlKey) {
		if($(this).is(".selected")) {
			$(this).removeClass("selected");
		} else {
			$(this).addClass("selected");
		}
	} else {
		$(".dir.selected").removeClass("selected");
		$(this).addClass("selected");
	}
	curSelection = this;
})
document.addEventListener("keydown",function(e) {
	//console.log(e);
	e.preventDefault();
	if(e.ctrlKey) {
		return false;
	}
	
	var pos = $(curSelection).index();
	var col = pos % cols;
	var row = Math.floor(pos/cols);
	
	if(e.key == "ArrowDown") {
		if (pos + cols <= 40) {
			row+=1;
			var pos = (row * cols) + col;
		}
	} else if(e.key == "ArrowUp") {
		if(pos - cols >= 0) {
			row-=1;
			var pos = (row * cols) + col;
		}
	} else if(e.key == "ArrowRight") {
		if(pos < 40) {
			pos+=1;
		}
	} else if(e.key == "ArrowLeft") {
		if(pos > 0) {
			pos-=1;
		}
	}
	$(".dir.selected").removeClass("selected");
	curSelection = $('.dir').eq(pos).addClass("selected");
})