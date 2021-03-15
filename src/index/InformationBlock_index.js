import React, {useState, useEffect} from 'react'
import Auth from './../components/Auth/Auth'
import { useAuthContext } from './../components/Auth/AuthContext'
import useForceUpdate from './../hooks/useForceUpdate'

import useRecords from './../hooks/useRecords'

export default function App() {
  const {forceUpdate} = useForceUpdate()
  const { userData, token } = useAuthContext()
  const isAuthenticated = token != null
  const [records, setRecords] = useState({})
  const { getRecords } = useRecords()

  useEffect(() => {
    if (userData.login) {
      getRecords(userData)
        .then(records => {
          setRecords(records)
        })
    }
  }, [userData])

  let recordsBlock
  if (isAuthenticated && records.tetris !== undefined) {
    recordsBlock =
    <div className="box information__item">
      <div className="records__item">
        <span className="text-teletoon text-m text-white">Tetris: </span>
        <span className="text-teletoon text-l text-white">{records.tetris}</span>
      </div>
      <br />
      <div className="records__item">
        <span className="text-teletoon text-m text-white">Snake: </span>
        <span className="text-teletoon text-l text-white">{records.snake}</span>
      </div>
    </div>
  }

  return (
    <aside className="information information-index">
      <Auth isLogout={true} />
      {recordsBlock}
    </aside>
  )
}
