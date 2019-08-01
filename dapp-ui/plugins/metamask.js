const Web3 = require('web3')
let metamaskWeb3 = new Web3('http://localhost:8545');
let account = null
let airbnbContract
let airbnbContractAddress = '0x9aeFcc2dCf2BC653eE18e569D19013A9EcE3558F'

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

const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "bookingId",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "bookings",
    "outputs": [
      {
        "name": "propertyId",
        "type": "uint256"
      },
      {
        "name": "checkInDate",
        "type": "uint256"
      },
      {
        "name": "checkoutDate",
        "type": "uint256"
      },
      {
        "name": "user",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "propertyId",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "properties",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "isActive",
        "type": "bool"
      },
      {
        "name": "price",
        "type": "uint256"
      },
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "propertyId",
        "type": "uint256"
      }
    ],
    "name": "NewProperty",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "propertyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "bookingId",
        "type": "uint256"
      }
    ],
    "name": "NewBooking",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "rentOutproperty",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_propertyId",
        "type": "uint256"
      },
      {
        "name": "checkInDate",
        "type": "uint256"
      },
      {
        "name": "checkoutDate",
        "type": "uint256"
      }
    ],
    "name": "rentProperty",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_propertyId",
        "type": "uint256"
      }
    ],
    "name": "markPropertyAsInactive",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

function getContract() {
  airbnbContract = airbnbContract || new metamaskWeb3.eth.Contract(abi, airbnbContractAddress)
  return airbnbContract
}

export async function fetchAllProperties() {
  const propertyId = await getContract().methods.propertyId().call()
  // console.log(propertyId)
  const properties = []
  for (let i = 0; i < propertyId; i++) {
    const p = await airbnbContract.methods.properties(i).call()
    properties.push({
      id: i,
      name: p.name,
      description: p.description,
      price: metamaskWeb3.utils.fromWei(p.price)
    })
    // console.log(properties)
  }
  return properties
}
