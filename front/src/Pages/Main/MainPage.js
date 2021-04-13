import Header from './../../Components/Header.js'
import MainBlock from './MainBlock.js'
import InfBlock from './InfBlock.js'

import './MainPage.css'

export default function MainPage() {
  return (
    <div className="container container-mainPage">
      <Header title="Nostalgic games hub" />
      <div className="separate">
        <MainBlock />
        <InfBlock />
      </div>
    </div>
  )
}
