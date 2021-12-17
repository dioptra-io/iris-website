<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <div v-if="is_canceled" class="uk-alert-success" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>Measurement canceled</p>
      </div>

      <div class="uk-card uk-card-default uk-card-body">
        <table class="uk-table uk-table-striped">
          <thead>
            <tr>
              <th class="uk-table-expand"></th>
              <th class="uk-table-expand"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ $store.state.openapi.mapping.uuid }}</td>
              <td>
                {{ measurement.uuid }}
                <button
                  v-if="is_mine && measurement.state !== 'finished'"
                  v-on:click="cancelMeasurement()"
                  class="
                    uk-button uk-button-danger uk-button-small uk-align-right
                  "
                >
                  Cancel
                </button>
              </td>
            </tr>
            <tr>
              <td>{{ $store.state.openapi.mapping.tool }}</td>
              <td>{{ measurement.tool }}</td>
            </tr>
            <tr>
              <td>{{ $store.state.openapi.mapping.state }}</td>
              <td>{{ measurement.state }}</td>
            </tr>
            <tr>
              <td>time</td>
              <td>
                {{ measurement.start_time }}<br />{{ measurement.end_time }}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style="display: inline-table"
          v-for="tag in measurement.tags"
          :key="tag"
        >
          <span class="uk-label">{{ tag }} </span>
          <span>&nbsp;</span>
        </div>
      </div>

      <div style="padding-top: 20px"></div>

      <ul
        v-for="agent in measurement.agents"
        :key="agent.parameters.hostname"
        uk-accordion
      >
        <li class="uk-card uk-card-default uk-card-body">
          <a class="uk-accordion-title" href="#">{{
            agent.parameters.hostname
          }}</a>
          <div class="uk-accordion-content">
            <table class="uk-table uk-table-striped">
              <thead>
                <tr>
                  <th class="uk-table-expand"></th>
                  <th class="uk-table-expand"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ $store.state.openapi.mapping.uuid }}</td>
                  <td>{{ agent.uuid }}</td>
                </tr>
                <tr>
                  <td>{{ $store.state.openapi.mapping.target_file }}</td>
                  <td>{{ agent.specific.target_file_content }}</td>
                </tr>
              </tbody>
            </table>

            <h4>Tool Parameters</h4>
            <table class="uk-table uk-table-striped">
              <thead>
                <tr>
                  <th class="uk-table-expand"></th>
                  <th class="uk-table-expand"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(value, key) in agent.specific.tool_parameters"
                  v-bind:key="key"
                >
                  <td>{{ $store.state.openapi.mapping[key] }}</td>
                  <td>{{ value }}</td>
                </tr>
              </tbody>
            </table>

            <h4>Agent Parameters</h4>
            <table class="uk-table uk-table-striped">
              <thead>
                <tr>
                  <th class="uk-table-expand"></th>
                  <th class="uk-table-expand"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in agent.parameters" v-bind:key="key">
                  <td>{{ $store.state.openapi.mapping[key] }}</td>
                  <td>{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MeasurementService from "../services/measurement.service";

export default {
  name: "MeasurementOverview",
  data() {
    return {
      measurement: "",
      backend_url: process.env.VUE_APP_BACKEND_URL,
      is_canceled: false,
      is_mine: this.$route.params.is_mine === "true",
    };
  },
  mounted() {
    if (this.is_mine) {
      this.fetchMeasurement();
    } else {
      this.fetchPublicMeasurement();
    }
  },
  methods: {
    fetchMeasurement() {
      MeasurementService.getMeasurement(this.$route.params.uuid).then(
        (response) => {
          this.measurement = response.data;
        }
      );
    },
    fetchPublicMeasurement() {
      MeasurementService.getPublicMeasurement(this.$route.params.uuid).then(
        (response) => {
          this.measurement = response.data;
        }
      );
    },
    cancelMeasurement() {
      MeasurementService.deleteMeasurement(this.measurement.uuid).then(() => {
        this.is_canceled = true;
      });
    },
  },
};
</script>
