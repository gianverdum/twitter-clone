import { AuthProvider } from "@/auth/AuthContext"
import BaseLayout from "@/layouts/BaseLayout"
import Feed from "@/pages/Feed"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import NewPost from "@/pages/NewPost"
import Register from "@/pages/Register"
import NotFound from "@/pages/NotFound"
import PrivateRoute from "@/routes/PrivateRoute"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"


export default function AppRouter() {
  return (
    <Router>
      <AuthProvider> {/* <- envolve para fornecer contexto */}
        <BaseLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/feed"
              element={
                <PrivateRoute>
                  <Feed />
                </PrivateRoute>
              }
            />
            <Route
              path="/newpost"
              element={
                <PrivateRoute>
                  <NewPost />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BaseLayout>
      </AuthProvider>
    </Router>
  )
}