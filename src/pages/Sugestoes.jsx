import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEstante } from '../context/EstanteContext'
import { sugerir } from '../utils/sugestoes'
import CartaoAnime from '../components/CartaoAnime'
import Vazio from '../components/Vazio'

export default function Sugestoes() {
  const { estante, vendo, vistos } = useEstante()
  const [rodada, setRodada] = useState(0)

  // Só sorteia de novo quando clica em "Embaralhar". Se recalculasse a cada mudança
  // na estante, os cartões trocariam de lugar bem na hora em que a pessoa clica neles.
  const sugestoes = useMemo(() => sugerir(estante.itens), [rodada])

  if (vistos.length + vendo.length === 0) {
    return (
      <Vazio titulo="Marque o que você já assistiu">
        As sugestões aparecem quando a estante tiver pelo menos um anime.
        <br />
        <Link className="botao-claro" to="/">
          Ir para o catálogo
        </Link>
      </Vazio>
    )
  }

  // quem já entrou na estante sai da lista de sugestões
  const livres = (lista) => lista.filter((s) => !estante.itens[s.anime.id])
  const naLinha = livres(sugestoes.naLinha)
  const diferentes = livres(sugestoes.diferentes)

  return (
    <section>
      <button className="botao-grande" onClick={() => setRodada(rodada + 1)}>
        Embaralhar sugestões
      </button>

      <h2 className="titulo-secao">Na sua linha</h2>
      <p className="texto-secao">
        Baseadas nos gêneros que mais aparecem na sua estante. Favoritos contam em dobro e dropados tiram pontos.
      </p>
      <div className="grade">
        {naLinha.map((s) => (
          <CartaoAnime key={s.anime.id} anime={s.anime} motivo={s.motivo} />
        ))}
        {naLinha.length === 0 && <Vazio titulo="Acabaram as sugestões">Embaralhe pra ver outras.</Vazio>}
      </div>

      <h2 className="titulo-secao">Fora da sua zona de conforto</h2>
      <p className="texto-secao">Gêneros que você ainda não explorou, pra conhecer coisa nova.</p>
      <div className="grade">
        {diferentes.map((s) => (
          <CartaoAnime key={s.anime.id} anime={s.anime} motivo={s.motivo} />
        ))}
        {diferentes.length === 0 && <Vazio titulo="Acabaram as sugestões">Embaralhe pra ver outras.</Vazio>}
      </div>
    </section>
  )
}
