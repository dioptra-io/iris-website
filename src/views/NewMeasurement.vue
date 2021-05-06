<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>
      <form @submit.prevent="handleNew">
        <fieldset class="uk-fieldset">
          <legend class="uk-legend">New Measurement</legend>

          <div class="uk-margin">
            <select class="uk-select" v-model="selectedTool">
              <option value="diamond-miner">Diamond-Miner</option>
              <option value="ping">Ping</option>
            </select>
          </div>

          <div class="uk-margin">
            <div class="uk-form-label">Agents</div>
            <div class="uk-form-controls">
              <select
                class="uk-select"
                multiple
                v-for="agent in agents.results"
                :key="agent.hostname"
                v-model="selectedAgent"
              >
                <option v-bind:value="agent.uuid">
                  {{ agent.parameters.hostname }}
                </option>
              </select>
            </div>
          </div>

          <div class="uk-margin">
            <div class="uk-form-label">Targets</div>
            <div class="uk-form-controls">
              <label v-for="target in targets.results" :key="target.key"
                ><input
                  input
                  class="uk-radio"
                  type="radio"
                  v-model="selectedTarget"
                  v-bind:value="target.key" />
                {{ target.key }}<br /></label
              ><br />
            </div>
          </div>

          <div style="padding-top: 20px"></div>
          <button class="uk-button uk-button-secondary" type="submit">
            Create
          </button>
        </fieldset>
      </form>
      <!-- <hr class="uk-margin-large" />
      <p>{{ agents }}</p>
      <p>{{ targets }}</p> -->
    </div>
  </div>
</template>

<script>
import AgentService from "../services/agent.service";
import MeasurementService from "../services/measurement.service";
import TargetService from "../services/target.service";

export default {
  name: "NewMeasurement",
  data() {
    return {
      agents: "",
      targets: "",
      selectedTool: "diamond-miner",
      selectedAgent: [],
      selectedTarget: "",
    };
  },
  mounted() {
    AgentService.getAgents().then((response) => {
      this.agents = response.data;
    });
    TargetService.getTargets().then((response) => {
      this.targets = response.data;
    });
  },
  methods: {
    handleNew() {
      if (this.selectedAgent[0] === undefined || this.selectedTarget === "") {
        return;
      }
      var params = {
        tool: this.selectedTool,
        agents: [
          {
            uuid: this.selectedAgent[0],
            target_file: this.selectedTarget,
          },
        ],
        tags: ["website"],
      };

      MeasurementService.postMeasurment(params);
      this.$router.push({ name: "Measurements", params: { vue: "mine" } });
    },
  },
};
</script>
