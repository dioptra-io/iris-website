<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <h1>My measurements</h1>
      <p>Perform my own measurements with Diamond-Miner, YARRP or Ping.</p>
      <router-link
        class="uk-button uk-button-primary"
        :to="{
          name: 'NewMeasurement',
        }"
      >
        run measurement</router-link
      >

      <div style="padding-top: 30px"></div>

      <measurement-list series="mine" />
    </div>
  </div>
</template>

<script>
import MeasurementList from "../components/MeasurementList.vue";

export default {
  components: { MeasurementList },
  name: "MeasurementsMine",
};
</script>
