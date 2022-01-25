<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <div v-if="is_canceled" class="uk-alert-success" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>Measurement canceled</p>
      </div>

      <div class="uk-card uk-card-default uk-card-body">
        <h4>Metadata</h4>

        <table class="uk-table uk-table-striped">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ $store.state.openapi.mapping.uuid }}</td>
              <td>
                {{ measurement.uuid }}
                <button
                  v-if="
                    $route.params.series === 'mine' &&
                    measurement.state !== 'finished'
                  "
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
          </tbody>
        </table>

        <table class="uk-table uk-table-striped">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Creation time (UTC)</td>
              <td>{{ formatTime(measurement.creation_time) }}</td>
            </tr>
            <tr>
              <td>Start time (UTC)</td>
              <td>{{ formatTime(measurement.start_time) }}</td>
            </tr>
            <tr>
              <td>End time (UTC)</td>
              <td>{{ formatTime(measurement.end_time) }}</td>
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
        :key="agent.agent_parameters.hostname"
        uk-accordion
      >
        <li class="uk-card uk-card-default uk-card-body">
          <a class="uk-accordion-title" href="#"
            >{{ agent.agent_parameters.hostname }}
          </a>
          <div v-if="$route.params.series !== 'mine'">
            <div style="padding-top: 20px"></div>
            <measurement-results
              :series="$route.params.series"
              :measurementUUID="measurement.uuid"
              :agentUUID="agent.agent_uuid"
            />
          </div>
          <div class="uk-accordion-content">
            <table class="uk-table uk-table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ $store.state.openapi.mapping.uuid }}</td>
                  <td>{{ agent.agent_uuid }}</td>
                </tr>
                <tr>
                  <td>{{ $store.state.openapi.mapping.target_file }}</td>
                  <td>{{ agent.target_file }}</td>
                </tr>
              </tbody>
            </table>

            <h4>Tool Parameters</h4>
            <table class="uk-table uk-table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(value, key) in agent.tool_parameters"
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
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(value, key) in agent.agent_parameters"
                  v-bind:key="key"
                >
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
import MeasurementResults from "../components/MeasurementResults.vue";

export default {
  name: "MeasurementDetails",
  components: {
    MeasurementResults,
  },
  data() {
    return {
      measurement: "",
      backend_url: process.env.VUE_APP_BACKEND_URL,
      is_canceled: false,
    };
  },
  mounted() {
    this.fetchMeasurement();
  },
  methods: {
    fetchMeasurement() {
      MeasurementService.getMeasurement(
        this.$route.params.uuid,
        this.$route.params.series
      )
        .then((response) => {
          this.measurement = response.data;
        })
        .catch(() => {
          this.$router.push({ name: "404" });
        });
    },
    fetchPublicMeasurement() {
      MeasurementService.getPublicMeasurement(this.$route.params.uuid)
        .then((response) => {
          this.measurement = response.data;
        })
        .catch(() => {
          this.$router.push({ name: "404" });
        });
    },
    cancelMeasurement() {
      MeasurementService.deleteMeasurement(this.measurement.uuid).then(() => {
        this.is_canceled = true;
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
