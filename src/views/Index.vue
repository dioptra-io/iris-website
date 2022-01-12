<template>
  <div class="uk-section-primary tm-section-texture" uk-sticky>
    <navbar class="uk-navbar-transparent" />
  </div>

  <div class="uk-container">
    <div style="padding-top: 50px"></div>

    <article class="uk-article">
      <h1 class="uk-article-title uk-text-bold">Iris</h1>

      <p class="uk-text-lead">
        Iris is an open-source measurement system that aims to produce
        internet-scale IP-level topologies and gives the possibility to the user
        to conduct their own measurements with multiple tools. Thanks to its
        modular API and a resilient design, Iris is able to handle a large
        number of vantage points with different capabilities.
      </p>

      <hr class="uk-margin" />
      <h3 class="uk-h3 tm-heading-fragment">
        Get regular large-scale internet topology datasets
      </h3>
      <p>
        We are using the Iris platform to produce multi vantage points internet
        scale IP-level topology datasets.
      </p>

      <router-link
        v-if="!loggedIn"
        class="uk-button uk-button-primary"
        :to="{
          name: 'Register',
        }"
        ><span uk-icon="icon: sign-in"></span> Register</router-link
      >
      <router-link
        v-else-if="loggedIn && !verified"
        class="uk-button uk-button-primary"
        :to="{
          name: 'Profile',
        }"
        ><span uk-icon="icon: pencil"></span> Sign the license</router-link
      >
      <router-link
        v-else
        class="uk-button uk-button-primary"
        :to="{
          name: 'Measurements',
        }"
        ><span uk-icon="icon: database"></span> Get data</router-link
      >

      <hr class="uk-margin" />
      <h3 class="uk-h3 tm-heading-fragment">
        Run your own measurements on the platform
      </h3>
      <p>
        You can run your own traceroute-like (diamond-miner, yarrp) or ping
        measurements directly from the website.
      </p>

      <a
        v-if="!loggedIn || (loggedIn && !probingEnabled)"
        class="uk-button uk-button-primary"
        href="mailto:iris@dioptra.io?subject=[iris] Probing capabilities"
        ><span uk-icon="icon: mail"></span> Contact us</a
      >
      <router-link
        v-else
        class="uk-button uk-button-primary"
        :to="{
          name: 'MeasurementsList',
          params: { series: 'mine' },
        }"
        ><span uk-icon="icon: bolt"></span> Perform measurements</router-link
      >

      <hr class="uk-margin" />
      <h3 class="uk-h3 tm-heading-fragment">Run your own infrastructure</h3>
      <p>
        You can either run the standalone version of Iris that allow to easilly
        perfom measurement via a CLI or run your own multi vantage points
        infrastructure on your servers.
      </p>
      <a
        class="uk-button uk-button-default"
        href="https://github.com/dioptra-io/iris"
        ><span uk-icon="icon: github"></span> Github</a
      >
    </article>

    <div style="padding-top: 50px"></div>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {
    msg: String,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    verified() {
      if (!this.$store.state.auth.user) {
        return false;
      }
      return this.$store.state.auth.user.is_verified;
    },
    probingEnabled() {
      if (!this.$store.state.auth.user) {
        return false;
      }
      return this.$store.state.auth.user.probing_enabled;
    },
  },
};
</script>
