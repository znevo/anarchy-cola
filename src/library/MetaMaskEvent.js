class MetaMaskEvent {
  static debug = false;
  static handler = null;
  static handlers = new Map();

  static EVENT_METAMASK_FOUND       = new MetaMaskEvent('EVENT_METAMASK_FOUND',       'MetaMask is installed!');
  static ERROR_METAMASK_NOT_FOUND   = new MetaMaskEvent('ERROR_METAMASK_NOT_FOUND',   'MetaMask is not installed!');
  static ERROR_MULTIPLE_WALLETS     = new MetaMaskEvent('ERROR_MULTIPLE_WALLETS',     'Multiple wallets were found');
  static EVENT_CHAIN_CONNECTED      = new MetaMaskEvent('EVENT_CHAIN_CONNECTED',      'The chain is connected');
  static ERROR_CHAIN_UNAVAILABLE    = new MetaMaskEvent('ERROR_CHAIN_UNAVAILABLE',    'The chain could not be fetched');
  static EVENT_ACCOUNT_REMEMBERED   = new MetaMaskEvent('EVENT_ACCOUNT_REMEMBERED',   'The account was remembered');
  static ERROR_ACCOUNT_NOT_FOUND    = new MetaMaskEvent('ERROR_ACCOUNT_NOT_FOUND',    'The account was not found');
  static ERROR_ACCOUNT_UNAVAILABLE  = new MetaMaskEvent('ERROR_ACCOUNT_UNAVAILABLE',  'The account could not be fetched');
  static ERROR_PERMISSION_REFUSED   = new MetaMaskEvent('ERROR_PERMISSION_REFUSED',   'The connection attempt was refused');
  static ERROR_PERMISSION_FAILED    = new MetaMaskEvent('ERROR_PERMISSION_FAILED',    'The connection attempt failed');
  static EVENT_ACCOUNT_CONNECTED    = new MetaMaskEvent('EVENT_ACCOUNT_CONNECTED',    'The account is connected');
  static EVENT_ACCOUNT_DISCONNECTED = new MetaMaskEvent('EVENT_ACCOUNT_DISCONNECTED', 'The account was disconnected');
  static EVENT_ACCOUNT_SWITCHED     = new MetaMaskEvent('EVENT_ACCOUNT_SWITCHED',     'The account was switched');
  static EVENT_CHAIN_SWITCHED       = new MetaMaskEvent('EVENT_CHAIN_SWITCHED',       'The chain was switched');

  constructor(key, msg) {
    this.key = key;
    this.msg = msg;
  }

  fire() {
    MetaMaskEvent.debug && console.log(this);
    MetaMaskEvent.handlers.get(this.key) && MetaMaskEvent.handlers.get(this.key)();
  }
}

export default MetaMaskEvent;
