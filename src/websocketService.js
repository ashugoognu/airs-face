// src/websocketService.js
class WebSocketService {
  constructor(url) {
    this.socket = new WebSocket(url);

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onerror = this.onError.bind(this);
  }

  onOpen(event) {
    console.log('WebSocket is open now.', event);
  }

  onMessage(event) {
    console.log('WebSocket message received:', event);
  }

  onClose(event) {
    console.log('WebSocket is closed now.', event);
  }

  onError(error) {
    console.error('WebSocket error observed:', error);
  }

  sendMessage(message) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open. Unable to send message:', message);
    }
  }
}

export default WebSocketService;
