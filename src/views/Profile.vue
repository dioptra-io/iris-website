<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <article class="uk-article">
        <h1 class="uk-article-title">Welcome, {{ profile.username }} !</h1>
        <p class="uk-article-meta">Your email is {{ profile.email }}.</p>
      </article>

      <hr class="uk-margin-large" />
      <p>{{ profile }}</p>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "User",
  data() {
    return {
      profile: "",
    };
  },
  mounted() {
    UserService.getProfile().then((response) => {
      this.profile = response.data;
    });
  },
};
</script>
