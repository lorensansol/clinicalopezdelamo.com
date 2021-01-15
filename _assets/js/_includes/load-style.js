// SCRIPTS FILE LOAD FUNCTION
function loadStyle(url, callback) {
	if (!document.getElementById(url)){
		var s = document.createElement('link');
		s.onload = callback;
		s.rel = 'stylesheet';
		s.href = url;
		s.id = url;
		document.head.appendChild(s);
	}
}