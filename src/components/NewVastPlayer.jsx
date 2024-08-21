import React, { useEffect, useRef, useState } from "react";

const NewVastPlayer = () => {
  const playerRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const fetchVASTAndLoadAd = async () => {
      try {
        const response = await fetch("/proxy-vast"); // Use the proxy endpoint
        const vastXmlText = await response.text();

        // Parse the XML
        const parser = new DOMParser();
        const vastXml = parser.parseFromString(vastXmlText, "text/xml");

        // Extract the media file URL from the VAST XML
        const mediaFileElement = vastXml.querySelector("MediaFile");
        if (mediaFileElement) {
          const mediaFileUrl = mediaFileElement.textContent.trim();
          setVideoSrc(mediaFileUrl); // Set the video source to the extracted media file URL
        } else {
          console.error("No MediaFile found in VAST XML");
        }
      } catch (error) {
        console.error("Failed to fetch or parse VAST XML", error);
      }
    };

    fetchVASTAndLoadAd();
  }, []);

  return (
    <div>
      <video
        ref={playerRef}
        controls
        width="100%"
        height="auto"
        src={videoSrc} // Set the video source here
        style={{ border: "none", overflow: "hidden" }}
        onError={(e) => console.error("Video error:", e)}
      />
    </div>
  );
};

export default NewVastPlayer;
