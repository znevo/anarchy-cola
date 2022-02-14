<template>
  <div class="home">

    <div class="box" v-if="stats">

      <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input is-medium is-rounded" type="text" v-model="form.purchase" placeholder="wei">
        </p>
        <p class="control">
          <button class="button is-danger is-medium is-rounded" @click="purchase">
            purchase
          </button>
        </p>
      </div>

      <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input is-medium is-rounded" type="text" v-model="form.deposit" placeholder="wei">
        </p>
        <p class="control">
          <button class="button is-danger is-medium is-rounded" @click="deposit">
            deposit
          </button>
        </p>
      </div>

      <div class="has-text-centered">
        <p class="control">
          <button class="button is-danger is-outlined is-medium is-rounded" @click="revolution">
            revolution
          </button>
        </p>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Anarchists',
  data() {
    return {
      stats: null,
      form: {
        purchase: null,
        deposit: null,
      },
    }
  },
  methods: {
    purchase() {
      this.$anarchy.purchase(this.form.purchase);
    },
    deposit() {
      this.$anarchy.deposit(this.form.deposit);
    },
    revolution() {
      this.$anarchy.revolution();
    },
  },
  async created() {
    if ( window.metamask.ready('rinkeby') ) {
      this.stats = await this.$anarchy.stats();
    }
  }
}
</script>
