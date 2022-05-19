import { getSession, getToken } from '../../lib/opentokService';

export default async function handler(req, res) {
  const sessionId = await getSession();
  const token = getToken();
  res.status(200).json({ token, sessionId, apiKey: process.env.OPENTOK_API_KEY });
}
