<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

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
                  name: 'MeasurementOverview',
                  params: { uuid: measurement.uuid },
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
              <div v-else>
                <span uk-icon="icon: future"></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import MeasurementService from "../services/measurement.service";

export default {
  name: "Measurements",
  data() {
    return {
      polling: null,
      content: "",
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
    fetchMeasurements() {
      MeasurementService.getMeasurements().then((response) => {
        this.content = response.data;
      });
    },
  },
};
</script>
