<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <h1>Zeph measurements</h1>

      <p>
        Collections of multipath traces that are coordinated among multiple
        vantage points so as to achieve high coverage of the discoverable IPv4
        infrastructure addresses. These measurements are conducted occasionally
        using <a href="https://github.com/dioptra-io/zeph">Zeph</a> algorithm
        from five <a href="https://cloud.google.com">GCP</a> instances probing
        at 100,000 pps towards 2 million prefixes with ICMP probes and discover
        around 3 million IPv4 infrastructure addresses and 17 million links
        between them.
      </p>

      <div style="padding-top: 30px"></div>

      <measurement-list series="zeph" />
    </div>
  </div>
</template>

<script>
import MeasurementList from "../components/MeasurementList.vue";

export default {
  components: { MeasurementList },
  name: "MeasurementsZeph",
  methods: {
    firstUpperCase(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>
