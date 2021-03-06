import React, {useState, useEffect, useRef} from 'react'

export default function СustomizationRoom({ setValue, value, partAmoung, minValue }) {
  const [left, setLeft] = useState("0px")
  const [width, setWidth] = useState("0px")
  const [isDown, setIsDown] = useState(false)
  const sliderRef = useRef(null)

  useEffect(() => {
    if (sliderRef.current) {
      const partSize = (sliderRef.current.clientWidth - 40) / partAmoung
      let x = (value - 1) * partSize
      setLeft(x.toString() + "px")
      x += 20
      setWidth(x.toString() + "px")
    }
  }, [value, sliderRef])

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
    }
  }
  return (
    <div
      ref={sliderRef}
      className="slider back-red"
      onMouseDown={() => setIsDown(true)}
      onMouseMove={() => toggleSlider(event)}
      onMouseOut={() => setIsDown(false)}
      onMouseUp={() => setIsDown(false)}
    >
      <div className="slider__filled back-orange" style={{width: width}}> </div>
      <div className="slider__toddler back-orange" style={{left: left}}>
      </div>
    </div>
  )
}
