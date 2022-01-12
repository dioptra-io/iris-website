<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <ul class="uk-breadcrumb">
        <li><router-link :to="{ name: 'Index' }">home</router-link></li>
        <li>
          <router-link :to="{ name: 'Measurements' }">measurements</router-link>
        </li>
        <li>
          <router-link
            :to="{
              name: 'MeasurementsList',
              params: { series: 'mine' },
            }"
            >mine</router-link
          >
        </li>
        <li>create</li>
      </ul>
      <div style="padding-top: 10px"></div>

      <div v-if="is_submitted" class="uk-alert-success" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>Measurement created</p>
      </div>

      <div v-if="error" class="uk-alert-warning" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>{{ error }}</p>
      </div>

      <form @submit="handleNew">
        <fieldset class="uk-fieldset">
          <div class="uk-margin">
            <h5>Tool</h5>
            <select class="uk-select" v-model="selectedTool">
              <option value="diamond-miner">diamond-miner</option>
              <option value="yarrp">yarrp</option>
              <option value="ping">ping</option>
            </select>
          </div>

          <div class="uk-margin">
            <h5>Agents</h5>
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
                  <input
                    class="uk-input"
                    placeholder="0.0.0.0/0"
                    v-model="item.prefix"
                  />
                </td>
                <td>
                  <select class="uk-select" v-model="item.protocol">
                    <option value="icmp">icmp</option>
                    <option value="udp">udp</option>
                  </select>
                </td>
                <td>
                  <input class="uk-input" v-model="item.min_ttl" />
                </td>
                <td>
                  <input class="uk-input" v-model="item.max_ttl" />
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
          <button class="uk-button uk-button-primary" type="submit">
            Create
          </button>
        </fieldset>
      </form>
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
      targetContent: [
        { prefix: "", protocol: "icmp", min_ttl: "2", max_ttl: "32" },
      ],
      error: "",
      is_submitted: false,
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
        protocol: "icmp",
        min_ttl: "2",
        max_ttl: "32",
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
        for (var j = 0; j < elements.length; j++) {
          if (!elements[j]) {
            return false;
          }
        }
      }

      return true;
    },
    handleNew(event) {
      // Prevent to reload the page
      event.preventDefault();
      this.error = "";

      // Check if at least one agent is selected
      if (!this.selectedAgents[0]) {
        this.error = "No agent selected";
        return;
      }

      // Check the values from the table content
      if (!this.validateTargetContent()) {
        this.error = "Empty target content";
        return;
      }

      // Upload a target file from the table content
      TargetService.postTarget(this.targetContent)
        .then(
          function () {
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
            MeasurementService.postMeasurement(params).then(() => {
              this.is_submitted = true;
            });
          }.bind(this)
        )
        .catch(
          function () {
            this.error = "Invalid target content";
          }.bind(this)
        );
    },
  },
};
</script>
