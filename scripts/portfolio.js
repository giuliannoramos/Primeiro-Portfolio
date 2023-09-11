document.addEventListener("DOMContentLoaded", function () {
  const carousels = {
    frontend: document.getElementById("frontend-carousel"),
    backend: document.getElementById("backend-carousel"),
    database: document.getElementById("database-carousel"),
  };

  let currentCarousel = "frontend"; // Inicialmente, mostra o carrossel de Frontend  

  // Eventos de clique aos botões para alternar os carousels
  document.querySelectorAll(".portfolio__botao").forEach((botao) => {
    botao.addEventListener("click", function (event) {
      event.preventDefault();
      const carouselId = this.getAttribute("data-carousel");

      // Remove a classe "active" de todos os carousels
      Object.keys(carousels).forEach((key) => {
        carousels[key].classList.remove("active");
      });

      // Adiciona a classe "active" ao carousel selecionado
      carousels[carouselId].classList.add("active");

      // Atualiza o valor de currentCarousel
      currentCarousel = carouselId;      

      // Oculta todos os carousels
      Object.keys(carousels).forEach((key) => {
        carousels[key].style.display = "none";
      });

      // Mostra o carousel correspondente
      carousels[carouselId].style.display = "block";

      // Seleciona os slides individuais para o carrossel atual
      slide = carousels[currentCarousel].querySelectorAll(".slider-single"); // Atualize os slides para o carrossel atual
      slideTotal = slide.length -1; // Atualize o índice do último slide para o carrossel atual
      slideCurrent = -1; // Reinicialize o índice do slide atual para o carrossel atual      
    });
  });

  // Define as opções de configuração
  const repeat = false; // Define se o slider deve repetir
  const noArrows = false; // Define se as setas de navegação devem ser desabilitadas
  const noBullets = false; // Define se os marcadores (bullets) de navegação devem ser desabilitados

  // Seleciona os elementos do DOM
  const container = document.querySelector(".slider-container"); // Seleciona o container do slider
  var slide = carousels[currentCarousel].querySelectorAll(".slider-single"); // Seleciona os slides individuais
  var slideTotal = slide.length - 1; // Calcula o índice do último slide
  var slideCurrent = -1; // Inicializa o índice do slide atual como -1

  // Função para inicializar os marcadores (bullets)
  function initBullets() {
    if (noBullets) {
      return; // Retorna se os marcadores estão desabilitados
    }
    const bulletContainer = document.createElement("div"); // Cria um container para os bullets
    bulletContainer.classList.add("bullet-container"); // Adiciona uma classe ao container
    slide.forEach((elem, i) => {
      const bullet = document.createElement("div"); // Cria um bullet
      bullet.classList.add("bullet"); // Adiciona uma classe ao bullet
      bullet.id = `bullet-index-${i}`; // Define um ID único para o bullet
      bullet.addEventListener("click", () => {
        goToIndexSlide(i); // Adiciona um evento de clique para navegar para o slide correspondente
      });
      bulletContainer.appendChild(bullet); // Adiciona o bullet ao container
      elem.classList.add("proactivede"); // Adiciona uma classe ao slide
    });
    container.appendChild(bulletContainer); // Adiciona o container de bullets ao slider
  }

  // Função para inicializar as setas de navegação
  function initArrows() {
    if (noArrows) {
      return; // Retorna se as setas de navegação estão desabilitadas
    }
    // Cria a seta esquerda
    const leftArrow = document.createElement("a");
    const iLeft = document.createElement("i");
    iLeft.classList.add("fa", "fa-arrow-left"); // Adiciona classes de ícone à seta esquerda
    leftArrow.classList.add("slider-left"); // Adiciona uma classe à seta esquerda
    leftArrow.appendChild(iLeft);
    leftArrow.addEventListener("click", () => {
      slideLeft(); // Adiciona um evento de clique para deslocar para o slide anterior
    });

    // Cria a seta direita
    const rightArrow = document.createElement("a");
    const iRight = document.createElement("i");
    iRight.classList.add("fa", "fa-arrow-right"); // Adiciona classes de ícone à seta direita
    rightArrow.classList.add("slider-right"); // Adiciona uma classe à seta direita
    rightArrow.appendChild(iRight);
    rightArrow.addEventListener("click", () => {
      slideRight(); // Adiciona um evento de clique para deslocar para o próximo slide
    });

    // Adiciona as setas ao container do slider
    container.appendChild(leftArrow);
    container.appendChild(rightArrow);
  }

  // Função para configurar o slider inicialmente
  function slideInitial() {
    initBullets(); // Inicializa os marcadores (bullets)
    initArrows(); // Inicializa as setas de navegação
    setTimeout(function () {
      slideRight(); // Inicia o slider, deslocando para o próximo slide após 500ms
    }, 500);
  }

  // Função para atualizar os marcadores (bullets)
  function updateBullet() {
    if (!noBullets) {
      // Remove a classe 'active' de todos os bullets e adiciona a classe 'active' ao bullet correspondente ao slide atual
      document
        .querySelector(".bullet-container")
        .querySelectorAll(".bullet")
        .forEach((elem, i) => {
          elem.classList.remove("active");
          if (i === slideCurrent) {
            elem.classList.add("active");
          }
        });
    }
    checkRepeat(); // Verifica se o slide deve repetir
  }

  // Função para verificar se o slide deve repetir
  function checkRepeat() {
    if (!repeat) {
      if (slideCurrent === slide.length - 1) {
        // Se estiver no último slide, oculta a seta direita e mostra a seta esquerda
        slide[0].classList.add("not-visible");
        slide[slide.length - 1].classList.remove("not-visible");
        if (!noArrows) {
          document.querySelector(".slider-right").classList.add("not-visible");
          document
            .querySelector(".slider-left")
            .classList.remove("not-visible");
        }
      } else if (slideCurrent === 0) {
        // Se estiver no primeiro slide, oculta a seta esquerda e mostra a seta direita
        slide[slide.length - 1].classList.add("not-visible");
        slide[0].classList.remove("not-visible");
        if (!noArrows) {
          document.querySelector(".slider-left").classList.add("not-visible");
          document
            .querySelector(".slider-right")
            .classList.remove("not-visible");
        }
      } else {
        // Se estiver em qualquer outro slide, mostra ambas as setas de navegação
        slide[slide.length - 1].classList.remove("not-visible");
        slide[0].classList.remove("not-visible");
        if (!noArrows) {
          document
            .querySelector(".slider-left")
            .classList.remove("not-visible");
          document
            .querySelector(".slider-right")
            .classList.remove("not-visible");
        }
      }
    }
  }

  // Função para deslocar para o próximo slide
  function slideRight() {
    if (slideCurrent < slideTotal) {
      slideCurrent++;
    } else {
      slideCurrent = 0;
    }

    // Determina os slides ativos e próximos
    if (slideCurrent > 0) {
      var preactiveSlide = slide[slideCurrent - 1];
    } else {
      var preactiveSlide = slide[slideTotal];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent < slideTotal) {
      var proactiveSlide = slide[slideCurrent + 1];
    } else {
      var proactiveSlide = slide[0];
    }

    // Atualiza as classes dos slides para controlar a animação
    slide.forEach((elem) => {
      var thisSlide = elem;
      if (thisSlide.classList.contains("preactivede")) {
        thisSlide.classList.remove("preactivede");
        thisSlide.classList.remove("preactive");
        thisSlide.classList.remove("active");
        thisSlide.classList.remove("proactive");
        thisSlide.classList.add("proactivede");
      }
      if (thisSlide.classList.contains("preactive")) {
        thisSlide.classList.remove("preactive");
        thisSlide.classList.remove("active");
        thisSlide.classList.remove("proactive");
        thisSlide.classList.remove("proactivede");
        thisSlide.classList.add("preactivede");
      }
    });

    // Atualiza as classes dos slides ativos, pré-ativos e próximos
    preactiveSlide.classList.remove("preactivede");
    preactiveSlide.classList.remove("active");
    preactiveSlide.classList.remove("proactive");
    preactiveSlide.classList.remove("proactivede");
    preactiveSlide.classList.add("preactive");

    activeSlide.classList.remove("preactivede");
    activeSlide.classList.remove("preactive");
    activeSlide.classList.remove("proactive");
    activeSlide.classList.remove("proactivede");
    activeSlide.classList.add("active");

    proactiveSlide.classList.remove("preactivede");
    proactiveSlide.classList.remove("preactive");
    proactiveSlide.classList.remove("active");
    proactiveSlide.classList.remove("proactivede");
    proactiveSlide.classList.add("proactive");

    updateBullet(); // Atualiza os marcadores (bullets)
  }

  // Função para deslocar para o slide anterior
  function slideLeft() {
    if (slideCurrent > 0) {
      slideCurrent--;
    } else {
      slideCurrent = slideTotal;
    }

    // Determina os slides ativos, pré-ativos e próximos
    if (slideCurrent < slideTotal) {
      var proactiveSlide = slide[slideCurrent + 1];
    } else {
      var proactiveSlide = slide[0];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent > 0) {
      var preactiveSlide = slide[slideCurrent - 1];
    } else {
      var preactiveSlide = slide[slideTotal];
    }

    // Atualiza as classes dos slides para controlar a animação
    slide.forEach((elem) => {
      var thisSlide = elem;
      if (thisSlide.classList.contains("proactive")) {
        thisSlide.classList.remove("preactivede");
        thisSlide.classList.remove("preactive");
        thisSlide.classList.remove("active");
        thisSlide.classList.remove("proactive");
        thisSlide.classList.add("proactivede");
      }
      if (thisSlide.classList.contains("proactivede")) {
        thisSlide.classList.remove("preactive");
        thisSlide.classList.remove("active");
        thisSlide.classList.remove("proactive");
        thisSlide.classList.remove("proactivede");
        thisSlide.classList.add("preactivede");
      }
    });

    // Atualiza as classes dos slides ativos, pré-ativos e próximos
    preactiveSlide.classList.remove("preactivede");
    preactiveSlide.classList.remove("active");
    preactiveSlide.classList.remove("proactive");
    preactiveSlide.classList.remove("proactivede");
    preactiveSlide.classList.add("preactive");

    activeSlide.classList.remove("preactivede");
    activeSlide.classList.remove("preactive");
    activeSlide.classList.remove("proactive");
    activeSlide.classList.remove("proactivede");
    activeSlide.classList.add("active");

    proactiveSlide.classList.remove("preactivede");
    proactiveSlide.classList.remove("preactive");
    proactiveSlide.classList.remove("active");
    proactiveSlide.classList.remove("proactivede");
    proactiveSlide.classList.add("proactive");

    updateBullet(); // Atualiza os marcadores (bullets)
  }

  // Função para navegar para um slide específico com base em seu índice
  function goToIndexSlide(index) {
    const sliding =
      slideCurrent > index ? () => slideRight() : () => slideLeft();
    while (slideCurrent !== index) {
      sliding();
    }
  }

  // Função para avançar automaticamente para o próximo slide
  function autoSlide() {
    slideRight(); // Chama a função para ir para o próximo slide
  }

  // Inicializa o slider e o início automático
  slideInitial();
  
  // Configura o início automático a cada 5000 milissegundos (5 segundos)
  const autoSlideInterval = setInterval(autoSlide, 5000);

  // Pausa o início automático quando o mouse entra na imagem
  carousels[".slider-single"].addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  // Retoma o início automático quando o mouse sai da imagem
  carousels[".slider-single"].addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(autoSlide, 5000);
  });
});