<template>
  <div class="home">

    <section class="section onboarding install-metamask" v-if="! metamask.installed">
      <div class="container has-text-centered">
        <a href="https://metamask.io/" target="_blank" class="button is-large is-danger">Install MetaMask</a>
      </div>
    </section>

    <section class="section onboarding connect-wallet" v-if="metamask.installed && ! metamask.user">
      <div class="container has-text-centered">
        <button class="button is-large is-danger" @click="connect">Connect Wallet</button>
      </div>
    </section>

    <section class="section onboarding connect-rinkeby" v-if="metamask.user && ! metamask.ready('rinkeby')">
      <div class="container has-text-centered">
        <article class="message is-warning">
          <div class="message-body">
            You must connect to the Rinkeby test network to continue.
          </div>
        </article>
        <button class="button is-large is-danger" @click="chain">Connect To Rinkeby</button>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      metamask: window.metamask
    }
  },
  methods: {
    connect() {
      this.metamask.connect();
    },
    chain() {
      this.metamask.chain('rinkeby');
    }
  }
}
</script>
