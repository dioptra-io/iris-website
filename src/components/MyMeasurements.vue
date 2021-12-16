<template>
  <router-link
    class="uk-button uk-button-secondary"
    :to="{
      name: 'NewMeasurement',
    }"
    >New</router-link
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
      <tr v-for="measurement in content.results" :key="measurement.start_time">
        <td>
          <router-link
            :to="{
              name: 'MeasurementOverview',
              params: { uuid: measurement.uuid, is_mine: true },
            }"
            >{{ measurement.uuid }}</router-link
          >
        </td>
        <td>{{ measurement.tool }}</td>
        <td>{{ measurement.start_time }}<br />{{ measurement.end_time }}</td>
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
  color: #2e2e2e;
}
</style>

<script>
import MeasurementService from "../services/measurement.service";

export default {
  name: "MyMeasurements",
  data() {
    return {
      polling: null,
      content: "",
      n_pages: 0,
      n_measurements_per_page: 10,
      current_page: 1,
    };
  },
  mounted() {
    this.fetchMeasurements();
    this.polling = setInterval(this.fetchMeasurements, 10000);
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  methods: {
    setPage(page) {
      this.current_page = page;
      this.fetchMeasurements(
        (this.current_page - 1) * this.n_measurements_per_page
      );
    },
    fetchMeasurements() {
      MeasurementService.getMeasurements(
        (this.current_page - 1) * this.n_measurements_per_page,
        this.n_measurements_per_page
      ).then((response) => {
        this.content = response.data;
        var n_pages = Math.ceil(
          this.content.count / this.n_measurements_per_page
        );
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
