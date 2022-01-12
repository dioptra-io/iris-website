<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <ul class="uk-breadcrumb">
        <li><router-link :to="{ name: 'Index' }">home</router-link></li>
        <li>
          <router-link :to="{ name: 'Measurements' }">measurements</router-link>
        </li>
        <li>{{ $route.params.series }}</li>
      </ul>

      <h1 v-if="$route.params.series !== 'mine'">
        <span class="uk-text-bolder">collection:</span>
        {{ $route.params.series }}
      </h1>

      <router-link
        v-if="$route.params.series === 'mine'"
        class="uk-button uk-button-primary"
        :to="{
          name: 'NewMeasurement',
        }"
      >
        create measurement</router-link
      >

      <div style="padding-top: 30px"></div>
      <ul class="uk-dotnav">
        <li
          v-for="page in n_pages"
          :key="page"
          v-on:click="setPage(page)"
          :class="{ current: page == current_page }"
        >
          {{ page }}
        </li>
      </ul>

      <table class="uk-table uk-table-justify uk-table-divider">
        <thead>
          <tr>
            <th>UUID</th>
            <th>Tool</th>
            <th>Time</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="measurement in content.results"
            :key="measurement.start_time"
          >
            <td>
              <router-link
                :to="{
                  name: 'MeasurementDetails',
                  params: {
                    series: $route.params.series,
                    uuid: measurement.uuid,
                  },
                }"
                >{{ measurement.uuid }}</router-link
              >
            </td>
            <td>{{ measurement.tool }}</td>
            <td>
              {{ measurement.start_time }}<br />{{ measurement.end_time }}
            </td>
            <td>
              <div v-if="measurement.state === 'finished'">
                <span uk-icon="icon: check"></span>
              </div>
              <div v-else-if="measurement.state === 'canceled'">
                <span uk-icon="icon: ban"></span>
              </div>
              <div v-else>
                <div uk-spinner></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>
.current {
  color: #2e2e2e;
}
</style>

<script>
import MeasurementService from "../services/measurement.service";

export default {
  name: "MeasurementsList",
  data() {
    return {
      polling: null,
      content: "",
      n_pages: 0,
      n_items_per_page: 10,
      current_page: 1,
    };
  },
  mounted() {
    // Check if the user has probing enabled to get 'mine' measurements list
    if (this.$route.params.series === "mine" && !this.probingEnabled()) {
      this.$router.push({ name: "404" });
    }

    // Check if the measurement list is registred as valid measurement collection
    if (!["mine", "exhaustive", "zeph"].includes(this.$route.params.series)) {
      this.$router.push({ name: "404" });
    }

    // If checks are successful, fetch the measurement list
    this.fetchMeasurements();
    this.polling = setInterval(this.fetchMeasurements, 10000);
  },

  beforeUnmount() {
    clearInterval(this.polling);
  },
  methods: {
    probingEnabled() {
      if (!this.$store.state.auth.user) {
        return false;
      }
      return this.$store.state.auth.user.probing_enabled;
    },
    setPage(page) {
      this.current_page = page;
      this.fetchMeasurements((this.current_page - 1) * this.n_items_per_page);
    },
    fetchMeasurements() {
      MeasurementService.getMeasurements(
        (this.current_page - 1) * this.n_items_per_page,
        this.n_items_per_page,
        this.$route.params.series
      ).then((response) => {
        this.content = response.data;
        var n_pages = Math.ceil(this.content.count / this.n_items_per_page);
        if (n_pages > 10) {
          this.n_pages = 10;
        } else {
          this.n_pages = n_pages;
        }
      });
    },
  },
};
</script>
