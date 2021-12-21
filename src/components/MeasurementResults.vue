<template>
  <div v-for="result in results" :key="result.name">
    <a
      v-if="result.format !== undefined"
      class="uk-button uk-button-secondary"
      :href="result.url"
    >
      {{ result.format }}
    </a>
    <span>&nbsp;</span>
  </div>
</template>

<script>
import S3Service from "../services/s3.service";

export default {
  name: "MeasurementResults",
  props: {
    measurementUUID: String,
    agentUUID: String,
  },
  data() {
    return {
      results: null,
    };
  },
  mounted() {
    S3Service.getFiles(this.measurementUUID, this.agentUUID).then((files) => {
      this.results = files;

      // TODO: get files per format type (csv, ripe, ...)
      for (let index = 0; index < this.results.length; index++) {
        S3Service.getFileURL("public-exports", this.results[index].name).then(
          (presignedUrl) => {
            this.results[index].url = presignedUrl;
            if (this.results[index].name.includes("csv")) {
              this.results[index].format = "csv";
            } else {
              this.results[index].format = undefined;
            }
          }
        );
      }
    });
  },
};
</script>
