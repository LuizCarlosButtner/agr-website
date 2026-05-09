$(document).ready(function ($) {

  "use strict";

  // loader
  var loader = function () {
    setTimeout(function () {
      if ($('#ftco-loader').length > 0) {
        $('#ftco-loader').removeClass('show');
      }
    }, 1);
  };
  loader();
  var carousel = function () {
    $('.carousel-testimony').owlCarousel({
      center: true,
      loop: true,
      items: 1,
      margin: 30,
      stagePadding: 0,
      nav: false,
      navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 3
        }
      }
    });
  };
  carousel();

  var fullHeight = function () {

    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function () {
      $('.js-fullheight').css('height', $(window).height());
    });

  };
  fullHeight();

  var counter = function () {

    $('#section-counter, .ftco-about').waypoint(function (direction) {

      if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

        var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
        $('.number').each(function () {
          var $this = $(this),
            num = $this.data('number');
          $this.animateNumber(
            {
              number: num,
              numberStep: comma_separator_number_step
            }, 7000
          );
        });
        $(this.element).addClass('ftco-animated');

      }

    }, { offset: '95%' });

  }
  counter();

  var contentWayPoint = function () {
    var i = 0;
    $('.ftco-animate').waypoint(function (direction) {

      if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

        i++;

        $(this.element).addClass('item-animate');
        setTimeout(function () {

          $('body .ftco-animate.item-animate').each(function (k) {
            var el = $(this);
            setTimeout(function () {
              var effect = el.data('animate-effect');
              if (effect === 'fadeIn') {
                el.addClass('fadeIn ftco-animated');
              } else if (effect === 'fadeInLeft') {
                el.addClass('fadeInLeft ftco-animated');
              } else if (effect === 'fadeInRight') {
                el.addClass('fadeInRight ftco-animated');
              } else {
                el.addClass('fadeInUp ftco-animated');
              }
              el.removeClass('item-animate');
            }, k * 50, 'easeInOutExpo');
          });

        }, 100);

      }

    }, { offset: '95%' });
  };
  contentWayPoint();



  // magnific popup
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: false
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

  // Navigation
  var link = $('#navbar a.dot');

  // Move to specific section when click on menu link
  link.on('click', function (e) {
    var target = $($(this).attr('href'));
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 600);
    $(this).addClass('active');
    e.preventDefault();
  });

  // Run the scrNav when scroll
  $(window).on('scroll', function () {
    scrNav();
  });

  // scrNav function 
  // Change active dot according to the active section in the window
  function scrNav() {
    var sTop = $(window).scrollTop();
    $('section').each(function () {
      var id = $(this).attr('id'),
        offset = $(this).offset().top - 1,
        height = $(this).height();
      if (sTop >= offset && sTop < offset + height) {
        link.removeClass('active');
        $('#navbar').find('[data-scroll="' + id + '"]').addClass('active');
      }
    });
  }
  scrNav();

  // Progress Bar animacao de rotacao 100% - 360 graus
  var progressAnimation = function () {
    var $progressCircle = $('.progress-circle');
    if ($progressCircle.length > 0) {
      $progressCircle.waypoint(function (direction) {

        if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

          $(".progress").each(function () {
            var $this = $(this);
            var value = $this.attr('data-value');
            var left = $this.find('.progress-left .progress-bar');
            var right = $this.find('.progress-right .progress-bar');

            if (value > 0) {
              $({ count: 0 }).animate({ count: value }, {
                duration: 3000,
                step: function () {
                  var degree = this.count / 100 * 360;
                  if (this.count <= 50) {
                    right.css('transform', 'rotate(' + degree + 'deg)');
                    left.css('transform', 'rotate(0deg)');
                  } else {
                    right.css('transform', 'rotate(180deg)');
                    left.css('transform', 'rotate(' + (degree - 180) + 'deg)');
                  }
                },
                complete: function () {
                  // Força o estado final para garantir que o círculo se feche perfeitamente
                  var final_degree = parseFloat(value) / 100 * 360;
                  if (value > 50) {
                    right.css('transform', 'rotate(180deg)');
                    left.css('transform', 'rotate(' + (final_degree - 180) + 'deg)');
                  } else {
                    right.css('transform', 'rotate(' + final_degree + 'deg)');
                  }
                }
              });
            }
          });
          $(this.element).addClass('ftco-animated');
        }
      }, { offset: '95%' });
    }
  };
  progressAnimation();

  // Hero Slider
  var heroBgSlider = function () {
    var $hero = $('#home');
    if (!$hero.length) {
      return;
    }

    var images = [
      'img/loop/img_01.jpg',
      'img/loop/img_02.jpg',
      'img/loop/img_03.jpg',
      'img/loop/img_04.jpg',
      'img/loop/img_05.jpg',
      'img/loop/img_06.jpg',
      'img/loop/img_07.jpg',
      'img/loop/img_08.jpg',
      // Adicione mais imagens da pasta img/loop aqui
    ];
    var currentIndex = 0;

    $.each(images, function () {
      $('<img/>')[0].src = this;
    });

    var $bg1 = $('<div class="hero-bg-slider" data-stellar-background-ratio="0.5"></div>').prependTo($hero);
    var $bg2 = $('<div class="hero-bg-slider" data-stellar-background-ratio="0.5"></div>').prependTo($hero);

    $bg1.css('background-image', 'url(' + images[currentIndex] + ')').addClass('active-bg');

    // Recarrega o stellar para reconhecer os novos elementos com parallax
    setTimeout(function () {
      $(window).stellar('refresh');
    }, 100);

    setInterval(function () {
      currentIndex = (currentIndex + 1) % images.length;
      var $currentBg = $hero.find('.active-bg');
      var $nextBg = ($currentBg.is($bg1)) ? $bg2 : $bg1;
      $nextBg.css('background-image', 'url(' + images[currentIndex] + ')');
      $currentBg.removeClass('active-bg');
      $nextBg.addClass('active-bg');
    }, 10000); // 10 seconds
  };
  heroBgSlider();

  // Garante que o parallax funcione mesmo se as imagens demorarem a carregar
  $(window).on('load', function () {
    $(window).stellar('refresh');
    $(window).stellar({
      responsive: true,
      parallaxBackgrounds: true,
      parallaxElements: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      scrollProperty: 'scroll'
    });
  });

});

