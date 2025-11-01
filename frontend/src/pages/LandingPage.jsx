import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import SignupForm from '../components/auth/SignupForm'

export default function LandingPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-indigo-50 to-pink-50 p-6">
            {/* Top-right auth links */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
                <a
                    href="/auth/login"
                    className="px-4 py-2 rounded-md text-sm font-medium text-slate-700 bg-white/80 border border-transparent hover:bg-white/95 shadow-sm"
                >
                    Login
                </a>
                <a
                    href="/auth/signup"
                    className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                >
                    Sign up
                </a>
            </div>

            <section className="w-full max-w-4xl mx-auto text-center relative">
                <div className="bg-white/90 dark:bg-slate-800/80 rounded-2xl p-12 sm:p-16 shadow-xl backdrop-blur-md">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                        Welcome to Nunya Learns' Arena
                    </h1>
                    <p className="text-lg sm:text-2xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                        Explore curated courses, hands-on projects, and a supportive community to help you grow your skills.
                    </p>

                    {/* <div className="flex items-center justify-center gap-4 flex-wrap">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md"
                        >
                            Browse Courses
                        </a>

                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-800 dark:text-slate-100 bg-white/60"
                        >
                            Get Started
                        </a>
                    </div> */}

                    <div className="mt-8 text-xl text-slate-600 dark:text-slate-400">
                        Already have an account?{' '}
                        <a href="/auth/login" className="text-green-500 hover:underline">
                            Log in
                        </a>
                        {' '}or sign up to save your progress.
                    </div>
                </div>
            </section>
        </main>
    )
}