<template>
    <div
        class="modal-background d-flex justify-content-center align-items-center"
    >
        <div class="modal-content p-3">
            <button
                class="btn-close position-absolute top-0 end-0 m-2"
                @click="close"
            ></button>

            <div class="my-3">
                <h5>Create a Group</h5>
                <div class="input-group mb-3">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Group Name"
                        v-model="createGroupName"
                    />
                    <button class="btn btn-outline-primary" @click="addGroup">
                        Create
                    </button>
                </div>
            </div>

            <div class="my-3">
                <h5>Join a Group</h5>
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Group Code"
                        v-model="joinGroupCode"
                    />
                    <button
                        class="btn btn-outline-secondary"
                        @click="joinGroup"
                    >
                        Join
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { parseJwt } from "../helpers";
import axios from "axios";

const emit = defineEmits(["close"]);

const createGroupName = ref("");
const joinGroupCode = ref("");

const close = () => {
    emit("close");
};

const addGroup = async () => {
    try {
        console.log("function called");

        const payload = parseJwt(localStorage.getItem("userToken"));

        await axios.post("http://localhost:3000/api/create-group", {
            data: {
                userId: payload.userId,
                groupName: createGroupName.value,
            },
        });

        emit('close');
    } catch (error) {
        console.log("Error:" + error);
    }
};

const joinGroup = async () => {
    try {
        const payload = parseJwt(localStorage.getItem("userToken"));

        await axios.post("http://localhost:3000/api/join-group", {
            data: {
                userId: payload.userId,
                groupId: joinGroupCode.value,
            },
        });

        emit('close');
    } catch (error) {
        console.log("Error:" + error);
    }
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px 60px; /* Adjust padding as needed */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: auto;
  max-width: 400px; /* Adjust max-width as needed */
}

h5 {
  font-size: 1.2rem; /* Adjust font size for heading */
  color: #333;
  margin-bottom: 15px;
}

.input-group {
  margin-bottom: 20px;
}

.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
}

.btn-outline-primary, .btn-outline-secondary {
  color: #007bff;
  border-color: #007bff;
}

.btn-outline-primary:hover, .btn-outline-secondary:hover {
  background-color: #007bff;
  color: white;
}

</style>


