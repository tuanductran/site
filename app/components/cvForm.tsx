'use client'

import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface FormData {
  fullName: string
  email: string
  cvLink: string
  socialLink: string
  position: string
}

export default function CVForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

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
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className={clsx(
              'bg-slate-50 border',
              errors.fullName ? 'border-red-500' : 'border-slate-300',
              'text-slate-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white',
            )}
            placeholder="Example: Nguyen Van A"
            {...register('fullName', { required: 'Full Name is required' })}
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
        </div>
        {/* Email Address */}
        <div className="w-full">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className={clsx(
              'bg-slate-50 border',
              errors.email ? 'border-red-500' : 'border-slate-300',
              'text-slate-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white',
            )}
            placeholder="Example: yourname@example.com"
            {...register('email', { required: 'Email Address is required' })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        {/* CV Link */}
        <div className="w-full">
          <label htmlFor="cvLink" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
            CV Link
          </label>
          <input
            type="url"
            id="cvLink"
            className={clsx(
              'bg-slate-50 border',
              errors.cvLink ? 'border-red-500' : 'border-slate-300',
              'text-slate-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white',
            )}
            placeholder="Link to your CV (e.g., https://www.topcv.vn)"
            {...register('cvLink', { required: 'CV Link is required' })}
          />
          {errors.cvLink && <p className="mt-1 text-sm text-red-600">{errors.cvLink.message}</p>}
        </div>
        {/* Social Link */}
        <div className="w-full">
          <label htmlFor="socialLink" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
            Social Link
          </label>
          <input
            type="url"
            id="socialLink"
            className={clsx(
              'bg-slate-50 border',
              errors.socialLink ? 'border-red-500' : 'border-slate-300',
              'text-slate-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white',
            )}
            placeholder="Social media link (e.g., LinkedIn, Twitter)"
            {...register('socialLink', { required: 'Social Link is required' })}
          />
          {errors.socialLink && <p className="mt-1 text-sm text-red-600">{errors.socialLink.message}</p>}
        </div>
        {/* Position Applying For */}
        <div className="w-full">
          <label htmlFor="position" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
            Position Applying For
          </label>
          <input
            type="text"
            id="position"
            className={clsx(
              'bg-slate-50 border',
              errors.position ? 'border-red-500' : 'border-slate-300',
              'text-slate-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white',
            )}
            placeholder="Position title (e.g., UI Designer)"
            {...register('position', { required: 'Position is required' })}
          />
          {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit Your CV
      </button>
    </form>
  )
}
