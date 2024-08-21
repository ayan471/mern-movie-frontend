import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      preload: "auto",
      width: 640,
      height: 360,
    });

    // Load the VAST plugin from a CDN
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/videojs-vast-vpaid@2.0.2/dist/videojs-vast-vpaid.min.js";
    script.onload = () => {
      player.vastClient({
        adTagUrl:
          "https://servedby.revive-adserver.net/fc.php?script=apVideo:vast2&zoneid=21108",
      });
    };
    document.body.appendChild(script);

    return () => {
      player.dispose();
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin"></video>
    </div>
  );
};

export default VideoPlayer;
