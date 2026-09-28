type InputProps = {
  id: string
  label: string
  placeholder: string
  type?: string
}

export function InputField({
  id,
  label,
  placeholder,
  type = 'text',
}: InputProps) {
  return (
    <div className="flex w-full flex-col gap-2 gray-500">
      <label
        htmlFor={id}
        className="text-[10px] leading-3.5 font-normal uppercase text-gray-500"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm leading-4.5 placeholder:text-gray-400"
      />
    </div>
  )
}
