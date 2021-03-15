module.exports = class Player {
  constructor(name = '', id = -1) {
    this.id = id
    this.setName(name)
    this.updateDate()
    this.ready = false
    this.isLoose = false
    this.isMove = false
    this.isConnect = null
    this.roomid = -1
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
      isMove: this.isMove,
      isConnect: this.isConnect
    }
    if (this.isMove) {
      result.moveTime = Math.floor((this.timeEndMove - Date.now()) / 1000)
    }
    return result
  }
}
