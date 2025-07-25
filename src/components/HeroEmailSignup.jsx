import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Spinner SVG component
const SpinnerIcon = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#fbf5f5" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M8 2a6 6 0 0 1 6 6" stroke="#fbf5f5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
)

// Checkmark SVG component
const CheckIcon = () => (
  <div className="w-4 h-4 flex items-center justify-center">
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#fbf5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export default function HeroEmailSignup() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState('')
  const [showCheckEmail, setShowCheckEmail] = useState(false)

  // Reset state when component mounts or page reloads
  useEffect(() => {
    const handleBeforeUnload = () => {
      setEmail('')
      setIsLoading(false)
      setIsConfirmed(false)
      setIsComplete(false)
      setError('')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isComplete) return
    
    // Client-side email validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setIsLoading(true)
    setError('')

    try {
      // Sign up user with Supabase Auth - this will trigger confirmation email via SMTP
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: `temp_${Math.random().toString(36).slice(2)}`, // Temporary password for newsletter-only users
        options: {
          data: {
            newsletter_signup: true,
            signup_source: 'hero'
          },
          emailRedirectTo: `${window.location.origin}/auth/confirm`
        }
      })

      if (error) {
        console.error('Supabase Auth error:', error)
        if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
          setError('This email is already subscribed to our newsletter')
        } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
          setError('Network error. Please check your connection and try again.')
        } else {
          setError('Error subscribing. Please try again.')
        }
        setIsLoading(false)
      } else {
        // Auth signup successful - show check email message
        setIsLoading(false)
        setShowCheckEmail(true)
        
        // Show confirmed state briefly, then complete
        setTimeout(() => {
          setIsConfirmed(true)
          setShowCheckEmail(false)
        }, 2000)
        
        setTimeout(() => {
          setIsComplete(true)
          setIsConfirmed(false)
        }, 2800)
      }
    } catch (error) {
      console.error('Email signup error:', error)
      if (error.name === 'TypeError' && error.message?.includes('fetch')) {
        setError('Network error. Please check your connection and try again.')
      } else {
        setError('Error subscribing. Please try again.')
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[360px] flex flex-col items-center gap-4">
      <div className="w-full px-6 py-2.5">
        <div 
          className="backdrop-blur-[5px] bg-[rgba(251,245,245,0.24)] rounded-[100px] border border-[#a5555b]"
          style={{
            transition: 'all 400ms cubic-bezier(0.76, 0, 0.24, 1)',
            boxShadow: '0px 39px 11px 0px rgba(0,0,0,0), 0px 25px 10px 0px rgba(0,0,0,0.02), 0px 14px 8px 0px rgba(0,0,0,0.05), 0px 6px 6px 0px rgba(0,0,0,0.09), 0px 2px 3px 0px rgba(0,0,0,0.11)'
          }}
        >
          <form onSubmit={handleSubmit} className="flex items-center">
            {isComplete ? (
              // Complete State - Full button
              <div className="w-full p-1">
                <div className="bg-[#371a1e] rounded-[80px] px-3 py-1.5 flex items-center justify-center gap-2.5 w-full">
                  <CheckIcon />
                  <span 
                    className="font-sf-pro text-[14px] font-medium leading-5 tracking-[0.28px]"
                    style={{ color: '#fbf5f5' }}
                  >
                    You're in.
                  </span>
                </div>
              </div>
            ) : (
              // Default, User Entry, Loading, Confirmed States
              <div className="flex items-center justify-between w-full pl-5 pr-1 py-1">
                <div className="flex items-center flex-1">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="bg-transparent border-none outline-none w-full text-[14px] font-medium leading-5 tracking-[0.28px] text-[#f7f7f6] placeholder:text-[#cac9c5] font-sf-pro"
                    style={{
                      color: email ? '#f7f7f6' : '#cac9c5'
                    }}
                    required
                    disabled={isLoading || isConfirmed}
                    aria-label="Email address for newsletter signup"
                    aria-describedby={error ? 'email-error' : undefined}
                    aria-invalid={error ? 'true' : 'false'}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isLoading || isConfirmed || !email || isComplete}
                  className="relative px-3 py-1.5 bg-[#371a1e] rounded-[80px] flex items-center justify-center gap-2.5 hover:bg-[#2d1519] disabled:opacity-50"
                  style={{
                    transition: 'all 300ms cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  {isLoading && <SpinnerIcon />}
                  {isConfirmed && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CheckIcon />
                    </div>
                  )}
                  <span 
                    className={`font-sf-pro text-[14px] font-medium leading-5 tracking-[0.28px] ${
                      (isLoading || isConfirmed) ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{
                      color: '#fbf5f5',
                      transition: 'opacity 250ms cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                  >
                    Sign Up
                  </span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      {error && (
        <div className="text-center" role="alert">
          <p id="email-error" className="text-sm text-red-300">
            {error}
          </p>
        </div>
      )}
      {showCheckEmail && (
        <div className="text-center">
          <p className="text-sm text-[#f7f7f6] opacity-80">
            Check your email for a confirmation link to complete your subscription.
          </p>
        </div>
      )}
    </div>
  )
}