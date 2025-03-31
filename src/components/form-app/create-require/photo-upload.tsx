import { useState } from "react";
import { Label } from "../../ui/label";

const PhotoUpload = () => {
  const [previewImage, setPreviewImage] = useState<
    | {
        url: string;
        fileName: string;
        fileSize: string;
      }
    | undefined
  >(undefined);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    if (files) {
      const imageUrl = URL.createObjectURL(files);
      setPreviewImage({
        url: imageUrl,
        fileName: files.name,
        fileSize: (files.size / (1024 * 1024)).toFixed(2).toString(),
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Photo</Label>
      <p>Upload your merchant logo</p>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer bg-[#27282D]"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {previewImage ? (
              <p>Files number has reached maximum</p>
            ) : (
              <>
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Drag and drop your files here or click to upload
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Up to 1 file. Max file size is 5 MB. Supported file types are
                  .jpg, .jpeg and .png.
                </p>
              </>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleUploadImage}
            disabled={!!previewImage}
          />
        </label>
        {previewImage && (
          <div className="flex justify-between items-center w-full rounded-lg bg-[#27282D] p-4">
            <div className="flex items-center gap-3">
              <img
                src={previewImage.url}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg border border-gray-300"
              />
              <div>
                <p>{previewImage.fileName}</p>
                <p>{previewImage.fileSize} MB</p>
              </div>
            </div>
            <button onClick={() => setPreviewImage(undefined)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
