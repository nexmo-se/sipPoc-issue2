## Getting Started

Requirements:
1. Psql v9.5 (this was included from the generator I used. If this is a blocker, we can move the project to a pure next.js app)
2. Nodejs v16.5
3. Vonage Video API account (https://www.vonage.com/log-in/?icmp=utilitynav_login_novalue#api)
4. SIP client to call (I used Linphone https://linphone.org/products, and created a SIP account through that)

These are the versions that are on my machine. Other versions will most likely work, I just wanted to call these out.

Steps:
1. Clone the Repo
2. Create a `.env` file, and fill it in with values from the `.env.example` file.
3. Run `yarn install`
4. Run `yarn dev`
5. Open browser to localhost:3000

## Expected Workflow

1. Open the browser to localhost:3000 and you should see yourself on the screen
2. Press "Play Video". That should start playing a video to the stream, and a second box should show up on the screen.
3. Press "Call Me". That will ring a SIP endpoint. After the SIP client answers, it should stop the video stream and connect to the SIP stream.

## Current Issues

### Video Stream

How do we play a video stream? The documentation and examples I found (https://github.com/opentok/opentok-web-samples/tree/main/Publish-Video) use a JS client where the video is played on the HTML, a chrome API captures the video, and then it takes the place of the webcam video. We are looking for a way that the server can stream a video to the session, so it will continue to play while the provider is getting ready to connect (in case they close their browser, their internet goes out, or whatever).

### Seeing the SIP video

Pressing the "Call Me" button works and calls the SIP client like we expect it to. After the client picks up, it seems like they aren't connected to the same stream. They both don't see another video. After refreshing the browser, everything works as expected.

I haven't been able to see any logs when the SIP client is called, or when it answers the call. Is there an event we should be subscribing to?
