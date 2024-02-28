# SUBGRAPH NFT WORKSHOP

## Description

In this workshop, we would be building and deploying a subgraph for the **[Azuki NFT Project](https://opensea.io/collection/azuki)**.

<div id="header" align="center">
    <a href="https://thegraph.com/studio/?show=Create" target="_blank"><img src="./screenshots/what-are-subgraphs.png" />
    </a>
</div>

### Table of Contents

- [Description](#description)
- [About Azuki & NFTs 🎭](#about-azuki--nfts-🎭)
- [Software Requirements](#software-requirements)
- [Prerequisites](#prerequisites)
- [Setting Up a Subgraph](#setting-up-a-subgraph)
- [Initializing a Subgraph](#initializing-a-subgraph)
- [Building & Deploying Subgraph](#building--deploying-subgraph)
- [Important files generated during subgraph init and build](#important-files-generated-during-subgraph-init-and-build)
  - [🏳️ subgraph.yaml](#🏳️-subgraphyaml)
  - [🏳️ schema.graphql](#🏳️-schemagraphql)

## About Azuki & NFTs 🎭

<div id="header" align="left">
    <img src="./screenshots/about-azuki.png" width="400" />
</div>

<br/>

Formed by [Chiru Labs](https://www.chirulabs.com/), Azuki is an anime brand crafting stories and experiences that blur the lines between the physical and digital worlds. [Here are some things](https://www.azuki.com/about) they’ve created so far.

<details>

<summary>Boring stuff about NFTs that you already know 🤔</summary>

<br/>

**What's an NFT?**

Imagine a digital certificate of ownership for anything unique online, like art, music, or even tweets. That's essentially what an NFT (Non-Fungible Token) is.

**Characteristics of NFTs**

- Unique: Unlike regular cryptocurrencies (fungible tokens), each NFT is one-of-a-kind and cannot be replaced by another. Think of it like a rare trading card instead of interchangeable cash.

- Stored on a blockchain.

- Smart contracts powered.

- Token standards define properties: Standards like ERC-721 ensure compatibility and interoperability between different platforms and marketplaces.

</details>

## Software Requirements

- [x] [Node.js](https://nodejs.org/en/download/)

- [x] The Graph CLI installed

- For `npm`, install the CLI using this command:

```shell
npm install -g @graphprotocol/graph-cli
```

- For `yarn`, install the CLI using this command:

```shell
yarn global add @graphprotocol/graph-cli
```

- [x] A decent IDE. [VS Code](https://code.visualstudio.com/) is a great option!

## Prerequisites

To follow along on this workshop you need the following:

- Some knowledge of [GraphQL](https://www.howtographql.com/)

- A good understanding of how events work in solidity. This [YouTube Video By Patrick Collins](https://www.youtube.com/watch?v=KDYJC85eS5M) nails it!

- Some experience with TS/JS (optional)

#### Azuki Contract Address

- [x] `0xED5AF388653567Af2F388E6224dC7C4b3241C544`

## Setting Up a Subgraph

- Navigate to [The Graph Studio](https://thegraph.com/studio).

- Click on **Connect Wallet** and authenticate a wallet address

- Once authenticated, click on **Create a Subgraph**.

<div align="left">
    <img src="./screenshots/clik-create-subgraph.png" width="500" />
</div>

- Give the subgraph a name and click **Continue**. In our case, we named ours `azuki-nft-v0`

<div align="left">
    <img src="./screenshots/create-subgraph.png" width="500" />
</div>

## Initializing a Subgraph

So we have successfully setup our Subgraph in The Graph studio. Now, would initialize the subgraph using this command in your terminal:

`graph init --studio azuki-nft-v0`

Replace `azuki-nft-v0` with the name of your subgraph.

Now, we would go through an interactive prompt in our CLI as below:

- Choose a Protocol: click on **Ethereum**

- Fill subgraph-slug: enter the name of your subgraph -- `azuki-nft-v0`

- Directory to create the subgraph in: you can enter the subgraph slug or a different non-existent directory -- `azuki-nft-v0`

- Choose an Ethereum network: click on **mainnet**

- Contract address: We would be using the deployed Azuki contract on Ethereum mainnet -- `0xED5AF388653567Af2F388E6224dC7C4b3241C544`

- In case fetching of start block fails, leave the default `true` for the **Do you want to retry? (Y/n):** prompt

- Contract Name: `Azuki`

- Accept the **Index contract events as entities (Y/n)** prompt as `true`

<div align="center">
    <img src="./screenshots/created-subgraph-success.png" />
</div>

#### Congraulations 🥳, you successfully initialized your NFT subgraph

## Building & Deploying Subgraph

Before we build and deploy the subgraph to the Studio, we need to authenticate within the CLI: `graph auth --studio [DEPLOY_KEY]`.

Now, `cd` into the directory containing your initialized subgraph. In our case, it is `azuki-nft-v0`.

#### Build Subgraph

Paste `graph codegen && graph build` command in your terminal to build subgraph.

<div align="center">
    <img src="./screenshots/build-subgraph-success.png" width="350" />
    <p>Your subgraph built successfully if you got this printed in your terminal.</p>
</div>

#### Deployment

Run the following command to deploy your subgraph:

```shell
graph deploy --studio azuki-nft-v0
```

Fill the **Which version label to use? (e.g. "v0.0.1")** prompt as `v0.0.1`

<div align="left">
    <img src="./screenshots/deployed-subgraph-success.png" width="600" />
    <h4>Navigate to your dashboard to see that Subgraph is deployed and syncing</h4>
</div>

<hr/>
<div align="center">
    <img src="./screenshots/deployed-subgraph-syncing.png" width="600" />
    <p>Congratulations!! You successfully deployed your subgraph 🥳🎉</p>
</div>

## Important files generated during subgraph init and build

### 🏳️ subgraph.yaml

This is a YAML file containing the main configuration and definition for the subgraph

The `graph init --studio azuki-nft-v0` command prepopulates our **yaml** file with some configurations below:

<details>

<summary>Code: </summary>

```yaml
specVersion: 1.0.0
indexerHints:
  prune: auto
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: Azuki
    network: mainnet
    source:
      address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544"
      abi: Azuki
      startBlock: 13975838
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Approval
        - ApprovalForAll
        - OwnershipTransferred
        - Transfer
      abis:
        - name: Azuki
          file: ./abis/Azuki.json
      eventHandlers:
        - event: Approval(indexed address,indexed address,indexed uint256)
          handler: handleApproval
        - event: ApprovalForAll(indexed address,indexed address,bool)
          handler: handleApprovalForAll
        - event: OwnershipTransferred(indexed address,indexed address)
          handler: handleOwnershipTransferred
        - event: Transfer(indexed address,indexed address,indexed uint256)
          handler: handleTransfer
      file: ./src/azuki.ts
```

</details>

**REFACTORED CODE** ✍️

We would be changing the **yaml** file to fit our needs for the specific subgraph we've developed as follows:

<details>

<summary>Code</summary>

```yaml
specVersion: 1.0.0
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: Azukis
    network: mainnet
    source:
      address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544"
      abi: Azuki
      startBlock: 13975838
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - User
        - NFT
        - Transfer
      abis:
        - name: Azuki
          file: ./abis/Azuki.json
      eventHandlers:
        - event: Transfer(indexed address,indexed address,indexed uint256)
          handler: handleTransfer
      file: ./src/azuki.ts
```

</details>

### 🏳️ schema.graphql

Contains a description of the data that clients can request from our subgraph and how to query it via GraphQL.

As for the `subgraph.yaml` file, the `graph init --studio azuki-nft-v0` command prepopulates our **graphql** file with the entities below as per events stated within the smart contract:

<details>

<summary>Code: </summary>

```graphql
type Approval @entity(immutable: true) {
  id: Bytes!
  owner: Bytes! # address
  approved: Bytes! # address
  tokenId: BigInt! # uint256
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
}

type ApprovalForAll @entity(immutable: true) {
  id: Bytes!
  owner: Bytes! # address
  operator: Bytes! # address
  approved: Boolean! # bool
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
}

type OwnershipTransferred @entity(immutable: true) {
  id: Bytes!
  previousOwner: Bytes! # address
  newOwner: Bytes! # address
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
}

type Transfer @entity(immutable: true) {
  id: Bytes!
  from: Bytes! # address
  to: Bytes! # address
  tokenId: BigInt! # uint256
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
  user: User! @derivedFrom(field: "transfers")
}
```

</details>

**REFACTORED CODE** ✍️

We would refactor our **graphql** file to serve our subgraph needs as follows:

<details>

<summary>Code</summary>

```graphql
type User @entity {
  # Unique identifier for the user
  id: ID!
  # Ethereum address of the user, used as the primary key
  address: Bytes!
  # List of NFTs currently owned by this user
  nfts: [NFT!]! @derivedFrom(field: "owner")
  # List of transfers initiated by this user
  transfers: [Transfer!]! @derivedFrom(field: "from")
}

type Transfer @entity {
  # Unique identifier for the transfer
  id: ID!
  # User initiating the transfer
  from: User!
  # User receiving the transfer
  to: User!
  # Identifier of the transferred NFT
  tokenId: BigInt
  # Timestamp of the transfer
  timestamp: BigInt
}

type NFT @entity {
  # Unique identifier for the NFT
  id: ID!
  # Unique identifier for the NFT
  tokenId: BigInt!
  # Owner of the NFT
  owner: User!
  # URI associated with the NFT
  tokenURI: String
}
```

</details>

### Generating `classes` & `types`

On your terminal, run `graph codegen` command to generate entity types - files that define the types of data a particular subgraph exposes, ensuring type safety in your **GraphQL** operations.

### 🏳️ src/azuki.ts

This file holds the `mapping.eventHandlers` as specified in the `subgraph.yaml` file. We would be working with just a single **eventHandler** - `handleTransfer`.

We refactor `handleTransfer` function to take the emitted `Transfer` event data and transform as per needs to entites listed in `subgraph.yaml` file.

<details>

<summary>Code</summary>

```ts
// relevant contract and event types
import { Transfer as TransferEvent } from "../generated/Azuki/Azuki";
// generated entities
// import { User, NFT, Transfer } from "../generated/schema";
// helpers
import {
  createOrLoadNFT,
  createOrLoadTransfer,
  createOrLoadUser,
} from "./helpers";

// Event handler for Transfer events
export function handleTransfer(event: TransferEvent): void {
  // let's handle User entity
  const user = createOrLoadUser(event.params.from.toHexString());

  user.address = event.params.from;

  user.save();

  // let's handle Transfer entity
  const transfer = createOrLoadTransfer(event.transaction.hash.toHexString());

  transfer.from = user.id;
  transfer.to = event.params.to;
  transfer.tokenId = event.params.tokenId;
  transfer.timestamp = event.block.timestamp;

  transfer.save();

  // let's handle NFT entity
  const nft = createOrLoadNFT(event.params.tokenId.toString());

  nft.owner = user.id;
  nft.tokenId = event.params.tokenId;
  nft.tokenURI = `/${event.params.tokenId.toString()}`;

  nft.save();
}
```

</details>

### Let's build 🏗️ and deploy 🚀🚀

**BUILDING**

To prepare our subgraph for deployment, paste the command `graph build` in your terminal. You'd notice a `build` directory got created with some files.

What the `graph build` command does are:

- validation checks to ensure our subgraph meets the required standards and is ready for deployment.
- generation of **AssemblyScript WASM** files containing compiled bytecode that get executed when deployed to **_The Graph_** **nodes**

**DEPLOYING**

Paste the command `graph deploy --studio azuki-nft-v0` to deploy your subgraph.

Once syncing is completed, test the query and watch the power of **The Graph** return the indexed, requested data 🎊💪
