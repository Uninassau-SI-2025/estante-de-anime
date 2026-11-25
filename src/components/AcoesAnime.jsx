import { useEstante } from '../context/EstanteContext'
import { linkCrunchyroll } from '../data/animes'
import Icone from './Icone'

// Os botões mudam conforme o status do anime na estante.
export default function AcoesAnime({ anime }) {
  const { estante, comecar, terminar, dropar, remover, favoritar, ajustarProgresso } = useEstante()
  const { id } = anime
  const item = estante.itens[id]
  const status = item?.status

  const crunchyroll = (
    <a
      className="botao quadrado"
      href={linkCrunchyroll(anime)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Procurar ${anime.titulo} na Crunchyroll`}
      title="Procurar na Crunchyroll"
    >
      <Icone nome="externo" tamanho={17} />
    </a>
  )

  if (status === 'vendo') {
    return (
      <div className="acoes">
        <button className="botao ciano" onClick={() => ajustarProgresso(id, 'episodio', 1)}>
          <Icone nome="mais" tamanho={15} />1 ep.
        </button>
        <button className="botao" onClick={() => terminar(id)}>
          <Icone nome="check" tamanho={15} />
          Terminei
        </button>
        {crunchyroll}
        <button className="botao-texto" onClick={() => dropar(id)}>
          Dropar
        </button>
        <button className="botao-texto" onClick={() => remover(id)}>
          Voltar ao catálogo
        </button>
      </div>
    )
  }

  if (status === 'visto') {
    return (
      <div className="acoes">
        <button
          className="botao quadrado favorito"
          onClick={() => favoritar(id)}
          aria-pressed={item.favorito}
          aria-label="Favorito"
          title="Favorito: pesa mais nas sugestões"
        >
          <Icone nome="coracao" tamanho={16} />
        </button>
        <button className="botao" onClick={() => comecar(id)}>
          Rever
        </button>
        {crunchyroll}
        <button className="botao-texto" onClick={() => remover(id)}>
          Desmarcar
        </button>
      </div>
    )
  }

  if (status === 'dropado') {
    return (
      <div className="acoes">
        <button className="botao principal" onClick={() => comecar(id)}>
          Retomar
        </button>
        <button className="botao" onClick={() => terminar(id)}>
          <Icone nome="check" tamanho={15} />
          Já vi
        </button>
        {crunchyroll}
        <button className="botao-texto" onClick={() => remover(id)}>
          Voltar ao catálogo
        </button>
      </div>
    )
  }

  return (
    <div className="acoes">
      <button className="botao principal" onClick={() => comecar(id)}>
        Começar
      </button>
      <button className="botao" onClick={() => terminar(id)}>
        <Icone nome="check" tamanho={15} />
        Já vi
      </button>
      {crunchyroll}
    </div>
  )
}
