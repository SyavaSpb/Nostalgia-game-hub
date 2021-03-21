const Room = require('./Room')

module.exports = class RoomManager {
  constructor() {
    this.rooms = new Map()

    // setInterval(this.log.bind(this), 1000)
    this.startCheckingRooms()
  }

  startCheckingRooms() {
    this.checkingRooms = setInterval(this.checkRooms.bind(this), 1000 * 5)
  }
  checkRooms() {
    for (let id = 100; id < 999; id++) {
      if (this.rooms.has(id)) {
        if (this.rooms.get(id).empty()) {
          this.removeRoom(id)
        }
      }
    }
  }

  removeRoom(roomid) {
    delete this.rooms.get(roomid)
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
    // const room = new Room(this.removeRoom.bind(this))
    // this.addRoom(room)
    // return room
    return this.newRoom()
  }

  newRoom() {
    for (let id = 100; id < 999; id++) {
      if (!this.rooms.has(id)) {
        // room.setid(id)
        const room = new Room(id)
        this.rooms.set(id, room)
        return room
      }
    }
  }

  log() {
    console.log("Amoung of rooms: ", this.rooms.size)
  }

  forClient() {
    const result = {
      amoungRooms: this.rooms.size
    }
    return result
  }
}
