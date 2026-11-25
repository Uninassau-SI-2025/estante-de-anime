import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEstante } from '../context/EstanteContext'
import { porId } from '../data/animes'
import Capa from '../components/Capa'
import AcoesAnime from '../components/AcoesAnime'
import Progresso from '../components/Progresso'
import Icone from '../components/Icone'
import NaoEncontrada from './NaoEncontrada'
import './Detalhe.css'

const STATUS = { vendo: 'Assistindo', visto: 'Assistido', dropado: 'Dropado' }

function Avaliacao({ id, item }) {
  const { avaliar } = useEstante()
  const [nota, setNota] = useState(item.nota)
  const [comentario, setComentario] = useState(item.comentario)

  const mudou = nota !== item.nota || comentario !== item.comentario

  function enviar(evento) {
    evento.preventDefault()
    avaliar(id, nota, comentario.trim())
  }

  return (
    <form className="avaliacao" onSubmit={enviar}>
      <h2 className="titulo-secao">Minha avaliação</h2>

      <div className="estrelas" role="group" aria-label="Nota de 1 a 5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={n <= nota ? 'acesa' : ''}
            onClick={() => setNota(n === nota ? 0 : n)}
            aria-label={`${n} estrela${n > 1 ? 's' : ''}`}
            aria-pressed={n <= nota}
          >
            ★
          </button>
        ))}
        <span>{nota > 0 ? `${nota} de 5` : 'sem nota'}</span>
      </div>

      <label htmlFor="comentario">O que achei</label>
      <textarea
        id="comentario"
        rows={3}
        maxLength={280}
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Uma anotação rápida pra lembrar depois"
      />
      <div className="avaliacao-fim">
        <span>{comentario.length}/280</span>
        <button className="botao principal" type="submit" disabled={!mudou}>
          Salvar avaliação
        </button>
      </div>
    </form>
  )
}

export default function Detalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { estante } = useEstante()
  const anime = porId[id]

  if (!anime) return <NaoEncontrada />

  const item = estante.itens[id]

  return (
    <article className="detalhe">
      <button className="botao-texto voltar" onClick={() => navigate(-1)}>
        <Icone nome="voltar" tamanho={14} /> Voltar
      </button>

      <div className="detalhe-corpo">
        <div className={item ? `detalhe-capa ${item.status}` : 'detalhe-capa'}>
          <Capa anime={anime} item={item} />
        </div>

        <div className="detalhe-texto">
          <p className="detalhe-jp" lang="ja">
            {anime.jp}
          </p>
          <h1>{anime.titulo}</h1>
          <p className="detalhe-meta">
            {anime.ano} · {anime.dublado ? 'Dublado em português' : 'Só legendado'}
            {item && ` · ${STATUS[item.status]}`}
          </p>

          <div className="chips detalhe-generos">
            {anime.generos.map((g) => (
              <Link key={g} className="chip" to={`/?genero=${encodeURIComponent(g)}`}>
                {g}
              </Link>
            ))}
          </div>

          <p className="detalhe-sinopse">{anime.sinopse}</p>

          {item?.status === 'vendo' && <Progresso id={id} aberto />}
          <AcoesAnime anime={anime} />

          {/* a key faz o formulário recomeçar com os dados certos ao trocar de anime */}
          {item && item.status !== 'dropado' && <Avaliacao key={id} id={id} item={item} />}
        </div>
      </div>
    </article>
  )
}
