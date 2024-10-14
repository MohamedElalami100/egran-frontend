import React, { useEffect, useState } from "react";

const ImageLoader = ({ src }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to true when src changes
    console.log(1);
    setLoading(true);
  }, [src]); // Depend on src

  const handleImageLoad = () => {
    console.log("Image loaded");
    setLoading(false);
  };

  const handleImageError = () => {
    console.log("Image failed to load");
    setLoading(false);
  };

  return (
    <div className="w-full h-fit">
      {loading && <div>aaa {/* Loading spinner */}</div>}
      <img
        src={src?.file_name} // Use the local state for the image source
        alt="rgb"
        className="rounded-[14px]"
        style={{ display: loading ? "none" : "block" }} // Hide image while loading
        onLoad={handleImageLoad}
        onError={handleImageError} // Handle image load errors
      />
    </div>
  );
};

export default ImageLoader;
