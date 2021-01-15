// LAZY-LOAD CLOCK
function srcClock(nodo) {
	nodo.classList.add('lazyload');
	var width = nodo.getAttribute('width') || '100%';
	var height = nodo.getAttribute('height') || '100%';
	nodo.setAttribute('src', `data:image/svg+xml,%3Csvg%20width='${width}'%20height='${height}'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3Epath%7Btransform-origin:center%7Dpath:nth-child%282%29%7Banimation:spin%202s%20linear%20infinite%7Dpath:nth-child%283%29%7Banimation:spin%20calc%282s%20%2A%2012%29%20linear%20infinite%7D%40keyframes%20spin%7Bto%7Btransform:rotate%28360deg%29%7D%7D%3C/style%3E%3Cg%20fill='none'%20stroke='gray'%20stroke-width='1'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-miterlimit='10'%3E%3Ccircle%20cx='8'%20cy='8'%20r='7.5'/%3E%3Cpath%20d='M8%203%20V8'/%3E%3Cpath%20d='M8%208%20L10%2010'/%3E%3C/g%3E%3C/svg%3E`);
}

// LAZY-LOAD DATA-SRC IN POSTS CONTENT
scrollShot(
	'0px',
	'0px',
	'.article-post img[data-src]',
	nodo => {
		const imgBig = nodo.dataset.src;
		const imgSmall = 'https://images.weserv.nl/?url=' + ( imgBig.indexOf('://') == -1 ? location.origin : '' ) + imgBig + '&w=400&q=65';
		var width = nodo.getAttribute('width');
		width ? width += 'w' : width = '700w';
		nodo.src = nodo.dataset.src;
		nodo.srcset = nodo.dataset.srcset || imgSmall + ' 400w, ' + imgBig + ' ' + width;
		nodo.sizes = nodo.dataset.sizes || '(max-width: 480px) calc(90vw - 30px), (max-width: 600px) calc(90vw - 30px - 40px), (max-width: 927px) calc(90vw - 95px - 40px), 700px';
		nodo.classList.remove('lazyload');
	},
	srcClock
);

// LAZY-LOAD DATA-SRC
scrollShot(
	'0px',
	'0px',
	'[data-src]:not([src])',
	nodo => {
		nodo.src = nodo.dataset.src;
		if (nodo.dataset.srcset) nodo.srcset = nodo.dataset.srcset;
		if (nodo.dataset.sizes) nodo.sizes = nodo.dataset.sizes;
		nodo.classList.remove('lazyload');
	},
	srcClock
);

// LAZY-LOAD DATA-STYLE
scrollShot(
	'0px',
	'160px',
	'[data-style]',
	nodo => nodo.style = nodo.dataset.style,
	nodo => nodo.style = "background-image: url(data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3Epath%7Btransform-origin:center%7Dpath:nth-child%282%29%7Banimation:spin 2s linear infinite%7Dpath:nth-child%283%29%7Banimation:spin calc%282s %2A 12%29 linear infinite%7D%40keyframes spin%7Bto%7Btransform:rotate%28360deg%29%7D%7D%3C/style%3E%3Cg fill='none' stroke='gray' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'%3E%3Ccircle cx='8' cy='8' r='7.5'/%3E%3Cpath d='M8 3 V8'/%3E%3Cpath d='M8 8 L10 10'/%3E%3C/g%3E%3C/svg%3E); background-repeat: no-repeat; background-position: center;"
);