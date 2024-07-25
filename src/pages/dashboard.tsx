import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [eventStats, setEventStats] = useState<any>({
    totalEvents: 0,
    proposalCreatedCount: 0,
    votedCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventStats = async () => {
      try {
        const response = await axios.get('/api/eventStats');
        setEventStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event stats:', error);
      }
    };

    fetchEventStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Total Events</h2>
          <p className="text-gray-600">{eventStats.totalEvents}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Proposals Created</h2>
          <p className="text-gray-600">{eventStats.proposalCreatedCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Votes Cast</h2>
          <p className="text-gray-600">{eventStats.votedCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
