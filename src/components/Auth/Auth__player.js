import React, {useState} from 'react'

export default function Auth__player({ userData, onLogout }) {
  return (
    <div>
      <div className="box text-teletoon tittle-m text-white text-center">
        {userData.login}
      </div>
      <div className="box button-standart" onClick={() => onLogout()}>
        logout
      </div>
    </div>
  )
}
