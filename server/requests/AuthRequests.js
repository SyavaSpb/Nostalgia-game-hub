const config = require('./../../config.json')

async function getBody(req) {
  let body = '';
  req.on('data', chunk => body += chunk.toString())
  data = await new Promise(r => req.on('end', () => r(JSON.parse(body))))
  return data
}

module.exports = class AuthRequests {
  constructor() {

  }
  static async login(req, users, bcrypt, jwt) {
    try {
      const result = {}
      data = await getBody(req)
      const {login, password} = data
      let userData, isRightPassword
      const user = await users.findOne({login: login})
      if (user) {
        userData = {
          userid: user._id,
          login: user.login
        }
        isRightPassword = await bcrypt.compare(password, user.password)
      } else {
        result.log = "user isn't found"
        result.status = 1
        return result
      }
      if (isRightPassword) {
        const token = jwt.sign(
          userData,
          config.jwtSecret,
          { expiresIn: "1h" }
        )
        result.status = 3
        result.userData = userData
        result.token = token
        return result
      } else {
        result.status = 2
        result.log = "invalid password"
        return result
      }
    } catch (e) {
      console.log(e)
    }
  }

  static validLogin(login) {
    const result = {}
    if (login.length < 5) {
      result.log = "login must be more than 4 symbols"
      result.status = false
      return result
    } else if (login.length > 12) {
      result.log = "login must be less than 12 symbols"
      result.status = false
      return result
    } else {
      result.status = true
      return result
    }
  }
  static validPassword(password) {
    const result = {}
    if (password.length < 5) {
      result.log = "password must be more than 4 symbols"
      result.status = false
      return result
    } else if (password.length > 12) {
      result.log = "password must be less than 12 symbols"
      result.status = false
      return result
    } else {
      result.status = true
      return result
    }
  }
  static async reg(req, users, records, bcrypt) {
    try {
      const result = {}
      data = await getBody(req)
      const {login, password} = data

      const isRightLogin = this.validLogin(login)
      if (!isRightLogin.status) {
        result.log = isRightLogin.log
        return result
      }
      const isRightPassword = this.validPassword(password)
      if (!isRightPassword.status) {
        result.log = isRightPassword.log
        return result
      }

      const condidate = await users.findOne({login: login})
      if (condidate) {
        result.log = "login exist"
        return result
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = {
        login: login,
        password: hashedPassword
      }
      await users.insertOne(user)
      const newRecords = {
        login: login,
        snake: 0,
        tetris: 0,
        sapper: {
          "8*10*10": 0
        }
      }
      await records.insertOne(newRecords)
      result.log = "user was reg"
      return result
    } catch (e) {
      console.log(e)
      return {log: "server error"}
    }
  }

  static async records(req, recordsdb) {
    try {
      const data = await getBody(req)
      const player = data.player
      const recordsData = await recordsdb.findOne({login: player.login})
      return recordsData
    }
    catch (e) {
      console.log(e)
    }
  }

  static async updateRecords(req, recordsdb) {
    try {
      const data = await getBody(req)
      const recordsOld = data.records
      const player = data.player
      const recordsData = await recordsdb.findOne({login: player.login})
      const recordsNew = {
        login: player.login,
        tetris: Math.max(recordsOld.tetris, recordsData.tetris),
        snake: Math.max(recordsOld.snake, recordsData.snake),
        sapper: {
          "8*10*10": 0
        }
      }
      recordsdb.updateOne(
        {login: player.login},
        {$set: recordsNew},
        {upsert: false}
      )
      return {log: "ok"}
    }
    catch (e) {
      console.log(e)
    }
  }
}
