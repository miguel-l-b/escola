export interface TitleProps {
  className?: string
  children: React.ReactNode
}

export default function Title({ className, children }: TitleProps) {
  return (
    <h2 className={`${className}`}>
      {children}
    </h2>
  )
}