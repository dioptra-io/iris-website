<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <ul uk-tab>
        <li
          v-bind:class="{
            'uk-active': $route.params.visibility === 'public',
          }"
        >
          <router-link
            :to="{ name: 'Measurements', params: { visibility: 'public' } }"
            >Public</router-link
          >
        </li>
        <li
          v-show="probingEnabled"
          v-bind:class="{
            'uk-active': $route.params.visibility === 'private',
          }"
        >
          <router-link
            :to="{
              name: 'Measurements',
              params: { visibility: 'private' },
            }"
            >private</router-link
          >
        </li>
      </ul>

      <public-measurements
        v-if="$route.params.visibility === 'public'"
      ></public-measurements>
      <private-measurements
        v-else-if="$route.params.visibility === 'private'"
      ></private-measurements>
    </div>
  </div>
</template>

<script>
import PrivateMeasurements from "@/components/PrivateMeasurements.vue";
import PublicMeasurements from "@/components/PublicMeasurements.vue";

export default {
  name: "Mesurements",
  components: {
    PublicMeasurements,
    PrivateMeasurements,
  },
  computed: {
    probingEnabled() {
      if (!this.$store.state.auth.jwt) {
        return false;
      }
      return this.$store.state.auth.jwt.probing_enabled;
    },
  },
  mounted() {
    if (
      this.$route.params.visibility !== "public" &&
      this.$route.params.visibility !== "private"
    ) {
      this.$router.push("/404");
    }
  },
};
</script>
