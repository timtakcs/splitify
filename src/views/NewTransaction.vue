<template>
    <div class="container-fluid p-0">
        <div class="row no-gutters">
            <div class="col-md-3">
                <KeepAlive>
                    <DashBoard />
                </KeepAlive>
            </div>
            <div class="col-md-6 scrollable-list">
                <div class="store-name">
                    <h1 class="title text-start">{{ storeName }}</h1>
                </div>
                <li class="list-group" v-for="item in items" :key="item.name">
                    <ReceiptItem
                        :item="item"
                        :members="members"
                        :totals="totals"
                    />
                </li>

                <li class="list-group-item d-flex justify-content-center">
                    <button
                        class="btn btn-primary px-5 py-2"
                        @click="saveTransaction"
                    >
                        Submit
                    </button>
                </li>
            </div>
            <div class="col-md-3 scrollable-list">
                <GroupTotals :members="members" :totals="totals" :paidBy="paidBy" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import DashBoard from "../components/DashBoard.vue";
import ReceiptItem from "../components/ReceiptItem.vue";
import GroupTotals from "../components/GroupTotals.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const resultIDs = Array.isArray(route.query.resultIDs) ? route.query.resultIDs : [route.query.resultIDs];
const groupID = route.query.groupID;
const paidBy = JSON.parse(route.query.paidBy);
const members = ref(JSON.parse(route.query.members));

const items = ref([]);
const totals = reactive(new Map());
const storeName = ref("");

let totalSpent = 0;

for (let i = 0; i < members.value.length; i++) {
    totals.set(members.value[i].name, 0.0);
}

const populateItems = () => {
    axios
        .post("http://localhost:3000/api/get-receipts", { resultIDs })
        .then((response) => {
            const boughtItems = response.data[0].items;
            storeName.value = response.data[0].store;

            boughtItems.forEach((item) => {
                const temp = {
                    name: item.valueObject.Description.valueString,
                    price: item.valueObject.TotalPrice.valueNumber,
                };
                items.value.push(temp);
            });

            items.value.forEach((item) => {
                totalSpent += item.price;
            });

            for (let i = 0; i < members.value.length; i++) {
                totals.set(
                    members.value[i].name,
                    totalSpent / members.value.length
                );
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

const saveTransaction = async () => {
    try {
        const url = "http://localhost:3000/api/create-transaction";

        const balances = [];
        members.value.forEach((member) => {
            if (member.id !== paidBy.id) {
                balances.push({
                    owedBy: member.id,
                    owedTo: paidBy.id,
                    amount: totals.get(member.name)
                });
            }
        });

        await axios.post(url, {
            data: {
                groupID: groupID,
                storeName: storeName.value,
                amount: totalSpent,
                paidBy: paidBy,
                balances: balances
            },
        });

        router.push('/');
    } catch (error) {
        console.log("Error: " + error);
    }
};

onMounted(() => {
    console.log(members);
    if (resultIDs) {
        populateItems();
    }
});
</script>

<style scoped>
.title {
    margin: 0;
    font-size: 24px; /* Adjust the font size if needed */
}

.store-name {
    top: 0;
    left: 0;
    padding: 20px;
}
.scrollable-list {
    max-height: calc(100vh);
    overflow-y: auto;
}

.list-group li {
    display: block;
}

</style>
