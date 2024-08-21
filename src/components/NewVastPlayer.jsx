import React, { useEffect, useRef } from "react";
import VASTClient from "vast-client";

const NewVastPlayer = ({ adUrl }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const loadAd = async () => {
      try {
        const client = new VASTClient();
        await client.load(adUrl);
        const ad = client.getAd();

        if (ad) {
          // Check if mediaFiles are present
          if (ad.mediaFiles.length > 0) {
            const videoElement = playerRef.current;
            videoElement.src = ad.mediaFiles[0].url;

            // Ensure video playback is initiated correctly
            videoElement.play().catch((error) => {
              console.error("Playback failed:", error);
            });
          } else {
            console.error("No media files found in ad!");
          }
        } else {
          console.error("No ad found!");
        }
      } catch (error) {
        console.error("Failed to load ad:", error);
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
        onError={(e) => console.error("Video error:", e)}
      />
    </div>
  );
};

export default NewVastPlayer;
