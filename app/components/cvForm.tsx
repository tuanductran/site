'use client'

import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface FormData {
  cvLink: string
  email: string
  fullName: string
  position: string
  socialLink: string
}

export default function CVForm() {
  const { formState: { errors }, handleSubmit, register, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const response = await fetch('/api/submit-cv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    if (response.ok) {
      toast.success(result.message)
      reset()
    }
    else {
      toast.error(result.message || 'Error submitting CV')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className={clsx(
              'bg-white border',
              errors.fullName ? 'border-red-500' : 'border-zinc-900/10',
              'placeholder:text-zinc-400 sm:text-sm appearance-none rounded-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary block w-full p-2.5 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:border-zinc-700 dark:placeholder:text-zinc-500 dark:focus:border-light dark:focus:ring-light/10',
            )}
            placeholder="Example: Nguyen Van A"
            {...register('fullName', { required: 'Full Name is required' })}
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
        </div>
        {/* Email Address */}
        <div className="w-full">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className={clsx(
              'bg-white border',
              errors.email ? 'border-red-500' : 'border-zinc-900/10',
              'placeholder:text-zinc-400 sm:text-sm appearance-none rounded-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary block w-full p-2.5 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:border-zinc-700 dark:placeholder:text-zinc-500 dark:focus:border-light dark:focus:ring-light/10',
            )}
            placeholder="Example: yourname@example.com"
            {...register('email', { required: 'Email Address is required' })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        {/* CV Link */}
        <div className="w-full">
          <label htmlFor="cvLink" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            CV Link
          </label>
          <input
            type="url"
            id="cvLink"
            className={clsx(
              'bg-white border',
              errors.cvLink ? 'border-red-500' : 'border-zinc-900/10',
              'placeholder:text-zinc-400 sm:text-sm appearance-none rounded-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary block w-full p-2.5 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:border-zinc-700 dark:placeholder:text-zinc-500 dark:focus:border-light dark:focus:ring-light/10',
            )}
            placeholder="Link to your CV (e.g., https://www.topcv.vn)"
            {...register('cvLink', { required: 'CV Link is required' })}
          />
          {errors.cvLink && <p className="mt-1 text-sm text-red-600">{errors.cvLink.message}</p>}
        </div>
        {/* Social Link */}
        <div className="w-full">
          <label htmlFor="socialLink" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Social Link
          </label>
          <input
            type="url"
            id="socialLink"
            className={clsx(
              'bg-white border',
              errors.socialLink ? 'border-red-500' : 'border-zinc-900/10',
              'placeholder:text-zinc-400 sm:text-sm appearance-none rounded-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary block w-full p-2.5 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:border-zinc-700 dark:placeholder:text-zinc-500 dark:focus:border-light dark:focus:ring-light/10',
            )}
            placeholder="Social media link (e.g., LinkedIn, Twitter)"
            {...register('socialLink', { required: 'Social Link is required' })}
          />
          {errors.socialLink && <p className="mt-1 text-sm text-red-600">{errors.socialLink.message}</p>}
        </div>
        {/* Position Applying For */}
        <div className="w-full">
          <label htmlFor="position" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Position Applying For
          </label>
          <input
            type="text"
            id="position"
            className={clsx(
              'bg-white border',
              errors.position ? 'border-red-500' : 'border-zinc-900/10',
              'placeholder:text-zinc-400 sm:text-sm appearance-none rounded-md focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary block w-full p-2.5 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:border-zinc-700 dark:placeholder:text-zinc-500 dark:focus:border-light dark:focus:ring-light/10',
            )}
            placeholder="Position title (e.g., UI Designer)"
            {...register('position', { required: 'Position is required' })}
          />
          {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
        </div>
      </div>
      <button
        type="submit"
        className="text-zinc-100 bg-zinc-800 hover:bg-zinc-700 font-medium rounded-lg text-sm w-full sm:w-auto p-2.5 text-center dark:bg-zinc-800 dark:hover:bg-zinc-700"
      >
        Submit Your CV
      </button>
    </form>
  )
}
