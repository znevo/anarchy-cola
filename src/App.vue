<template>
  <div id="app">

    <section class="hero is-danger">
      <div class="hero-body has-text-centered">
        <img alt="Vue logo" class="logo" src="./assets/anarchy-logo-light.png">
      </div>
    </section>

    <section class="section">
      <div class="container constrained">

        <template v-if="stats">

          <div class="tabs is-centered is-toggle is-toggle-rounded is-medium">
            <ul>
              <li :class="$route.name === 'Anarchists' ? 'is-active' : ''">
                <router-link to="/anarchists">
                  <span>Anarchists</span>
                </router-link>
              </li>
              <li :class="$route.name === 'Authoritarians' ? 'is-active' : ''">
                <router-link to="/authoritarians">
                  <span>Authoritarians</span>
                </router-link>
              </li>
            </ul>
          </div>

          <nav class="level box is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Balance</p>
                <p class="title is-size-4-mobile">{{ stats.balance }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Inventory</p>
                <p class="title is-size-4-mobile">{{ stats.numSodas }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">My Sodas</p>
                <p class="title is-size-4-mobile">{{ stats.sodasOwned }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Revolution</p>
                <p class="title is-size-4-mobile">{{ stats.revolutionRequests }}</p>
              </div>
            </div>
          </nav>

          <div class="columns box owner-engineer is-mobile">
            <div class="column has-text-centered">
              <p class="heading">Owner</p>
              <p class="title is-size-4 is-size-5-mobile" v-if="stats.owner">
                {{ stats.owner.slice(0,6) }}....{{ stats.owner.slice(-4) }}
              </p>
            </div>
            <div class="column has-text-centered">
              <p class="heading">Engineer</p>
              <p class="title is-size-4 is-size-5-mobile" v-if="stats.engineer">
                {{ stats.engineer.slice(0,6) }}....{{ stats.engineer.slice(-4) }}
              </p>
            </div>
          </div>
        </template>

        <router-view />

      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      stats: null
    }
  },
  async created() {
    if ( window.metamask.ready('rinkeby') ) {
      this.stats = await this.$anarchy.stats();
    }
  }
}
</script>
