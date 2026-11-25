import { Link } from 'react-router-dom'
import { useEstante } from '../context/EstanteContext'
import CartaoAnime from '../components/CartaoAnime'
import Vazio from '../components/Vazio'

export default function Assistindo() {
  const { vendo } = useEstante()

  return (
    <section>
      <h2 className="titulo-secao">Assistindo agora</h2>
      <p className="texto-secao">Toque em “+1 ep.” toda vez que terminar um episódio pra não perder onde parou.</p>

      <div className="grade">
        {vendo.map((anime) => (
          <CartaoAnime key={anime.id} anime={anime} />
        ))}

        {vendo.length === 0 && (
          <Vazio titulo="Nada em andamento">
            Escolha um anime no catálogo e toque em “Começar”.
            <br />
            <Link className="botao-claro" to="/">
              Ir para o catálogo
            </Link>
          </Vazio>
        )}
      </div>
    </section>
  )
}
