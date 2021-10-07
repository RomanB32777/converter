<template>
  <div id="nav">
    <router-link to="/">Converter</router-link> |
    <router-link to="/portfolio">Portfolio</router-link>
  </div>
  <router-view />
</template>

<script>
export default {};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $secondary-color;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $secondary-color;

    &.router-link-exact-active {
      color: $primary-color;
    }
  }
}

.app-block {
  background: #fff;
  border: 1px solid $gray;
  border-radius: 8px;
  padding: 1rem;
}

.equals {
  width: 53px;
  height: 53px;
  background: $primary-color;
  color: white;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 30px;
}

@media screen and (max-width: 991px) {
  .app-block {
    margin-top: 1rem;
  }
}
</style>
