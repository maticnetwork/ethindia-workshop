# Decentralized Airbnb
Setup

1. Install dependencies
```
npm install
```

2. Run ethereum blockchain locally
```
npm run test:ethereum
```

3. Deploy and paste your contract address to variable `airbnbContractAddress` on line 7 in [utils.js](./dapp-ui/plugins/utils.js).


4. Run DApp UI
```
cd dapp-ui
npm install
npm run build
npm run start
```
5. Navigate to http://localhost:3000/ to see the app running.
