<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <h1>Zeph measurements</h1>

      <p>
        Collections of Zeph measurements from EdgeNet with Diamond-Miner ICMP.
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
