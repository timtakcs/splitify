<template>
    <div class="container-fluid p-0">
        <div class="row no-gutters">
            <div class="col-md-3">
                <DashBoard />
            </div>
            <div class="col-md-6 scrollable-list">
                <li class="list-group" v-for="item in items" :key="item.name">
                    <ReceiptItem
                        :item="item"
                        :members="members"
                        :totals="totals"
                    />
                </li>

                <li class="list-group-item d-flex justify-content-center">
                    <button class="btn btn-primary px-5 py-2" @click="populateItems()">Submit</button>
                </li>
            </div>
            <div class="col-md-3 scrollable-list">
                <li class="list-group" v-for="member in members" :key="member">
                    <p>{{ member }} ${{ totals.get(member).toFixed(2) }}</p>
                </li>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';
import DashBoard from "../components/DashBoard.vue";
import ReceiptItem from "../components/ReceiptItem.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const resultIDs = route.query.data; 

const members = ["Carson", "Kevin", "Timur", "Omar"];
const items = ref([]);
const totals = reactive(new Map());

let totalSpent = 0;

for (let i = 0; i < members.length; i++) {
    totals.set(members[i], 0.00);
}

const populateItems = () => {
    console.log("populateItems called", items.value);
    axios.post("http://localhost:3000/api/get-receipts", { resultIDs })
        .then(response => {
            const store = response.data[0];
            store.forEach(item => {
                const temp = {name: item.valueObject.Description.valueString, price: item.valueObject.TotalPrice.valueNumber};
                items.value.push(temp);
            });

            items.value.forEach((item) => {
                totalSpent += item.price;
            });

            console.log(totalSpent);

            for (let i = 0; i < members.length; i++) {
                totals.set(members[i], totalSpent / members.length);
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
};

onMounted(() => {
    if (resultIDs) {
        populateItems();
    }
});
</script>

<style scoped>
.scrollable-list {
    max-height: calc(
        100vh
    );
    overflow-y: auto;
}

.list-group li {
    display: block;
}
</style>
