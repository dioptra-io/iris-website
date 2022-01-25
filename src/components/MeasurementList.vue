<template>
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
      <tr v-for="measurement in content.results" :key="measurement.start_time">
        <td>
          <router-link
            :to="{
              name: 'MeasurementDetails',
              params: {
                series: series,
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
</template>

<style scoped>
.current {
  font-weight: bold;
}
</style>

<script>
import MeasurementService from "../services/measurement.service";

export default {
  name: "MeasurementList",
  props: {
    series: String,
  },
  data() {
    return {
      content: "",
      n_pages: 0,
      n_items_per_page: 10,
      current_page: 1,
    };
  },
  mounted() {
    // Check if the user has probing enabled to get 'mine' measurements list
    if (this.series === "mine" && !this.probingEnabled()) {
      this.$router.push({ name: "404" });
    }

    // Check if the measurement list is registred as valid measurement collection
    if (!["mine", "exhaustive", "zeph"].includes(this.series)) {
      this.$router.push({ name: "404" });
    }

    this.fetchMeasurements();
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
        this.series
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
    formatTime(time) {
      if (time === null) {
        return "";
      }
      return new Date(time).toLocaleString();
    },
  },
};
</script>
