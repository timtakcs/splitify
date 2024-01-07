<template>
    <div class="dashboard d-flex justify-content-center">
        <div>
            <h2 class="text-center">Groups</h2>
            <ul class="list-group">
                <li
                    class="list-group-item"
                    v-for="(item, index) in list"
                    :key="index"
                >
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const list = ref(["5505", "saturday night", "ML"]);
</script>

<script>
export default {
    name: "DashBoard",
};
</script>

<style scoped>
.dashboard {
    /* width: 25%; */
    min-height: 100vh;
    background-color: #b3afaf;
}
</style>
