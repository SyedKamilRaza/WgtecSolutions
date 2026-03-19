'use client';

import React, { useEffect, useState } from 'react';
import ClientChatButton from './ClientChatButton';

export default function ChatButtonWrapper() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initializeGuestUser();
  }, []);

  const initializeGuestUser = async () => {
    // Try to get user from localStorage or auth context
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userStr && token) {
      try {
        const userData = JSON.parse(userStr);
        setUser({
          userId: userData?.id || userData?._id,
          userName: userData?.name || userData?.username,
          userEmail: userData?.email,
          userProfileImage: userData?.profileImage || userData?.avatar || 'https://via.placeholder.com/40'
        });
        return;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // If no user, create a guest session
    try {
      const response = await fetch('http://localhost:8003/api/v1/auth/guest-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `guest-${Date.now()}@example.com`,
          username: `guest-${Date.now()}`,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setUser({
          userId: data.user._id,
          userName: data.user.username,
          userEmail: data.user.email,
          userProfileImage: 'https://via.placeholder.com/40'
        });
      } else {
        // Fallback: use a predictable guest ID
        const guestId = 'guest-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', guestId);
        localStorage.setItem('userName', 'Guest User');
        
        setUser({
          userId: guestId,
          userName: 'Guest User',
          userEmail: 'guest@example.com',
          userProfileImage: 'https://via.placeholder.com/40'
        });
      }
    } catch (error) {
      console.error('Error initializing guest user:', error);
      
      // Fallback
      const guestId = 'guest-' + Math.random().toString(36).substr(2, 9);
      setUser({
        userId: guestId,
        userName: 'Guest User',
        userEmail: 'guest@example.com',
        userProfileImage: 'https://via.placeholder.com/40'
      });
    }
  };

  if (!mounted || !user) {
    return null;
  }

  return (
    <ClientChatButton
      userId={user.userId}
      userName={user.userName}
      userEmail={user.userEmail}
      userProfileImage={user.userProfileImage}
    />
  );
}