// =====================================================================
// SCRIPT DA SECÇÃO PODCAST
// =====================================================================
const videoData = [
  {
    id: 1,
    title: "Bebeto 07 e Zico",
    category: "Videocast",
    description: "Bebeto 07 e Zico. Um bate-papo histórico gravado com a máxima qualidade nos nossos estúdios na Barra da Tijuca.",
    thumbnail: "https://i.ytimg.com/vi/MXZyq5eeeGA/hq720.jpg",
    youtubeId: "MXZyq5eeeGA",
    startTime: 5563
  },
  {
    id: 2,
    title: "Papagaio Falante com Sérgio Mallandro",
    category: "Videocast",
    description: "Sérgio Mallandro e Renato Rabelo recebem convidados icónicos num ambiente perfeito para a resenha e o humor.",
    thumbnail: "https://i.ytimg.com/vi/curzpCATAuw/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCdzC1b5HvhVEKCgvgNFCnOr8pISg",
    youtubeId: "curzpCATAuw",
    startTime: 9158
  },
  {
    id: 3,
    title: "Cheguei Podcast - Entrevista Inédita",
    category: "Gravação de Podcast",
    description: "Histórias incríveis e convidados de peso no Cheguei Podcast, captados com a máxima qualidade e conforto do nosso estúdio.",
    thumbnail: "https://i.ytimg.com/vi/HAW6_OGNmSc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBFQrTKj5xLqqb9hVi01onnflXXag",
    youtubeId: "FHqFbr1g0qs",
    startTime: 5725
  },
  {
    id: 4,
    title: "Aloha Podcast",
    category: "Videocast",
    description: "Episódio do Aloha Podcast captado com a máxima qualidade e conforto dos nossos estúdios.",
    thumbnail: "https://i.ytimg.com/vi/QexZDxIEVnQ/hqdefault.jpg",
    youtubeId: "QexZDxIEVnQ",
    startTime: 5191
  },
  {
    id: 5,
    title: "Tom Cavalcante",
    category: "Videocast",
    description: "Gravação com Tom Cavalcante, mostrando a excelência e versatilidade dos estúdios AGR.",
    thumbnail: "https://i.ytimg.com/vi/3ElSzCMySrE/hqdefault.jpg",
    youtubeId: "3ElSzCMySrE",
    startTime: 2765
  },
  {
    id: 6,
    title: "Docshow e Jojo Todynho",
    category: "Videocast",
    description: "Mais um super bate-papo no Docshow com Jojo Todynho no nosso espaço na Barra da Tijuca.",
    thumbnail: "https://i.ytimg.com/vi/9CiwZIyk4bY/hqdefault.jpg",
    youtubeId: "9CiwZIyk4bY",
    startTime: 2013
  }
];

let currentSelectedVideo = null;
let isSummarizing = false;

const callGeminiAPI = async (prompt) => {
  const apiKey = ""; // A chave API do Gemini vai aqui
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const maxRetries = 5;
  const delays = [1000, 2000, 4000, 8000, 16000];

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delays[i]));
    }
  }
};

function renderVideoGrid() {
  const gridContainer = document.getElementById('video-grid');
  if (!gridContainer) return;

  videoData.forEach(video => {
    const videoEl = document.createElement('div');
    videoEl.className = "group relative w-full aspect-video overflow-hidden cursor-pointer bg-[#1f1f1f]";
    videoEl.onclick = () => openModal(video.id);

    videoEl.innerHTML = `
            <img 
                src="${video.thumbnail}" 
                alt="${video.title}" 
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                    <i class="ph-fill ph-play text-gray-800 text-2xl ml-1"></i>
                </div>
                <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span class="text-[11px] font-bold tracking-widest text-[#00c3e3] uppercase block mb-2">
                        ${video.category}
                    </span>
                    <h4 class="text-white text-xl md:text-2xl font-medium leading-tight">
                        ${video.title}
                    </h4>
                </div>
            </div>
        `;
    gridContainer.appendChild(videoEl);
  });
}

