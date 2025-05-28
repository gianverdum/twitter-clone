import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/auth/AuthContext"
import BaseLayout from "@/layouts/BaseLayout"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import PrivateRoute from "@/routes/PrivateRoute"


export default function AppRouter() {
  return (
    <Router>
      <AuthProvider> {/* <- envolve para fornecer contexto */}
        <BaseLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
          </Routes>
        </BaseLayout>
      </AuthProvider>
    </Router>
  )
}