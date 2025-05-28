import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/auth/AuthContext"
import BaseLayout from "@/layouts/BaseLayout"
import Home from "@/pages/Home"
import Login from "@/pages/Login"


export default function AppRouter() {
  return (
    <Router>
      <AuthProvider> {/* <- envolve para fornecer contexto */}
        <BaseLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BaseLayout>
      </AuthProvider>
    </Router>
  )
}