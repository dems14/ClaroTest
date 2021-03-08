<template>
  <div>
    <div v-if="error" class="error">{{error.message}}</div>
    <form @submit.prevent="pressed">
      Register
      <div class="email">
        <input
          type="text"
          input
          pattern="[a-z]+"
          v-model="email"
          placeholder="email"
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
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  methods: {
    async pressed() {
      let email = this.email + "gmail.com";
      try {
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(email, this.password);
        this.$router.replace({ name: "Content" });
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>