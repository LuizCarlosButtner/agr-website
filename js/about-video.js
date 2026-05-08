let isAboutVideoModalOpen = false;

function openAboutVideo() {
	const modal = document.getElementById('about-video-modal');
	const video = document.getElementById('about-video-player');
	if (modal && video) {
		modal.classList.remove('hidden');
		modal.classList.add('flex');
		video.play();
		isAboutVideoModalOpen = true;
		
		// Adiciona um estado no histórico para o botão voltar do celular
		history.pushState({ aboutVideoModalOpen: true }, '');
	}
}

function closeAboutVideo(fromPopState = false) {
	const modal = document.getElementById('about-video-modal');
	const video = document.getElementById('about-video-player');
	if (modal && video && isAboutVideoModalOpen) {
		modal.classList.add('hidden');
		modal.classList.remove('flex');
		video.pause();
		video.currentTime = 0;
		isAboutVideoModalOpen = false;
		
		// Se fechado manualmente (não pelo botão voltar), removemos o estado do histórico
		if (!fromPopState) {
			history.back();
		}
	}
}

// Fechar ao clicar fora do vídeo (no fundo do modal)
document.addEventListener('click', function(event) {
	const modal = document.getElementById('about-video-modal');
	if (isAboutVideoModalOpen && modal) {
		if (event.target === modal) {
			closeAboutVideo();
		}
	}
});

// Fechar ao apertar a tecla ESC
document.addEventListener('keydown', function(event) {
	if (isAboutVideoModalOpen && event.key === 'Escape') {
		closeAboutVideo();
	}
});

// Fechar ao usar o movimento de "voltar" no celular
window.addEventListener('popstate', function(event) {
	if (isAboutVideoModalOpen) {
		// Passamos true para não chamar history.back() novamente
		closeAboutVideo(true);
	}
});
