'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApi } from '@/app/context/ApiContext'

export default function Login() {
    const router = useRouter()
    const api = useApi()
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({username: '', password: ''})

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch(api.baseUrl + api.endpoints.login, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error('Login failed')
        }

        const data = await response.json()

        // Store both access and refresh tokens
        const oneDay = 24 * 60 * 60 * 1000;
        const oneMonth = 30 * oneDay;
        
        document.cookie = `token=${data.access}; path=/; max-age=${oneDay}`;
        document.cookie = `refresh_token=${data.refresh}; path=/; max-age=${oneMonth}`;

        router.push('/')

        router.refresh()
    } catch (err) {
        setError('Invalid username or password')
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] p-8">
              <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"> Welcome Back </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" id="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="form-input" placeholder="Enter your username" required />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1"> Password </label>
                        <input type="password" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="form-input" placeholder="Enter your password" required/>
                    </div>

                    {error && (
                        <div className="mb-4 mt-5 text-center text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <button type="submit" className="btn-primary w-full">Sign In</button>
                </form>
          </div>
      </div>
  )
}
