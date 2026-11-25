export default function Vazio({ titulo, children }) {
  return (
    <div className="vazio">
      <b>{titulo}</b>
      {children}
    </div>
  )
}
