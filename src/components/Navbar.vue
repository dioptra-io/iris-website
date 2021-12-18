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
          <ul v-if="!loggedIn" class="uk-navbar-nav uk-visible@m">
            <li><a href="/#/login">Login</a></li>
            <li><a href="/#/register">Register</a></li>
          </ul>

          <ul v-else class="uk-navbar-nav uk-visible@m">
            <li v-show="verified">
              <a href="/#/measurements/public">Measurements</a>
            </li>
            <li v-show="superuser">
              <a href="/#/admin">Admin</a>
            </li>
            <li><a href="/#/profile">Profile</a></li>
            <li><a href @click.prevent="signOut">signOut</a></li>
          </ul>

          <!-- For mobile devices -->
          <a
            class="uk-navbar-toggle uk-hidden@m"
            uk-navbar-toggle-icon
            href="#offcanvas"
            uk-toggle
          ></a>
          <div id="offcanvas" uk-offcanvas="mode: push; overlay: true">
            <div class="uk-offcanvas-bar">
              <div v-if="!loggedIn">
                <a class="uk-text-large uk-text-emphasis" href="/#/login">
                  Login</a
                ><br />
                <a class="uk-text-large uk-text-emphasis" href="/#/register">
                  Register</a
                >
              </div>

              <div v-else>
                <div v-show="verified">
                  <a
                    class="uk-text-large uk-text-emphasis"
                    href="/#/measurements/public"
                    >Measurements</a
                  ><br />
                </div>
                <div v-show="superuser">
                  <a class="uk-text-large uk-text-emphasis" href="/#/admin"
                    >Admin</a
                  ><br />
                </div>
                <a class="uk-text-large uk-text-emphasis" href="/#/profile"
                  >Profile</a
                ><br />
                <a
                  class="uk-text-large uk-text-emphasis"
                  href
                  @click.prevent="signOut"
                  >Sign Out</a
                ><br />
              </div>
            </div>
          </div>
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
    signOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>
