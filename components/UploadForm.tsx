import { useState } from 'react';

export default function UploadForm() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = async (file: File) => {
    setLoading(true);
    try {
      const base64 = await toBase64(file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: base64 })
      });
      const data = await res.json();
      setImageUrl(data.url);
    } catch (err) {
      console.error('Upload error', err);
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
      />
      {loading && <p>Uploading...</p>}
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" width="300" />
      )}
    </div>
  );
}
