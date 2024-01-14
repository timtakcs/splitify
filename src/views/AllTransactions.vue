<template>
    <div class="container-fluid p-0">
        <div class="row no-gutters">
            <div class="col-md-3">
                <KeepAlive>
                    <DashBoard @update-active-group="handleGroupUpdate"/>
                </KeepAlive>
            </div>
            <div class="col-md-6 scrollable-list">
                <div class="transactions-section">
                    <h1 class="title text-start">Transactions</h1>
                    <button
                        class="btn btn-success add-transaction-btn"
                        @click="openModal"
                    >
                        <i class="fas fa-plus"></i>
                    </button>
                    <Teleport to="#modal">
                        <div class="modal-bg" v-if="isModalOpen">
                            <div class="file-upload">
                                <FileUpload :members="members" :groupID="activeGroupId" @close-modal="isModalOpen = false"/>
                            </div>
                        </div>
                    </Teleport>
                </div>
                <li class="list-group" v-for="transaction in transactions" :key="transaction.name">
                    <TransactionItem
                        :storeName="transaction.storename"
                        :paidBy="transaction.paidbyname"
                        :amount="transaction.amount"
                    />
                </li>
            </div>
            <div class="col-md-3 scrollable-list">
                <div class="balances-section">
                    <h1 class="title text-start">Balances</h1>
                </div>
                <li class="list-group" v-for="balance in balances" :key="balance.name">
                    <MemberItem
                        :balance="balance"
                    />
                </li>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import DashBoard from "../components/DashBoard.vue";
import FileUpload from "../components/FileUpload.vue";
import TransactionItem from '../components/TransactionItem.vue';
import MemberItem from '../components/MemberItem.vue';
import axios from 'axios';

const activeGroupId = ref(null);
const isModalOpen = ref(false);

const transactions = ref([]);
const members = ref([]);
const balances = ref([]);
// var payments = {};

const openModal = () => {
    isModalOpen.value = true;
    console.log(isModalOpen.value);
};

const handleGroupUpdate = async (newGroupId) => {
    activeGroupId.value = newGroupId;

    members.value = [];
    transactions.value = [];
    balances.value = [];

    await pullTransactions();
    await pullMembers();
    await pullBalances();
}

const pullMembers = async () => {
    try {
        const url = 'http://localhost:3000/api/get-group-members/' + activeGroupId.value.toString();

        const response = await axios.get(url);
        const result = response.data.data;

        result.forEach((member) => {
            members.value.push(member);
        });
    } catch (error) {   
        console.log("Error: " + error);
    }
}

const pullTransactions = async () => {
    try {
        const url = 'http://localhost:3000/api/get-transactions/' + activeGroupId.value.toString();
        const response = await axios.get(url);

        const result = response.data.data;

        result.forEach((transaction) => {
            transactions.value.push(transaction);
        })
    } catch (error) {   
        console.log("Error: " + error);
    }
}

const pullBalances = async () => {
    try {
        const url = 'http://localhost:3000/api/get-balances/' + activeGroupId.value.toString();
        const response = await axios.get(url);

        const result = response.data.data;

        result.balances.forEach((balance) => {
            const isOwed = balance.balance < 0 ? true : false;
            balances.value.push({
                name: balance.name,
                isOwed: isOwed,
                amount: Math.abs(balance.balance)
            });
        });

        // payments = result.transactions;
    } catch (error) {   
        console.log("Error: " + error);
    }
};

</script>

<style scoped>
.title {
    margin: 0;
    font-size: 24px;
}

.balances-section {
    top: 0;
    left: 0;
    padding: 20px;
}

.transactions-section {
    top: 0;
    left: 0;
    padding: 20px;
}

.add-transaction-btn {
    display: block; 
    margin-top: 10px;
}

.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background-color: rgba(0,0,0,0.5);

    display: flex;
    justify-content: center;
    align-items: center;
}

.file-upload {
    position: relative;

    background: white;
    padding: 50px 100px;
    border-radius: 5px;
}
</style>
