import { Link } from 'react-router-dom'
import { useEstante } from '../context/EstanteContext'
import Capa from './Capa'
import AcoesAnime from './AcoesAnime'
import Progresso from './Progresso'
import './CartaoAnime.css'

export default function CartaoAnime({ anime, motivo }) {
  const { estante } = useEstante()
  const item = estante.itens[anime.id]
  const status = item?.status
  const pagina = `/anime/${anime.id}`

  let meio = <p className="cartao-sinopse">{anime.sinopse}</p>
  if (motivo) {
    meio = <p className="cartao-motivo">{motivo}</p>
  } else if (status === 'vendo') {
    meio = <Progresso id={anime.id} />
  } else if (status === 'dropado') {
    meio = (
      <p className="progresso-atual">
        Parou em{' '}
        <b>
          T{item.temporada} · Ep {item.episodio}
        </b>
      </p>
    )
  }

  return (
    <article className={status ? `cartao ${status}` : 'cartao'}>
      <Link to={pagina} className="cartao-capa" tabIndex={-1} aria-hidden="true">
        <Capa anime={anime} item={item} />
      </Link>
      <div className="cartao-info">
        <h3>
          <Link to={pagina}>{anime.titulo}</Link>
        </h3>
        <p className="cartao-generos">
          <span>{anime.generos.slice(0, 3).join(', ')}</span>
          {item?.nota > 0 && <span className="cartao-nota">★ {item.nota}</span>}
        </p>
        {meio}
        <AcoesAnime anime={anime} />
      </div>
    </article>
  )
}
