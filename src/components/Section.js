export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector)
  }
  renderItems({items, renderer}) {
    this._items = items
    this.renderer = renderer
    this._items.forEach((item) => {
      this.renderer(item)
    })
  }
  addItemAppend(element) {
    this._container.append(element)
  }
  addItemPrepend(element) {
    this._container.prepend(element)
  }
}
