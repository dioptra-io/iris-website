<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <div v-if="$route.params.series === 'mine'">
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
      </div>

      <div v-else>
        <h1>{{ firstUpperCase($route.params.series) }} measurements</h1>
        <p v-if="$route.params.series === 'exhaustive'">
          Collections of exhaustive measurements of all IPv4 routed prefixes
          from our lab vantage point (Paris, France) with Diamond-Miner ICMP.
        </p>
        <p v-if="$route.params.series === 'zeph'">
          Collections of Zeph measurements from EdgeNet with Diamond-Miner ICMP.
        </p>
      </div>

      <div style="padding-top: 30px"></div>
      <ul v-if="n_pages > 1" class="uk-dotnav">
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
            <th>Start time (UTC)</th>
            <th>End time (UTC)</th>
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
            <td>{{ formatTime(measurement.start_time) }}</td>
            <td>{{ formatTime(measurement.end_time) }}</td>
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
  font-weight: bold;
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
    firstUpperCase(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    formatTime(time) {
      if (time === null) {
        return "";
      }
      return new Date(time).toLocaleString();
    },
  },
};
</script>
