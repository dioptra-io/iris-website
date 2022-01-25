<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <div v-if="error" class="uk-alert-warning" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>
          {{ error }}
        </p>
      </div>

      <form @submit.prevent="displayQuery">
        <fieldset class="uk-fieldset">
          <div class="uk-margin">
            <div class="uk-inline">
              <input
                class="uk-input"
                type="text"
                id="query"
                placeholder="Query"
                size="300"
                v-model="query"
              />
            </div>
          </div>

          <button class="uk-button uk-button-primary" type="submit">
            preview
          </button>
          <span>&nbsp;</span>
          <button
            class="uk-button uk-button-primary"
            v-on:click="downloadQuery"
          >
            Download
          </button>
        </fieldset>
      </form>

      <hr class="uk-margin" />
      <div>
        <pre>{{ response }}</pre>
      </div>
    </div>
  </div>
</template>


<script>
import ChProxyService from "../services/chproxy.service";

export default {
  name: "SQL",
  data() {
    return {
      query:
        "SELECT * FROM results__" +
        this.$route.params.measurementUUID.replace(/-/g, "_") +
        "__" +
        this.$route.params.agentUUID.replace(/-/g, "_"),
      response: "",
      error: "",
    };
  },

  methods: {
    checkQuery(query) {
      if (query.length === 0) {
        this.error = "Query is empty";
        return false;
      }

      if (query.toLowerCase().includes("format")) {
        this.error = "Query cannot contain FORMAT";
        return false;
      }

      if (query.toLowerCase().includes("limit")) {
        this.error = "Query cannot contain LIMIT";
        return false;
      }

      return true;
    },
    limitQuery(query) {
      return query + " LIMIT 100";
    },
    formatQuery(query) {
      return query + " FORMAT CSVWithNames";
    },
    displayQuery() {
      if (!this.checkQuery(this.query)) {
        return;
      }

      const query = this.formatQuery(this.limitQuery(this.query));

      ChProxyService.query(query)
        .then((response) => {
          this.response = response.data;
        })
        .catch((_) => {
          this.error = "No results found";
        });
    },
    downloadQuery() {
      if (!this.checkQuery(this.query)) {
        return;
      }

      const query = this.formatQuery(this.query);

      ChProxyService.forgeQuery(query).then((url) => {
        window.open(url);
      });
    },
  },
};
</script>
