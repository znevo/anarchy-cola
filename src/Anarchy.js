import { ethers, utils } from "ethers";
import abi from '@/artifacts/abi.json';
const contract = "0xb0bf7ba98d1cea8a4ff8556ab8381b2e92d4c823";

class Anarchy {
  #cache = new Map();

  async init() {
    if ( window.metamask.ready('rinkeby') ) {
      this.user = window.metamask.user;
      this.provider = new ethers.providers.Web3Provider(window.metamask.provider);
      this.contract = new ethers.Contract(contract, abi, this.provider.getSigner());
    }
  }

  async stats() {
    return this.#cache.get('stats')
      ? this.#cache.get('stats')
      : await this.fetchStats();
  }

  async fetchStats() {
    const owner = await this.contract.owner();
    const engineer = await this.contract.engineer();
    const isOwner = this.user === owner.toLowerCase();
    const isEngineer = this.user === engineer.toLowerCase() || isOwner;

    const stats = {
      balance: await this.provider.getBalance(contract),
      numSodas: await this.contract.numSodas(),
      sodasOwned: await this.contract.sodasOwned(utils.getAddress(this.user)),
      revolutionRequests: await this.contract.revolutionRequests(),
      owner: owner.toLowerCase(),
      engineer: engineer.toLowerCase(),
      isOwner,
      isEngineer,
    }

    this.#cache.set('stats', stats);
    return stats;
  }

  wait(transaction) {
    console.log(transaction);
    transaction.wait().then(console.log).catch(console.error);
  }

  changeOwner(address) {
    this.contract.changeOwner(address).then(this.wait).catch(console.error);
  }

  addEngineer(address) {
    this.contract.addEngineer(address).then(this.wait).catch(console.error);
  }

  refillSodas(num) {
    this.contract.refillSodas(num).then(this.wait).catch(console.error);
  }

  withdraw() {
    this.contract.withdraw().then(this.wait).catch(console.error);
  }

  purchase(wei) {
    this.contract.purchase({ value: wei }).then(this.wait).catch(console.error);
  }

  deposit(wei) {
    this.contract.deposit({ value: wei }).then(this.wait).catch(console.error);
  }

  revolution() {
    this.contract.revolution().then(this.wait).catch(console.error);
  }
}

export default Anarchy;
