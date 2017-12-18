window.onunload = function (){
	"use strict";
	makeEditabel();
	saveEdit();
	loadXMLStorageFile("myXML.xml");
};

var editing = false;
var editingObject;
var editingObjectBackgrond;

function makeEditabel(div){
	"use strict";
	
	console.log(div.tagName);
	
	editing = true;
	editingObject = div;
	editingObjectBackgrond = div.style.backgroundColor;
	
	div.style.padding = "0px";
	div.style.border = "3px solid black";
	div.contentEditable = "true";
	
	if (div.tagName === "IMG"){
		var imageSrc = prompt("Enter the path to the new image:", div.src);
		div.src = imageSrc;
		saveEdit(div);
	}
}

function saveEdit(div){
	"use strict";
	
	editing = false;
	editingObject = null;
	div.style.backgroundColor = editingObjectBackgrond;
	
	div.style.padding = "3px";
	div.style.border = "0px solid black";
	div.contentEditable = "false";
	
	if (div.innerHTML.length > div.dataset.characterlimit){
		div.innerHTML = div.innerHTML.substring(0, div.dataset.characterlimit);
	}
	
	if (div.innerHTML.length === 0){
		div.innerHTML = "-Default HTML content-";
	}
	
}

function limitLengthToCharacterlimit(){
	"use strict";
	if (editing === true){
		var HTMLstring = editingObject.innerHTML.replace(/&nbsp;/gi,'');
		if (HTMLstring.length > editingObject.dataset.characterlimit || HTMLstring.length <= 0){
			editingObject.style.backgroundColor = "#ff6060";
		} else {
			editingObject.style.backgroundColor = editingObjectBackgrond;
		}
	}
}

setInterval(limitLengthToCharacterlimit, 1);

/*
function checkLength(div){
	"use strict";
	
	var characterLimit = parseInt(div.dataset.characterlimit);
	characterLimit -= 1;
	
	var str = div.innerHTML.replace(/&nbsp;/gi,'');
	
	if ((str.length) >= characterLimit){
		console.log(str);
		div.style.backgroundColor = "#ff6060";
		return;
	} 
	
	div.style.backgroundColor = "white";
}
*/

window.onload = function(){
	"use strict";
	loadXMLStorageFile("https://opplandvgs-my.sharepoint.com/personal/kaho2708_opplandvgs_no/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fkaho2708_opplandvgs_no%2FDocuments%2Fstorage%2Exml&parent=%2Fpersonal%2Fkaho2708_opplandvgs_no%2FDocuments");
};

function loadXMLStorageFile(path){
	"use strict";
	
	var ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			loadXML(this);
		}
	};
	ajaxRequest.open("GET", path, true);
	ajaxRequest.send();
	
}

function loadXML(xml){
	"use strict";
	
	var xmlDocument = xml.responseXML;
	var paragraphs = xmlDocument.getElementsByTagName("paragraph");
	
	for (var i = 0; i < paragraphs.length; i++){
		console.log(paragraphs[i]);
	}
}

