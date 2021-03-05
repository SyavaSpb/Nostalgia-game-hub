import React, {useState, useRef, useEffect} from 'react'

export default function InformationBlock({ score, status }) {
  console.log(status)
  let output, next
  return (
    <div className="information">
      <div> auth </div>
      <div> record </div>
      <div> level </div>
      <div className="box"> score: {score} </div>
    </div>
  )
}
