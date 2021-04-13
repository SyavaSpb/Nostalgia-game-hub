export default function Menu({ play }) {
  return (
    <div className="modal">
      <div className="modal__inner menu box">
        <div
          className="menu__item button-standart text-center"
          onClick={play}
        >
          <span className="text-up text-teletoon text-l text-white">
           play
          </span>
        </div>

        <a
          className="menu__item button-standart text-center text-clean"
          href="/"
        >
          <span className="text-up text-teletoon text-l text-white">
           menu
          </span>
        </a>
      </div>
    </div>
  )
}
