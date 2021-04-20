<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <ul uk-tab>
        <li class="uk-active">
          <router-link
            :to="{
              name: 'Measurements',
              params: { vue: 'full' },
            }"
            >Full</router-link
          >
        </li>
        <li>
          <router-link
            :to="{
              name: 'Measurements',
              params: { vue: 'mine' },
            }"
            >Mine</router-link
          >
        </li>
      </ul>

      <full-measurement
        v-if="$route.params.vue === undefined || $route.params.vue === 'full'"
      ></full-measurement>
      <my-measurements v-if="$route.params.vue === 'mine'"></my-measurements>
    </div>
  </div>
</template>

<script>
import FullMeasurement from "@/components/FullMeasurement.vue";
import MyMeasurements from "@/components/MyMeasurements.vue";

export default {
  name: "Mesurements",
  components: {
    FullMeasurement,
    MyMeasurements,
  },
};
</script>

    FullMeasurement
