import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage('Selectează un fișier mai întâi.');
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await fetch('/api/objects/upload', {
          method: 'POST',
          body: reader.result as string,
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(`Fișier încărcat: ${data.url}`);
        } else {
          setMessage(`Eroare: ${data.error}`);
        }
      } catch (error) {
        setMessage('Eroare la conexiune.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Încărcare fișier în Cloudinary</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Se încarcă...' : 'Încarcă'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
