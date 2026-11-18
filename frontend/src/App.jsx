
import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './components/layout/AuthLayout'
import AppLayout from './components/layout/AppLayout'
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import Home from './pages/Home/Home'
import Perfil from './pages/Perfil/Perfil'
import Sala from './pages/Sala/Sala'

export default function App() {

  useEffect(() => {
    const temaSalvo = localStorage.getItem('trocaiTema')

    if (temaSalvo === 'fiap') {
      document.documentElement.dataset.theme = 'fiap'
    } else {
      delete document.documentElement.dataset.theme
    }
  }, [])

  return (
    <HashRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/praca" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/sala/:id" element={<Sala />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
