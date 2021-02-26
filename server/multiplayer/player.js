module.exports = class Player {
  constructor(name = '', id = -1) {
    this.id = id
    this.setName(name)
    this.updateDate()
    this.ready = false
    // this.isLoose = false
    // this.isMove = false
    // this.score = 0
  }

  setName(name) {
    this.name = name
  }
  setRoom(roomid) {
    this.roomid = roomid
  }

  changeReady() {
    this.ready = !this.ready
  }

  updateDate() {
    this.date = Date.now()
  }

  forClient() {
    const result = {
      id: this.id,
      roomid: this.roomid,
      name: this.name
    }
    if (this.ready) {
      result.ready = this.ready
    }
    if (this.isLoose) {
      result.isLoose = this.isLoose
    }
    if (this.isMove) {
      result.isMove = this.isMove
    }
    return result
  }
}
