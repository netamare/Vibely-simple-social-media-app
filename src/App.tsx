import { Navigate, Route, Routes } from 'react-router-dom';
import { useApp } from './store';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { SearchPage } from './pages/SearchPage';
import { Settings } from './pages/Settings';

function ProtectedRoutes() {
  return <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/profile/:id" element={<Profile/>}/>
    <Route path="/search" element={<SearchPage/>}/>
    <Route path="/notifications" element={<Notifications/>}/>
    <Route path="/settings" element={<Settings/>}/>
    <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>;
}

export function App() {
  const { loggedIn } = useApp();
  return <Routes>
    <Route path="/login" element={<Auth/>}/>
    <Route path="/register" element={<Auth register/>}/>
    <Route path="*" element={loggedIn ? <ProtectedRoutes/> : <Navigate to="/login"/>}/>
  </Routes>;
}
