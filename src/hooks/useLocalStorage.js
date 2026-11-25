import { useEffect, useState } from 'react'

// useState que guarda o valor no navegador, pra não perder a lista ao fechar a aba
export function useLocalStorage(chave, inicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave)
      return salvo ? JSON.parse(salvo) : inicial
    } catch {
      return inicial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor))
    } catch {
      // navegação anônima pode bloquear o localStorage; o site segue funcionando sem salvar
    }
  }, [chave, valor])

  return [valor, setValor]
}
