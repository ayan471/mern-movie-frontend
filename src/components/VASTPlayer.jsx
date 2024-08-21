import React, { useEffect, useRef } from "react";
import VASTClient from "vast-client";

const VASTPlayer = ({ adUrl }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const loadAd = async () => {
      try {
        const client = new VASTClient();
        await client.load(adUrl);
        const ad = client.getAd();

        if (ad) {
          // Assuming you have a video element to play the ad
          const videoElement = playerRef.current;
          videoElement.src = ad.mediaFiles[0].url;
          videoElement.play();
        } else {
          console.error("No ad found");
        }
      } catch (error) {
        console.error("Failed to load ad", error);
      }
    };

    loadAd();
  }, [adUrl]);

  return (
    <div>
      <video
        ref={playerRef}
        controls
        width="100%"
        height="auto"
        style={{ border: "none", overflow: "hidden" }}
      />
    </div>
  );
};

export default VASTPlayer;
