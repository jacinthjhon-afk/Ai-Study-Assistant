import { useState } from 'react'
import { supabase } from './lib/supabase'

export default function App() {
  // Track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  // If logged in, show Dashboard; otherwise show Login
  if (isLoggedIn) {
    return <Dashboard userEmail={userEmail} onLogout={() => setIsLoggedIn(false)} />
  }
  
  return <LoginScreen onLogin={(email) => { setUserEmail(email); setIsLoggedIn(true); }} />
}

// --- LOGIN SCREEN COMPONENT ---
function LoginScreen({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Check your email for confirmation!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        // ✅ SUCCESS: Call onLogin to switch to Dashboard
        onLogin(email)
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          AI Study Assistant
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-purple-600 hover:underline text-sm"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </form>
      </div>
    </div>
  )
}

// --- DASHBOARD COMPONENT ---
function Dashboard({ userEmail, onLogout }: { userEmail: string, onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome!</h2>
            <p className="text-gray-600">You're logged in as:</p>
            <p className="text-lg font-medium text-purple-600 mt-2">{userEmail}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Study Resources</h2>
            <p className="text-gray-600">Manage your notes</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">0</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Chat History</h2>
            <p className="text-gray-600">AI conversation history</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">0</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Assistant</h2>
            <p className="text-gray-600">Get help with your studies</p>
            <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
              Start Chatting
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}