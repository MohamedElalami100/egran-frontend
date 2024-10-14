import React, { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";

// Modal component
const Modal = ({ src, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-full max-h-full p-4 bg-white rounded-lg"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
      >
        <img
          src={src}
          alt="Full view"
          className="max-w-[80vw] max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
};

const ImageWithBlurhash = ({ src, blurhash, setDisplayMap }) => {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle modal

  const handleImageLoad = () => {
    setImageLoaded(true);
    setLoading(false);
  };

  const handleImageClick = () => {
    setDisplayMap(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setDisplayMap(true);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [src]);

  return (
    <>
      <div className="relative w-1/2" onClick={handleImageClick}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Blurhash
              hash={blurhash}
              width="100%"
              height="100%"
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </div>
        )}
        <img
          src={src}
          alt="loaded content"
          className={`h-36 rounded-[14px] cursor-pointer w-full transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleImageLoad}
          style={{ display: loading ? "none" : "block" }}
        />
      </div>

      {isModalOpen && <Modal src={src} onClose={handleCloseModal} />}
    </>
  );
};

export default function ImagesGroup({ randImage1, randImage2, setDisplayMap }) {
  // Replace these with actual Blurhash strings for the images
  const rgbBlurhash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";
  const nirBlurhash = "LKO2?U%2Tw=w]~RBVZRi};RPxuwH";

  return (
    <div className="mt-8 h-36 w-full flex md:justify-between gap-[17px]">
      <ImageWithBlurhash
        src={randImage1}
        blurhash={rgbBlurhash}
        setDisplayMap={setDisplayMap}
      />
      <ImageWithBlurhash
        src={randImage2}
        blurhash={nirBlurhash}
        setDisplayMap={setDisplayMap}
      />
    </div>
  );
}
