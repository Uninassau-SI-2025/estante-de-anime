import { MATIZ } from '../data/animes'

const CARIMBO = { vendo: 'VENDO', visto: 'VISTO', dropado: 'DROPADO' }

// A "capa" é desenhada com CSS: cor pelo gênero e o título em japonês na vertical.
export default function Capa({ anime, item }) {
  // usa o segundo gênero porque o primeiro é "Ação" em metade do catálogo e ficava tudo da mesma cor
  const matiz = MATIZ[anime.generos[1] ?? anime.generos[0]] ?? 240
  // título comprido precisa de letra menor pra caber
  const letras = [...anime.jp].length
  const tamanho = Math.max(15, Math.min(38, Math.floor(180 / Math.max(letras, 4))))

  return (
    <div className="capa" style={{ '--matiz': matiz }}>
      <span className="capa-jp" lang="ja" style={{ fontSize: tamanho }}>
        {anime.jp}
      </span>
      <span className={anime.dublado ? 'capa-idioma' : 'capa-idioma legendado'}>
        {anime.dublado ? 'Dublado' : 'Legendado'}
      </span>
      <span className="capa-ano">{anime.ano}</span>
      {item && <span className="carimbo">{CARIMBO[item.status]}</span>}
      {item?.status === 'vendo' && (
        <span className="capa-episodio">
          T{item.temporada} · Ep {item.episodio}
        </span>
      )}
    </div>
  )
}
