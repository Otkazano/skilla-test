import React from 'react';
import styles from './AudioPlayer.module.scss';
import { useAudio } from '../../services/api/useAudio';
import { ReactComponent as DownloadButton } from '../../assets/icons/player/download-button.svg';
import { ReactComponent as PlayButton } from '../../assets/icons/player/play-button.svg';
import { ReactComponent as PauseButton } from '../../assets/icons/player/pause-button.svg';
import { ReactComponent as CloseButton } from '../../assets/icons/player/close-button.svg';
import { useAudioPlayer } from '../../services/hooks/useAudioPlayer';

interface AudioPlayerProps {
  record: string;
  partnershipId: string;
  onOpen: () => void;
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  record,
  partnershipId,
  onOpen,
  onClose,
}) => {
  const { audioUrl, fetchAudio } = useAudio(record, partnershipId);
  const {
    audioRef,
    isPlaying,
    progress,
    currentTime,
    duration,
    togglePlay,
    handleProgressClick,
    formatTime,
  } = useAudioPlayer();

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.timeDisplay}>{formatTime(currentTime)}</div>

      <button
        onClick={() => {
          if (!audioUrl) {
            onOpen();
          } else {
            onOpen();
            togglePlay();
          }
        }}
        className={styles.playButton}
        disabled={!audioUrl}
      >
        {isPlaying ? <PauseButton /> : <PlayButton />}
      </button>

      <div
        className={styles.progressBarContainer}
        onClick={handleProgressClick}
      >
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      {!audioUrl ? (
        <button
          onClick={() => {
            onOpen();
            fetchAudio();
          }}
          className={styles.loadButton}
        >
          <DownloadButton />
        </button>
      ) : (
        <audio ref={audioRef} src={audioUrl} />
      )}

      <button
        onClick={() => {
          onClose();
          isPlaying && togglePlay();
        }}
        className={styles.closeButton}
      >
        <CloseButton />
      </button>
    </div>
  );
};

export default AudioPlayer;
