<template>
  <div class="uk-section-primary tm-section-texture" uk-sticky>
    <navbar class="uk-navbar-transparent" />
  </div>

  <div class="uk-container">
    <div style="padding-top: 50px"></div>

    <article class="uk-article">
      <h1 class="uk-article-title uk-text-bold">Iris</h1>

      <p class="uk-text-lead">
        Iris provides internet scale route trace datasets and allow
        researchers to run their own measurements.
      </p>

      <hr class="uk-margin" />
      <h3 class="uk-h3 tm-heading-fragment">
        Get regular internet scale route trace datasets
      </h3>
      <p>
        Iris performs regular route traces of the load-balanced paths from a
        small number of vantage points to all routed IPv4 address prefixes. You
        can download these traces in a variety of formats, including
        <a href="https://atlas.ripe.net">RIPE Atlas JSON</a>,
        <a href="https://www.caida.org/catalog/software/scamper/"
          >Scamper Warts</a
        >, and
        <a
          href="https://gephi.org/users/supported-graph-formats/graphml-format/"
        >
          GraphML</a
        >
        for easy use with existing tools.
        Iris currently provides two datasets:
        <ul>
          <li>
            <b>Exhaustive</b>: multipath traces towards every routed IPv4 address prefixes from our laboratory in Paris at 100,000 pps with ICMP probes.
            These measurements are made weekly and discover around 2 million IPv4 infrastructure addresses and 5 million links between them.
          </li>
          <li>
            <b>Zeph</b>: multipath traces that are coordinated among multiple vantage points so as to achieve high coverage of the discoverable IPv4 infrastructure addresses.
            These measurements are conducted occasionally using <a href="https://github.com/dioptra-io/zeph">Zeph</a> algorithm from five <a href="https://cloud.google.com" >GCP</a> instances probing at 100,000 pps towards 2 million prefixes with ICMP probes
            and discover around 3 million IPv4 infrastructure addresses and 17 million links between them.
          </li>
        </ul>
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
        v-if="loggedIn && verified"
        class="uk-button uk-button-primary"
        :to="{
          name: 'MeasurementsExhaustive',
        }"
        ><span uk-icon="icon: database"></span> Exhaustive</router-link
      >
      <span>&nbsp;</span>
      <router-link
        v-if="loggedIn && verified"
        class="uk-button uk-button-primary"
        :to="{
          name: 'MeasurementsZeph',
        }"
        ><span uk-icon="icon: database"></span> Zeph</router-link
      >

      <hr class="uk-margin" />
      <h3 class="uk-h3 tm-heading-fragment">
        Run your own measurements from agents across the internet
      </h3>
      <p>
        Iris offers a RESTful API for running your own IPv4 and IPv6 pings and
        route traces from the vantage points provided by the
        <a href="https://www.edge-net.org"> EdgeNet</a> testbed. If you prefer,
        you can use this website's graphical interface to run your measurements.
        <br />
        You can check the live status of the platform
        <a href="https://dioptra-io.github.io/iris-uptime/">here</a>.
      </p>
      <p></p>
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
          name: 'MeasurementsMine',
        }"
        ><span uk-icon="icon: bolt"></span> Run measurements</router-link
      >

      <hr class="uk-margin" />
      <h3 class="uk-h3 tm-heading-fragment">
        Run your own Iris instance, or contribute to the project
      </h3>
      <p>
        We provide Docker images for users who want to run their own instance of Iris.<br />
        Iris is fully open-source and released under a liberal software license, feel free to make you own changes to its
        code.<br />
      </p>
      <a
        class="uk-button uk-button-default"
        href="https://github.com/dioptra-io/iris"
        ><span uk-icon="icon: github"></span> Github</a
      >
    </article>

    <hr class="uk-margin" />
    <h3 class="uk-h3 tm-heading-fragment">About Iris</h3>
    <p>
      Iris is an orchestrator for conducting internet measurements from multiple distributed measurement agents. It is developed and
      maintained by the
      <a href="https://dioptra.io/">Dioptra</a> group at
      <a href="https://www.sorbonne-universite.fr">Sorbonne Université</a>. Iris
      supports multiple measurement tools, including
      <a href="https://github.com/dioptra-io/diamond-miner">Diamond-Miner</a>
      and <a href="https://github.com/cmand/yarrp">Yarrp</a> as well as constant-flow-id Ping.<br />
      It's is built from widely used open-source tools and libraries like
      <a href="https://clickhouse.com">Clickhouse</a>, <a href="https://redis.io">Redis</a> or <a href="https://min.io">MinIO</a> to favor reliability, maintainability and scalability.
    </p>
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
