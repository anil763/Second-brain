const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  '1032924940337-s0b8d5c2thuib2l6lqcm4noe3kq9hu61.apps.googleusercontent.com',
  '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',
  'urn:ietf:wg:oauth:2.0:oob'
);

oauth2Client.setCredentials({
  refresh_token: '1//05DR1ygpa6W38CgYIARAAGAUSNgF-L9Irv0EyXwkE8DD7lEI-CKoiv3YsBNVBe0JN1pKwdYjzgGXEDrGCSitE0eLxIqSt8qOo8A'
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

async function sendTestEmail() {
  try {
    const message = [
      'From: "Anil Gunjal" <anilgunjal@gmail.com>',
      'To: anilgunjal@gmail.com',
      'Subject: Gmail API Test - Success!',
      '',
      'This is a test email from your new Gmail automation setup.',
      '',
      'Your Gmail API is working correctly!',
      '',
      'You can now send brand outreach emails automatically.',
      '',
      '- Nilam (your AI assistant)'
    ].join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage }
    });

    console.log('Email sent successfully!');
    console.log('Message ID:', response.data.id);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

sendTestEmail();
