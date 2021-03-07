import React, {useState, useEffect} from 'react'
import Slider from './../components/Slider'

export default function СustomizationRoom() {
  const [maxPlayers, setMaxPlayers] = useState(6)
  const [minPlayers, setMinPlayers] = useState(2)
  const [timeForMove, setTimeForMove] = useState(15)

  useEffect(() => {
    console.log(timeForMove)
  }, [timeForMove])

  return (
    <div className="mainBlock__menu box">
      <div> min, max amoung players (slider) </div>
      <div> time for move: {timeForMove} </div>
      <Slider
        setValue={setTimeForMove}
        partAmoung={25}
        minValue={5}
      />
      <div> size of board () </div>
    </div>
  )
}
