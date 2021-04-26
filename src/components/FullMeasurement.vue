<template>
  <table class="uk-table uk-table-justify uk-table-divider">
    <thead>
      <tr>
        <th>UUID</th>
        <th>Tool</th>
        <th>Time</th>
        <th>Nodes</th>
        <th>Links</th>
        <th>Raw data</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.resource">
        <td>
          <a href="#offcanvas-usage" uk-toggle
            >ca40c1d4-46b4-408d-b2d7-10367c6bf034</a
          >
        </td>
        <td>diamond-miner</td>
        <td>2021-04-15T13:38:07<br />2021-04-15T13:38:30</td>
        <!-- <td></td> -->
        <td>
          <button
            @click="downloadStatic(item)"
            class="uk-button uk-button-primary"
          >
            <span uk-icon="download"></span> Download
          </button>
        </td>
        <td>
          <button
            @click="downloadStatic(item)"
            class="uk-button uk-button-primary"
          >
            <span uk-icon="download"></span> Download
          </button>
        </td>
        <td>
          <button
            uk-toggle="target: #request-access"
            class="uk-button uk-button-danger"
          >
            <span class="uk-margin-small-right" uk-icon="lock"></span>
            <span class="uk-text-middle">Request access</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <div id="offcanvas-usage" uk-offcanvas="mode: push; overlay: true">
    <div class="uk-offcanvas-bar">
      <button class="uk-offcanvas-close" type="button" uk-close></button>

      <div>
        <h3>Overview</h3>
        <p class="uk-text-small">ca40c1d4-46b4-408d-b2d7-10367c6bf034</p>

        <div class="uk-card uk-card-default uk-card-body">
          <!-- <h3 class="uk-card-title">Default</h3> -->
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  </div>

  <div id="request-access" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Request access</h2>
      <p>
        You can request to the raw data of this measurement by sending an
        <a href="mailto:admins@dioptra.io">email</a>.
      </p>
      <p class="uk-text-right">
        <button
          class="uk-button uk-button-default uk-modal-close"
          type="button"
        >
          Got it
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import OstaticService from "../services/ostatic.service";

export default {
  name: "FullMeasurement",
  data() {
    return {
      content: "",
      items: [],
    };
  },
  methods: {
    downloadStatic(item) {
      OstaticService.download(item.resource);
    },
  },
};
</script>
