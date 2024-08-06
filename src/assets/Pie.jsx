// import React from "react";

// const Pie = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="215"
//       height="210"
//       viewBox="0 0 215 210"
//       fill="none"
//     >
//       <path
//         d="M190.563 107.977C190.563 154.13 153.149 191.544 106.997 191.544C60.8441 191.544 23.43 154.13 23.43 107.977C23.43 61.8244 60.8441 24.4104 106.997 24.4104C153.149 24.4104 190.563 61.8244 190.563 107.977Z"
//         stroke="#FF4A55"
//         stroke-width="34.86"
//       />
//       <path
//         d="M191.947 108.305C191.947 90.5426 186.329 73.2335 175.894 58.8463C165.46 44.459 150.741 33.7281 133.837 28.1839C116.933 22.6397 98.707 22.5653 81.7582 27.9712C64.8094 33.3771 50.0031 43.9873 39.4507 58.2889C28.8983 72.5904 23.1386 89.8529 22.9929 107.615C22.8473 125.377 28.3232 142.731 38.6397 157.203C48.9562 171.675 63.5866 182.526 80.4445 188.208"
//         stroke="#30DA88"
//         stroke-width="46"
//       />
//     </svg>
//   );
// };

// export default Pie;

import React from "react";

const Pie = ({ angle = 0 }) => {
  // Function to calculate the path based on the angle
  const calculatePath = (angle) => {
    // Example of modifying the path based on angle
    const radians = (angle * Math.PI) / 180;
    const x = Math.cos(radians) * 50; // Adjust this value as needed
    const y = Math.sin(radians) * 50; // Adjust this value as needed

    return `M191.947 108.305C191.947 90.5426 186.329 73.2335 175.894 58.8463C165.46 44.459 150.741 33.7281 133.837 28.1839C116.933 22.6397 98.707 22.5653 81.7582 27.9712C64.8094 33.3771 50.0031 43.9873 39.4507 58.2889C28.8983 72.5904 23.1386 89.8529 22.9929 107.615C22.8473 125.377 28.3232 142.731 38.6397 157.203C48.9562 171.675 63.5866 182.526 80.4445 188.208`; // Modify this calculation as needed
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="215"
      height="210"
      viewBox="0 0 215 210"
      fill="none"
    >
      <path
        d="M190.563 107.977C190.563 154.13 153.149 191.544 106.997 191.544C60.8441 191.544 23.43 154.13 23.43 107.977C23.43 61.8244 60.8441 24.4104 106.997 24.4104C153.149 24.4104 190.563 61.8244 190.563 107.977Z"
        stroke="#FF4A55"
        strokeWidth="34.86"
      />
      <path d={calculatePath(angle)} stroke="#30DA88" strokeWidth="46" />
    </svg>
  );
};

export default Pie;
