import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Heading, Center } from '@chakra-ui/react';

import { OpenTok } from '../components/OpenTok';

// const DynamicComponent = dynamic(() => import('../components/OpenTok').then((mod) => mod.OpenTok));

function Home() {
  const [opentokSession, setOpentokSession] = useState({ sessionId: '', token: '', apiKey: '' });

  useEffect(() => {
    getOpenTokSession();
  }, []);

  const getOpenTokSession = async () => {
    const response = await fetch('/api/opentok');
    const { sessionId, token, apiKey } = await response.json();
    setOpentokSession({ sessionId, token, apiKey });
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://static.opentok.com/v2/js/opentok.min.js"></script>
      </Head>

      <Center flexDirection={'column'} height={'100%'}>
        <Heading size="lg">I am home page!</Heading>
        <br />
        {opentokSession.sessionId && opentokSession.token && opentokSession.apiKey && (
          <OpenTok
            apiKey={opentokSession.apiKey}
            token={opentokSession.token}
            sessionId={opentokSession.sessionId}
          />
        )}
      </Center>
    </>
  );
}

export default Home;
