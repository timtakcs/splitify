<template>
    <div class="receipt-item d-flex justify-content-between align-items-center p-3 mb-2">
        <div class="date-section me-3">
            <span class="date-placeholder">Dec 28</span>
        </div>
        <div class="item-info">
            <span class="store-name">{{ props.storeName }}</span>
            <span class="amount">$ {{ props.amount.toFixed(2) }} by {{ props.paidBy }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    storeName: String,
    paidBy: Number,
    amount: Number,
});
</script>

<style scoped>
.receipt-item {
    background-color: #f8f9fa;
    color: #242424;
    border-radius: 10px;
    font-family: Arial, sans-serif;
    height: auto;
}

.date-section {
    background-color: #dcdde0; 
    padding: 0.5em 1em;
    border-radius: 10px;
}

.date-placeholder {
    font-weight: bold;
    opacity: 0.75;
}

.item-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.store-name {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.amount {
    font-size: 1rem;
    opacity: 0.85;
}

.paid-by {
    font-size: 0.9rem;
    opacity: 0.75;
}
</style>

