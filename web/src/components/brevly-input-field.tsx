import { WarningIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & {
  label: string
  prefix?: string
  error?: string
}

export function InputField({
  label,
  prefix,
  error,
  type = 'text',
  ...props
}: InputProps) {
  return (
    <div className="group flex w-full flex-col gap-2">
      <label
        htmlFor={props.id}
        className="text-[10px] leading-3.5 font-normal uppercase text-gray-500 group-focus-within:text-blue-base group-focus-within:font-semibold"
      >
        {label}
      </label>
      <div className="flex h-12 w-full items-center rounded-lg border border-gray-300 px-4 focus-within:border-blue-base">
        {prefix && (
          <span className="shrink-0 text-sm text-gray-400">{prefix}</span>
        )}
        <input
          {...props}
          type={type}
          className="min-w-0 flex-1 bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-400"
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <WarningIcon
            size={16}
            weight="regular"
            className="shrink-0 text-red-600"
          />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
