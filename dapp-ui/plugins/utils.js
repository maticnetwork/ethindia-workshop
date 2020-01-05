import AirbnbABI from './Airbnb.json'
const Web3 = require('web3')
const { GSNProvider } = require("@openzeppelin/gsn-provider");

let gsnWeb3 = null
let account = null
let airbnbContract
let airbnbContractAddress = '0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB'

export function web3() {
  return gsnWeb3
}
export const accountAddress = () => {
  return account
}
export async function setProvider() {
  gsnWeb3 = new Web3(new GSNProvider("https://testnetv3.matic.network"));
  gsnWeb3.eth.accounts.wallet.add('0x123 ... ') //enter priv key to an etherless account! 😄
  account = gsnWeb3.eth.accounts.wallet
}

function getAirbnbContract() {
  airbnbContract = airbnbContract || new gsnWeb3.eth.Contract(AirbnbABI.abi, airbnbContractAddress)
  return airbnbContract
}
export async function postProperty(name, description, price) {
  const prop = await getAirbnbContract().methods.rentOutproperty(name, description, price).send({
    from: account[0].address,
    gas: 8000000
  })
  alert('Property Posted Successfully')
}
export async function bookProperty(spaceId, checkInDate, checkOutDate, totalPrice) {
  const prop = await getAirbnbContract().methods.rentProperty(spaceId, checkInDate, checkOutDate).send({
    from: account[0].address,
    value: totalPrice,
  })
  alert('Property Booked Successfully')
}

export async function fetchAllProperties() {
  const propertyId = await getAirbnbContract().methods.propertyId().call()
  const properties = []
  for (let i = 0; i < propertyId; i++) {
    const p = await airbnbContract.methods.properties(i).call()
    properties.push({
      id: i,
      name: p.name,
      description: p.description,
      price: gsnWeb3.utils.fromWei(p.price)
    })
  }
  return properties
}
