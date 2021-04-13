export default function Header({ title }) {
  return (
    <header className="header box text-center">
      <span className="title-m text-teletoon text-up text-orange">
        &#8226; {title} &#8226;
      </span>
    </header>
  )
}
