import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Profile from "../pages/Auth/Profile";
import { LoadingProvider } from "../contexts/loadingContext";
import MyInterviews from "../pages/MyInterviews";
import AboutPage from "../pages/AboutPage";
import PracticeResourcePage from "../components/PracticeResourcePage";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <LoadingProvider> {/* Wrap Layout with LoadingProvider */}
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
         
           <Route
             path="/about-us"
            element={
              <ProtectedRoute>
                <Layout>
                   <AboutPage />
                </Layout>
              </ProtectedRoute>
            }
          />
           <Route
             path="/practice"
            element={
              <ProtectedRoute>
                <Layout>
                   <PracticeResourcePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
           <Route
            path="/my-interviews"
            element={
              <ProtectedRoute>
                <Layout>
                  <MyInterviews />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
         <Route path="*" element={<NotFound />} />
      </LoadingProvider>
    </BrowserRouter>
  );
}
