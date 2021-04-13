export default function MainBlock() {
  return (
    <div className="separate__mainBlock">
      <a className="game box text-clean" href="/snake">
        <span className="title-center text-pixel title-l text-up text-orange">
          snake
        </span>
      </a>
      <a className="game box text-clean" href="/tetris">
        <span className="title-center text-pixel title-l text-up text-orange">
          tetris
        </span>
      </a>
      <a className="game box text-clean" href="/sapper">
        <span className="title-center text-pixel title-l text-up text-orange">
          sapper
        </span>
      </a>
    </div>
  )
}
