<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <h1>Zeph measurements</h1>

      <p>
        Collections of multipath traces measurements using our open-source
        orchestrator for distributed IP tracing
        <a href="https://github.com/dioptra-io/zeph">Zeph</a> based on a
        reiforcment learning approach to optimize the discovery of interfaces
        and links. We are able to rapidly ramp up the number of discovery up to
        3 million nodes and 16 million links using 5
        <a href="https://cloud.google.com">GCP</a> instances probing at
        100,000pps 2 millions prefixes with ICMP probes.
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
