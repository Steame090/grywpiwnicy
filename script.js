$('#view i').on('click', function(){
	var classe = $(this).attr('id');
	$('#content').attr('class', '').addClass(classe);
});

var clipboard = ['',''];

var dir = '/directory/';

function updateContent(directory) {
	var content = [
		['css', 'js'],
		['favicon.ico', 'photo.jpg', 'access.php', 'index.php', 'save.php', 'file.txt']
	];
	
	var destination = $('#content').html('');
	var folders = content[0];
	var files = content[1];
	
	//update path
	var path = $('#directory').html('');
	var paths = directory.replace(/^\/+|\/+$/g, '').split('/');
	for(var i = 0; i < paths.length; i++) {
		if(paths[i] !== '') {
			var thispath = paths.slice(0,i+1).join('/');
			path.append('<span>/</span><a href="/' + thispath + '/">' + paths[i] + '</a>');
		}
	}
	
	// update content
	if(folders.length > 0) {
		for(var i = 0; i < folders.length; i++) {
			destination.append('<a href="' + directory + folders[i] + '/"><div class="folder"><span>' + folders[i] + '</span></div></a>');
		}
	}
	if(files.length > 0) {
		for(var i = 0; i < files.length; i++) {
			destination.append('<a href="' + directory + files[i] + '"><div class="file ' + files[i].split('.').pop() + '"><span>' + files[i] + '</span></div></a>');
		}
	}
}

updateContent(dir)

// http://i1-news.softpedia-static.com/images/news2/what-a-modern-version-of-windows-10-s-file-explorer-could-look-like-500353-3.jpg

$(document).on('contextmenu', '*', function(e){
	openctxmenu($(this), e);
});
$(document).on('click', '.custom-menu li', function(){
	ctxfunction($(this));
});
$(window).on('click resize', function(e){
	closectxmenu();
});
$(document).on('click', '#content > *', function(e){
	e.preventDefault();
	e.stopPropagation();
	$(this).parent().find(' > *').removeClass('hover');
	$(this).addClass('hover');
	closectxmenu();
});
$(document).on('click', '#content', function(e){
	$(this).find(' > *').removeClass('hover');
});

var filectxmenu = ['file', ['Open', 'Download', 'Copy', 'Cut', 'Delete', 'Rename']];

var folderctxmenu = ['folder', ['Open', 'Copy', 'Cut',  'Delete', 'Rename']];

var contentctxmenu = ['content', ['Refresh', 'Paste', 'Upload file', 'New file', 'New folder']];

function addCtxMenu(array) {
	var menu = $('<ul class="custom-menu" alt="' + array[0] + '"></ul>').appendTo('body');
	for(var i =0; i < array[1].length; i++) {
		menu.append('<li data-action="' + array[1][i].toLowerCase().replace(/\s/g, '') + array[0] + '">' + array[1][i] + '</li>');
	}
}
addCtxMenu(filectxmenu);
addCtxMenu(folderctxmenu);
addCtxMenu(contentctxmenu);

function openctxmenu(element, e) {
	e.stopPropagation();
	var type = element.closest("[class!=''][class]").attr('class').split(' ')[0];
	var id = element.attr('id');
	if(type == 'folder' || type == 'file' || id == 'content') {
		var object = element.closest('a').attr('href');
		if(id) { type = id; object = $('#directory .current').attr('href'); }
		e.preventDefault();
		var ctxmenu = $('.custom-menu[alt=' + type + ']');
		ctxmenu.show().css({
					top: e.pageY + "px",
					left: e.pageX + "px"
			}).attr('href', object);
		if($(window).innerHeight() - e.pageY < ctxmenu.innerHeight()) {
			ctxmenu.css('top', e.pageY-ctxmenu.innerHeight());
		}
	}
}

function closectxmenu() {
	$('.custom-menu').hide();
}

function ctxfunction(element) {
	var object = element.closest('.custom-menu').attr('href');
	var functionname = element.attr('data-action');
	switch(functionname) {
		case 'renamefile':
		case 'renamefolder':
			var span = $('a[href="' + object + '"] span');
			var name = prompt('Choose new name', span.text());
			if(name !== '') {
				span.text(name);
			}
			break;
		case 'deletefile':
		case 'deletefolder':
			if(confirm("Delete ?")) {
				$('a[href="' + object + '"]').remove();
			}
			break;
		case 'copyfile':
		case 'copyfolder':
			clipboard = ['copy', object];
			break;
		case 'cutfile':
		case 'cutfolder':
			clipboard = ['cut', object];
			break;
		case 'refreshcontent':
			updateContent(dir);
			break;
		default:
			alert('no function for : ' + functionname);
	}
}

$('#save #input input').focus();