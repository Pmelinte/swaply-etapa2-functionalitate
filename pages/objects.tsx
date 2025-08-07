// pages/objects.tsx
import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';

type ObjType = {
  id: number | string;
  title: string;
  description: string;
  category: string;
};

export default function ObjectsPage() {
  const [objects, setObjects] = useState<ObjType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchObjects() {
      setLoading(true);
      const { data, error } = await supabase
        .from('objects')
        .select('*')
        .order('id', { ascending: true });
      if (error) {
        console.error('Supabase error:', error);
        setObjects([]);
      } else {
        setObjects(data || []);
      }
      setLoading(false);
    }
    fetchObjects();
  }, []);

  return (
    <div>
      <h1>Obiecte din Supabase</h1>
      {loading && <p>Se încarcă...</p>}
      <ul className="space-y-2">
        {objects.map(obj => (
          <li key={obj.id} className="border p-4 rounded">
            <strong>{obj.title}</strong> - {obj.description} ({obj.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
