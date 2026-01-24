import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LazyImage from './components/LazyImage';
import { lazy, Suspense, memo } from 'react';
import './App.css'
import Profile from './components/Profile'
// Lazy load components for better performance
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

// Memoized video card component for better performance
const VideoCard = memo(({ video }) => (
  <div className="video-card">
    <LazyImage
      src={video.thumbnail}
      alt={video.title}
      className="thumbnail"
    />
    <h3 className="title">{video.title}</h3>
  </div>
));

function Home() {
  const { logout, user } = useAuth();

  const videos = [
    { id: 1, title: 'Sample Video 1', thumbnail: 'https://via.placeholder.com/300x200', url: '#' },
    { id: 2, title: 'Sample Video 2', thumbnail: 'https://via.placeholder.com/300x200', url: '#' },
    { id: 3, title: 'Sample Video 3', thumbnail: 'https://via.placeholder.com/300x200', url: '#' },
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>VidTube</h1>
        <nav>
          <a href="/">Home</a>
          <a href="#">Upload</a>
          <Link to="/profile">Profile</Link>
          <img src={user.avatar} className="nav-avatar" />

          {user && <span>Welcome, {user.fullname || user.username}!</span>}
          <button onClick={logout}>Logout</button>
        </nav>
      </header>

      <main className="main">
        <h2 className="mb-3">Recommended Videos</h2>
        <div className="video-grid">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
}

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="app">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </Suspense>
  );
}

export default App;
