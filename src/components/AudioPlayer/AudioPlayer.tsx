import React, { useRef, useState, useEffect } from 'react';
import styles from './AudioPlayer.module.scss';
import { useAudio } from '../../services/api/useAudio';

interface AudioPlayerProps {
  record: string;
  partnershipId: string;
  onClose?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  record,
  partnershipId,
  onClose,
}) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { audioUrl: fetchedUrl, fetchAudio } = useAudio(record, partnershipId);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!fetchedUrl) {
      fetchAudio().then((url) => setAudioUrl(url));
    } else {
      setAudioUrl(fetchedUrl);
    }
  }, [fetchedUrl, fetchAudio]);

  return (
    <div className={styles.audioPlayer}>
      {audioUrl ? (
        <audio ref={audioRef} controls className={styles.audio}>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading...</p>
      )}

      <button
        className={styles.downloadButton}
        onClick={() => {
          if (!audioUrl) return;
          const a = document.createElement('a');
          a.href = audioUrl;
          a.download = 'call_record.mp3';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}
      >
        ⬇️ Download
      </button>

      {onClose && (
        <button className={styles.closeButton} onClick={onClose}>
          ❌ Close
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;
