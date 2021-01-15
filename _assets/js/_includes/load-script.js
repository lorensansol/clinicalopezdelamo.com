// SCRIPTS FILE LOAD FUNCTION
function loadScript(url, callback) {
	if (!document.getElementById(url)){
		var s = document.createElement('script');
		s.onload = callback;
		s.src = url;
		s.id = url;
		document.head.appendChild(s);
	}
}