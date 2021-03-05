import GameObject from 'cell-games-front/GameObject.js'

export default class Food extends GameObject {
  constructor(ind, image) {
    super(ind)
    this.pushCell({i: 0, j: 0}, image)
  }
}
