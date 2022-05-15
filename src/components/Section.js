export default class Section {
  constructor({items, renderer}, selector ) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems() {
    this._renderedItems.forEach(item => {
      const card = this._renderer(item); 
      this.addItem(card);});
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
