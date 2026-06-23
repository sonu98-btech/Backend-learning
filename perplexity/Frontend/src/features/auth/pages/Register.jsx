import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { Sparkles, User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '../hooks/use.auth'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loadin)

  const submitForm = async (event) => {
    event.preventDefault()
    try {
      setSubmitting(true)
      await handleRegister(username, email, password)
      navigate('/login')
    } finally {
      setSubmitting(false)
    }
  }

  if (!loading && user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-zinc-100 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">PURA AI</h1>
            <p className="text-xs text-zinc-400 -mt-0.5">Research Assistant</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Create your account</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Join PURA AI and start exploring smarter research.
            </p>
          </div>

          <form onSubmit={submitForm} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-indigo-500/60 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-indigo-500/60 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-indigo-500/60 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="group mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Register
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-[11px] uppercase tracking-wider text-zinc-500">or</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <p className="text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          By registering, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default Register
