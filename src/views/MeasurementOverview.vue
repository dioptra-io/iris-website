<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <div class="uk-card uk-card-default uk-card-body">
        <table class="uk-table uk-table-striped">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UUID</td>
              <td>{{ measurement.uuid }}</td>
            </tr>
            <tr>
              <td>tool</td>
              <td>{{ measurement.tool }}</td>
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
          <span class="uk-label">{{ tag }}</span>
        </div>
      </div>

      <div style="padding-top: 20px"></div>
      <ul
        v-for="agent in measurement.agents"
        :key="agent.parameters.hostname"
        uk-accordion
      >
        <li>
          <a class="uk-accordion-title" href="#">{{
            agent.parameters.hostname
          }}</a>
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
                  <td>UUID</td>
                  <td>{{ agent.uuid }}</td>
                </tr>
                <tr>
                  <td>Target file</td>
                  <td>{{ agent.specific.target_file_content }}</td>
                </tr>
                <tr>
                  <td>Results</td>
                  <td>
                    <strong>
                      GET
                      {{
                        backend_url + "/" + measurement.uuid + "/" + agent.uuid
                      }}
                    </strong>
                  </td>
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
                  v-for="(value, key) in agent.specific.tool_parameters"
                  v-bind:key="key"
                >
                  <td>{{ key }}</td>
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
                <tr v-for="(value, key) in agent.parameters" v-bind:key="key">
                  <td>{{ key }}</td>
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
    };
  },
  mounted() {
    this.fetchMeasurement();
  },
  methods: {
    fetchMeasurement() {
      MeasurementService.getMeasurement(this.$route.params.uuid).then(
        (response) => {
          this.measurement = response.data;
        }
      );
    },
  },
};
</script>
