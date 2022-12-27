<template>
    <nav>
        <div class="restName">
            <p>
                <a href="http://">Foodie</a>
            </p>
        </div>
        <div class="searchOption">
            <form action="" method="post">
                <input type="text" placeholder="Search Restaurant">
                <button type="submit">Search</button>
            </form>
        </div>
        <ul>
            <li><a v-on:click="logout" href="#">Logout</a></li>
            <li><router-link to="/addRestaurant">AddRestaurant</router-link></li>
            <li><router-link to="/">Home</router-link></li>
        </ul>
    </nav>

</template>

<script lang="ts">
import Swal from 'sweetalert2';

export default {
    name: 'Header',
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({
                name: 'Login'
            });

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
                title: 'Logout successfull'
            })

        }
    }
}
</script>

<style scoped>
.restName {
    background-color: tomato;
    width: 250px;
    margin-left: 50px;
    float: left;
    color: white;
}

.restName p {
    font-size: 35.2px;
    text-align: center;
}

.restName p a {
    text-decoration: none;
    color: white;
}

.searchOption {
    float: left;
}

.searchOption input {
    height: 38px;
    width: 200px;
    background-color: tomato;
    color: white;
    border: 0;
    margin-right: 10px;
    padding: 0;
}

.searchOption input:focus {
    border: 0px solid;
    outline: none;
}

.searchOption input::placeholder {
    font-size: 15px;
    text-align: center;
    margin-top: 5px;
}

.searchOption button {
    width: 80px;
    height: 41px;
    border: 0;
    font-size: 17px;
    color: white;
    cursor: pointer;
    background-color: tomato;
}

.searchOption button:hover {
    color: tomato;
    background-color: white;
    transition: .5s;
}

nav {
    background-color: tomato;
    height: 41px;
}

nav li {
    list-style: none;
    margin-right: 40px;
}

nav li a {
    float: right;
    text-decoration: none;
    color: white;
    padding: 12px;
    margin-right: 15px;

}

nav li a:hover {
    color: tomato;
    background-color: white;
    border-radius: 10px;
    font-size: 17px;
    transition: 0.5s;
}
</style>