import React, { useRef, useState, useEffect } from "react";
import "./VideoPlayer.css";



const VideoPlayer = () => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);



  // Эффект для отслеживания времени видео
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);

      const onTimeUpdate = () => {
        setCurrentTime(video.currentTime);
      };

      video.addEventListener("timeupdate", onTimeUpdate);

      // Обработчик для пробела
      const handleKeyDown = (event) => {
        if (event.code === "Space") {
          togglePlayPause();
        } else if (event.code === "ArrowRight") {
          skip(20); // Перемотка на 20 секунд вперед
        } else if (event.code === "ArrowLeft") {
          skip(-20); // Перемотка на 20 секунд назад
        } else if (event.code === "ArrowUp") {
          // Стрелка вверх - увеличиваем громкость
          const newVolume = Math.min(volume + 0.05, 1); // Увеличиваем, но не больше 1
          setVolume(newVolume);
          video.volume = newVolume;
        } else if (event.code === "ArrowDown") {
          // Стрелка вниз - уменьшаем громкость
          const newVolume = Math.max(volume - 0.05, 0); // Уменьшаем, но не меньше 0
          setVolume(newVolume);
          video.volume = newVolume;
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        video.removeEventListener("timeupdate", onTimeUpdate);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [volume]);

  // Переключение между воспроизведением и паузой
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Обработчик для перемотки видео
  const handleSeek = (e) => {
    const video = videoRef.current;
    const progress = progressRef.current;
    const newTime = (e.nativeEvent.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = newTime;
  };

  // Функция перемотки на 20 секунд вперед или назад
  const skip = (seconds) => {
    const video = videoRef.current;
    video.currentTime += seconds;
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="video-player"
        onClick={togglePlayPause}
        src="/sample.mp4" // Путь к вашему видео
      >
        <track kind="subtitles" src="/sample.vtt" srcLang="en" default />
        Ваш браузер не поддерживает тег video.
      </video>
      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? "❚❚" : "►"}
        </button>
        <div
          className="progress-bar"
          ref={progressRef}
          onClick={handleSeek}
        >
          <div
            className="progress-bar-inner"
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          />
        </div>
        <div className="volume-bar">
          <input
            ref={volumeRef}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              const newVolume = e.target.value;
              setVolume(newVolume);
              videoRef.current.volume = newVolume;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
