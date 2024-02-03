import {
  Transfer as TransferEvent,
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Azuki as AzukiContract,
} from "../generated/Azuki/Azuki"; // Import the relevant contract and event types
import { User, NFT, Transfer } from "../generated/schema";

// Event handler for Transfer events
export function handleTransfer(event: TransferEvent): void {
  // Create a binding to the contract instance from which the event originated
  let Azuki = AzukiContract.bind(event.address);

  // Load or create the sender (from user) entity
  let fromUser = User.load(event.params.from.toHexString());
  if (!fromUser) {
    fromUser = new User(event.params.from.toHexString());
    fromUser.address = event.params.from;
    fromUser.nfts = [];
    fromUser.transfers = [];
    fromUser.save();
  }

  // Load or create the receiver (to user) entity
  let toUser = User.load(event.params.to.toHexString());
  if (!toUser) {
    toUser = new User(event.params.to.toHexString());
    toUser.address = event.params.to;
    toUser.nfts = [];
    toUser.transfers = [];
    toUser.save();
  }

  // Load or create the NFT entity
  let nft = NFT.load(event.params.tokenId.toString());
  if (!nft) {
    nft = new NFT(event.params.tokenId.toString());
    nft.tokenId = event.params.tokenId;
    nft.owner = toUser.id; // Assign the new owner
    nft.ownerAddress = toUser.address.toHexString();
    nft.tokenURI = "";
    nft.save();
  } else {
    // Update the NFT owner on transfer
    nft.owner = toUser.id;
    nft.ownerAddress = toUser.address.toHexString();
    nft.save();
  }

  // Create a new Transfer entity to log the transfer
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  transfer.from = fromUser.id;
  transfer.fromAddress = fromUser.address.toHexString();
  transfer.to = toUser.id;
  transfer.toAddress = toUser.address.toHexString();
  transfer.tokenId = event.params.tokenId;
  transfer.timestamp = event.block.timestamp;
  transfer.save();

  // Update sender and receiver's NFT and Transfer arrays
  fromUser.nfts.push(nft.id);
  fromUser.transfers.push(transfer.id);
  fromUser.save();

  toUser.nfts.push(nft.id);
  toUser.transfers.push(transfer.id);
  toUser.save();
}

/*
// Event handler for Approval events
export function handleApproval(event: ApprovalEvent): void {
  // Handle Approval events if needed
}

// Event handler for ApprovalForAll events
export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  // Handle ApprovalForAll events if needed
}

// Event handler for OwnershipTransferred events
export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  // Handle OwnershipTransferred events if needed
}*/
