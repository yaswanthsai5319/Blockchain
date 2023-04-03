// const ipfsClient = require('ipfs-http-client');

// const Ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// export default Ipfs;

const ipfsClient = require('ipfs-http-client');

const projectId = '2MNZoM60sXgIIX7zyUaIIFKDqMq';   // <---------- your Infura Project ID

const projectSecret = '78d41aa14b5e1c4f0a7fbc42970f2699';  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const Ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
},
});

export default Ipfs;
