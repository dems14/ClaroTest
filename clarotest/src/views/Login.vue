<template>
  <div>
    Login
    <form @submit.prevent="pressed">
      <div class="email">
        <input
          type="text"
          input
          pattern="[a-z]+"
          v-model="email"
          placeholder="user"
          title="lowercase only"
          required
        />
      </div>
      <div class="password">
        <input
          type="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          v-model="password"
          placeholder="password"
          title="Must contain at least one number, one uppercase and lowercase letter"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
    <div class="error" v-if="error">{{error.message}}</div>
    <span>
      create a new account
      <router-link to="/register">here</router-link>
    </span>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async pressed() {
      let email = this.email + "@gmail.com";
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, this.password);
        this.$router.replace({ name: "Content" });
        console.log(this.email, user);
      } catch (err) {
        console.log("catch", err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>