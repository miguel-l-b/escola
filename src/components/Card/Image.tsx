export interface ImageProps {
  className?: string
  alt?: string
  src?: string
  children?: React.ReactNode
}

export default function Image({ className, alt, src, children }: ImageProps) {
  return src?
    <img className={`${className}`} alt={alt} src={src} />
    :
    <div className={`${className}`}>
      {children}
    </div>
}