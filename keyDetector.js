/*
 (c) Copyright 2024, Diário Code
 Documentação:
*/

/**
 * @type {object} config - Configurações do KeyDetector. Para saber qual a 
 * utilidade de cada objeto, leia a documentação. */
let config = {
 "timeTransition": 1000,
 "defaultText": "Pressione qualquer tecla",
 "useAnimation": true
}

/** 
 * @type {Element} keyList - Elemento que representa a área em que é exibida 
 * qual tecla foi pressionada. */
const keyList = document.querySelector(".keyList");

/** 
 * @type {Element} codeValue - É filho de keyList. Representa a área que contém 
 * a lista de teclas pressionadas. */
const codeValue = document.querySelector(".code");

/** 
 * @type {Array} keysPressed - Lista de teclas que estão pressionadas. */
let keysPressed = [];

/**
 * @type {number} pressedEventID - ID do evento setTimeout( ) ao pressionar uma tecla. */
let pressedEventID = 0;

/**
 * @type {number} transitionEventID - ID do evento setTimeout( ) na trasição fade-in 
 * / fade-out. */
let transitionEventID = 0;


/**
 * Define se deve usar ou não a animação com base nas configurações.
 * @returns {void} Não retorna nada. */
(function(){
 if (config.useAnimation == false){
  codeValue.style.animation = "none";
 }
})();

/**
 * Obtém se alguma tecla especial como Ctrl, Alt ou Shift foi pressionada.
 * @param {Event} Event Representa o evento de pressionamento de tecla.
 * @returns {void} Não retorna nada.
 */
async function getSpecialKey(Event){
 clearTimeout(pressedEventID);
 clearTimeout(transitionEventID);
 if (keysPressed.includes(Event.key)) {
  return;
 }
 
 (Event.ctrlKey) ? (keysPressed.push(Event.key)) : ("");
 (Event.altKey) ? (keysPressed.push(Event.key)) : ("");
 (Event.shiftKey) ? (keysPressed.push(Event.key)) : ("");
 (Event.metaKey) ? (keysPressed.push(Event.key)) : ("");
}

/**
 * Obtém as teclas comuns que foram pressionadas.
 * @param {Event} Event Representa o evento de pressionamento de tecla.
 * @returns {void} Não retorna nada.
 */
async function getKey(Event){
 codeValue.style.animation = "none";
 clearTimeout(pressedEventID);
 clearTimeout(transitionEventID);
 codeValue.style.opacity = 1;

 if (keysPressed.includes(Event.key)) {
  return;
 }

 keysPressed.push(Event.key);
 codeValue.innerHTML = keysPressed.join(" + ");
}

/**
 * Esvazia a lista de teclas que foram pressionadas.
 * @param {Event} Event Representa o evento de pressionamento de tecla.
 * @returns {void} Não retorna nada.
 */
async function emptyKeys(Event){
 keysPressed = keysPressed.filter(key => key !== Event.key );

 if (keysPressed.length > 1) {
  
  codeValue.innerHTML = keysPressed.join(" + ");

 } else if(keysPressed.length == 1) {

  codeValue.innerHTML = keysPressed.join(" + ");

 } else if(keysPressed.length == 0) {
  
  pressedEventID = setTimeout(()=>{   

   codeValue.innerHTML = keysPressed.join(" + ");
   codeValue.innerHTML = config.defaultText;

   if (config.useAnimation == true) {
    codeValue.style.animation = "blink 0.75s linear alternate infinite";
   }   

  }, config.timeTransition);

 }

}

/**
 * Zera todas as variáveis e elementos para seus valores iniciais. Deve ser 
 * usada quando ocorre um erro que impossibilita a exibição de teclas 
 * pressionadas.
 * @returns {void} Não retorna nada.
 */
async function reset(){
 keysPressed = [];
 keysPressed.length = 0;
 clearTimeout(pressedEventID);
 clearTimeout(transitionEventID);
 codeValue.innerHTML = config.defaultText;
 if (config.useAnimation == true) {
  codeValue.style.animation = "blink 0.75s linear alternate infinite";
 } 
}