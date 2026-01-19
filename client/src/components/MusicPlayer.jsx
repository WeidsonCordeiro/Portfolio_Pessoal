import { useRef, useEffect, useState, useCallback } from "react";
import { FaVolumeUp, FaVolumeMute, FaStepForward } from "react-icons/fa";

const playlist = [
  { id: 1, title: "Deep Ambient Track", src: "/music/track_1_ambient.mp3" },
  {
    id: 2,
    title: "Interstellar Theme",
    src: "/music/track_2_interstellar.mp3",
  },
];

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[0].src;
      audioRef.current.load();
      audioRef.current.volume = 0;
    }
  }, []);

  const handleNextTrack = useCallback(() => {
    if (!audioRef.current) return;

    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);

    audioRef.current.src = playlist[nextIndex].src;
    audioRef.current.load();

    audioRef.current.volume = isMuted ? 0 : 0.1;

    if (hasStarted) {
      audioRef.current.play().catch((error) => {
        console.log("Falha ao avançar a faixa (auto-play)", error);
      });
    }
  }, [currentTrackIndex, isMuted, hasStarted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("ended", handleNextTrack);
    return () => audio.removeEventListener("ended", handleNextTrack);
  }, [handleNextTrack]);

  const toggleVolume = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);

      if (!hasStarted) {
        audioRef.current.play().catch(console.error);
        audioRef.current.volume = 0.1;
        setHasStarted(true);
      } else {
        audioRef.current.volume = newMutedState ? 0 : 0.1;
      }
    }
  };

  const currentTitle = playlist[currentTrackIndex].title;

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        loop={false}
        style={{ display: "none" }}
      />

      <div
        className="position-fixed bottom-4 end-4 d-flex align-items-center gap-3"
        style={{ zIndex: 999 }}
      >
        <p className="small text-space-light mb-0 font-exo">{currentTitle}</p>

        <button
          onClick={handleNextTrack}
          className="btn btn-sm p-2 rounded-circle"
          style={{
            backgroundColor: "rgba(107, 33, 168, 0.7)",
            color: "#e0e0ff",
            border: "none",
          }}
          title="Próxima Faixa"
        >
          <FaStepForward size={20} />
        </button>

        <button
          onClick={toggleVolume}
          className="btn btn-sm p-2 rounded-circle"
          style={{
            backgroundColor: "rgba(107, 33, 168, 0.7)",
            color: "#e0e0ff",
            border: "none",
          }}
          title={isMuted ? "Ativar Som" : "Desativar Som"}
        >
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;
