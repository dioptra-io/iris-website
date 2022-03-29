<template>
  <div>
    <div class="uk-section-primary tm-section-texture" uk-sticky>
      <navbar class="uk-navbar-transparent" />
    </div>

    <div class="uk-container">
      <div style="padding-top: 50px"></div>

      <ul v-if="n_pages > 1" class="uk-dotnav">
        <li
          v-for="page in n_pages"
          :key="page"
          v-on:click="setPage(page)"
          :class="{ current: page == current_page }"
        >
          {{ page }}
        </li>
      </ul>

      <table class="uk-table uk-table-justify uk-table-divider">
        <thead>
          <tr>
            <th>Email</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Registration date</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in content.results" :key="user.id">
            <td>{{ user.email }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ formatTime(user.creation_time) }}</td>
            <td>
              <button
                v-on:click="verifyUser(user)"
                type="button"
                uk-icon="check"
              ></button>
              <button
                v-on:click="enableProbing(user)"
                type="button"
                uk-icon="bolt"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>
.current {
  font-weight: bold;
}
</style>

<script>
import UserService from "../services/user.service";

export default {
  name: "Admin",
  data() {
    return {
      content: "",
      n_pages: 0,
      n_items_per_page: 10,
      current_page: 1,
    };
  },
  mounted() {
    this.fetchNonVerifiedUsers();
  },
  methods: {
    setPage(page) {
      this.current_page = page;
      this.fetchNonVerifiedUsers(
        (this.current_page - 1) * this.n_items_per_page
      );
    },

    fetchNonVerifiedUsers() {
      UserService.getNonVerifiedUsers(
        (this.current_page - 1) * this.n_items_per_page,
        this.n_items_per_page
      ).then((response) => {
        this.content = response.data;
        var n_pages = Math.ceil(this.content.count / this.n_items_per_page);
        if (n_pages > 10) {
          this.n_pages = 10;
        } else {
          this.n_pages = n_pages;
        }
      });
    },

    verifyUser(user) {
      UserService.verifyUser(user.id).then((response) => {
        this.fetchNonVerifiedUsers();
      });
    },

    enableProbing(user) {
      UserService.enableProbing(user.id).then((response) => {
        this.fetchNonVerifiedUsers();
      });
    },

    formatTime(time) {
      if (time === null) {
        return "";
      }
      return new Date(time).toLocaleString();
    },
  },
};
</script>
