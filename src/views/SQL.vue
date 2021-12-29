<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <form @submit.prevent="handleQuery">
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

          <button class="uk-button uk-button-secondary" type="submit">
            Submit
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
        this.$route.params.agentUUID.replace(/-/g, "_") +
        " FORMAT CSV",
      response: "",
    };
  },

  methods: {
    handleQuery() {
      ChProxyService.query(this.query).then((response) => {
        this.response = response;
      });
    },
  },
};
</script>
