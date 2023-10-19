export interface ButtonProps {
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

export default function Button({className, onClick, children}: ButtonProps) {
  return (
    <button className={`${className} duration-500 ease-out bg-blue-500 hover:bg-blue-100  hover:text-blue-600 text-gray-50 font-medium py-1 px-3 rounded-lg`} onClick={onClick}>
      {children}
    </button>
  )
}