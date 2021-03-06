import React, {useState} from 'react'
import Header from '../components/header'
import MainBlock_index from './MainBlock_index'
import InformationBlock_index from './InformationBlock_index'
import './index.css'
import { AuthProvider } from './../components/Auth/AuthContext'

export default function App() {
  return (
      <div className="container container-index">
        <Header title={"Nostalgic games hub"} />
        <div className="separate">
          <AuthProvider>
            <InformationBlock_index />
            <MainBlock_index />
          </AuthProvider>
        </div>
      </div>
  )
}
