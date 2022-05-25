export default class Section {
  constructor({renderer}, selector ) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems(arr) {
    arr.forEach(item => {
      const card = this._renderer(item); 
      this.addItem(card);});
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
