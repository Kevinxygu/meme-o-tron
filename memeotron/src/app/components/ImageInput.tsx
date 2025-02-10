import React from "react";

interface ImageInputProps {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageChange }) => {
  return (
    <label
      className="inline-block px-10 py-4 bg-custom-blue text-white font-semibold rounded-[20px] shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-light focus:ring-opacity-75 transition duration-300 ease-in-out cursor-pointer font-fredoka text-xl
"
    >
      Upload Image
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="hidden"
      />
    </label>
  );
};

export default ImageInput;
