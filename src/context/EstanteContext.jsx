import { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { animes, porId } from '../data/animes'

const EstanteContext = createContext(null)

const ESTANTE_VAZIA = { itens: {}, extras: [] }
const ITEM_NOVO = { status: 'vendo', temporada: 1, episodio: 1, favorito: false, nota: 0, comentario: '' }

export function EstanteProvider({ children }) {
  // itens: { idDoAnime: { status, temporada, episodio, favorito, nota, comentario } }
  // extras: nomes de animes vistos que não estão no catálogo
  const [estante, setEstante] = useLocalStorage('estante-anime', ESTANTE_VAZIA)
  const [aviso, setAviso] = useState(null)

  useEffect(() => {
    if (!aviso) return
    const timer = setTimeout(() => setAviso(null), 5000)
    return () => clearTimeout(timer)
  }, [aviso])

  function salvar(nova, texto) {
    setAviso(texto ? { texto, anterior: estante } : null)
    setEstante(nova)
  }

  function trocarItem(id, mudancas, texto) {
    const itens = { ...estante.itens }
    if (mudancas === null) {
      delete itens[id]
    } else {
      itens[id] = { ...ITEM_NOVO, ...itens[id], ...mudancas }
    }
    salvar({ ...estante, itens }, texto)
  }

  const nome = (id) => porId[id].titulo

  function comecar(id) {
    trocarItem(id, { status: 'vendo' }, `${nome(id)} em Assistindo`)
  }

  function terminar(id) {
    trocarItem(id, { status: 'visto' }, `${nome(id)} marcado como assistido`)
  }

  function dropar(id) {
    trocarItem(id, { status: 'dropado', favorito: false }, `${nome(id)} dropado`)
  }

  function remover(id) {
    trocarItem(id, null, `${nome(id)} voltou ao catálogo`)
  }

  function favoritar(id) {
    const eraFavorito = estante.itens[id]?.favorito
    trocarItem(id, { favorito: !eraFavorito }, eraFavorito ? `${nome(id)} sem favorito` : `${nome(id)} favoritado`)
  }

  function ajustarProgresso(id, campo, quanto) {
    const item = estante.itens[id]
    if (!item) return
    const mudancas = { [campo]: Math.max(1, item[campo] + quanto) }
    // temporada nova começa do primeiro episódio
    if (campo === 'temporada' && quanto > 0) mudancas.episodio = 1
    trocarItem(id, mudancas)
  }

  function avaliar(id, nota, comentario) {
    trocarItem(id, { nota, comentario }, 'Avaliação salva')
  }

  function adicionarExtra(nomeDoAnime) {
    salvar({ ...estante, extras: [...estante.extras, nomeDoAnime] })
  }

  function removerExtra(posicao) {
    salvar({ ...estante, extras: estante.extras.filter((_, i) => i !== posicao) })
  }

  function desfazer() {
    if (!aviso) return
    setEstante(aviso.anterior)
    setAviso(null)
  }

  const comStatus = (status) => animes.filter((a) => estante.itens[a.id]?.status === status)

  const valor = {
    estante,
    aviso,
    vendo: comStatus('vendo'),
    vistos: comStatus('visto'),
    dropados: comStatus('dropado'),
    comecar,
    terminar,
    dropar,
    remover,
    favoritar,
    ajustarProgresso,
    avaliar,
    adicionarExtra,
    removerExtra,
    desfazer,
    fecharAviso: () => setAviso(null),
  }

  return <EstanteContext.Provider value={valor}>{children}</EstanteContext.Provider>
}

export function useEstante() {
  const contexto = useContext(EstanteContext)
  if (!contexto) throw new Error('useEstante precisa estar dentro de <EstanteProvider>')
  return contexto
}
