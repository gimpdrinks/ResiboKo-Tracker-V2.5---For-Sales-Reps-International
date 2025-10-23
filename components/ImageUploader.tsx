import React, { useState, useCallback, useRef } from 'react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  className?: string;
  disabled?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, className, disabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File | null | undefined) => {
    if (disabled) return;
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  }, [onImageSelect, disabled]);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const baseClasses = `flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-colors duration-300 ${className}`;
  const disabledClasses = 'bg-slate-200 border-slate-300 cursor-not-allowed';
  const enabledClasses = isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer';

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
        disabled={disabled}
      />
      <div className="text-center">
         <svg xmlns="http://www.w3.org/2000/svg" className={`mx-auto h-12 w-12 ${disabled ? 'text-slate-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        <p className={`mt-4 text-lg ${disabled ? 'text-slate-600' : 'text-slate-600'}`}>
          {disabled ? 'Monthly limit reached' : <><span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop</>}
        </p>
        <p className={`mt-1 text-sm ${disabled ? 'text-slate-500' : 'text-slate-500'}`}>PNG, JPG, WEBP up to 4MB</p>
      </div>
    </div>
  );
};

export default ImageUploader;
