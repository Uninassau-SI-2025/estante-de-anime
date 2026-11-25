import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEstante } from '../context/EstanteContext'
import CartaoAnime from '../components/CartaoAnime'
import Vazio from '../components/Vazio'
import './Assisti.css'

export default function Assisti() {
  const { estante, vistos, dropados, adicionarExtra, removerExtra } = useEstante()
  const [lista, setLista] = useState('vistos')
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')

  // favoritos aparecem primeiro
  const vistosOrdenados = [...vistos].sort(
    (a, b) => Number(estante.itens[b.id].favorito) - Number(estante.itens[a.id].favorito)
  )
  const mostrados = lista === 'vistos' ? vistosOrdenados : dropados

  function enviar(evento) {
    evento.preventDefault()
    const limpo = nome.trim()

    if (limpo.length < 2) {
      setErro('Escreva o nome do anime.')
      return
    }
    if (estante.extras.some((e) => e.toLowerCase() === limpo.toLowerCase())) {
      setErro('Esse já está na sua lista.')
      return
    }

    adicionarExtra(limpo)
    setNome('')
    setErro('')
  }

  return (
    <section>
      <div className="chips trocar-lista">
        <button className="chip" aria-pressed={lista === 'vistos'} onClick={() => setLista('vistos')}>
          Vistos {vistos.length > 0 && `(${vistos.length})`}
        </button>
        <button className="chip" aria-pressed={lista === 'dropados'} onClick={() => setLista('dropados')}>
          Dropados {dropados.length > 0 && `(${dropados.length})`}
        </button>
      </div>

      <div className="grade">
        {mostrados.map((anime) => (
          <CartaoAnime key={anime.id} anime={anime} />
        ))}

        {mostrados.length === 0 && lista === 'vistos' && (
          <Vazio titulo="Sua estante está vazia">
            Marque no catálogo os animes que você já viu.
            <br />
            <Link className="botao-claro" to="/">
              Ir para o catálogo
            </Link>
          </Vazio>
        )}

        {mostrados.length === 0 && lista === 'dropados' && (
          <Vazio titulo="Nenhum dropado">
            Em Assistindo, toque em “Dropar” pra largar um anime sem perder onde parou.
          </Vazio>
        )}
      </div>

      <div className="fora-do-catalogo">
        <h2 className="titulo-secao">Viu algum que não está no catálogo?</h2>
        <p className="texto-secao">Adicione pelo nome. Ele entra na contagem de vistos.</p>

        <form onSubmit={enviar} noValidate>
          <input
            value={nome}
            onChange={(e) => {
              setNome(e.target.value)
              setErro('')
            }}
            placeholder="Ex.: Neon Genesis Evangelion"
            aria-label="Nome do anime"
            aria-invalid={erro ? 'true' : 'false'}
            maxLength={80}
          />
          <button className="botao-claro" type="submit">
            Adicionar
          </button>
        </form>
        {erro && <p className="erro-formulario">{erro}</p>}

        <ul className="extras">
          {estante.extras.map((extra, i) => (
            <li key={extra}>
              {extra}
              <button onClick={() => removerExtra(i)} aria-label={`Remover ${extra}`}>
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
