import React from 'react'
import { Link } from 'react-router'
import { Mail, CheckCircle, ArrowRight } from 'lucide-react'

const EmailVerification = () => {
    return (
        <div className="min-h-screen w-full bg-[#0a0a0f] text-zinc-100 flex items-center justify-center px-4 py-10">
            <div className="relative w-full max-w-sm">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-base font-semibold tracking-tight">PURA AI</h1>
                        <p className="text-xs text-zinc-400 -mt-0.5">Verify your email</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl p-6 shadow-2xl shadow-black/40 text-center">
                    <CheckCircle className="mx-auto mb-3 h-8 w-8 text-emerald-400" />
                    <h2 className="text-lg font-semibold">Verify your email address</h2>
                    <p className="text-sm text-zinc-400 mt-2">
                        We've sent a verification link to the email address you used to register.
                    </p>

                    <p className="text-sm text-zinc-300 mt-4">
                        Open your email inbox and click the "Verify Email" link to activate your account. Once verified, you can log in.
                    </p>

                    <div className="mt-6">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow"
                        >
                            Back to login
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailVerification
