import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Selectează un fișier mai întâi.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/objects/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Fișier încărcat: ${data.path}`);
      } else {
        setMessage(`Eroare: ${data.error || 'Upload eșuat'}`);
      }
    } catch (error) {
      setMessage('Eroare la conexiune.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Încărcare fișier</h1>
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
