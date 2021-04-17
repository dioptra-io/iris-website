<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>
      <p>{{ measurement }}</p>
    </div>
  </div>
</template>

<script>
import MeasurementService from "../services/measurement.service";

export default {
  name: "MeasurementOverview",
  data() {
    return {
      measurement: "",
    };
  },
  mounted() {
    this.fetchMeasurement();
  },
  methods: {
    fetchMeasurement() {
      MeasurementService.getMeasurement(this.$route.params.uuid).then(
        (response) => {
          this.measurement = response.data;
          console.log(this.measurement);
        }
      );
    },
  },
};
</script>
