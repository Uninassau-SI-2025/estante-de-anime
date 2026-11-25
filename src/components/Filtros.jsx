import Icone from './Icone'
import './Filtros.css'

export default function Filtros({
  busca,
  aoBuscar,
  ordem,
  aoOrdenar,
  generos,
  genero,
  aoEscolherGenero,
  soDublados,
  aoAlternarDublados,
}) {
  return (
    <div className="filtros">
      <div className="filtros-linha">
        <div className="campo-busca">
          <Icone nome="lupa" />
          <input
            type="search"
            value={busca}
            onChange={(e) => aoBuscar(e.target.value)}
            placeholder="Buscar pelo nome…"
            aria-label="Buscar anime"
            autoComplete="off"
          />
          {busca && (
            <button className="limpar-busca" onClick={() => aoBuscar('')} aria-label="Limpar busca">
              ×
            </button>
          )}
        </div>

        <select className="ordenar" value={ordem} onChange={(e) => aoOrdenar(e.target.value)} aria-label="Ordenar">
          <option value="destaques">Destaques</option>
          <option value="az">A–Z</option>
          <option value="novos">Mais novos</option>
          <option value="antigos">Mais antigos</option>
        </select>
      </div>

      <div className="chips" aria-label="Filtrar por gênero">
        <button className="chip" aria-pressed={soDublados} onClick={aoAlternarDublados}>
          Só dublados
        </button>
        <button className="chip" aria-pressed={!genero} onClick={() => aoEscolherGenero('')}>
          Todos
        </button>
        {generos.map((g) => (
          <button key={g} className="chip" aria-pressed={genero === g} onClick={() => aoEscolherGenero(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}
