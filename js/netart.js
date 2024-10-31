// Este es el net Art para que las imagenes de la sección para llevar cambien de manera aleatoria tras hacer clic
const imagePaths = [
    "./img/iconos/mirarcarta.png",
    "./img/iconos/llamada.png",
    "./img/iconos/recoger.png"
  ];
  
  function changeImage(imgElement) {
    let newIndex;
    let currentIndex = imagePaths.indexOf(imgElement.src.split('/').slice(-2).join('/'));
  
    // Genera un índice aleatorio diferente al índice actual
    do {
      newIndex = Math.floor(Math.random() * imagePaths.length);
    } while (newIndex === currentIndex);
  
    // Cambia la imagen a la nueva aleatoria
    imgElement.src = imagePaths[newIndex];
  }
  