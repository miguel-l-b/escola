export interface DescribeProps {
  className?: string
  children: React.ReactNode
}

export default function Describe({ className, children }: DescribeProps) {
  return (
    <p className={`${className}`}>
      {children}
    </p>
  )
}