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
  const user = createOrLoadUser(event.params.from.toString());

  user.address = event.params.from;

  user.save();

  // let's handle Transfer entity
  const transfer = createOrLoadTransfer(event.transaction.hash.toString());

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
