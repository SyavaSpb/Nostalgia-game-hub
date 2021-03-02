import React, {useState} from 'react'

export default function СustomizationRoom({ setValue,  partAmoung, minValue }) {
  const [left, setLeft] = useState("0px")
  const [width, setWidth] = useState("0px")
  const [isDown, setIsDown] = useState(false)
  function toggleSlider(event) {
    if (isDown) {
      const slider = event.target
      let x = event.pageX - slider.getBoundingClientRect().left
      const partSize = (slider.clientWidth - 40) / partAmoung
      let partIndex = 0, minDelta = slider.clientWidth
      for (let i = 0; i <= partAmoung; i++) {
        const delta = Math.abs(partSize * i - (x - 20))
        if (delta < minDelta) {
          partIndex = i
          minDelta = delta
        }
      }
      setValue(minValue + partIndex)
      x = partIndex * partSize
      setLeft(x.toString() + "px")
      x += 20
      setWidth(x.toString() + "px")
    }
  }
  return (
    <div
      className="select back-red"
      onMouseDown={() => setIsDown(true)}
      onMouseMove={() => toggleSlider(event)}
      onMouseOut={() => setIsDown(false)}
      onMouseUp={() => setIsDown(false)}
    >
      <div className="sliderLeft back-orange" style={{width: width}}> </div>
      <div className="slider back-orange" style={{left: left}}>
      </div>
    </div>
  )
}
