import React, {useState, useRef, useEffect} from 'react'
import Auth from './../components/Auth/Auth'
import { useAuthContext } from './../components/Auth/AuthContext'
import useRecords from './../hooks/useRecords'

export default function InformationBlock({ score, status, level }) {
  const { userData, token } = useAuthContext()
  const isAuthenticated = token != null
  const [record, setRecord] = useState(null)
  const { getRecords } = useRecords()

  useEffect(() => {
    if (userData.login) {
      getRecords(userData)
        .then(records => {
          setRecord(records.tetris)
        })
    }
  }, [userData, status])

  let next
  if (status == "play") {
    next =
    <div className="nextContainer box">
      <canvas id="next"></canvas>
    </div>
  }

  let recordBlock
  if (isAuthenticated && record !== null) {
    recordBlock =
    <div className="box text-center information__item">
      <span className="text-teletoon text-m text-white"> record: </span>
      <br/>
      <span className="text-teletoon tittle-m text-white"> {record} </span>
    </div>
  }

  return (
    <div className="information">
      <Auth />
      {recordBlock}
      <div className="box text-center information__item">
        <span className="text-teletoon text-m text-white"> level: </span>
        <br/>
        <span className="text-teletoon tittle-m text-white"> {level} </span>
      </div>
      <div className="box text-center information__item">
        <span className="text-teletoon text-m text-white"> score: </span>
        <br/>
        <span className="text-teletoon tittle-m text-white"> {score} </span>
      </div>
      {next}
    </div>
  )
}
