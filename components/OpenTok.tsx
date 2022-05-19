import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';

import './OpenTok.module.css';

export function OpenTok({ apiKey, token, sessionId }) {
  useEffect(() => {
    console.log('Loaded opentok client!');
    console.log(`token: ${token} and sessionId: ${sessionId}`);
    initializeSession();
  }, []);

  const callMe = async (sessionId) => {
    await fetch('/api/opentok/call?sId=' + sessionId);
  };

  const playVideo = async () => {
    await fetch('/api/opentok/play-video');
  };

  const handleError = (err) => {
    if (err) console.error(err);
  };

  const initializeSession = () => {
    const session = OT.initSession(apiKey, sessionId);

    session.on('connectionCreated', (event) => {
      console.log('connectionCreated');
      console.log(event);
    });

    session.on('streamCreated', (event) => {
      console.log('streamCreated');
      console.log(event);

      const opts: { insertMode: 'append'; width: string; height: string } = {
        insertMode: 'append',
        width: '100%',
        height: '100%',
      };

      session.subscribe(event.stream, 'subscriber', opts, handleError);
    });

    session.on('signal', (event) => {
      console.log('signal');
      console.log(event);
    });

    session.on('signal:newParticipant', (event) => {
      console.log('signal:newParticipant');
      console.log(event);
    });

    session.on('sessionDisconnected', (event) => {
      console.log(`You were disconnected from the session: ${event.reason}.`);
    });

    const publisherOpts: { insertMode: 'append'; width: string; height: string } = {
      insertMode: 'append',
      width: '100%',
      height: '100%',
    };

    const publisher = OT.initPublisher('publisher', publisherOpts, handleError);

    session.connect(token, (err) => {
      if (err) return handleError(err);

      session.publish(publisher, handleError);
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          callMe(sessionId);
        }}
      >
        Call Me
      </Button>
      <Button onClick={playVideo}>Play Video</Button>

      <div id="publisher"></div>
      <div id="subscriber"></div>
    </div>
  );
}
