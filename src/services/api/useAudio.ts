import { useState } from 'react';

interface UseAudioReturn {
  audioUrl: string | null;
  fetchAudio: () => Promise<string | null>;
}

export const useAudio = (
  record: string,
  partnershipId: string,
): UseAudioReturn => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const fetchAudio = async (): Promise<string | null> => {
    try {
      const url = `https://api.skilla.ru/mango/getRecord?record=${record}&partnership_id=${partnershipId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      });

      if (!response.ok) throw new Error('Ошибка загрузки аудио');

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setAudioUrl(objectUrl);
      return objectUrl;
    } catch (error) {
      console.error('Ошибка загрузки аудио:', error);
      return null;
    }
  };

  return { audioUrl, fetchAudio };
};
