<template>
    <div class="dashboard d-flex flex-column align-items-center">
        <h1 class="text-center">Groups</h1>
        <button class="btn btn-success mb-3" @click="addGroup">
            <i class="fas fa-plus"></i> Add Group
        </button>
        <div class="list-group">
            <a
                href="#"
                class="list-group-item list-group-item-action"
                v-for="(item, index) in groups"
                :key="index"
                :class="{ active: item.groupid == activeGroupId.value }"
                @click.prevent="setActiveGroup(item)"
            >
                {{ item.groupname }}
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { onMounted } from "vue";
import { parseJwt } from "../helpers";
import axios from "axios";

const groups = ref([]);
const activeGroupId = ref(null);
const emit = defineEmits(['update-active-group']);

const pullGroups = async () => {
    try {
        const payload = parseJwt(localStorage.getItem("userToken"));

        const url =
            "http://localhost:3000/api/get-groups/" + payload.userId.toString();
        const response = await axios.get(url);
        const groupNames = response.data.groups;

        groups.value = [];

        groupNames.forEach((group) => {
            groups.value.push(group);
        });

        if (groups.value.length >= 1) {
            setActiveGroup(groups.value[0]);
        }
    } catch (error) {
        console.log("An error occured" + error);
    }
};

const addGroup = async () => {
    try {
        console.log("function called");

        const payload = parseJwt(localStorage.getItem("userToken"));

        await axios.post("http://localhost:3000/api/create-group", {
            data: {
                userId: payload.userId,
                groupName: "random",
            },
        });

        pullGroups();
    } catch (error) {
        console.log("Error:" + error);
    }
};

const setActiveGroup = (group) => {
    activeGroupId.value = group.groupid;
    emit('update-active-group', activeGroupId.value);
};

onMounted(() => {
    console.log("view started");
    pullGroups();
});
</script>

<style scoped>
.dashboard {
    min-height: 100vh; /* Use min-height instead of height to cover the full height */
    width: 100%; /* Ensure dashboard takes full width */
    padding: 20px; /* Add padding for better spacing */
    background-color: #f8f9fa; /* Use a softer shade for the background */
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); Soft shadow for depth */
}

.text-center {
    font-size: 1.5rem; 
    color: #333; 
    margin-bottom: 12px; 
}

.btn-success {
    margin-bottom: 20px;
}

.list-group {
    width: 100%; 
    max-width: 600px; 
}

.list-group-item {
    width: 100%;
    margin-bottom: 10px;
    border: none; 
    background-color: #fff; 
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
    border-radius: 0.5rem; 
    transition: background-color 0.2s; 
}

.list-group-item:hover, .list-group-item:focus {
    background-color: #e9ecef; 
    cursor: pointer; 
}

.list-group-item.active {
    background-color: #007bff !important; /* Bootstrap primary color for active item */
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Stronger shadow for active item */
}

.fas {
    margin-right: 0.5rem; /* Space between icon and button text */
}

</style>
