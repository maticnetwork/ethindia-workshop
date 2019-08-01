import Web3 from 'web3'

let metamaskWeb3 = null
let account = null

export function web3() {
  return metamaskWeb3
}

export const accountAddress = () => {
  return account
}

export async function setProvider() {
  if (window.ethereum) {
    metamaskWeb3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
    } catch (error) {
      // User denied account access...
    }
  }
  else if (window.web3) {
    metamaskWeb3 = new Web3(web3.currentProvider);
  }
  account = await metamaskWeb3.eth.getAccounts()
  console.log('ac', account)
}

export async function postProperty(name, description, price) {
  // TODO: call Airbnb.rentOutSpace
}

export async function bookProperty(spaceId, checkInDate, checkOutDate) {
  // TODO: call Airbnb.rentSpace
}