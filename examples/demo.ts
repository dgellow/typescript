import AcmeAISDK from 'acme-ai-sdk';

const client = new AcmeAISDK({
  bearerToken: process.env['ACME_AI_SDK_BEARER_TOKEN'], // This is the default and can be omitted
});

async function main() {
  const file = client.files.fileCreate({ file: fs.createReadStream('birds.csv') });

  while (true) {
    // loop through files to see which one matches our file
    const files = await client.files.fileslist();
    const found = files.find((f) => f.file_id === file.file_id);
    if (found && found.status === 'completed') {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  const searchResults = await client.files.fileSearch(file.file_id!, {
    query: 'chickadee',
  });

  console.log(searchResults);
}

main();
