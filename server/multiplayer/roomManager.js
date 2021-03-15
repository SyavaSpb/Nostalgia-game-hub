const Room = require('./room')

module.exports = class RoomManager {
  constructor() {
    this.rooms = new Map()

    // setInterval(this.log.bind(this), 1000)
  }

  checkRoom() {

  }

  removeRoom(roomid) {
    this.rooms.delete(roomid)
  }

  getRoomById(id) {
    return this.rooms.get(id)
  }

  getRoom() {
    for (let id = 100; id < 999; id++) {
      if (this.rooms.has(id)) {
        return this.rooms.get(id)
      }
    }
    const room = new Room(this.removeRoom.bind(this))
    this.addRoom(room)
    return room
  }

  addRoom(room) {
    for (let id = 100; id < 999; id++) {
      if (!this.rooms.has(id)) {
        room.setid(id)
        this.rooms.set(id, room)
        return
      }
    }
  }

  log() {
    console.log("Amoung of rooms: ", this.rooms.size)
  }
}
