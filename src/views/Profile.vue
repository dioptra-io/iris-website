<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <article class="uk-article">
        <h1 class="uk-article-title">Welcome, {{ content.username }} !</h1>
        <p class="uk-article-meta">Your email is {{ content.email }}.</p>
      </article>

      <div style="padding-top: 50px"></div>

      <table class="uk-table uk-table-justify uk-table-divider">
        <thead>
          <tr>
            <th class="uk-width-small">Measurement</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.resource">
            <td>#1</td>
            <td>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </td>
            <td>
              <button
                @click="downloadStatic(item)"
                class="uk-button uk-button-primary"
              >
                Download
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import OstaticService from "../services/ostatic.service";

export default {
  name: "User",
  data() {
    return {
      content: "",
      items: [
        {
          resource: "hello.txt",
          text: "hello",
        },
      ],
    };
  },
  mounted() {
    UserService.getProfile().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    downloadStatic(item) {
      OstaticService.download(item.resource);
    },
  },
};
</script>