<template>
  <div class="home">
    <Cover />
  </div>
</template>

<script>
// @ is an alias to /src
import Cover from "@/components/Cover.vue";

export default {
  name: "home",
  components: {
    Cover,
  },
};
</script>