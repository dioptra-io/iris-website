<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <ul uk-tab>
        <li>
          <router-link
            class="uk-active"
            :to="{
              name: 'Measurements',
              params: { vue: 'mine' },
            }"
            >Mine</router-link
          >
        </li>
        <!-- <li>
          <router-link
            :to="{
              name: 'Measurements',
              params: { vue: 'full' },
            }"
            >Full</router-link
          >
        </li> -->
      </ul>

      <my-measurements
        v-if="$route.params.vue === undefined || $route.params.vue === 'mine'"
      ></my-measurements>
      <!-- <full-measurement v-if="$route.params.vue === 'full'"></full-measurement> -->
    </div>
  </div>
</template>

<script>
import MyMeasurements from "@/components/MyMeasurements.vue";
// import FullMeasurement from "@/components/FullMeasurement.vue";

export default {
  name: "Mesurements",
  components: {
    MyMeasurements,
    // FullMeasurement,
  },
};
</script>
