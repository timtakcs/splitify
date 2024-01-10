<!-- GroupTotals.vue -->
<template>
    <div class="scrollable-list">
        <h3 class="totals-title">Totals</h3>
        <ul class="list-group">
            <li v-for="member in props.members" :key="member.name" class="list-group-item">
                <span class="member-name">{{ member.name }}</span>
                <span class="member-total">${{ totals.get(member.name).toFixed(2) }}</span>
            </li>
        </ul>
        <p class="paid-by-info">Paid by: {{ props.paidBy.name }}</p>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    members: Array,
    totals: Map,
    paidBy: Object
});
</script>

<style scoped>
.scrollable-list {
    max-height: calc(100vh - 20px);
    overflow-y: auto;
    padding: 20px;
    border-radius: 10px;
}

.totals-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
}

.list-group {
    list-style-type: none;
    padding: 0;
}

.list-group-item {
    background-color: #f8f9fa; /* Soft background color */
    color: #464646;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 5px;
    border: none; 
    box-shadow: none;
}

.member-name {
    font-weight: 600;
    color: #555;
}

.member-total {
    font-weight: 500;
    color: #2a9d8f;
}

.paid-by-info {
    margin-top: 1rem;
    font-style: italic;
    color: #666;
}
</style>
