 /* Chat functionality */
 const chatTextarea = document.querySelector('.chat__textarea');
 const chatTextareaComputed = getComputedStyle(chatTextarea);
 const chatDefaultTextareaHeight = chatTextareaComputed.height;
 const chat = document.querySelector('.chat');
 const chatHeader = document.querySelector('.chat__header');

 /* Show/hide chat */
 chat.addEventListener('click', (e) => {
     const target = e.target;
     const isHeader = target == chatHeader || chatHeader.contains(target);
     const isCloseBtn = target == document.querySelector('.chat__close-btn');
     if(isHeader) {
         chat.classList.add('chat--active');
     
     } else if (isCloseBtn) {
         chat.classList.remove('chat--active');
     }
 });
 
 /* Resize input */ 
 chatTextarea.addEventListener('keyup', () => {
     if(chatTextarea.scrollTop > 0) {
         chatTextarea.style.height = chatTextarea.scrollHeight + 'px'; 
     } else if(chatTextarea.scrollHeight > parseInt(chatTextareaComputed.maxHeight)) {
         chatTextarea.style.overflowY = 'scroll';
     } else if(chatTextarea.value == "") {
         chatTextarea.style.height = chatDefaultTextareaHeight;
     }
 });
 
         /* Send messages */
 let chatMessagesField = document.querySelector('.chat__messages');
 let chatSendBtn = document.querySelector('.chat__btn');
 
 const webSocket = new WebSocket('ws://localhost:8081');
 
 /* Get message from Server */
 webSocket.onmessage = (e) => {
     const data = JSON.parse(e.data);
     chatMessagesField.innerHTML += '<div class="chat__message chat__message--server">'
     + data.message + '</div>';
 };
 
 /* Get massage and send to server */
 chatSendBtn.addEventListener('click', (e) => {
     e.preventDefault();
     let message = chatTextarea.value;
     
     if(message != '') {
         webSocket.send(JSON.stringify({
             'message':message
         }));
         chatMessagesField.innerHTML += '<div class="chat__message chat__message--client">'
         + message + '</div>';
         chatTextarea.value = '';
     };
 });