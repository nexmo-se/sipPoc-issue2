import React, { useState } from 'react';
import OTSession from 'opentok-react/dist/OTSession';
import OTPublisher from 'opentok-react/dist/OTPublisher';
import OTStreams from 'opentok-react/dist/OTStreams';
import OTSubscriber from 'opentok-react/dist/OTSubscriber';
import { Button } from '@chakra-ui/react';

export function OpenTok({ apiKey, token, sessionId }) {
  console.log('Loaded opentok client!');
  const [connectionState, setConnectionState] = useState('');
  const [error, setError] = useState(null);
  const [video, setVideo] = useState(true);

  const sessionEventHandlers = {
    sessionConnected: () => {
      setConnectionState('Connected');
    },
    sessionDisconnected: () => {
      setConnectionState('Disconnected');
    },
    sessionReconnected: () => {
      setConnectionState('Reconnected');
    },
    sessionReconnecting: () => {
      setConnectionState('Reconnecting');
    },
  };

  const publisherEventHandlers = {
    accessDenied: () => {
      console.log('User denied access to media source');
    },
    streamCreated: () => {
      console.log('Publisher stream created');
    },
    streamDestroyed: ({ reason }) => {
      console.log(`Publisher stream destroyed because: ${reason}`);
    },
  };

  const subscriberEventHandlers = {
    videoEnabled: () => {
      console.log('Subscriber video enabled');
    },
    videoDisabled: () => {
      console.log('Subscriber video disabled');
    },
  };

  const onSessionError = (error) => {
    setError({ error });
  };

  const onPublish = () => {
    console.log('Publish Success');
  };

  const onPublishError = (error) => {
    setError({ error });
  };

  const onSubscribe = () => {
    console.log('Subscribe Success');
  };

  const onSubscribeError = (error) => {
    setError({ error });
  };

  const toggleVideo = () => {
    setVideo(!video);
  };

  const callMe = async (sessionId) => {
    await fetch('/api/opentok/call?sId=' + sessionId);
  };

  return (
    <div>
      <div id="sessionStatus">Session Status: {connectionState}</div>
      <Button
        onClick={() => {
          callMe(sessionId);
        }}
      >
        Call Me
      </Button>
      {error ? (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      ) : null}
      <OTSession
        apiKey={apiKey}
        sessionId={sessionId}
        token={token}
        onError={onSessionError}
        eventHandlers={sessionEventHandlers}
      >
        <button id="videoButton" onClick={toggleVideo}>
          {video ? 'Disable' : 'Enable'} Video
        </button>
        <OTPublisher
          properties={{ publishVideo: video, width: 150, height: 150 }}
          onPublish={onPublish}
          onError={onPublishError}
          eventHandlers={publisherEventHandlers}
        />
        <OTStreams>
          <OTSubscriber
            properties={{ width: 300, height: 300 }}
            onSubscribe={onSubscribe}
            onError={onSubscribeError}
            eventHandlers={subscriberEventHandlers}
          />
        </OTStreams>
      </OTSession>
    </div>
  );
}
