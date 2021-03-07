import React, {useContext, useState} from 'react'

const BattleRoyaleContext = React.createContext()

export function useBattleRoyaleContext() {
  return useContext(BattleRoyaleContext)
}

export function BattleRoyaleProvider({ children }) {
  const [me, setMe] = useState({})
  const [room, setRoom] = useState({})

  return (
    <BattleRoyaleContext.Provider value={{
      me, setMe, room, setRoom
    }}>
      { children }
    </BattleRoyaleContext.Provider>
  )
}
