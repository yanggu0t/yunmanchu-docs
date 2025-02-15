import { env } from '../config/env';
import {
  AnnouncementRequest,
  AnnouncementResponse,
} from '@/types/announcement';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

const client = new MongoClient(env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const db = client.db('database');

export const collections = {
  announcements: db.collection('announcements'),
};

export async function connectToDatabase() {
  try {
    await client.connect();
  } catch (error) {
    console.error('MongoDB 連接失敗:', error);
    throw error;
  }
}

export async function closeDatabaseConnection() {
  await client.close();
}

export async function getAnnouncement() {
  const res = await collections.announcements.findOne<AnnouncementResponse>({
    _id: new ObjectId(env.ANNOUNCEMENT_ID),
  });

  if (!res) {
    throw new Error('公告不存在');
  }

  return res;
}

export async function updateAnnouncement(input: AnnouncementRequest) {
  const result = await collections.announcements.updateOne(
    { _id: new ObjectId(env.ANNOUNCEMENT_ID) },
    {
      $set: {
        ...input,
        visible: input.visible ?? true,
        updatedAt: new Date(),
      },
    }
  );

  if (result.matchedCount === 0) {
    throw new Error('公告不存在');
  }

  return result;
}
