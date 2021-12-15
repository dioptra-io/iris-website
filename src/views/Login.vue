<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <div class="center uk-margin uk-card uk-card-default uk-card-body">
        <div v-if="message" class="uk-alert-warning" uk-alert>
          <a class="uk-alert-close" uk-close></a>
          <p>
            {{ message }}
          </p>
        </div>

        <form @submit.prevent="handleLogin">
          <fieldset class="uk-fieldset">
            <div class="uk-margin">
              <div class="uk-inline">
                <input
                  class="uk-input"
                  type="text"
                  id="email"
                  placeholder="Email"
                  size="30"
                  v-model="user.email"
                />
              </div>
            </div>

            <div class="uk-margin">
              <div class="uk-inline">
                <input
                  class="uk-input"
                  type="password"
                  id="password"
                  placeholder="Password"
                  size="30"
                  v-model="user.password"
                />
              </div>
            </div>

            <button class="uk-button uk-button-secondary" type="submit">
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>


// <script>
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", "", "", ""),
      message: "",
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },

  methods: {
    handleLogin() {
      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/profile");
          },
          (error) => {
            this.message = error.response.data.detail;
          }
        );
      }
    },
  },
};
</script>
