// TOGGLE BUTTON UP
function btnUp(option){
	 const btn = document.querySelector('.btn-up').classList
	 option == 'add' ? btn.add('btn-up-hide') : btn.remove('btn-up-hide')
}
scrollShot(
	'20%',
	'-120%',
	'body',
	() => { btnUp(); },
	() => { if(scrollY <= innerHeight * .2){ btnUp(); } },
	() => { btnUp('add'); }
);

// Remove hash when clic
document.querySelector('.btn-up').addEventListener('click', () => {
	setTimeout( () => {
		history.pushState('', document.title, window.location.pathname + window.location.search);
	}, 500)
})