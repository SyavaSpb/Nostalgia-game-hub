import React, {useState, useRef, useEffect} from 'react'

export default function InformationBlock({ score, status }) {
  console.log(status)
  let output, next
  if (status == "play") {
    next =
    <div className="nextContainer box">
      <canvas id="next"></canvas>
    </div>
  }
  return (
    <div className="information">
      <div> auth </div>
      <div> record </div>
      <div> level </div>
      <div className="box"> score: {score} </div>
      {next}
    </div>
  )
}
