<template>
  <div class="uk-navbar-container tm-navbar-container" uk-sticky="media: 960">
    <div class="uk-container uk-container-expand">
      <nav class="uk-navbar">
        <div class="uk-navbar-left">
          <router-link class="uk-navbar-item uk-logo" to="/">
            <img
              src="../assets/images/dioptra-logo.svg"
              width="30"
              height="30"
              alt="Dioptra logo"
            />
            Dioptra Data
          </router-link>
        </div>

        <div class="uk-navbar-right">
          <ul v-show="!loggedIn" class="uk-navbar-nav uk-visible@m">
            <li><a href="/#/login">Login</a></li>
            <!-- <router-link to="/login" tag="li"><a>Login</a></router-link> -->
            <li><a href="/#/register">Register</a></li>
          </ul>

          <ul v-show="loggedIn" class="uk-navbar-nav uk-visible@m">
            <li v-show="verified">
              <a href="/#/measurements">Measurements</a>
            </li>
            <li v-show="superuser">
              <a href="/#/admin">Admin</a>
            </li>
            <li><a href="/#/profile">Profile</a></li>
            <li><a href @click.prevent="logOut">LogOut</a></li>
          </ul>

          <a
            class="uk-navbar-toggle uk-hidden@m"
            uk-navbar-toggle-icon
            href="#offcanvas"
            uk-toggle
          ></a>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    verified() {
      if (!this.$store.state.auth.jwt) {
        return false;
      }
      return this.$store.state.auth.jwt.is_verified;
    },
    superuser() {
      if (!this.$store.state.auth.jwt) {
        return false;
      }
      return this.$store.state.auth.jwt.is_superuser;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>
