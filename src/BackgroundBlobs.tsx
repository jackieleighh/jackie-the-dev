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
            <filter id="lava" x="-20%" y="-20%" width="140%" height="140%">
              {/* Step 1-2: Metaball merge */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
              <feColorMatrix in="blur" type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="merged" />

              {/* Step 3: Yellow base — flood merged shape with yellow */}
              <feFlood floodColor="#f0c030" floodOpacity="1" result="yellow" />
              <feComposite in="yellow" in2="merged" operator="in" result="yellowBase" />

              {/* Step 4-5: Inner mask — erode + blur for soft gradient */}
              <feMorphology in="merged" operator="erode" radius="10" result="eroded" />
              <feGaussianBlur in="eroded" stdDeviation="8" result="erodedBlur" />
              <feComposite in="erodedBlur" in2="merged" operator="in" result="innerMask" />

              {/* Step 6-7: Orange core — flood orange through inner mask, composite over yellow */}
              <feFlood floodColor="#ff7a3d" floodOpacity="1" result="orange" />
              <feComposite in="orange" in2="innerMask" operator="in" result="orangeInner" />
              <feComposite in="orangeInner" in2="yellowBase" operator="over" />
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
