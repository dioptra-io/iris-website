<template>
  <div class="uk-section-primary tm-section-texture" uk-sticky>
    <navbar class="uk-navbar-transparent" />
  </div>

  <div class="uk-container">
    <div style="padding-top: 50px"></div>
    <div class="uk-width-1-1 uk-grid-match" uk-grid>
      <div class="uk-width-1-1" v-if="probingEnabled">
        <router-link
          class="uk-width-1-1 uk-link-reset"
          :to="{
            name: 'MeasurementsList',
            params: { series: 'own' },
          }"
        >
          <div class="uk-card uk-card-secondary uk-card-body">
            <h3 class="uk-card-title">My measurements</h3>
            <p>
              Perform my own measurements with Diamond-Miner, YARRP or Ping.
            </p>
          </div>
        </router-link>
        <div style="padding-top: 30px"></div>
      </div>

      <router-link
        class="uk-width-1-1 uk-link-reset"
        :to="{
          name: 'MeasurementsList',
          params: { series: 'exhaustive' },
        }"
      >
        <div class="uk-card uk-card-primary uk-card-hover uk-card-body">
          <h3 class="uk-card-title">Exhaustive</h3>
          <p>
            Collections of exhaustive measurements of all IPv4 routed prefixes
            from our lab vantage point (Paris, France) with Diamond-Miner ICMP.
          </p>
        </div>
      </router-link>

      <router-link
        class="uk-width-1-1 uk-link-reset"
        :to="{
          name: 'MeasurementsList',
          params: { series: 'zeph' },
        }"
      >
        <div class="uk-card uk-card-primary uk-card-hover uk-card-body">
          <h3 class="uk-card-title">Zeph</h3>
          <p>
            Collections of Zeph measurements from EdgeNet with Diamond-Miner
            ICMP.
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>




<script>
export default {
  name: "Measurements",
  computed: {
    verified() {
      if (!this.$store.state.auth.jwt) {
        return false;
      }
      return this.$store.state.auth.jwt.is_verified;
    },
    probingEnabled() {
      if (!this.$store.state.auth.jwt) {
        return false;
      }
      return this.$store.state.auth.jwt.probing_enabled;
    },
  },
  mounted() {
    if (!this.verified) {
      this.$router.push({ name: "404" });
    }
  },
};
</script>
