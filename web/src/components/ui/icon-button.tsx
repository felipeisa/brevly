import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const iconButtonVariants = tv({
  base: 'flex size-8 cursor-pointer items-center justify-center rounded-sm bg-gray-200 disabled:opacity-50 disabled:pointer-events-none border border-transparent hover:border-blue-base',
  // base: 'flex size-8 items-center justify-center rounded-sm bg-gray-200',
})

type IconButtonProps = ComponentProps<'button'> &
  VariantProps<typeof iconButtonVariants>

export function IconButton({ className, ...props }: IconButtonProps) {
  return <button className={iconButtonVariants({ className })} {...props} />
}
