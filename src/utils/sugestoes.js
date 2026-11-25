import { animes, porId } from '../data/animes'

function embaralhar(lista) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

// Soma pontos por gênero: visto ou vendo vale 1, favorito vale 2 e dropado tira 1.
function pesosPorGenero(itens) {
  const pesos = {}
  for (const [id, item] of Object.entries(itens)) {
    const anime = porId[id]
    if (!anime) continue
    const valor = item.status === 'dropado' ? -1 : item.favorito ? 2 : 1
    anime.generos.forEach((g) => {
      pesos[g] = (pesos[g] || 0) + valor
    })
  }
  return pesos
}

// acha, entre os que a pessoa já viu, o mais parecido com o anime sugerido
function maisParecido(anime, itens) {
  let melhor = null
  let maior = 0
  for (const [id, item] of Object.entries(itens)) {
    const outro = porId[id]
    if (!outro || item.status === 'dropado') continue
    const emComum = outro.generos.filter((g) => anime.generos.includes(g)).length + (item.favorito ? 0.5 : 0)
    if (emComum > maior) {
      maior = emComum
      melhor = outro
    }
  }
  return melhor
}

export function sugerir(itens) {
  const pesos = pesosPorGenero(itens)
  const livres = animes.filter((a) => !itens[a.id])
  // divide pela raiz pra anime com muitos gêneros não ganhar sempre
  const pontos = (a) => a.generos.reduce((soma, g) => soma + (pesos[g] || 0), 0) / Math.sqrt(a.generos.length)
  const ordenados = [...livres].sort((a, b) => pontos(b) - pontos(a))

  const naLinha = embaralhar(ordenados.slice(0, 14))
    .slice(0, 6)
    .sort((a, b) => pontos(b) - pontos(a))
    .map((anime) => {
      const parecido = maisParecido(anime, itens)
      const emComum = parecido ? parecido.generos.filter((g) => anime.generos.includes(g)).slice(0, 2) : []
      const motivo = parecido
        ? `Parecido com ${parecido.titulo}: ${emComum.join(' e ').toLowerCase()}.`
        : 'Combina com o que você vê.'
      return { anime, motivo }
    })

  const jaEscolhidos = new Set(naLinha.map((s) => s.anime.id))
  const distantes = embaralhar(ordenados.filter((a) => !jaEscolhidos.has(a.id)).slice(-16))
  const diferentes = []
  const generosUsados = new Set()

  for (const anime of distantes) {
    if (generosUsados.has(anime.generos[0])) continue
    generosUsados.add(anime.generos[0])
    const novos = anime.generos.filter((g) => !pesos[g])
    let motivo = novos.length
      ? `Território novo pra você: ${novos.slice(0, 2).join(' e ').toLowerCase()}.`
      : `Um lado de ${anime.generos[0].toLowerCase()} bem diferente do que você costuma ver.`
    if (!anime.dublado) motivo += ' Só legendado.'
    diferentes.push({ anime, motivo })
    if (diferentes.length === 4) break
  }

  return { naLinha, diferentes }
}
