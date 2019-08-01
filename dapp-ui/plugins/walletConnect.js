import WalletConnect from '@walletconnect/browser'
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal'

let walletConnector = null
let accountAddress = null

export const initWalletConnect = () => {
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

  // Subscribe to connection events
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
}

export async function postProperty(name, description, price) {
  // TODO: call Airbnb.rentOutSpace
}

export async function bookProperty(spaceId, checkInDate, checkOutDate) {
  // TODO: call Airbnb.rentSpace
}