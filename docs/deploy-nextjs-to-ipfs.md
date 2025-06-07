# Deploying a Scaffold-ETH 2 Next.js App to IPFS

This guide walks through how to deploy a Scaffold-ETH 2 frontend (built with Next.js) to [IPFS](https://ipfs.tech/) using either the command-line (ipfs-cli) or a hosted platform like [Fleek](https://fleek.co/). Ideal for pushing decentralized apps live with minimal effort.

---

## Step 1: Build the Next.js App for Production

Before deploying, make sure your project is production-ready.

bash
cd scaffold-eth-2/packages/nextjs
yarn build


This generates an optimized .next folder with all production assets.

---

## Step 2: Export the App as Static Files

IPFS serves static content, so we need to statically export the Next.js app.

1. In next.config.js, add or update the following:

js
module.exports = {
  output: 'export',
};


2. Run the export command:

bash
yarn export


This creates an out/ directory containing the static site.

---

## Step 3: Deploy to IPFS

You have two options here:

---

### Option A: Upload Using ipfs-cli

> Requires a local IPFS node or IPFS Desktop.

1. Install IPFS CLI:

bash
npm install -g ipfs


2. Start your IPFS daemon:

bash
ipfs daemon


3. Add your exported site:

bash
cd out
ipfs add -r .


4. Note the CID (Content Identifier) returned. You can now access your app via:


https://ipfs.io/ipfs/<your-CID>


---

### Option B: Deploy Using Fleek (No CLI needed)

> Recommended for ease of use, free hosting, and CI integrations.

1. Go to [Fleek.co](https://app.fleek.co/) and log in with GitHub.

2. Click "Add New Site" > "Connect GitHub" > Select your scaffold-eth-2 repo.

3. Set the build options:

   * Framework Preset: Other
   * Build Command: yarn && yarn build && yarn export
   * Publish Directory: packages/nextjs/out

4. Click Deploy Site.

After deployment, Fleek gives you a public IPFS link like:


https://<your-site>.on.fleek.co


---

## Step 4: Access the App on IPFS

You can view your deployed dApp through any IPFS gateway:


https://ipfs.io/ipfs/<your-CID>


Or if using Fleek:


https://<your-project>.on.fleek.co


Done! You’ve successfully deployed your Scaffold-ETH 2 frontend on the decentralized web.

---