import detectEthereumProvider from '@metamask/detect-provider';
import MetaMaskEvent from './MetaMaskEvent';

const CHAINS = {
  mainnet:  '0x1',
  ropsten:  '0x3',
  rinkeby:  '0x4',
  goerli:   '0x5',
  kovan:    '0x2a',
}

class MetaMask {
  constructor() {
    this.provider = null;
    this.chainId = null;
    this.user = null;
    this.installed = false;
  }

  async init() {
    await this.initializeProvider();
    await this.initializeChain();
    await this.initializeAccounts();
  }

  async initializeProvider() {
    this.provider = await detectEthereumProvider({ timeout: 1000 });

    if ( this.provider && this.provider === window.ethereum ) {
        this.installed = true;
        MetaMaskEvent.EVENT_METAMASK_FOUND.fire();
    } else if ( ! this.provider ) {
        MetaMaskEvent.ERROR_METAMASK_NOT_FOUND.fire();
    } else if ( this.provider && this.provider !== window.ethereum ) {
        MetaMaskEvent.ERROR_MULTIPLE_WALLETS.fire();
    }
  }

  async initializeChain() {
    if ( this.provider ) {
      this.provider.on('chainChanged', this.updateChain.bind(this));

      try {
        this.chainId = await this.provider.request({ method: 'eth_chainId' });
        MetaMaskEvent.EVENT_CHAIN_CONNECTED.fire();
      } catch(err) {
        MetaMaskEvent.ERROR_CHAIN_UNAVAILABLE.fire();
      }
    }
  }

  updateChain(chainId) {
    this.chainId = chainId;
    MetaMaskEvent.EVENT_CHAIN_SWITCHED.fire();
  }

  async initializeAccounts() {
    if ( this.provider ) {
      this.provider.on('accountsChanged', this.updateAccounts.bind(this));

      try {
        const accounts = await this.provider.request({ method: 'eth_accounts' });

        if ( accounts.length !== 0 ) {
          this.user = accounts[0];
          MetaMaskEvent.EVENT_ACCOUNT_REMEMBERED.fire();
        } else if (accounts.length === 0) {
          MetaMaskEvent.ERROR_ACCOUNT_NOT_FOUND.fire();
        }
      } catch(err) {
        MetaMaskEvent.ERROR_ACCOUNT_UNAVAILABLE.fire();
      }
    }
  }

  updateAccounts(accounts) {
    if (accounts.length === 0) {
      this.user = null;
      MetaMaskEvent.EVENT_ACCOUNT_DISCONNECTED.fire();
    } else if (accounts[0] !== this.user) {
      if ( this.user == null ) {
        this.user = accounts[0];
        MetaMaskEvent.EVENT_ACCOUNT_CONNECTED.fire();
      } else {
        this.user = accounts[0];
        MetaMaskEvent.EVENT_ACCOUNT_SWITCHED.fire();
      }
    }
  }

  async connect() {
    if ( this.provider ) {
      this.provider
        .request({ method: 'eth_requestAccounts' })
        .then(this.updateAccounts.bind(this))
        .catch((err) => {
          err.code === 4001
            ? MetaMaskEvent.ERROR_PERMISSION_REFUSED.fire()
            : MetaMaskEvent.ERROR_PERMISSION_FAILED.fire();
        });
    }
  }

  async chain(chainId) {
    chainId && await this.provider
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAINS[chainId] }],
      })
      .then(this.updateChain.bind(this));
    return this.chainId;
  }

  ready(network = 'mainnet') {
    return this.provider
      && this.user
      && this.chainId
      && this.chainId == CHAINS[network];
  }

  on(event, handler) {
    MetaMaskEvent.handlers.set(event, handler);
  }

  off(event) {
    MetaMaskEvent.handlers.delete(event);
  }
}

export default MetaMask;
