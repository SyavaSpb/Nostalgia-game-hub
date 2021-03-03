module.exports = class Player {
  constructor(name = '', id = -1) {
    this.id = id
    this.setName(name)
    this.updateDate()
    this.ready = false
    this.isLoose = false
    this.isMove = false
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
      name: this.name,
      ready: this.ready,
      isLoose: this.isLoose,
      isMove: this.isMove
    }
    return result
  }
}
