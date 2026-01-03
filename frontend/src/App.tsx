import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Forgot from './pages/Forgot'
import Video from './pages/Video'
import { ProtectedRoute } from './components'
import Upload from './pages/Upload'
import Layout from './components/Layout'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/video/:id" element={<Video />} />
          <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Layout>
    </div>
  )
}
// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Profile from './pages/Profile'
// import Header from './components/Header'

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       <Header />
//       <main className="container mx-auto px-4 py-6">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/profile/:id" element={<Profile />} />
//         </Routes>
//       </main>
//     </div>
//   )
// }