function openModal(videoId) {
  currentSelectedVideo = videoData.find(v => v.id === videoId);
  if (!currentSelectedVideo) return;

  // Montagem dinâmica da URL do YouTube
  const baseUrl = "https://www.youtube.com/embed/";
  let finalUrl = `${baseUrl}${currentSelectedVideo.youtubeId}?autoplay=1`;

  if (currentSelectedVideo.sourceId) {
    finalUrl += `&si=${currentSelectedVideo.sourceId}`;
  }

  if (currentSelectedVideo.startTime && currentSelectedVideo.startTime > 0) {
    finalUrl += `&start=${currentSelectedVideo.startTime}`;
  }

  console.log("URL DO IFRAME GERADA:", finalUrl);

  const iframe = document.getElementById('modal-iframe');
  const loader = document.getElementById('video-loader');

  // Mostra o spinner antes de carregar o vídeo
  if (loader) loader.style.display = 'flex';

  // Esconde o spinner quando o iframe terminar de carregar
  iframe.onload = function () {
    if (loader) loader.style.display = 'none';
  };

  iframe.src = finalUrl;
  document.getElementById('modal-category').innerText = currentSelectedVideo.category;
  document.getElementById('modal-title').innerText = currentSelectedVideo.title;
  document.getElementById('modal-description').innerText = currentSelectedVideo.description;

  resetSummaryState();

  const modal = document.getElementById('video-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  // Oculta o menu de navegação lateral (bolinhas) enquanto o modal está aberto
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.style.display = 'none';
}

function closeModal() {
  const modal = document.getElementById('video-modal');
  if (!modal) return;

  modal.classList.add('hidden');
  modal.classList.remove('flex');

  const iframe = document.getElementById('modal-iframe');
  if (iframe) {
    iframe.onload = null;
    iframe.src = "";
  }

  // Garante que o spinner volta a aparecer na próxima abertura
  const loader = document.getElementById('video-loader');
  if (loader) loader.style.display = 'flex';

  currentSelectedVideo = null;
  document.body.style.overflow = 'unset';

  // Restaura o menu de navegação lateral (bolinhas) ao fechar o modal
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.style.display = '';
}

function resetSummaryState() {
  isSummarizing = false;
  document.getElementById('btn-generate-summary').classList.remove('hidden');
  document.getElementById('summary-container').classList.add('hidden');
  document.getElementById('btn-icon-sparkle').classList.remove('hidden');
  document.getElementById('btn-icon-spinner').classList.add('hidden');
  document.getElementById('btn-text').innerText = "Destaques da Produção (IA)";
  document.getElementById('btn-generate-summary').disabled = false;
  document.getElementById('summary-content').innerHTML = "";
}

async function handleGenerateSummary() {
  if (!currentSelectedVideo || isSummarizing) return;
  isSummarizing = true;

  document.getElementById('btn-generate-summary').disabled = true;
  document.getElementById('btn-icon-sparkle').classList.add('hidden');
  document.getElementById('btn-icon-spinner').classList.remove('hidden');
  document.getElementById('btn-text').innerText = "A analisar gravação...";

  const prompt = `
        És um especialista em audiovisual da 'AGR Podcast Estúdios'.
        Escreve um pequeno parágrafo apelativo e 3 pontos-chave (bullet points) sobre o vídeo "${currentSelectedVideo.title}" (Categoria: ${currentSelectedVideo.category}). 
        Descrição: "${currentSelectedVideo.description}".
        Destaca a excelência da gravação, som cristalino e estrutura de ponta da AGR.
        Responde em Português de Portugal (pt-PT), usa formatação markdown (negritos, listas) sem títulos grandes (h1/h2).
    `;

  try {
    const result = await callGeminiAPI(prompt);
    displaySummary(result);
  } catch (error) {
    console.error("Erro ao gerar resumo:", error);
    displaySummary("Não foi possível gerar os destaques neste momento. Tente novamente mais tarde.");
  } finally {
    isSummarizing = false;
  }
}

function displaySummary(markdownText) {
  const htmlContent = markdownText
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-gray-400">$1</em>')
    .replace(/- (.*)/g, '<li>$1</li>');

  document.getElementById('btn-generate-summary').classList.add('hidden');
  document.getElementById('summary-container').classList.remove('hidden');
  document.getElementById('summary-content').innerHTML = htmlContent;
}

// ==========================================
// Lógica de Inicialização e Eventos Globais
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar a grelha assim que o DOM carregar
  renderVideoGrid();

  const modal = document.getElementById('video-modal');

  // 1. Fechar ao clicar fora (no background escuro)
  if (modal) {
    modal.addEventListener('click', function (event) {
      // Verifica se o clique foi diretamente no fundo e não no conteúdo interno
      if (event.target === this) {
        closeModal();
      }
    });
  }

  // 2. Fechar ao pressionar a tecla ESC
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      // Verifica se o modal existe e se está visível
      if (modal && !modal.classList.contains('hidden')) {
        closeModal();
      }
    }
  });
});