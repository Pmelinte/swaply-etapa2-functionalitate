import { useState, useEffect } from 'react';

type Match = {
  object: {
    username: string;
    avatar_url: string;
    title: string;
    description: string;
    category: string;
  };
  matchesWant: {
    desired_category: string;
    keywords: string;
  };
};

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetch('/api/matches')
      .then(res => res.json())
      .then(data => setMatches(data));
  }, []);

  return (
    <ul>
      {matches.map((match, index) => (
        <li key={index} className="border p-4 rounded">
          <p><strong>Owner:</strong> {match.object.username}</p>
          <p><strong>Avatar:</strong> <img src={match.object.avatar_url} alt="avatar" width="50"/></p>
          <p><strong>Offers:</strong> {match.object.title} - {match.object.description} ({match.object.category})</p>
          <p><strong>You want:</strong> {match.matchesWant.desired_category} ({match.matchesWant.keywords})</p>
        </li>
      ))}
    </ul>
  );
}
