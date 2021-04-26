<template>
  <div class="uk-section-primary tm-section-texture">
    <navbar class="uk-navbar-transparent" />
  </div>

  <div class="uk-container">
    <div style="padding-top: 50px"></div>

    <article class="uk-article">
      <img
        class="uk-align-right uk-margin-remove-adjacent"
        src="../assets/images/index.png"
        width="500"
        height="600"
        alt="Data illustration"
      />

      <h1 class="uk-article-title">Iris</h1>
      <p class="uk-article-meta">
        Resilient internet-scale measurement system.
      </p>

      <p class="uk-text-lead" align="justify">
        Iris is an open-sourced measurement system that aims to produce
        internet-scale IP-level topologies and gives the possibility to the user
        to conduct their own measurements with multiple tools. Thanks to its
        modular API and a resilient design, Iris is able to handle a large
        number of vantage points with different capabilities.
      </p>

      <hr class="uk-margin-large" />
      <h3 class="uk-h3 tm-heading-fragment">
        Get regular large-scale internet topology datasets.
      </h3>
      <p>
        We are using the Iris platform to produce multi vantage points internet
        scale IP-level topology datasets.
      </p>
      <a class="uk-button uk-button-secondary" href="mailto:admins@dioptra.io"
        >Contact us</a
      >

      <hr class="uk-margin-large" />
      <h3 class="uk-h3 tm-heading-fragment">
        Run your own measurements on the platform.
      </h3>
      <p>
        You can run your own traceroute-like (diamond-miner, yarrp) or ping
        measurements directly from the website.
      </p>

      <a class="uk-button uk-button-secondary" href="mailto:admins@dioptra.io"
        >Contact us</a
      >

      <hr class="uk-margin-large" />
      <h3 class="uk-h3 tm-heading-fragment">Run your own infrastructure.</h3>
      <p>
        You can either run the standalone version of Iris that allow to easilly
        perfom measurement via a CLI or run your own multi vantage points
        infrastructure on your servers.
      </p>
      <a
        class="uk-button uk-button-default"
        href="https://github.com/dioptra-io/iris"
        >Github</a
      >
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
