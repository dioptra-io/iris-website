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
              params: { vue: 'public' },
            }"
            >Public</router-link
          >
        </li>
        <li v-show="probingEnabled">
          <router-link
            :to="{
              name: 'Measurements',
              params: { vue: 'mine' },
            }"
            >Mine</router-link
          >
        </li>
      </ul>

      <public-measurements
        v-if="$route.params.vue === undefined || $route.params.vue === 'public'"
      ></public-measurements>
      <my-measurements v-if="$route.params.vue === 'mine'"></my-measurements>
    </div>
  </div>
</template>

<script>
import MyMeasurements from "@/components/MyMeasurements.vue";
import PublicMeasurements from "@/components/PublicMeasurements.vue";

export default {
  name: "Mesurements",
  components: {
    PublicMeasurements,
    MyMeasurements,
  },
  computed: {
    probingEnabled() {
      if (!this.$store.state.auth.jwt) {
        return false;
      }
      return this.$store.state.auth.jwt.probing_enabled;
    },
  },
};
</script>
