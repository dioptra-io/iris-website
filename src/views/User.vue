<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
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
            <td>firstname</td>
            <td>{{ user.firstname }}</td>
          </tr>
          <tr>
            <td>lastname</td>
            <td>{{ user.lastname }}</td>
          </tr>
          <tr>
            <td>email</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>

      <h4>Probing capabilities</h4>
      <table class="uk-table uk-table-striped">
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>enabled</td>
            <td>{{ user.probing_enabled }}</td>
          </tr>
          <tr>
            <td>limit</td>
            <td>{{ user.probing_limit }}</td>
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
      user: "",
    };
  },
  mounted() {
    UserService.getUser().then((response) => {
      this.user = response.data;
    });
  },
};
</script>
