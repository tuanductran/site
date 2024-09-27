import * as Avatar from '@radix-ui/react-avatar'

export function Author({ name }) {
  return (
    <Avatar.Root className="relative flex items-center gap-x-4">
      <Avatar.Fallback className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-medium text-zinc-600 dark:text-zinc-400 select-none">
        {name[0]}
      </Avatar.Fallback>
      <div className="text-sm leading-6">
        <p className="font-semibold text-zinc-900 dark:text-zinc-200">{name}</p>
        <p className="text-zinc-600 dark:text-zinc-400">Author</p>
      </div>
    </Avatar.Root>
  )
}
