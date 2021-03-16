import React, {useState, useEffect} from 'react'
import { useAuthContext } from './../../components/Auth/AuthContext'
import useRecords from './../../hooks/useRecords'

export default function Information__Single({ score }) {
  const { userData, token } = useAuthContext()
  const isAuthenticated = token != null
  const [record, setRecord] = useState(null)
  const { getRecords } = useRecords()

  useEffect(() => {
    if (userData.login) {
      getRecords(userData)
        .then(records => {
          setRecord(records.sapper)
          console.log(records)
        })
    }
  }, [userData])

  let recordBlock
  if (isAuthenticated && record !== null) {
    recordBlock =
    <div className="box information__item text-teletoon text-white">
      <div className="text-center">
        <span className="text-m"> records: </span>
      </div>
      <div className="records__item">
        <span className="text-m">8*10 10m: </span>
        <span className="text-l">{record.["8*10*10"]}</span>
      </div>
      <div className="records__item">
        <span className="text-m">14*18 40m: </span>
        <span className="text-l">{record.["14*18*40"]}</span>
      </div>
      <div className="records__item">
        <span className="text-m">20*24 99m: </span>
        <span className="text-l">{record.["20*24*99"]}</span>
      </div>
    </div>
  }

  return (
    <>
      
    </>
  )

  return(
    <>
      {recordBlock}
      <div className="box text-center information__item">
        <span className="text-teletoon text-m text-white"> score: </span>
        <br/>
        <span className="text-teletoon tittle-m text-white"> {score} </span>
      </div>
    </>
  )
}
