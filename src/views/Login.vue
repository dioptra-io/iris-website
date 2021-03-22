<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>
    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <form @submit.prevent="handleLogin">
        <fieldset class="uk-fieldset">
          <!-- <legend class="uk-legend">Login</legend> -->

          <div class="uk-margin">
            <div class="uk-inline">
              <input
                class="uk-input"
                type="text"
                id="username"
                placeholder="Username"
                v-model="user.username"
              />
            </div>
          </div>

          <div class="uk-margin">
            <div class="uk-inline">
              <!-- <span
                class="uk-form-icon uk-form-icon-flip"
                uk-icon="icon: lock"
              ></span> -->
              <input
                class="uk-input"
                type="password"
                id="password"
                placeholder="Password"
                v-model="user.password"
              />
            </div>
          </div>

          <button class="uk-button uk-button-default" type="submit">
            Login
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>


// <script>
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
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
      this.loading = true;
      // this.$validator.validateAll().then((isValid) => {
      //   if (!isValid) {
      //     this.loading = false;
      //     return;
      //   }

      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/profile");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
      // });
    },
  },
};
</script>
