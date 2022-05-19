import * as OpenTok from 'opentok';
let _sessionId = '';

const opentok = new OpenTok(process.env.OPENTOK_API_KEY, process.env.OPENTOK_API_SECRET, {
  timeout: 30000,
});

export async function getServer() {
  return opentok;
}

export async function getSession(): Promise<string> {
  console.log('getSession()');
  console.log('_sessionId: ' + _sessionId);

  if (_sessionId) return _sessionId;
  const sessionId = await getOpenTokInfo(opentok);
  _sessionId = sessionId;

  console.log('No _sessionId, got new one: ' + _sessionId);

  return _sessionId;
}

export function getToken(): string {
  return opentok.generateToken(_sessionId);
}

export function getTokenForSession(sessionId): string {
  return opentok.generateToken(sessionId);
}

async function getOpenTokInfo(opentok): Promise<string> {
  return new Promise((resolve, _reject) => {
    opentok.createSession({ mediaMode: 'routed' }, (err, session) => {
      const sessionId = session.sessionId;
      resolve(sessionId);
    });
  });
}
