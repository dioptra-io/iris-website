<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>
      <form @submit="handleNew">
        <fieldset class="uk-fieldset">
          <legend class="uk-legend">New Measurement</legend>

          <div class="uk-margin">
            <select class="uk-select" v-model="selectedTool">
              <option value="diamond-miner">Diamond-Miner</option>
              <option value="ping">Yarrp</option>
              <option value="ping">Ping</option>
            </select>
          </div>

          <div class="uk-margin">
            <div class="uk-form-label">Agents</div>
            <div class="uk-form-controls">
              <select class="uk-select" multiple v-model="selectedAgents">
                <option
                  v-for="agent in agents.results"
                  :key="agent.uuid"
                  v-bind:value="agent.uuid"
                >
                  {{ agent.parameters.hostname }}
                </option>
              </select>
            </div>
          </div>

          <table class="uk-table uk-table-justify uk-table-divider">
            <thead>
              <tr>
                <th>Prefix</th>
                <th>Protocol</th>
                <th>Min TTL</th>
                <th>Max TTL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in targetContent" :key="index">
                <td>
                  <input class="uk-input" v-model="item.prefix" />
                </td>
                <td>
                  <input
                    class="uk-input"
                    placeholder="icmp"
                    v-model="item.protocol"
                  />
                </td>
                <td>
                  <input
                    class="uk-input"
                    placeholder="2"
                    v-model="item.min_ttl"
                  />
                </td>
                <td>
                  <input
                    class="uk-input"
                    placeholder="30"
                    v-model="item.max_ttl"
                  />
                </td>
                <td>
                  <button
                    v-on:click="addRow(index)"
                    type="button"
                    uk-icon="plus"
                  ></button>
                  <button
                    v-on:click="removeRow(index)"
                    type="button"
                    uk-icon="minus"
                  ></button>
                </td>
              </tr>
            </tbody>
          </table>

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
import TargetService from "../services/target.service";
import MeasurementService from "../services/measurement.service";

export default {
  name: "NewMeasurement",
  data() {
    return {
      agents: "",
      selectedTool: "diamond-miner",
      selectedAgents: [],
      targetContent: [{ prefix: "", protocol: "", min_ttl: "", max_ttl: "" }],
    };
  },
  mounted() {
    AgentService.getAgents().then((response) => {
      this.agents = response.data;
    });
  },
  methods: {
    addRow(index) {
      this.targetContent.splice(index + 1, 0, {
        prefix: "",
        protocol: "",
        min_ttl: "",
        max_ttl: "",
      });
    },
    removeRow(index) {
      if (index >= 1) {
        this.targetContent.splice(index, 1);
      }
    },
    validateTargetContent() {
      for (var i = 0; i < this.targetContent.length; i++) {
        var elements = Object.values(this.targetContent[i]);
        for (var j = 0; i < elements.length; i++) {
          if (!elements[j]) {
            return false;
          }
        }
      }

      return true;
    },
    handleNew() {
      // Check the values from the table content
      if (!this.validateTargetContent()) {
        return;
      }

      // Upload a target file from the table content
      TargetService.postTarget(this.targetContent).then((is_success) => {
        if (!is_success) {
          return;
        }
      });

      // Check if at least one agent is selected
      if (!this.selectedAgents[0]) {
        return;
      }

      // Create the agents structure
      var agents = [];
      this.selectedAgents.forEach((agent) => {
        agents.push({
          uuid: agent,
          target_file: "website.csv",
        });
      });

      // Prepare the measurement parameters
      var params = {
        tool: this.selectedTool,
        agents: agents,
        tags: ["website"],
      };

      // Trigger the measurement
      MeasurementService.postMeasurment(params);
      this.$router.push({ name: "Measurements", params: { vue: "mine" } });
    },
  },
};
</script>
