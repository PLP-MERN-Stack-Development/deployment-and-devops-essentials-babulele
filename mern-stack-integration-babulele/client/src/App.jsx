// App.jsx - Main application component with routing

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { Suspense, lazy, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import { useNotifications, NotificationContainer } from './components/NotificationContainer';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Loading from './components/Loading';
import { setTokenGetter } from './services/api';
import './App.css';

// Code splitting: Lazy load page components for better performance
const Home = lazy(() => import('./pages/Home'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const PostForm = lazy(() => import('./pages/PostForm'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));

// Get Clerk publishable key from environment
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  console.error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable');
}

// Component to set up token getter
const TokenSetup = ({ children }) => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    // Set up token getter for API service
    setTokenGetter(async () => {
      try {
        // Only get token if user is signed in
        if (!isSignedIn) {
          return null;
        }
        
        // Get the session token for backend verification
        // getToken() returns a JWT token that can be verified by the backend
        const token = await getToken();
        return token;
      } catch (error) {
        console.error('Error getting token:', error);
        return null;
      }
    });
  }, [getToken, isSignedIn]);

  return children;
};

const AppRoutes = () => {
  const notifications = useNotifications();

  return (
    <>
      <TokenSetup>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id" element={<PostDetail showNotification={notifications.showNotification} />} />
              <Route
                path="/posts/new"
                element={
                  <ProtectedRoute>
                    <PostForm showNotification={notifications.showNotification} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/posts/:id/edit"
                element={
                  <ProtectedRoute>
                    <PostForm showNotification={notifications.showNotification} />
                  </ProtectedRoute>
                }
              />
              <Route path="/sign-in/*" element={<SignIn />} />
              <Route path="/sign-up/*" element={<SignUp />} />
            </Routes>
          </Suspense>
        </Layout>
      </TokenSetup>
      <NotificationContainer 
        notifications={notifications.notifications} 
        onRemove={notifications.removeNotification} 
      />
    </>
  );
};

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AuthProvider>
        <PostProvider>
          <Router>
            <AppRoutes />
          </Router>
        </PostProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}

export default App;
