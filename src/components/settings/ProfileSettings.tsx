import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, AlertCircle } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

const ProfileSettings = () => {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setError('');
    setMessage('');
    setLoading(true);

    try {
      await updateProfile(currentUser, {
        displayName: displayName.trim(),
        photoURL: photoURL.trim()
      });
      setMessage('Profile updated successfully');
    } catch (error: any) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500"
          >
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-emerald-500"
          >
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{message}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-24 h-24 rounded-full border-2 border-emerald-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500"
              placeholder="Enter your display name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Profile Picture URL
            </label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500"
              placeholder="Enter profile picture URL"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            fullWidth
            className="mt-6"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;