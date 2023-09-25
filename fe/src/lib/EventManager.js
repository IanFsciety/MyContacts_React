export default class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    if(!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event).push(listener);
  }

  emit(event, payload) {
    if(!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event).forEach((listener) => {
      listener(payload);
    });
  }

  removeListener(event, ListenerToRemove) {
    if(!this.listeners.get(event)) {
      return;
    }

    const filteredListener = this.listeners.get(event).filter(
      (listener) => listener !== ListenerToRemove,
    );

    this.listeners.set(event, filteredListener)
  }
}

