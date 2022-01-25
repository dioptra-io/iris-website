<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <h1>Exhaustive measurements</h1>
      <p>
        Collections of exhaustive measurements of all IPv4 routed prefixes from
        our lab vantage point (Paris, France) with Diamond-Miner ICMP.
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
