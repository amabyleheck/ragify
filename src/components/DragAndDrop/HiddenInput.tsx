import React from 'react'

const HiddenInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = props => {
  return (
    <input
      className='clip-[rect(0,0,0,0)] clip-path-[inset(50%)] absolute bottom-0 left-0 h-[1px] w-[1px] overflow-hidden whitespace-nowrap'
      {...props}
    />
  )
}

export default HiddenInput
