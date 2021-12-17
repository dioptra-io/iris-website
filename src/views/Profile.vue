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
            <th class="uk-table-expand"></th>
            <th class="uk-table-expand"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $store.state.openapi.mapping.firstname }}</td>
            <td>{{ user.firstname }}</td>
          </tr>
          <tr>
            <td>{{ $store.state.openapi.mapping.lastname }}</td>
            <td>{{ user.lastname }}</td>
          </tr>
          <tr>
            <td>{{ $store.state.openapi.mapping.email }}</td>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <td>{{ $store.state.openapi.mapping.is_verified }}</td>
            <td v-if="user.is_verified">{{ user.is_verified }}</td>
            <td v-else class="uk-text-danger">
              Sign the
              <a href="https://minio.iris.dioptra.io/public/license_iris.pdf"
                >license</a
              >
              and
              <a href="mailto:iris@dioptra.io?subject=[iris] License agreement"
                >send it to us</a
              >.
            </td>
          </tr>
        </tbody>
      </table>

      <h4>Probing capabilities</h4>
      <table class="uk-table uk-table-striped">
        <thead>
          <tr>
            <th class="uk-table-expand"></th>
            <th class="uk-table-expand"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $store.state.openapi.mapping.probing_enabled }}</td>
            <td>{{ user.probing_enabled }}</td>
          </tr>
          <tr>
            <td>{{ $store.state.openapi.mapping.probing_limit }}</td>
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
  name: "Profile",
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    UserService.getUserMe().then((response) => {
      this.user = response.data;
    });
  },
};
</script>
