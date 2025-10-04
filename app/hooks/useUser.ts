"use client";

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/store/authStore';

export function useUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, setUser, token } = useAuthStore();

  const fetchUser = async () => {
    if (!token) {
      setIsLoading(false);
      return null;
    }

    try {
      setIsLoading(true);
      const response = await fetch('https://admin-api.pay.importa.biz/api/auth/user', {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'X-CSRF-TOKEN': '',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Error fetching user:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      toast.error('Failed to load user data');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user data on mount if we have a token but no user data
  useEffect(() => {
    if (token && !user) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [token, user]);

  const refetch = async () => {
    return await fetchUser();
  };

  return {
    user,
    isLoading,
    error,
    refetch,
  };
}