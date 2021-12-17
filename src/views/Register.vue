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

        <form @submit.prevent="handleRegister">
          <fieldset class="uk-fieldset">
            <div class="uk-margin">
              <div class="uk-inline">
                <input
                  class="uk-input"
                  type="text"
                  id="firstname"
                  placeholder="First name"
                  size="30"
                  v-model="user.firstname"
                />
              </div>
            </div>

            <div class="uk-margin">
              <div class="uk-inline">
                <input
                  class="uk-input"
                  type="text"
                  id="lastname"
                  placeholder="Last name"
                  size="30"
                  v-model="user.lastname"
                />
              </div>
            </div>

            <hr class="uk-margin" />
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
              Register
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
  name: "Register",
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
    handleRegister() {
      if (
        this.user.firstname &&
        this.user.lastname &&
        this.user.email &&
        this.user.password
      ) {
        this.$store.dispatch("auth/register", this.user).then(
          () => {
            this.$store.dispatch("auth/login", this.user).then(
              () => {
                this.$router.push("/profile");
              },
              (error) => {
                this.message = error.response.data.detail;
              }
            );
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
