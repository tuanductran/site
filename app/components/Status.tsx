import clsx from 'clsx'
import type { FC } from 'react'

interface StatusProps {
  isSelected: boolean
  onClick: () => void
  title: string
}

interface NotionStatusProps {
  selectedStatus: string | null
  setSelectedStatus: (status: string | null) => void
  status: string[]
}

const Status: FC<StatusProps> = ({ isSelected, onClick, title }) => {
  return (
    <li className="cursor-pointer" onClick={onClick}>
      <h2 className={clsx(
        'flex text-sm leading-6 font-medium whitespace-nowrap py-3 -mb-px max-w-max',
        isSelected ? 'border-b text-primary dark:text-light border-current' : 'text-zinc-900 border-transparent hover:border-b hover:border-zinc-300 dark:text-zinc-200 dark:hover:border-zinc-700',
      )}
      >
        {title}
      </h2>
    </li>
  )
}

export const NotionStatus: FC<NotionStatusProps> = ({
  selectedStatus,
  setSelectedStatus,
  status,
}) => {
  return (
    <ul className="hide-scrollbar mb-6 pb-[1px] flex-none min-w-full overflow-y-auto space-x-6 flex border-b dark:border-zinc-800/50">
      <Status
        title="All Status"
        isSelected={selectedStatus === null}
        onClick={() => setSelectedStatus(null)}
      />
      {status.map(status => (
        <Status
          key={status}
          title={status}
          isSelected={selectedStatus === status}
          onClick={() => setSelectedStatus(status)}
        />
      ))}
    </ul>
  )
}
