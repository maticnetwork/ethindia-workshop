import AirbnbABI from './airbnbABI'
const Web3 = require('web3')

let metamaskWeb3 = new Web3('http://localhost:8545')
let account = null
let airbnbContract
let airbnbContractAddress = '' // Paste Contract address here

export function web3() {
  return metamaskWeb3
}

export const accountAddress = () => {
  return account
}

export async function setProvider() {
  // TODO: get injected Metamask Object and create Web3 instance

}


function getAirbnbContract() {
  // TODO: create and return contract Object

}


export async function postProperty(name, description, price) {
  // TODO: call Airbnb.rentOutproperty

  alert('Property Posted Successfully')
}

export async function bookProperty(spaceId, checkInDate, checkOutDate, totalPrice) {
  // TODO: call Airbnb.rentSpace
  
  alert('Property Booked Successfully')
}

export async function fetchAllProperties() {
  // TODO: call Airbnb.propertyId
  // iterate till property Id
  // push each object to properties array
}
