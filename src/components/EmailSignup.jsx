import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function EmailSignup() {
  // Debug: log env vars
  console.log('Supabase URL:', import.meta.env.PUBLIC_SUPABASE_URL)
  console.log('Supabase Key exists:', !!import.meta.env.PUBLIC_SUPABASE_ANON_KEY)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('')

    try {
      console.log('Attempting to insert email:', email)
      const { data, error } = await supabase
        .from('General Email List')
        .insert([{ email }])
      
      console.log('Supabase response:', { data, error })

      if (error) {
        if (error.code === '23505') {
          setStatus('Email already subscribed!')
        } else {
          setStatus('Error subscribing. Please try again.')
        }
      } else {
        setStatus('Successfully subscribed!')
        setEmail('')
      }
    } catch (error) {
      setStatus('Error subscribing. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={isLoading}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isLoading || !email}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status && (
        <p className={`text-sm ${status.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {status}
        </p>
      )}
    </form>
  )
}