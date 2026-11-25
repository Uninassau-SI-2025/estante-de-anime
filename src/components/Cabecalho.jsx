import { Link, NavLink } from 'react-router-dom'
import { useEstante } from '../context/EstanteContext'
import { animes } from '../data/animes'
import Icone from './Icone'
import './Cabecalho.css'

export default function Cabecalho({ tema, aoTrocarTema }) {
  const { estante, vendo, vistos } = useEstante()

  const porVer = animes.length - Object.keys(estante.itens).length
  const totalVistos = vistos.length + estante.extras.length
  const porcentagem = Math.round((vistos.length / animes.length) * 100)

  const abas = [
    { para: '/', rotulo: 'Catálogo', icone: 'catalogo', numero: porVer },
    { para: '/assistindo', rotulo: 'Assistindo', icone: 'play', numero: vendo.length },
    { para: '/assisti', rotulo: 'Assisti', icone: 'visto', numero: totalVistos },
    { para: '/sugestoes', rotulo: 'Sugestões', icone: 'dado' },
  ]

  return (
    <header className="topo">
      <div className="largura">
        <div className="marca">
          <Link to="/" className="marca-nome">
            <span className="marca-jp" lang="ja">
              アニメ棚
            </span>
            Minha estante de anime
          </Link>

          <div className="marca-lado">
            <div className="resumo" aria-label="Resumo da estante">
              <div className="resumo-item">
                <b>{porVer}</b>
                <span>por ver</span>
              </div>
              <div className="resumo-item vendo">
                <b>{vendo.length}</b>
                <span>vendo</span>
              </div>
              <div className="resumo-item vistos">
                <b>{totalVistos}</b>
                <span>vistos</span>
              </div>
            </div>
            <button
              className="botao-tema"
              onClick={aoTrocarTema}
              aria-label={tema === 'escuro' ? 'Usar tema claro' : 'Usar tema escuro'}
              title={tema === 'escuro' ? 'Tema claro' : 'Tema escuro'}
            >
              <Icone nome={tema === 'escuro' ? 'sol' : 'lua'} />
            </button>
          </div>
        </div>

        <div className="barra-geral" title={`${porcentagem}% do catálogo assistido`}>
          <i style={{ width: porcentagem + '%' }} />
        </div>

        <nav className="abas" aria-label="Seções">
          {abas.map((aba) => (
            <NavLink
              key={aba.para}
              to={aba.para}
              end={aba.para === '/'}
              className={({ isActive }) => (isActive ? 'aba ativa' : 'aba')}
            >
              <Icone nome={aba.icone} />
              {aba.rotulo}
              {aba.numero > 0 && <span className="aba-numero">{aba.numero}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
