import React, {useState, useRef, useEffect} from 'react'

import Header from '../components/header'
import MainBlock_sapper from './MainBlock_sapper'
import Information_sapper from './Information_sapper'
import {AuthProvider} from './../components/Auth/AuthContext'
import {StatusProvider} from './StatusContext'
import {BattleRoyaleProvider} from './BattleRoyale/BattleRoyaleContext'

import './sapper.css'

export default function App() {

  return (
    <div className="container container-sapper">
      <Header title={"sapper"}/>
      <AuthProvider>
        <StatusProvider>
          <BattleRoyaleProvider>
            <div className="separate">
              <Information_sapper/>
              <MainBlock_sapper/>
            </div>
          </BattleRoyaleProvider>
        </StatusProvider>
      </AuthProvider>
    </div>
  )
}
