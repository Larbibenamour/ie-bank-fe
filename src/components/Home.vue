<template>
    <div class="home">
      <div class="jumbotron vertical-center">
        <div class="container text-center">
          <h1>Welcome to IE Bank</h1>
          <p>Your one-stop solution for managing accounts.</p>
          <button class="btn btn-primary btn-lg" @click="goToAccounts">
            Go to Accounts
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Home",
    methods: {
      goToAccounts() {
        this.$router.push({ name: "AppAccounts" }); // Ensure the route name is correct
      },
    },
  };
  </script>
  
  <style>
  .home {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
  }
  </style>
  