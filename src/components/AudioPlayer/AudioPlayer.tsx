import React, { useRef, useState, useEffect } from 'react';
import styles from './AudioPlayer.module.scss';
import { useAudio } from '../../services/api/useAudio';

interface AudioPlayerProps {
  record: string;
  partnershipId: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ record, partnershipId }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { audioUrl: fetchedUrl, fetchAudio } = useAudio(record, partnershipId);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!fetchedUrl) {
      fetchAudio().then((url) => setAudioUrl(url));
    } else {
      setAudioUrl(fetchedUrl);
    }
  }, [fetchedUrl, fetchAudio]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.audioPlayer}>
      <span className={styles.time}>12:08</span>
      <button className={styles.playButton} onClick={togglePlay}>
        {isPlaying ? '❚❚' : '▶️'}
      </button>
      <div className={styles.progressBar}>
        <div className={styles.progress}></div>
      </div>
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
        ⬇️
      </button>
      <audio ref={audioRef} src={audioUrl || ''} />
    </div>
  );
};

export default AudioPlayer;
