import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'indexer';
const COLLECTION_NAME = 'events';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await MongoClient.connect(MONGO_URI, );
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Fetch events, for example, "ProposalCreated" events
    const events = await collection.find({ name: 'ProposalCreated' }).toArray();

    res.status(200).json(events);
    client.close();
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events from database' });
  }
};
