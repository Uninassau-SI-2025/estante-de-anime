import { useEstante } from '../context/EstanteContext'
import './Aviso.css'

// Mensagem rápida no rodapé depois de cada ação, com a opção de desfazer.
export default function Aviso() {
  const { aviso, desfazer } = useEstante()

  return (
    <div className={aviso ? 'aviso visivel' : 'aviso'} role="status" aria-live="polite">
      {aviso && (
        <>
          <span>{aviso.texto}</span>
          <button onClick={desfazer}>Desfazer</button>
        </>
      )}
    </div>
  )
}
