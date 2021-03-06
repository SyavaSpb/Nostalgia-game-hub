import useServerRequest from './useServerRequest'
import config from '../../config.json'
const HOST = config.host
const PORT = config.port

const blankRecords = {
  tetris: 0,
  snake: 0,
  sapper: {
    "8*10*10": 0
  }
}

export default function useRecords() {
  const {serverRequest} = useServerRequest()
  function getRecords(userData) {
    const data = {player: {login: userData.login}}
    return serverRequest('POST',
      "http://" + HOST + ":" + PORT + "/auth/records",
    data)
  }
  function updateRecords(userData, records) {
    const data = {
      player: {login: userData.login},
      records: Object.assign(blankRecords, records)
    }
    return serverRequest('POST',
      "http://" + HOST + ":" + PORT + "/auth/updaterecords",
    data)
  }
  return {
    getRecords: getRecords,
    updateRecords: updateRecords
  }
}
