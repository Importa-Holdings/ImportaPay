import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface SubscribeResponse {
  message: string;
  success: boolean;
}

export const useSubscribe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribe = async (email: string) => {
    if (!email) {
      toast.error('Please enter a valid email address');
      return { success: false };
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post<SubscribeResponse>(
        'https://admin-api.pay.importa.biz/api/subscribe',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setIsSubscribed(true);
        toast.success('Successfully subscribed to our newsletter!');
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Subscription failed');
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to subscribe. Please try again.'
        : 'An unexpected error occurred';
      
      toast.error(errorMessage);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { subscribe, isLoading, isSubscribed };
};
