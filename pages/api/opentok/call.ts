import { getServer, getSession, getToken, getTokenForSession } from '../../../lib/opentokService';

export default async function handler(req, res) {
  const server = await getServer();
  const { sId } = req.query;
  console.log(sId);
  // const sessionId = await getSession();
  const token = getTokenForSession(sId);
  const SIP_URI = process.env.SIP_URI;

  console.log('SIP_URI: ' + SIP_URI);

  console.log(`Calling SIP for session ${sId} and token ${token}`);
  server.dial(
    sId,
    token,
    SIP_URI,
    { secure: true, from: '15551115555', video: true },
    (err, call) => {
      if (err) return console.log('error: ', err);

      console.log(
        'SIP audio stream Id: ' + call.streamId + ' added to session ID: ' + call.sessionId
      );

      server.signal(sId, null, { type: 'newParticipant', data: '' }, (err) => {
        if (err) return console.log('error: ', err);
        console.log('SIP signal sent');
      });
    }
  );

  res.status(200).json({ foo: 'bar' });
}
