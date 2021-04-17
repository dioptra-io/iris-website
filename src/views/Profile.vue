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
            <td>Diamond-Miner (ICMP)</td>
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
                @click="downloadStatic(item)"
                class="uk-button uk-button-danger"
              >
                <span class="uk-margin-small-right" uk-icon="lock"></span>
                <span class="uk-text-middle">Request access</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
