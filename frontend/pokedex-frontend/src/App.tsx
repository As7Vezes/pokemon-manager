import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Saved from "./pages/Saved"
import Header from "./components/Header"

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </BrowserRouter>
  )
}