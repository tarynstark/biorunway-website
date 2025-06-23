import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function HeroEmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('')

    try {
      const { data, error } = await supabase
        .from('General Email List')
        .insert([{ email }])

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
    <div className="w-full max-w-[360px] flex flex-col items-center gap-4">
      <div className="w-full px-6 py-2.5 overflow-hidden rounded-[80px] justify-start items-start gap-2.5 inline-flex">
        <div className="flex-1 py-1 pl-5 pr-1 bg-[rgba(251,245,245,0.24)] shadow-[0px_2px_3px_rgba(0,0,0,0.11)] overflow-hidden rounded-[100px] outline outline-1 outline-au-chico-600 outline-offset-[-1px] backdrop-blur-[5px] justify-between items-center flex">
          <form onSubmit={handleSubmit} className="w-full flex justify-between items-center">
            <div className="self-stretch justify-center items-center gap-2.5 flex flex-1">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="text-cod-gray-50 text-[14px] font-sf-pro font-medium leading-5 bg-transparent border-none outline-none placeholder:text-cod-gray-50 w-full"
                required
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading || !email}
              className="px-3 py-1.5 bg-au-chico-950 overflow-hidden rounded-[80px] justify-center items-center gap-2.5 flex hover:bg-au-chico-900 transition-colors disabled:opacity-50"
            >
              <span className="text-au-chico-50 text-[14px] font-sf-pro font-medium leading-5">
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </span>
            </button>
          </form>
        </div>
      </div>
      {status && (
        <div className="text-center">
          <p className={`text-sm ${status.includes('Error') ? 'text-red-300' : 'text-green-300'}`}>
            {status}
          </p>
        </div>
      )}
    </div>
  )
}