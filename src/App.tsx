import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Landing from './components/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/Dashboard';
import Settings from './components/settings/Settings';
import TextSteganography from './components/steganography/TextSteganography';
import ImageSteganography from './components/steganography/ImageSteganography';
import VideoSteganography from './components/steganography/VideoSteganography';
import AudioSteganography from './components/steganography/AudioSteganography';
import NetworkSteganography from './components/steganography/NetworkSteganography';
import Reveal from './components/Reveal';
import About from './components/About';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/text" element={<TextSteganography />} />
            <Route path="/image" element={<ImageSteganography />} />
            <Route path="/video" element={<VideoSteganography />} />
            <Route path="/audio" element={<AudioSteganography />} />
            <Route path="/network" element={<NetworkSteganography />} />
            <Route path="/reveal" element={<Reveal />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;