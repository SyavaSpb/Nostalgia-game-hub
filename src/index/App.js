import React, {useState} from 'react'
import Header from '../components/header'
import MainBlock_index from './MainBlock_index'
import InformationBlock_index from './InformationBlock_index'
import './index.css'

export default function App() {
  return (
      <div className="container container-index">
        <Header title={"Nostalgic games hub"} />
        <div className="separate">
          <InformationBlock_index />
          <MainBlock_index />
        </div>
      </div>
  )
}
