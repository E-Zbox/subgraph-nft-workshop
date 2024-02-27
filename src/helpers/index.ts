import { BigInt, Bytes } from "@graphprotocol/graph-ts";
// generated entities types
import { User, NFT, Transfer } from "../../generated/schema";

export function createOrLoadUser(id: string): User {
  // id should be String(address)
  let user = User.load(id);

  if (!user) {
    user = new User(id);
    user.address = new Bytes(0);
  }

  return user;
}

export function createOrLoadNFT(id: string): NFT {
  // id should be String(tokenId)
  let nft = NFT.load(id);

  if (!nft) {
    nft = new NFT(id);
    nft.tokenId = new BigInt(0);
    nft.owner = "";
  }

  return nft;
}

export function createOrLoadTransfer(id: string): Transfer {
  // id should be String(transactionHash)
  let transfer = Transfer.load(id);

  if (!transfer) {
    transfer = new Transfer(id);
    transfer.from = "";
    transfer.to = new Bytes(0);
    transfer.tokenId = new BigInt(0);
    transfer.timestamp = new BigInt(0);
  }

  return transfer;
}
