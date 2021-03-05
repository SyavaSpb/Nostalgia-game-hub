import React, {useState} from 'react'

export default function MainBlock_index() {
  return (
    <section className="mainBlock mainBlock-index">
      <a className="game box text-clean" href="tetris">
        <span className="games__tittle tittle-center tittle-l text-pixel text-up text-orange">tetris</span>
      </a>
      <a className="game box text-clean" href="snake">
        <span className="games__tittle tittle-center tittle-l text-pixel text-up text-orange">snake</span>
      </a>
      <a className="game box text-clean" href="sapper">
        <span className="games__tittle tittle-center tittle-l text-pixel text-up text-orange">sapper</span>
      </a>
    </section>
  )
}
