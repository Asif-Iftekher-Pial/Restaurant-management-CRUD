<template>
    <h1 class="title">Restaurant Management System</h1>
    <div class="registration">
        <div class="logo-position">
            <img class="restaurant-logo" src="../assets/Restaurant-logo.png" alt="" srcset="">
        </div>
        <h1 class="signUp">Registration</h1>
        <label for="name">Name:</label>
        <input type="text" v-model="name" placeholder="Enter Name">
        <label for="email">Email:</label>
        <input type="email" v-model="email" placeholder="abc@gmail.com">
        <label for="password">Password:</label>
        <input type="password" v-model="password" placeholder="Enter password">
        <button v-on:click="signup">Sign Up</button>
        <router-link class="routerLink" to="login">Have Account?Login</router-link>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import Swal from 'sweetalert2';

export default {

    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }

    },
    methods: {
        async signup() {

            // console.warn(this.name, this.email, this.password);
            let result = await axios.post('http://localhost:3000/users', {
                name: this.name,
                email: this.email,
                password: this.password
            });
            // console.warn(result);
            if (result.status == 201) {

                
                localStorage.setItem("user-info",JSON.stringify(result.data));
                this.$router.push({
                    name:'Home'   //redirect to home page route  after signup
                })

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
                    title: 'Signed up successfully'
                })
            }else{
                alert('something went wrong')
            }
            
        }
    },
    mounted(){
        // console.warn('mount')if already logged in or SignedUp then redirect to home page
        let user = localStorage.getItem('user-info'); // check if use data is in localstorage or not
        if(user){
            this.$router.push({  //redirect to home route
                name:'Home'
            })
        }
    }
}
</script>

<style  scoped>
.title:hover{
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
.title{
    text-align: center;
    margin-bottom: 0;
    border: 2px solid;
    box-shadow: 5px 4px 5px tomato;
    color: tomato;
}
.registration .logo-position {
    margin-left: 75px;
}

.restaurant-logo {
    width: 100px;
}

.signUp {
    margin-left: 50px;
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
.routerLink{
    display: block;
    margin-left: 70px;
    margin-top: 10px;
}
</style>