<template>
  <div>
    <div class="uk-section-primary tm-section-texture">
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <h4>General</h4>
      <table class="uk-table uk-table-striped">
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>username</td>
            <td>{{ profile.username }}</td>
          </tr>
          <tr>
            <td>email</td>
            <td>{{ profile.email }}</td>
          </tr>
          <tr>
            <td>quota</td>
            <td>{{ profile.quota }}</td>
          </tr>
        </tbody>
      </table>
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
