<template>
  <div class="home">
    <h1>Welcome to IE Bank Corp Home Page</h1>
    <p>This is the homepage where you can navigate to create accounts or view account details.</p>
    
    <!-- Navigation Button to Accounts Page -->
    <router-link to="/accounts">
      <button class="btn btn-primary">Go to Accounts Page</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>
