<template>
    <h1 class="title">Restaurant Management System</h1>
    <div class="registration">
        <div class="logo-position">
            <img class="restaurant-logo" src="../assets/Restaurant-logo.png" alt="" srcset="">
        </div>
        <h1 class="signUp">Login</h1>

        <label for="email">Email:</label>
        <input type="email" v-model="email" placeholder="abc@gmail.com">
        <label for="password">Password:</label>
        <input type="password" v-model="password" placeholder="Enter password">
        <button class="loginButton" v-on:click="login">Login</button>
        <router-link class="routerLink" to="signup">New here? SignUp</router-link>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import Swal from 'sweetalert2';
export default {

    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            //  alert('ok')
            let result = await axios.get(
                `http://localhost:3000/users?email=${this.email}&&password=${this.password}`
            );
            // console.log(result)
            if (result.status == 200 && result.data.length > 0) {
                localStorage.setItem("user-info", JSON.stringify(result.data[0])); // result.data[0] coz data is coming as array index 0 
                this.$router.push({
                    name: 'Home'   //redirect to home page route  after signup
                })

                var name= result.data[0].name;
                // console.warn(name);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Welcome, '+name
                })
            }

        }
    },
    mounted() {
        // console.warn('mount')if already logged in or SignedUp then redirect to home page
        let user = localStorage.getItem('user-info'); // check if use data is in localstorage or not
        if (user) {
            this.$router.push({  //redirect to home route
                name: 'Home'
            })
        }
    }
}
</script>

<style scoped>
.loginButton:hover {
    box-shadow: 4px 5px 10px 0px tomato;
}

.title {
    text-align: center;
    margin-bottom: 0;
    border: 2px solid;
    box-shadow: 5px 4px 5px tomato;
    color: tomato;
}

.title:hover {
    padding: 3px;
    font-size: 35px;
    text-align: center;
    margin-bottom: 0;
    border: 2px solid;
    border-radius: 20px;
    box-shadow: 5px 4px 5px lightblue;
    color: lightblue;
    cursor: pointer;
}

.registration .logo-position {
    margin-left: 75px;
}

.restaurant-logo {
    width: 100px;
}

.signUp {
    margin-left: 85px;
    margin-top: 0;
    margin-bottom: 0;
}

.registration {
    margin-left: 36%;
    margin-top: 5px;
}

.registration input {
    width: 250px;
    height: 25px;
    display: block;

    margin-top: 10px;
    padding: 5px;
    border: 1px solid tomato;
    color: tomato;
}

.registration button {
    margin-top: 10px;
    width: 261px;
    height: 30px;
    font-size: 15px;
    background-color: tomato;
    border: 1px solid tomato;
    cursor: pointer;
}

.routerLink {
    display: block;
    margin-left: 70px;
    margin-top: 10px;
}
</style>