export interface RootProps {
  className?: string
  children: React.ReactNode
}

export default function Root({ className, children }: RootProps) {
  return( 
    <div className={`bg-gray-200 px-8 py-4 w-fit flex rounded-lg ${className}`}>
      {children}
    </div>
  )
}