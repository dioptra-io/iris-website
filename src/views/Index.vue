<template>
  <div class="uk-section-primary tm-section-texture" uk-sticky>
    <navbar class="uk-navbar-transparent" />
  </div>

  <div class="uk-container">
    <div style="padding-top: 50px"></div>

    <article class="uk-article">
      <h1 class="uk-article-title uk-text-bold">Iris</h1>

      <p class="uk-text-lead">
        Iris is an open-source internet measurement platform,
        designed to coordinate large-scale IP path measurements.
        It is developed and maintained by the <a href="https://dioptra.io/">Dioptra</a>
        group at <a href="https://www.sorbonne-universite.fr">Sorbonne Université</a>.
        On this website, we provide regular internet topology datasets and
        we offer researchers the ability to run their own measurements.
      </p>

      <hr class="uk-margin" />
      <h3 class="uk-h3 tm-heading-fragment">
        Get regular large-scale internet topology datasets
      </h3>
      <p>
        We perform regular measurements of load-balanced IP paths on the Internet with
        <a href="https://github.com/dioptra-io/diamond-miner">Diamond-Miner</a> and
        <a href="https://github.com/dioptra-io/zeph">Zeph</a>.<br/>
        We provide our measurement results in multiple formats, including RIPE Atlas JSON, Scamper Warts,
        and GraphML for easy use with existing tools.
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
        We offer researchers the ability to run their own measurements on the platform,
        through this website or an HTTP API.
        We support multiple measurement tools including Diamond-Miner and Yarrp.
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
      <h3 class="uk-h3 tm-heading-fragment">Contribute to Iris, or run your own instance</h3>
      <p>
        Iris is fully open-source, feel free to make you own changes to its code.<br/>
        We also provide Docker images for the users who wants to run their own instance of Iris.
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
