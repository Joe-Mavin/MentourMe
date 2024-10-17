const NeonText = ({ children, color }) => (
    <span className={`relative inline-block ${color}`}>
      {children}
      <span className={`absolute inset-0 blur-sm ${color}`}>{children}</span>
    </span>
  )

export default NeonText