import Header from './../../Components/Header.js'
import MainBlock from './MainBlock.js'
import InfBlock from './InfBlock.js'

import './SnakePage.css'

function MainPage() {
  return (
    <div className="container container-snakePage">
      <Header title="Nostalgic games hub" />
      <div className="separate">
        <MainBlock />
        <InfBlock />
      </div>
    </div>
  )
}

export default MainPage
