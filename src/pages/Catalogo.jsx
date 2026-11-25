import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEstante } from '../context/EstanteContext'
import { animes, generos } from '../data/animes'
import Filtros from '../components/Filtros'
import CartaoAnime from '../components/CartaoAnime'
import Vazio from '../components/Vazio'

function ordenar(lista, ordem) {
  const copia = [...lista]
  if (ordem === 'az') copia.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt'))
  if (ordem === 'novos') copia.sort((a, b) => b.ano - a.ano)
  if (ordem === 'antigos') copia.sort((a, b) => a.ano - b.ano)
  return copia
}

export default function Catalogo() {
  const { estante } = useEstante()
  const [busca, setBusca] = useState('')
  const [ordem, setOrdem] = useState('destaques')
  const [soDublados, setSoDublados] = useState(true)
  // o gênero fica na URL (?genero=Romance) pra dar pra chegar aqui pelo link da página do anime
  const [parametros, setParametros] = useSearchParams()
  const genero = parametros.get('genero') || ''

  const porVer = animes.filter((a) => !estante.itens[a.id])
  const texto = busca.trim().toLowerCase()

  const filtrados = porVer.filter((a) => {
    if (soDublados && !a.dublado) return false
    if (genero && !a.generos.includes(genero)) return false
    if (texto && !a.titulo.toLowerCase().includes(texto) && !a.jp.includes(texto)) return false
    return true
  })
  const lista = ordenar(filtrados, ordem)

  const temFiltro = texto || genero || soDublados

  function limparFiltros() {
    setBusca('')
    setSoDublados(false)
    setParametros({})
  }

  return (
    <section>
      <Filtros
        busca={busca}
        aoBuscar={setBusca}
        ordem={ordem}
        aoOrdenar={setOrdem}
        generos={generos}
        genero={genero}
        aoEscolherGenero={(g) => setParametros(g ? { genero: g } : {})}
        soDublados={soDublados}
        aoAlternarDublados={() => setSoDublados(!soDublados)}
      />

      <p className="contagem">
        {lista.length === porVer.length
          ? `${porVer.length} animes por ver`
          : `${lista.length} de ${porVer.length} por ver`}
        {soDublados && ' · só dublados'}
      </p>

      <div className="grade">
        {lista.map((anime) => (
          <CartaoAnime key={anime.id} anime={anime} />
        ))}

        {lista.length === 0 && (
          <Vazio titulo="Nada por aqui">
            {temFiltro ? (
              <>
                Tente outro nome ou inclua os legendados.
                <br />
                <button className="botao-claro" onClick={limparFiltros}>
                  Limpar filtros
                </button>
              </>
            ) : (
              'Você já passou por todo o catálogo!'
            )}
          </Vazio>
        )}
      </div>
    </section>
  )
}
