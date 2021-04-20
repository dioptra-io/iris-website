<template>
  <router-link
    class="uk-button uk-button-secondary"
    :to="{
      name: 'NewMeasurement',
    }"
    >New</router-link
  >

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
              params: { uuid: measurement.uuid },
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
          <div v-else>
            <div uk-spinner></div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import MeasurementService from "../services/measurement.service";

export default {
  name: "MyMeasurements",
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
