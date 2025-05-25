import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";


const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
 
  if(isLoading) return <PageLoader />

  const isAuthenticated = Boolean(authUser);
  const  isOnboarded = authUser?.isOnboarded;

  return (
    <div className=" h-screen" data-theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <HomePage />   
          </Layout>
          ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
          )} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded? "/" : "/onboarding"}/>} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> :<Navigate to={isOnboarded? "/" : "/onboarding"}/>} />
        <Route path="/notifications" element={
          isAuthenticated ? (
              isOnboarded ? (
                <Layout showSidebar={true}>
                  <NotificationPage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" />
              ) 
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route path="/onboarding" element={isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )} />
      </Routes>
 
      <Toaster />
    </div>
  )
}

export default App;