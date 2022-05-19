import { createReadStream } from 'fs';

import OT from '@opentok/client';
import appRootPath from 'app-root-path';

import { getSession, getToken } from '../../../lib/opentokService';

export default async function handler(req, res) {
  const sessionId = await getSession();
  const token = getToken();

  const session = OT.initSession(process.env.OPENTOK_API_KEY, sessionId);
  session.connect(token, (err) => {
    if (err) {
      console.error(err);
    }

    const filePath = `${appRootPath}/public/video.mp4`;
    const stream = createReadStream(filePath);
    console.log(stream);
  });

  console.log('playing video');
  res.status(200).json({});
}
