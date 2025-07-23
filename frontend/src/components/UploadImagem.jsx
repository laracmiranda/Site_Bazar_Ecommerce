import { useState } from 'react';
import { Image } from 'lucide-react';

export default function UploadImagem({ handleImageChange }) {
  const [preview, setPreview] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      handleImageChange({ target: { files: [file] } });
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      handleImageChange(e);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">
        Imagem do Item
      </label>

      <label
        htmlFor="upload-input" // <-- Corrigido
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer text-center hover:bg-gray-50 transition"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md mb-2 border border-gray-300"
          />
        ) : (
          <>
            <Image className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-gray-500">
              Arraste e solte uma imagem aqui ou{' '}
              <span className="font-medium text-gray-700 underline">busque</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF até 10MB</p>
          </>
        )}
      </label>

      <input
        id="upload-input" // <-- Corrigido
        type="file"
        name="imagem"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}