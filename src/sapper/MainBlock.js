import React from 'react'

export default function MainBlock({ isAuthenticated }) {

  return (
    <section className="mainBlock">
      <div className="mainBlock__menu box">
        <div className="mainBlock__button button-standart text-center">
          <span className="text-teletoon text-m text-white">Single player</span>
        </div>
        {isAuthenticated
          ? <div className="mainBlock__button button-standart text-center">
              <span className="text-teletoon text-m text-white">Battle royal mode</span>
            </div>
          : <div className="text-center">
              <div className="mainBlock__button button-deactivate text-center" style={{marginBottom: '0'}}>
                <span className="text-teletoon text-m text-white">Battle royal mode</span>
              </div>
              <span className="text-teletoon text-s text-red"> login to play battle royale </span>
            </div>
        }
      </div>

      <div className="mainBlock__menu box">
        <span className="text-teletoon text-m text-white tittle-center">Connecting to lobby...</span>
      </div>

      <div className="mainBlock__menu box">
        <div className="mainBlock__button button-standart text-center">
          <span className="text-teletoon text-m text-white">Join random room</span>
        </div>
        <input />
        <div className="mainBlock__button button-standart text-center">
          <span className="text-teletoon text-m text-white">Join room by id</span>
        </div>
      </div>

    </section>
  )
}
