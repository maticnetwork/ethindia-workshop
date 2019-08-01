## Creating a Decentralized Airbnb DApp
### Intro
In this workshop, we'll explore how to create decentralized Airbnb. We will use the pre-written Ethereum smart contract and deploy it locally on ganache using remix, we can deploy contract on any Testnet or Mainnet .

This dApp uses [Nuxt](https://nuxtjs.org/), but is out of scope for this workshop, so don't worry, we will only be focussing on the pieces that helps us build. In reality, any JS framework can be used.


# Installation
## Check your environment
Prior to all, you should have the following prerequisites installed on your machine:
#### NodeJS 8.10+
```
node version
> 8.10+
```
If you need to update Node, please [install `nvm`](https://github.com/creationix/nvm#installation) and install/use the LTS version. macOS/Linux commands provided for you below for convenience:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install --lts
nvm use lts
```
#### MetaMask 

[Download MetaMask chrome extension](https://metamask.io/)


#### Install ganache-cli
```
npm install -g ganache-cli
```

# Template clone and explore
Now we have Setup installed properly, let’s grab the dApp template that we will use as the skeleton of our dApp. This template is a website built using Nuxt.js (don't worry if you don't know Nuxt.js, we are not focussing on this part). 

## We will...
We will use existing solidity contracts developed in previous session, and then use these functions inside the website.

## Let's go
Clone the template into your folder:
```
git@github.com:maticnetwork/ethindia-workshop.git
cd ethindia-workshop
```
here we are going to use `dapp-solution` branch
```
git checkout dapp-solution
```

## start Ganache

Start Ganache at `Port 8545`
```
ganache-cli -p 7545
```

## deploy contract using remix

Search remix IDE on google and open first result

enable `Solidity Compiler` and `Deploy & Run Transactions` on remix IDE

create new file `Airbnb.sol` from plus icon on left panel

select appropriate provider on metamask, as we are going to deploy on ganache we will select `Locahost 8545`

select appropriate compiler, in this example we are going to use `0.5.7` above compiler

Go to DEPLOY & RUN TRANSACTIONS and click deploy.

on sucessfull deploy copy `contract address`


