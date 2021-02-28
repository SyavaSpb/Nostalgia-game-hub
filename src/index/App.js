import React from 'react'
import Header from '../components/header'

function App() {
  return (
    <div className="container">

      <Header title={"Nostalgic games hub"} />

      <div className="separate">

        <aside className="authorization">
          <div className="authorization__login box">
            <span className="text-teletoon text-white"> Login </span>
          </div>
          <div className="authorization__registration box">
            <span className="text-teletoon text-white"> Registration </span>
          </div>
        </aside>


        <section className="games">
          <a className="games__item games__item-tetris box text-clean" href="tetris">
            <span className="games__tittle tittle-l text-pixel text-up text-orange">tetris</span>
          </a>
          <a className="games__item games__item-snake box text-clean" href="snake">
            <span className="games__tittle tittle-l text-pixel text-up text-orange">snake</span>
          </a>
          <a className="games__item games__item-sapper box text-clean" href="sapper">
            <span className="games__tittle tittle-l text-pixel text-up text-orange">sapper</span>
          </a>
        </section>

      </div>

    </div>
  )
}

export default App;
