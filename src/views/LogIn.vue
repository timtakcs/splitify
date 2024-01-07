<template>
    <div>
        <div class="container mt-5">
            <h1>Log In</h1>
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <input
                        class="form-control"
                        placeholder="username"
                        type="text"
                        v-model="username"
                    />
                    <br />
                    <input
                        class="form-control"
                        placeholder="password"
                        type="text"
                        v-model="password"
                    />
                    <br />

                    <router-link class="btn btn-link" to="/signup"
                        >Sign Up</router-link
                    >

                    <br />

                    <button class="btn btn-success" @click="submitLogin()">
                        Log In
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LogIn",
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async submitLogin() {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: this.username,
                            password: this.password,
                        }),
                    }
                );

                if (response.ok) {
                    const responseData = await response.json();
                    const token = responseData.token;
                    localStorage.setItem("userToken", token);
                    this.$router.push({ path: "/" });
                } else {
                    console.log("Login failed with status: " + response.status);
                }
            } catch (error) {
                console.error("Network error or JSON parsing error:", error);

                // add logic to highlight that the login info is incorrect
            }
        },
    },
};
</script>

<style></style>
