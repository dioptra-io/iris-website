<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <h1>Exhaustive measurements</h1>
      <p>
        Collections of multipath traces towards every routed IPv4 address
        prefixes from our laboratory in Paris at 100,000 pps with ICMP probes.
        These measurements are made weekly and discover around 2 million IPv4
        infrastructure addresses and 5 million links between them.
      </p>

      <div style="padding-top: 30px"></div>

      <measurement-list series="exhaustive" />
    </div>
  </div>
</template>

<script>
import MeasurementList from "../components/MeasurementList.vue";

export default {
  components: { MeasurementList },
  name: "MeasurementsExhaustive",
};
</script>
