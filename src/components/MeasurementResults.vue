<template>
  <div
      style="display: inline-table"
      v-for="result in results"
      :key="result.name"
  >
    <a
        v-if="result.format !== undefined"
        class="uk-button uk-button-primary"
        download
        :href="result.url"
    >
      {{ result.format }} ({{ result.size }})
    </a>
    <span>&nbsp;</span>
  </div>

  <router-link
      style="display: inline-table"
      class="uk-button uk-button-primary"
      :to="{
      name: 'SQL',
      params: {
        series: series,
        measurementUUID: measurementUUID,
        agentUUID: agentUUID,
      },
    }"
  >SQL
  </router-link
  >
</template>

<script>
import S3Service from "../services/s3.service";
import filesize from "filesize";

export default {
  name: "MeasurementResults",
  props: {
    series: String,
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
      for (let index = 0; index < this.results.length; index++) {
        Promise.all([
          S3Service.getFileURL("public-exports", this.results[index].name),
          S3Service.getFileStat("public-exports", this.results[index].name)
        ]).then(result => {
          this.results[index].url = result[0];
          // Required name convention: measurementUUID__agentUUID__format
          this.results[index].format = this.results[index].name
              .split(".")[0]
              .split("__")[2];
          this.results[index].size = filesize(result[1].size);
        });
      }
    });
  },
};
</script>
