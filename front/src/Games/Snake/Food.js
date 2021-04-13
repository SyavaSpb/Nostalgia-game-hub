const GameObject = require('./../Engine/GameObject.js')

module.exports = class Food extends GameObject {
  constructor(ind, image) {
    super(ind)
    this.pushCell({i: 0, j: 0}, image)
  }
}
