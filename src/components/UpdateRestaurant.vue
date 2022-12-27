<template>
    <Header></Header>
    <h2>Update restarant page</h2>
    <div class="formMargin">
        <form action="">
            <label for="name">Name</label>
            <input type="text" placeholder="restaurant name" v-model="restaurant.name" name="name">
            <label for="address">address</label>
            <input type="text" placeholder="restaurant address" v-model="restaurant.address" name="address">
            <label for="contact">contact</label>
            <input type="number" placeholder="restaurant contact" v-model="restaurant.contact" name="contact">
            <button type="button" v-on:click="updateForm">Add Restaurant</button>
        </form>
    </div>
</template>

<script lang="ts">
import Header from './Header.vue'
import axios from 'axios'
import Swal from 'sweetalert2';
export default {
    name: 'UpdateRestaurant',
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
    methods:{
        async updateForm(){
            // console.warn('updated information ', this.restaurant);
            const result = await axios.put('http://localhost:3000/restaurant/'+this.$route.params.id,{
                name:this.restaurant.name,
                address: this.restaurant.address,
                contact:this.restaurant.contact
            });
            if(result.status == 200){
                this.$router.push({
                    name:'Home'
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
                title: 'Update successfull'
            })
            }else{
                alert('something went wrong')
            }


        }
    },
    async mounted(){
         // console.warn('mount')if not logged in or SignedUp then redirect to signUp page
         const user = localStorage.getItem('user-info'); // check if use data is in localstorage or not
        // console.warn(user); //coming as JSON string from database
        this.name = JSON.parse(user).name
        if (!user) {
            this.$router.push({  //redirect to signpup route
                name: 'Login'
            })
        }
        // alert(this.$route.params.id) // here params is the parameter of route id 
        const result = await axios.get('http://localhost:3000/restaurant/'+this.$route.params.id)
        // console.warn(result.data);
        this.restaurant = result.data // fetch data from database 
    }
}
</script>

<style scoped>
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