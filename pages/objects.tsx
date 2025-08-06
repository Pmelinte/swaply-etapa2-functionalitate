import { useState, useEffect } from 'react';

type ObjType = {
  id: number | string; // sau doar number dacă știi sigur!
  title: string;
  description: string;
  category: string;
};

export default function ObjectsPage() {
  const [objects, setObjects] = useState<ObjType[]>([]);

  useEffect(() => {
    fetch('/api/objects')
      .then(res => res.json())
      .then(data => setObjects(data));
  }, []);

  return (
    <ul className="space-y-2">
      {objects.map(obj => (
        <li key={obj.id} className="border p-4 rounded">
          <strong>{obj.title}</strong> - {obj.description} ({obj.category})
        </li>
      ))}
    </ul>
  );
}
