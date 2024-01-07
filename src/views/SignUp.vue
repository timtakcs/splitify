<template>
    <div class="signup d-flex">
        <div class="container mt-5">
            <h1>Sign Up</h1>
            <div class="row justify-content-center">
            <div class="col-md-6">
                <input class="form-control" placeholder="email" type="text" v-model="email">
                <br>
                <input class="form-control" placeholder="username" type="text" v-model="username">
                <br>
                <input class="form-control" placeholder="password" type="password" v-model="password">
                <br>
                <button class="btn btn-success" @click="submitLogin()">register</button>
            </div>
            </div>
        </div>
    </div>
</template>
  

<script>
    export default {
        name: 'SignUp',
        data() {
            return {
                email: '',
                username: '',
                password: '',
            }
        },
        methods: {
            async submitLogin() {
                const response = await fetch('http://localhost:3000/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.email,
                        username: this.username,
                        password: this.password,
                    }),
                });

                const responseData = await response.json();
                console.log(responseData);
            }
        }
    }
</script>

<style>
    .signup {
        min-height: 100vh;
        background-color: #f4f4f4;
    }
</style>