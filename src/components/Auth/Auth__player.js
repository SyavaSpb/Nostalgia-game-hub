import React, {useState} from 'react'

export default function Auth__player({ userData, onLogout, isLogout }) {
  return (
    <div>
      <div className="box text-teletoon tittle-m text-white text-center">
        {userData.login}
      </div>
      {isLogout
        ? <div className="box information__item">
            <div className="button-standart text-center" onClick={() => onLogout()}>
              <span className="text-teletoon text-s"> logout </span>
            </div>
          </div>
        : <></>
      }
    </div>
  )
}
