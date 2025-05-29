'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/matches')
      .then(res => res.json())
      .then(data => {
        setMatches(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upcoming Matches</h1>
      
      {loading ? (
        <p>Loading matches...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border-b">Date & Time</th>
                <th className="p-3 text-left border-b">Home Team</th>
                <th className="p-3 text-left border-b">Away Team</th>
                <th className="p-3 text-left border-b">League</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">
                    {new Date(match.date).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="p-3 border-b">{match.homeTeam}</td>
                  <td className="p-3 border-b">{match.awayTeam}</td>
                  <td className="p-3 border-b">{match.league}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}