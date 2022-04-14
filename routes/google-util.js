import { google } from 'googleapis';

const googleConfig = {
  clientId: '11331918558-7bu74m3a5ojtsfhptg29i1p6i6v0ffn2.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: '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', // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: 'http://localhost:8080' // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}