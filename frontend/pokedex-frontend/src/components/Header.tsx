import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="font-bold">Pokemon Manager</h1>

      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/saved">Salvos</Link>
      </nav>
    </header>
  )
}