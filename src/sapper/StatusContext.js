import React, {useContext, useState} from 'react'

const StatusContext = React.createContext()

export function useStatusContext() {
  return useContext(StatusContext)
}

export function StatusProvider({ children }) {
  const [status, setStatusNative] = useState(["choose mode", "custom"])

  function setStatus(first, second = status[1]) {
    const newStatus = [status[0], status[1]]
    if (first != "def") {
      newStatus[0] = first
    }
    newStatus[1] = second
    setStatusNative(newStatus)
  }

  return (
    <StatusContext.Provider value={{status, setStatus}}>
      { children }
    </StatusContext.Provider>
  )
}
