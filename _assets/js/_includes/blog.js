// Navigation
//// Navigation Selector
const navSelector = '.nav-icon, #menu, #blackover-nav, body';
//// Toggle navigation function
function toggleNav(){
	document.querySelectorAll(navSelector).forEach( e => e.classList.toggle('active') );
	document.body.classList.toggle('overflow-hidden');
}
//// Close navigation function
function closeNav(){
	document.querySelectorAll(navSelector).forEach( e => e.classList.remove('active') );
	document.body.classList.remove('overflow-hidden');
}
//// Toggle navigation when clicked .nav-icon
const navIcon = document.querySelector('.nav-icon')
navIcon && navIcon.addEventListener('click', toggleNav);
//// Close navigation when clicked .blackover (Black background)
const blackoverNav = document.getElementById('blackover-nav')
blackoverNav && blackoverNav.addEventListener('click', closeNav);
//// Close navigation when keyup escape
document.addEventListener("keyup", e => e.keyCode == 27 && closeNav() );

// Search
{% if site.search == true %}
	// Active search.js wen clic in input
	const lunrsearch = document.getElementById('lunrsearch')
	lunrsearch && lunrsearch.addEventListener('click', function(){
		loadScript('{{ site.baseurl }}/assets/js/lunr.js', function(){
			loadScript('{{ site.baseurl }}/assets/js/lunrsearchengine.js');
		});
	});
{% endif %}

// Comments
const btnShowComments = document.querySelector('.show-comments');
function loadComments(){
	// Waiting load icon
	var clock = document.getElementById('disqus_thread').insertAdjacentHTML('beforeend', `<img style='height:20em;width:100%' src="data:image/svg+xml,%3Csvg%20width='100%'%20height='100%'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3Epath%7Btransform-origin:center%7Dpath:nth-child%282%29%7Banimation:spin%202s%20linear%20infinite%7Dpath:nth-child%283%29%7Banimation:spin%20calc%282s%20%2A%2012%29%20linear%20infinite%7D%40keyframes%20spin%7Bto%7Btransform:rotate%28360deg%29%7D%7D%3C/style%3E%3Cg%20fill='none'%20stroke='gray'%20stroke-width='1'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-miterlimit='10'%3E%3Ccircle%20cx='8'%20cy='8'%20r='7.5'/%3E%3Cpath%20d='M8%203%20V8'/%3E%3Cpath%20d='M8%208%20L10%2010'/%3E%3C/g%3E%3C/svg%3E">`);
	var d = document, s1 = d.createElement('script'), s2 = d.createElement('script');
	// Load disqus script 1
	s1.src = 'https://{{site.disqus}}.disqus.com/count.js';
	s1.id = 'dsq-count-scr';
	d.head.appendChild(s1);
	// Load disqus script 2
	/* var disqus_config = function () { */
			/* this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable */
			/* this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable */
	/* }; */
	s2.src = 'https://{{site.disqus}}.disqus.com/embed.js';
	s2.setAttribute('data-timestamp', +new Date());
	(d.head || d.body).appendChild(s2);
}
function toggleComments(){
	document.getElementById('comments').classList.toggle('comments--show');
}

{% if site.lazyload_comments %}
	// Lazy-Load show comments
	scrollShot(
		'0px',
		'0px',
		'.comments',
		() => {
			loadComments();
			toggleComments();
		},
		() => {
			btnShowComments.remove();
		}
	);
{% else %}
	// Clic toggle comments
	btnShowComments && btnShowComments.addEventListener('click', () => {
		if (!document.getElementById('dsq-count-scr')){
			loadComments();
		}
		toggleComments();
	});
{% endif %}

// Load prism scripts and styles if exist div code and don't have location.port (development)
const codePre = document.querySelectorAll('pre code[class*="language-"]');
if (codePre && !location.port){
	loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/components/prism-core.min.js');
	codePre.forEach( c => {
		let codeLanguage = c.getAttribute('class').split('-')[1]
		switch (codeLanguage) {
			case 'html':
			case 'xml':
			case 'svg':
			case 'mathml':
			case 'ssml':
			case 'atom':
			case 'rss':
				codeLanguage = 'markup'
				break;
			case 'javascript':
			case 'js':
				codeLanguage = 'javascript'
				loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/components/prism-clike.min.js');
				break;
		}
		loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/components/prism-' + codeLanguage + '.min.js');
	});
	loadStyle('https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism-tomorrow.min.css');
	loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/plugins/toolbar/prism-toolbar.min.js');
	loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/plugins/show-language/prism-show-language.min.js');
	loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js');
	loadStyle('https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/plugins/toolbar/prism-toolbar.min.css');
}