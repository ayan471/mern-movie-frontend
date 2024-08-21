import React from "react";

const AdComponent = ({ adUrl }) => {
  return (
    <iframe
      src={adUrl}
      width="100%"
      height="auto"
      frameBorder="0"
      allow="autoplay; encrypted-media"
      style={{ border: "none", overflow: "hidden" }}
      title="Advertisement"
    ></iframe>
  );
};

export default AdComponent;
