import React from 'react'

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number
}

export default function Avatar({ size = 40, src, alt = 'avatar', ...rest }: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover"
      {...rest}
    />
  )
}
