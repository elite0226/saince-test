<template>
  <div id="app">
    <nav>
      <router-link to="/">Book List</router-link> |
      <router-link to="/stack-queue">Stack & Queue</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
nav {
  text-align: center;
  margin-bottom: 20px;
}

router-link {
  text-decoration: none;
  color: #007bff;
  font-size: 1.2rem;
  margin: 0 10px;
}

router-link:hover {
  text-decoration: underline;
}
</style>