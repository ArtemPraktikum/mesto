export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector)
  }
  renderCard() {
    this._renderer()
  }
  // добавить карточку в галерею
  addItem(item) {
    this._container.prepend(item)
  }
}
