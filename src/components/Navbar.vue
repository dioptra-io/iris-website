<template>
  <div class="uk-navbar-container tm-navbar-container" uk-sticky="media: 960">
    <div class="uk-container uk-container-expand">
      <nav class="uk-navbar">
        <div class="uk-navbar-left">
          <ul class="uk-navbar-nav uk-visible@m">
            <li><a href="/#/">Home</a></li>
          </ul>

          <ul v-show="loggedIn" class="uk-navbar-nav uk-visible@m">
            <li v-show="verified">
              <router-link
                :to="{
                  name: 'MeasurementsExhaustive',
                }"
                >Exhaustive</router-link
              >
            </li>
            <li v-show="verified">
              <router-link
                :to="{
                  name: 'MeasurementsZeph',
                }"
                >Zeph</router-link
              >
            </li>

            <li v-show="verified && probingEnabled">
              <router-link
                :to="{
                  name: 'MeasurementsMine',
                }"
                >Run measurements</router-link
              >
            </li>

            <li v-show="superuser">
              <a href="/#/admin">Admin</a>
            </li>

            <li><a href="/#/profile">Profile</a></li>
          </ul>
        </div>

        <div class="uk-navbar-right">
          <ul class="uk-navbar-nav uk-visible@m"></ul>

          <ul v-if="!loggedIn" class="uk-navbar-nav uk-visible@m">
<!--            <li><a href="/#/register">Register</a></li>-->
            <li><a href="/#/login">Login</a></li>
          </ul>
          <ul v-else class="uk-navbar-nav uk-visible@m">
            <li><a href @click.prevent="logOut">LogOut</a></li>
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
                  <router-link
                    class="uk-text-large uk-text-emphasis"
                    :to="{
                      name: 'MeasurementsExhaustive',
                    }"
                    >Exhaustive</router-link
                  >
                  <div v-show="verified">
                    <router-link
                      class="uk-text-large uk-text-emphasis"
                      :to="{
                        name: 'MeasurementsZeph',
                      }"
                      >Zeph</router-link
                    >
                  </div>
                </div>

                <div v-show="verified && probingEnabled">
                  <router-link
                    class="uk-text-large uk-text-emphasis"
                    :to="{
                      name: 'MeasurementsMine',
                    }"
                    >Run measurements</router-link
                  >
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
                  @click.prevent="LogOut"
                  >Log Out</a
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
import AuthService from "../services/auth.service";
export default {
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    verified() {
      if (!this.$store.state.auth.user) {
        return false;
      }
      return this.$store.state.auth.user.is_verified;
    },
    superuser() {
      if (!this.$store.state.auth.user) {
        return false;
      }
      return this.$store.state.auth.user.is_superuser;
    },
    probingEnabled() {
      if (!this.$store.state.auth.user) {
        return false;
      }
      return this.$store.state.auth.user.probing_enabled;
    },
  },
  methods: {
    logOut() {
      AuthService.logout();
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>
