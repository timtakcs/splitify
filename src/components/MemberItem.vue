<template>
    <div class="member-item p-3 mb-2">
        <div class="member-name">{{ props.balance.name }}</div>
        <div class="member-amount" :class="{ owes: props.balance.isOwed, owed: !props.balance.isOwed }">
            <span v-if="props.balance.isOwed">owes ${{ props.balance.amount.toFixed(2) }}</span>
            <span v-else>is owed ${{ props.balance.amount.toFixed(2) }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";

const props = defineProps({
    balance: Object,
});

onMounted(() => {
    console.log(props.balance.isOwed, props.balance.name);
}); 

</script>

<style scoped>
.member-item {
    background-color: #f8f9fa;
    color: #242424;
    border-radius: 10px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    margin-bottom: 0.5rem; /* Add some space between the items */
}

.member-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    margin-right: 1rem; /* Add some space before the amount */
}

.member-amount {
    font-size: 0.8rem; /* Adjusted to be smaller */
    font-weight: 500;
}

.member-amount.owes {
    color: #e63946; /* A shade of red */
}

.member-amount.owed {
    color: #2a9d8f; /* A shade of green */
}
</style>




