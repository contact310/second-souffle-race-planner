import logoSvg from '../assets/logo.svg'

export default function Logo({ className = '' }) {
  return (
    <img
      src={logoSvg}
      alt="Second Souffle"
      className={className}
      style={{ height: '40px', width: 'auto' }}
    />
  )
}
