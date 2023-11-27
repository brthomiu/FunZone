import { GiNextButton } from "react-icons/gi";
import { useEffect, useState } from "react";
import loop from "../assets/House.mp3";
import loop2 from "../assets/Lofi.mp3";

function AudioPlayer() {
  // Music Section
  // Playlist Object
  const playlist = {
    0: { title: "House", file: loop },
    1: { title: "Lofi", file: loop2 },
  };
  // Length of playlist
  const length = Object.keys(playlist).length - 1;

  // State for current track number
  const [trackNumber, setTrackNumber] = useState(1);

  // State to hold current song
  const [currentSong, setCurrentSong] = useState(playlist[trackNumber]);

  // State to turn on autoplay once user cycles through tracks
  const [auto, setAuto] = useState(false);

  // Function to cycle through tracks
  const nextSong = () => {
    if (trackNumber < length) {
      setTrackNumber((prevTrackNumber) => {
        setCurrentSong(playlist[prevTrackNumber + 1]);
        setAuto(true);
        return prevTrackNumber + 1;
      });
    } else if (trackNumber === length) {
      setTrackNumber(0);
      setAuto(true);
      setCurrentSong(playlist[0]);
    }
  };

  // useEffect to go to the next track when the song ends
  // Also kills the keyboard controls for the audio playe
  useEffect(() => {
    document
      .getElementById("Player")
      .addEventListener("ended", () => nextSong());
    // navigator.mediaSession.setActionHandler("play", function () {
    //   /* Code excerpted. */
    // });
    // navigator.mediaSession.setActionHandler("pause", function () {
    //   /* Code excerpted. */
    // });
    // navigator.mediaSession.setActionHandler("seekbackward", function () {
    //   /* Code excerpted. */
    // });
    // navigator.mediaSession.setActionHandler("seekforward", function () {
    //   /* Code excerpted. */
    // });
    // navigator.mediaSession.setActionHandler("previoustrack", function () {
    //   /* Code excerpted. */
    // });
    // navigator.mediaSession.setActionHandler("nexttrack", function () {
    //   /* Code excerpted. */
    // });
  });

  return (
    <div className="Music">
      <div className="MusicHeader">
        <div className="MusicHeader-Title">
          <h3>Current Song:</h3>
          <h3>&nbsp;{currentSong.title}</h3>
        </div>
        <button onClick={() => nextSong()}>
          <GiNextButton />
        </button>
      </div>
      <audio
        id="Player"
        key={currentSong.title}
        controls
        loop={false}
        autoPlay={auto}
      >
        <source src={currentSong.file} />
      </audio>
    </div>
  );
}

export default AudioPlayer;
