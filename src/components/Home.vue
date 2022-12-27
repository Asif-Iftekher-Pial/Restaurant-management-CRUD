<template>
    <Header></Header>
    <div>
        <h2>hello, <span>{{ name }}</span></h2>
    </div>

    <h1 class="title">All restaurant</h1>
    <div class="centerTable">
        <table class="table" border="1">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in restaurants" :key="item.id">
                    <th>{{ item.id }}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.address }}</td>
                    <td>{{ item.contact }}</td>
                    <td>
                        <router-link :to="'/updateRestaurant/' + item.id"><button
                                class="updateButton">Update</button></router-link>
                        <button v-on:click="deleteRestaurant(item.id)" class="deleteButton">Delete</button>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>

</template>

<script lang="ts">
import axios from 'axios'
import Swal from 'sweetalert2';
import Header from "./Header.vue";
export default {
    name: 'Home',
    data() {
        return {
            name: '',
            restaurants: []
        }
    },
    components: {
        Header
    },
    methods: {
        async deleteRestaurant(id) {
            const result = await axios.delete('http://localhost:3000/restaurant/' + id)
            if (result.status == 200) {
                this.$router.push({
                    name: 'Home'
                })

                this.reloadData(); // reload data function will be called after delete

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
                    icon: 'error',
                    title: 'deleted successfully'
                })
            } else {
                alert('Delete failed')
            }
        },

        //this function is for reload data after deleting successfully
        async reloadData() {
            // console.warn('mount')if not logged in or SignedUp then redirect to signUp page
            const user = localStorage.getItem('user-info'); // check if use data is in localstorage or not
            // console.warn(user); //coming as JSON string from database
            this.name = JSON.parse(user).name
            if (!user) {
                this.$router.push({  //redirect to signpup route
                    name: 'Login'
                })
            }
            // get add the restaurant list from database

            let allRestaurant = await axios.get('http://localhost:3000/restaurant');
            // console.warn(allRestaurant);
            this.restaurants = allRestaurant.data
        }
    },
    async mounted() {
        this.reloadData();
    }
}
</script>

<style scoped>
span {
    color: tomato;
    display: block;
    margin-left: 15px;
}

.title {
    text-align: center;
}

.table {
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 25px;
}

td {
    text-align: center;
    width: 160px,

}

th {
    width: 160px
}

.updateButton {
    background-color: yellow;
    width: 100px;
    border-radius: 20px;
    border-color: blue;
    cursor: pointer;
    margin: 10px;
}

.deleteButton {
    background-color: tomato;
    width: 100px;
    border-radius: 20px;
    border-color: tomato;
    cursor: pointer;
    margin-bottom: 5px;
}
</style>