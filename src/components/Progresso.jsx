import { useEstante } from '../context/EstanteContext'

function Contador({ rotulo, valor, aoMudar }) {
  return (
    <div className="contador">
      <span>{rotulo}</span>
      <button onClick={() => aoMudar(-1)} disabled={valor <= 1} aria-label={`Diminuir ${rotulo.toLowerCase()}`}>
        −
      </button>
      <output>{valor}</output>
      <button onClick={() => aoMudar(1)} aria-label={`Aumentar ${rotulo.toLowerCase()}`}>
        +
      </button>
    </div>
  )
}

export default function Progresso({ id, aberto = false }) {
  const { estante, ajustarProgresso } = useEstante()
  const item = estante.itens[id]
  if (!item) return null

  return (
    <div className="progresso">
      <p className="progresso-atual">
        Parei em{' '}
        <b>
          T{item.temporada} · Ep {item.episodio}
        </b>
      </p>
      <details open={aberto}>
        <summary>Ajustar temporada e episódio</summary>
        <Contador
          rotulo="Temporada"
          valor={item.temporada}
          aoMudar={(quanto) => ajustarProgresso(id, 'temporada', quanto)}
        />
        <Contador
          rotulo="Episódio"
          valor={item.episodio}
          aoMudar={(quanto) => ajustarProgresso(id, 'episodio', quanto)}
        />
      </details>
    </div>
  )
}
