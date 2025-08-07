// pages/objects.tsx
import { useState, useEffect } from 'react';

type ObjType = {
  id: number | string;
  title: string;
  description: string;
  category: string;
};

export default function ObjectsPage() {
  const [objects, setObjects] = useState<ObjType[]>([]);

  useEffect(() => {
    fetch('/api/objects')
      .then(res => res.json())
      .then(data => {
        // Dacă răspunsul e obiect și nu array, încearcă:
        if (Array.isArray(data)) {
          setObjects(data);
        } else if (Array.isArray(data.objects)) {
          setObjects(data.objects);
        } else {
          setObjects([]);
        }
      });
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
