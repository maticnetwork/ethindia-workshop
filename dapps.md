## Creating a Decentralized Airbnb DApp
### setting up DApp
1. paste your contract address to `airbnbContractAddress`

2. copy ABI

3. Connect to MetaMask

->
```await setProvider()
  const properties = await fetchAllProperties()
  this.posts = properties
```

copy this to `setProvider` method in `metamask.js`
```
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
```

4. create and return contract Object

```
airbnbContract = airbnbContract || new metamaskWeb3.eth.Contract(AirbnbABI.abi, airbnbContractAddress)
  return airbnbContract
```

5. postProperty
copy below code inside `postAd` in propertyForm.js 

```
// convert price from ETH to Wei
const weiValue = web3().utils.toWei(this.price, 'ether');

// call metamask.postProperty
postProperty(this.title, this.description, weiValue)
```

copy below code inside `postProperty` in metamask.js 

```
const prop = await getAirbnbContract().methods.rentOutproperty(name, description, price).send({
    from: account[0]
  })
```

6. bookProperty
copy below code inside `book` in detailsModal.js 

```
const startDay = this.getDayOfYear(this.startDate)
const endDay = this.getDayOfYear(this.endDate)
const totalPrice = web3().utils.toWei(this.propData.price, 'ether') * (endDay-startDay)
bookProperty(this.propData.id, startDay, endDay, totalPrice)
```

copy below code inside `bookProperty` in metamask.js 

```
const prop = await getAirbnbContract().methods.rentProperty(spaceId, checkInDate, checkOutDate).send({
    from: account[0],
    value: totalPrice,
  })
```

7. fetch all properties
```
const propertyId = await getAirbnbContract().methods.propertyId().call()

  const properties = []
  for (let i = 0; i < propertyId; i++) {
    const p = await airbnbContract.methods.properties(i).call()
    properties.push({
      id: i,
      name: p.name,
      description: p.description,
      price: metamaskWeb3.utils.fromWei(p.price)
    })

  }
  return properties
```