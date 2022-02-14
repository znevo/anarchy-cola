<template>
  <div class="home">

    <div class="box" v-if="stats">

      <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input is-medium is-rounded" :disabled="! stats.isEngineer" type="text" v-model="form.refillSodas">
        </p>
        <p class="control">
          <button class="button is-danger is-medium is-rounded" :disabled="! stats.isEngineer" @click="refillSodas">
            refill sodas
          </button>
        </p>
      </div>

      <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input is-medium is-rounded" :disabled="! stats.isOwner" type="text" v-model="form.addEngineer">
        </p>
        <p class="control">
          <button class="button is-danger is-medium is-rounded" :disabled="! stats.isOwner" @click="addEngineer">
            add engineer
          </button>
        </p>
      </div>

      <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input is-medium is-rounded" :disabled="! stats.isOwner" type="text" v-model="form.changeOwner">
        </p>
        <p class="control">
          <button class="button is-danger is-medium is-rounded" :disabled="! stats.isOwner" @click="changeOwner">
            change owner
          </button>
        </p>
      </div>

      <div class="has-text-centered">
        <p class="control">
          <button class="button is-danger is-outlined is-medium is-rounded" :disabled="! stats.isOwner" @click="withdraw">
            withdraw
          </button>
        </p>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Authoritarians',
  data() {
    return {
      stats: null,
      form: {
        refillSodas: null,
        addEngineer: null,
        changeOwner: null,
      },
    }
  },
  methods: {
    refillSodas() {
      this.$anarchy.refillSodas(this.form.refillSodas);
    },
    addEngineer() {
      this.$anarchy.addEngineer(this.form.addEngineer);
    },
    changeOwner() {
      this.$anarchy.changeOwner(this.form.changeOwner);
    },
    withdraw() {
      this.$anarchy.withdraw();
    },
  },
  async created() {
    if ( window.metamask.ready('rinkeby') ) {
      this.stats = await this.$anarchy.stats();
    }
  }
}
</script>
