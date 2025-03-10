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
      const response = await fetch('https://api.skilla.ru/mango/getRecord', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ record, partnership_id: partnershipId }),
      });

      if (!response.ok) throw new Error('Ошибка загрузки аудио');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      return url;
    } catch (error) {
      console.error('Ошибка загрузки аудио:', error);
      return null;
    }
  };

  return { audioUrl, fetchAudio };
};
