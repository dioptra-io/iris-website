<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <div class="uk-card uk-card-default uk-card-body">
        <p>UUID: {{ measurement.uuid }}</p>
        <p>Tool: {{ measurement.tool }}</p>
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
            <p>Protocol: {{ agent.specific.tool_parameters.protocol }}</p>
            <p>Min TTL: {{ agent.specific.tool_parameters.min_ttl }}</p>
            <p>Max TTL: {{ agent.specific.tool_parameters.max_ttl }}</p>
          </div>
        </li>
      </ul>

      <hr class="uk-margin-large" />
      <p>{{ measurement }}</p>
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
