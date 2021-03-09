<template>
    <div>
        Logged in
        <span v-if="loggedIn">Yes</span>
        <span v-else>No</span>
        <div>
            <button @click="signOut">Sign out</button>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
    export default {
        created(){
            firebase.auth().onAuthStateChanged(user => {
                this.loggedIn = !! user
            })
        },
        methods: {
            async signOut(){
                 try{
                     const data = await firebase.auth().signOut()
                     console.log(data)
                     this.$router.replace({name: 'Login'})
                 }
                 catch(err){
                     console.log(err)
                 }
            }
        },
        data(){
            return{

                loggedIn: false
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>