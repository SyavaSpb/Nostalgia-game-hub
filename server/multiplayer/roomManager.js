const Room = require('./room')

module.exports = class RoomManager {
  constructor() {
    this.rooms = new Map()
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
    const room = new Room()
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
}
