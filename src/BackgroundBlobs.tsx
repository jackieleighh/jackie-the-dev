import React from "react";

function BackgroundBlobs() {
  return (
    <div className="background-blobs" aria-hidden="true">
      <div className="blob blob-pink" />
      <div className="blob blob-lime" />
      <div className="blob blob-orange" />
      <div className="lava-bubbles">
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="lava">
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
              <feColorMatrix in="blur" type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
            </filter>
          </defs>
        </svg>
        <div className="lava-bubble-layer">
          <div className="lava-pool" />
          <div className="lava-blob lava-blob-1" />
          <div className="lava-blob lava-blob-2" />
          <div className="lava-blob lava-blob-3" />
          <div className="lava-blob lava-blob-4" />
          <div className="lava-blob lava-blob-5" />
          <div className="lava-blob lava-blob-6" />
          <div className="lava-blob lava-blob-7" />
          <div className="lava-blob lava-blob-8" />
          <div className="lava-blob lava-blob-9" />
          <div className="lava-blob lava-blob-10" />
        </div>
      </div>
    </div>
  );
}

export default BackgroundBlobs;
