<template>
    <button
        class="btn-close position-absolute top-0 end-0 px-2 py-2"
        @click="close"
    ></button>
    <div>
        <input
            type="file"
            @change="handleUpload($event)"
            accept="image/*"
            capture
            multiple
        />
        <button class="btn" @click="submitReceipts">upload</button>
    </div>
    <div>
        <li v-for="url in this.files" :key="url">
            {{ url.name }}
        </li>
    </div>
    <div>
        <SelectDropdown
            :members="props.members"
            @member-selected="handleMember"
        />
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import SelectDropdown from "./SelectDropdown.vue";

const emit = defineEmits(["update-active-group"]);

const router = useRouter();

const files = ref([]);
const paidBy = ref(null);

const props = defineProps({
    members: Array,
    groupID: Number,
});

const close = () => {
    emit("close-modal");
};

const submitReceipts = () => {
    const form = new FormData();

    for (const file of files.value) {
        form.append("receipts", file);
    }

    axios
        .post("http://localhost:3000/api/receipts", form)
        .then((response) => {
            console.log("Success:", response.data.data);
            router.push({
                path: "/new-transaction",
                query: {
                    groupID: props.groupID,
                    resultIDs: response.data.data,
                    paidBy: JSON.stringify(paidBy.value),
                    members: JSON.stringify(props.members)
                },
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

const handleUpload = (event) => {
    const newFiles = event.target.files;
    if (newFiles.length) {
        files.value = [...files.value, ...Array.from(newFiles)];
    }
};

const handleMember = (member) => {
    paidBy.value = member;
    console.log("Name: " + props.groupID);
};
</script>

<style scoped></style>
