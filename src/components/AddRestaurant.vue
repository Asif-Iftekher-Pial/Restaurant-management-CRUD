<template>
    <Header></Header>
    <br>
    <h2>Add New Restaurant</h2>
    <div class="formMargin">
        <form action="">
            <label for="name">Name</label>
            <input type="text" placeholder="restaurant name" v-model="restaurant.name" name="name">
            <label for="address">address</label>
            <input type="text" placeholder="restaurant address" v-model="restaurant.address" name="address">
            <label for="contact">contact</label>
            <input type="number" placeholder="restaurant contact" v-model="restaurant.contact" name="contact">
            <button type="button" v-on:click="addRestaurant">Add Restaurant</button>
        </form>
    </div>

</template>

<script lang="ts">
import Header from './Header.vue';
import axios from 'axios'
import Swal from 'sweetalert2';
export default {

    name: 'AddRestaurant',
    data() {
        return {
            restaurant: {
                name: '',
                address: '',
                contact: ''
            }
        }
    },
    components: {
        Header
    },
    methods: {
        async addRestaurant() {
            // console.warn(this.restaurant);
            let result = await axios.post('http://localhost:3000/restaurant', {
                name: this.restaurant.name,
                address: this.restaurant.address,
                contact: this.restaurant.contact
            })
            // console.warn(result);
            if (result.status == 201) {

                localStorage.setItem("user-info", JSON.stringify(result.data));
                this.$router.push({
                    name: 'Home'   //redirect to home page route  after signup
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
                    title: 'Restaurant added successfully'
                })

            }else{
                alert('something went wrong')
            }
        }
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
    /* margin-left: 400px; */
}

form input {
    width: 250px;
    height: 25px;
    display: block;
    margin-top: 10px;
    padding: 5px;
    border: 1px solid tomato;
    color: tomato;
}

form button {
    margin-top: 10px;
    width: 261px;
    height: 30px;
    font-size: 15px;
    background-color: tomato;
    border: 1px solid tomato;
    cursor: pointer;
}

.formMargin {
    margin-top: 20px;
    margin-left: 400px;
}
</style>