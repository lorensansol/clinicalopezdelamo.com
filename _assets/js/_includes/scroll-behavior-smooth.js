// SCROLL BEHAVIOR SMOOTH IN INCOMPATIBLE BROWSERS (SAFARI) IMPORTING smoothscroll.min.js
// Require load-script.js
if(!('scrollBehavior' in document.documentElement.style)){
	function smoothScroll(){
		// var anchorOffset = 48;
		// normal links
		var links = document.querySelectorAll('[href^="#"]');
		links.forEach(link => {
			link.addEventListener('click', click => {
				click.preventDefault();
				var targetID = link.getAttribute('href');
				var target = document.querySelector(targetID);
				target.scrollIntoView({behavior:'smooth'});
				setTimeout(() => {
					window.location.hash = targetID
				}, 1000);
				// target.setAttribute('tabindex', '-1');
				// target.focus();
			});
		});
		// ofuscate links
		// var onclicks = document.querySelectorAll('[onclick^="location.href=\'#"]');
		// onclicks.forEach(onclick => {
		// 	onclick.addEventListener('click', click => {
		// 		click.preventDefault();
		// 		var targetID = onclick.getAttribute('onclick').split('#')[1].replace("'", '');
		// 		var target = document.getElementById(targetID);
		// 		target.scrollIntoView({behavior:'smooth'});
		// 		setTimeout(() => {
		// 			window.location.hash = targetID
		// 		}, 1000);
		// 	});
		// });
		if (window.location.hash) {
			// go to top instantaneous
			document.body.scrollIntoView({behavior:'auto'});
			// go to has/id smooth
			document.querySelector(window.location.hash).scrollIntoView({behavior:'smooth'});
		}
	}
	loadScript('{{ site.baseurl }}/assets/js/smooth-scroll.js', smoothScroll);
}