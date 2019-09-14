## Creating a Decentralized Airbnb DApp

### setting up DApp

1. paste your contract address to variable `airbnbContractAddress` on line 7 in [utils.js](./dapp-ui/plugins/utils.js).

-> insert this statements inside `mounted()` method in `index.vue`

```js
await setProvider()

const properties = await fetchAllProperties()
this.posts = properties
```

-> copy this to `setProvider` method in `utils.js`

```js
if (window.ethereum) {
  metamaskWeb3 = new Web3(ethereum)
  try {
    // Request account access if needed
    await ethereum.enable()
  } catch (error) {
    // User denied account access...
  }
} else if (window.web3) {
  metamaskWeb3 = new Web3(web3.currentProvider)
}
account = await metamaskWeb3.eth.getAccounts()
```

4. create and return contract Object

```js
airbnbContract =
  airbnbContract ||
  new metamaskWeb3.eth.Contract(AirbnbABI.abi, airbnbContractAddress)
return airbnbContract
```

5. `postProperty` - copy below code inside `postAd` in `propertyForm.vue`

```js
// convert price from ETH to Wei
const weiValue = web3().utils.toWei(this.price, 'ether')

// call metamask.postProperty
postProperty(this.title, this.description, weiValue)
```

-> copy below code inside `postProperty` in `utils.js`

```js
const prop = await getAirbnbContract()
  .methods.rentOutproperty(name, description, price)
  .send({
    from: account[0],
  })
```

6. `bookProperty` - copy below code inside `book` in `detailsModal.vue`

```js
const startDay = this.getDayOfYear(this.startDate)
const endDay = this.getDayOfYear(this.endDate)
const totalPrice =
  web3().utils.toWei(this.propData.price, 'ether') * (endDay - startDay)
bookProperty(this.propData.id, startDay, endDay, totalPrice)
```

-> copy below code inside `bookProperty` in `utils.js`

```js
const prop = await getAirbnbContract()
  .methods.rentProperty(spaceId, checkInDate, checkOutDate)
  .send({
    from: account[0],
    value: totalPrice,
  })
```

7. fetch all properties

-> insert inside `fetchAllProperties()` method in `utils.js`

```js
const propertyId = await getAirbnbContract()
  .methods.propertyId()
  .call()

const properties = []
for (let i = 0; i < propertyId; i++) {
  const p = await airbnbContract.methods.properties(i).call()
  properties.push({
    id: i,
    name: p.name,
    description: p.description,
    price: metamaskWeb3.utils.fromWei(p.price),
  })
}
return properties
```

VOILA 😀

----------

### [WalletConnect Demo](https://example.walletconnect.org/) | [Docs](https://docs.walletconnect.org/)

_Note: this is an altenative to Metamask, you can either use metamask or WalletConnect protocol to sign the transaction._

-> add connect button to menubar

```html
<li class="nav-item">
  <b-button v-on:click="walletConnect" class="mr-5 mt-3">
    <span>WalletConnect</span>
  </b-button>
</li>
```

-> init walletConnect instance

```js
  // Create a walletConnector
  walletConnector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org', // Required
  })

  // Check if connection is already established
  if (!walletConnector.connected) {
    // create new session
    walletConnector.createSession().then(() => {
      // get uri for QR Code modal
      const uri = walletConnector.uri
      // display QR Code modal
      WalletConnectQRCodeModal.open(uri, () => {
        console.log('QR Code Modal closed')
      })
    })
  }
  // Subscribe to Events

  walletConnector.on('connect', (error, payload) => {
    if (error) {
      throw error
    }

    // Close QR Code Modal
    WalletConnectQRCodeModal.close()

    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0]
    accountAddress = accounts[0]
  })
```

-> add send Transaction button on homeScreen

```html
<b-button v-on:click="sendTx" class="mr-5 mt-3">
  <span>Send Transaction</span>
</b-button>
```

-> use draft transaction

```js
const tx = {
  from: accountAddress, // Required
  to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359', // Required (for non contract deployments)
  data: '0x', // Required
  gasPrice: '0x02540be400', // Optional
  gasLimit: '0x9c40', // Optional
  value: '0x00', // Optional
  nonce: '0x0114', // Optional
}
```

-> Send transaction

```js
walletConnector
  .signTransaction(tx)
  .then(result => {
    // Returns transaction id (hash)
    console.log(result)
    alert(`Signed Data: ${result}`)
  })
  .catch(error => {
    // Error returned when rejected
    console.error(error)
  })
```
