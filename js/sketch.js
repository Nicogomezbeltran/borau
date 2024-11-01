//PR_REC_Gómez_Beltrán_Nico
//Cuadro de Rogelio Polesello, 1959

//Declaración de las 3 listas: 
//Estas almacenan las coordenadas X e Y de las posiciones donde se dibujarán los círculos
let posX = [];
let posY = [];
//Esta esta inicialemente vacía y se utiliza para almacenar las poisiciones de X e Y de los círculos de manera conjunta como objetos. Esta lista se llena dentro de la funcion (dibujarCuadro). 
let posicionesCirculos = [];

//Declaración de las variables que posteriormente serán utilizadas como los colores, las imágenes, tipografías etc.
let color1, color2, color3, color4, color5;
let colorPunto;

let habitacion;
let interruptor;
let fuente1;
let fuente2;

let luzEncendida = true;
let rotacionTriangulo = false;
let contadorMosquitos;
let colorSeleccionado = 1;

function setup() {
//Aquí en el setup pongo los colores con sus valores respectivos y angleMode (DEGREES) para establecer el ángulo en grados.
  let c=createCanvas(windowWidth, windowHeight);
  c.parent("micapa");
  angleMode (DEGREES);
  color1 = color(0);
  color2 = color(31, 97, 96, 255);
  color3 = color(33, 40, 110, 255);
  color4 = color(238, 218, 61, 255);
  color5 = color(214, 77, 23, 255);
  colorPunto = color2
}

function draw() {
//En el draw dibuja la imágen de la habitación y llama a las funciones para dibujar los elementos
  background(220);
  image(habitacion, 0, 0, 1400, 720);
  //Llamada a las acciones de dibujar del canvas
  dibujarCuadro();
  dibujarTexto();
  encenderLuz();
  dibujarMosquitos();
  posicionRaton ();
}

function preload() {
//El preload carga las imágenes y las fuentes de texto que se van a ser usadas
  habitacion = loadImage("img/imagenes/fondo.jpeg");
  interruptor = loadImage("img/imagenes/interruptor.png");
  fuente1 = loadFont("tipografia/fuentes/Vogue.ttf");
  fuente2 = loadFont("tipografia/fuentes/Hello Valentina.ttf");
}

function dibujarCuadro() {
//Este bucle for dibuja las esferas en posiciones específicas basadas en la lista posX y posY. Dependiendo del valor de colorSeleccionado, elige un color específico y dibuja un círculo en la posición que le toca con un diámetro de 90 
  noStroke();
  let posX = [410, 500, 590, 680, 770, 860];
  let posY = [135, 225, 315, 405];
  posicionesCirculos = [];

  for (let y = 0; y < posY.length; y++) {
    for (let x = 0; x < posX.length; x++) {
      let pos = {x: posX[x], y: posY[y]};
      posicionesCirculos.push(pos);
      switch (colorSeleccionado) {
        case 1:
          fill(color1);
          break;
        case 2:
          fill(color2);
          break;
        case 3:
          fill(color3);
          break;
        case 4:
          fill(color4);
          break;
        case 5:
          fill(color5);
          break;
        default:
          fill(color1);
      }
      circle(posX[x], posY[y], 90);
    }
  }
  
//Aquí dibujo los cuadrados junto a su color ya establecido
  fill(color2);
  rect(410, 135, 90);
  fill(color3);
  rect(410, 315, 90);
  fill(color4);
  rect(590, 315, 90);
  fill(color5);
  rect(500, 225, 90);

//Aquí se dibuja un triángulo que puede rotar alrededor de su centro si (rotacionTriangulo) es verdadero.
  push ()
  if (rotacionTriangulo) {
  //Primero calculo el centro del triangulo para despues trasladar el sistema de coordenadas
  let centroX = (770 + 680 + 725) / 3;
  let centroY =  (315 + 315 + 225) / 3;
  translate (centroX,centroY);
  //Con este rotate se rota el sistema de coordenadas alrededor del centro 
  rotate(frameCount % 360);
  // Con esto se traslada el sistema de coordenadas a su posición original 
  translate(-centroX, -centroY);
  }
  fill(255);
  triangle(770, 315, 680, 315, 725, 225);
  pop ()
  
//Finalmente dibujo un punto en el centro del cuadro con un color que puede cambiar según la posicion del ratón
  push ()
  fill(colorPunto);
  ellipse(635, 270, 20);
  pop ()
}

function dibujarTexto() {
//Esta función se encarga de colocar el texto con las fuentes personalizadas en el canvas.
  fill (color1);
  textFont(fuente1);
  textSize(40);
  text("NICO Y JAUME", 520, 500);
  stroke(0);
  strokeWeight(3);
  line(350, 480, 480, 480);
  line(930, 480, 800, 480);

  textFont(fuente2);
  noStroke();
  textSize(20);
  text("Rogelio Polesello, 1959", 570, 520);
}

function encenderLuz() {
//En esta función coloco la imagen del interruptor y con el scale lo hago un poco más grande, esta función controla el estado de la luz. Si (luzEncendida) es verdadero, se dibujará un rectangulo que ocupe toda la pantalla con un color negro y un bajo nivel de opacidad para simular que esta apagada.
  push ()
  translate(1150 + 70 / 2, 300 + 70 / 2);
  scale (1.5)
  translate(-70 / 2, -70 / 2);
  image(interruptor, 0, 0, 70, 70);
  pop()
  
  if (luzEncendida) {
    // Luz apagada (el 150 es el color negro con baja opacidad)
    fill(0, 150);
  } else {
    // Sin color para simular luz encendida
    noFill();
  }
  noStroke();
  rect(0, 0, width, height);
}

function mouseClicked() {
//Esta función se encarga de  verificar si se ha hecho clic en el interruptor y sus coordenadas para cambiar la luz
  if (mouseX > 1150 && mouseX < 1220 && mouseY > 300 && mouseY < 370) {
    luzEncendida = !luzEncendida;
  }
}

function mousePressed () {
//Esta es similar a la anterior pero para controlar si el clic se ha hecho en las coordenadas del triangulo. Si es así, camiba el estado de (rotacionTriangulo).
  let centroX = (770 + 680 + 725) / 3;
  let centroY = (315 + 315 + 225) / 3;
  if (mouseX > 680 && mouseX < 770 && mouseY > 225 && mouseY < 315) {
    rotacionTriangulo = !rotacionTriangulo;
  }
}

function keyPressed() {
//Esta función no la hemos trabajado en clase pero su objetivo es modificar el estado del canvas usando las teclas, en mi caso se modifican los colores de las esferas dependiendo en que tecla del 1 al 5 pulses.
  if (key >= '1' && key <= '5') {
    colorSeleccionado = int(key);
  }
}

function dibujarMosquitos() {
// Con esta función, se dibujaran pequeños circulos (mosquitos) al rededor de la pantalla en posiciones aleatorias siempre y cuando esta este apagada mediante un bucle while. El (contradorMosquitos) son el numero máximo de mosquitos que se van a dibujar.
  if (luzEncendida) {
    let contadorMosquitos = 5;
    fill(0);
    let i = 0;
    while (i < contadorMosquitos) {
      let x = random(width);
      let y = random(height);
      ellipse(x, y, 5);
      i++;
    }
  }
}

function posicionRaton () {
//Con esta función acompañada de un condicional hago que si se pasa el raton por las coordenadas del punto del centro, este cambie de color.
   if (mouseX > 625 && mouseX < 645 && mouseY > 260 && mouseY < 280) {
    colorPunto = color4;
  } else {
    colorPunto = color1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}







