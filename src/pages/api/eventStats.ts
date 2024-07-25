import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'indexer';
const COLLECTION_NAME = 'events';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await MongoClient.connect(MONGO_URI);
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const totalEvents = await collection.countDocuments();
    const proposalCreatedCount = await collection.countDocuments({ name: 'ProposalCreated' });
    const votedCount = await collection.countDocuments({ name: 'Voted' });

    client.close();

    res.status(200).json({
      totalEvents,
      proposalCreatedCount,
      votedCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event statistics' });
  }
};

export default handler;
