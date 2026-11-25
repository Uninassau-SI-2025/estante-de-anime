import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useLocalStorage } from './hooks/useLocalStorage'
import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'
import Aviso from './components/Aviso'
import Catalogo from './pages/Catalogo'
import Assistindo from './pages/Assistindo'
import Assisti from './pages/Assisti'
import Sugestoes from './pages/Sugestoes'
import Detalhe from './pages/Detalhe'
import NaoEncontrada from './pages/NaoEncontrada'

function temaDoSistema() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
}

export default function App() {
  const [tema, setTema] = useLocalStorage('estante-tema', temaDoSistema())
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.dataset.tema = tema
  }, [tema])

  // cada "página" começa do topo, como num site comum
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Cabecalho tema={tema} aoTrocarTema={() => setTema(tema === 'escuro' ? 'claro' : 'escuro')} />
      <main className="largura conteudo">
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/assistindo" element={<Assistindo />} />
          <Route path="/assisti" element={<Assisti />} />
          <Route path="/sugestoes" element={<Sugestoes />} />
          <Route path="/anime/:id" element={<Detalhe />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Rodape />
      <Aviso />
    </>
  )
}
