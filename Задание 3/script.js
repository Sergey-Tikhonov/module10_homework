/*Задание 3.

Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:

Добавить в чат механизм отправки гео-локации:

При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.
*/



const sendButton = document.getElementById('sndBtn');
const geoLocationButton = document.getElementById('glBtn');
const messageInput = document.getElementById('msgInpt');
const dialogContainer = document.querySelector('.dialog-wrapper');


const wsUri = "wss://echo-ws-service.herokuapp.com";
let websocket;

window.onload = function() {
   websocket = new WebSocket(wsUri);

   websocket.onerror = function(evt) {
       printMessage('Произошла ошибка '+evt.data, "error");
   };

   websocket.onmessage = function(evt) {
    
       if (evt.data.indexOf("gl-ref") != -1) {
           return;
       }
       printMessage(evt.data, "server");
   };
}

sendButton.addEventListener('click', () => {
   let message = messageInput.value;
   printMessage(message, "client");
   messageInput.value = "";

   websocket.send(message);
});

messageInput.addEventListener('keyup', () => {
   if(event.key=='Enter') {
       let message = messageInput.value;

       printMessage(message, "client");
       messageInput.value = "";
       
       websocket.send(message);
   }
   
});


geoLocationButton.addEventListener('click', () => {

   if ("geolocation" in navigator) { 
       navigator.geolocation.getCurrentPosition((position) => {
       const { coords } = position;
       let mapHref = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
       let mapText = "Гео-локация";
       let message = `<a class="gl-ref" href="${mapHref}">${mapText}</a>`;

       printMessage(message, "client");

       websocket.send(message);
   });
   } 
   else { 
       printMessage("Местоположение недоступно", "error");
   }
});

window.onbeforeunload = function() {
   websocket.close();
}

function printMessage(message, type) {
   dialogContainer.innerHTML+=`<div class="${type} message">${message}</div>`;
}