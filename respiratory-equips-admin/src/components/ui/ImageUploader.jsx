import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaTimes, FaSpinner } from "react-icons/fa";
import api, { getErrorMessage } from "../../lib/api";
import toast from "react-hot-toast";

// images: [{ url, publicId }]
export default function ImageUploader({ images, onChange, multiple = true }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList);
    if (!files.length) return;

    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploaded.push(res.data.image);
      }
      onChange(multiple ? [...images, ...uploaded] : uploaded);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = async (image) => {
    onChange(images.filter((img) => img.publicId !== image.publicId));
    api.delete("/upload", { data: { publicId: image.publicId } }).catch(() => {});
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-3">
        {images.map((img) => (
          <div key={img.publicId} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
            <img src={img.url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(img)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaTimes size={10} />
            </button>
          </div>
        ))}

        <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-400 cursor-pointer hover:border-accent hover:text-accent transition-colors">
          {uploading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              <FaCloudUploadAlt size={20} />
              <span className="text-[10px]">Upload</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>
      <p className="text-xs text-gray-400">JPG or PNG, up to 5MB each.</p>
    </div>
  );
}