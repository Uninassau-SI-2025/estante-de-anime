import { Link } from 'react-router-dom'
import Vazio from '../components/Vazio'

export default function NaoEncontrada() {
  return (
    <Vazio titulo="Essa página não existe">
      O endereço pode estar errado ou o anime saiu do catálogo.
      <br />
      <Link className="botao-claro" to="/">
        Voltar para o catálogo
      </Link>
    </Vazio>
  )
}
