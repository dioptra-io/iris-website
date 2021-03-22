<template>
  <div class="uk-section-primary tm-section-texture">
    <navbar class="uk-navbar-transparent" />
  </div>

  <div class="uk-container">
    <div style="padding-top: 50px"></div>

    <article class="uk-article">
      <h1 class="uk-article-title">
        <a class="uk-link-reset" href="">Hello!</a>
      </h1>

      <p class="uk-article-meta">This is a test.</p>

      <p class="uk-text-lead">
        This is a first implementation of Iris Website.
      </p>
    </article>

    <div style="padding-top: 50px"></div>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {
    msg: String,
  },
};
</script>
