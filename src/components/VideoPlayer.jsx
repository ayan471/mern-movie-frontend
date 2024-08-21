import React, { useEffect, useRef } from "react";
import videojs from "video.js";

const VideoPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      preload: "auto",
      width: 640,
      height: 360,
    });

    player.vastClient({
      adTagUrl:
        "https://servedby.revive-adserver.net/fc.php?script=apVideo:vast2&zoneid=21108",
    });

    return () => {
      player.dispose();
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef}></video>
    </div>
  );
};

export default VideoPlayer;
