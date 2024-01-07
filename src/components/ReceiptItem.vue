<template>
    <div
        class="receipt-item d-flex justify-content-between align-items-center p-3 border rounded mb-2 shadow-sm"
    >
        <div class="item-info d-flex align-items-center">
            <h5 class="mb-0 me-2">{{ item.name }}</h5>
            <!-- me-2 adds margin to the right -->
            <h5 class="mb-0">$ {{ item.price.toFixed(2) }}</h5>
        </div>
        <div class="bought-by">
            <DropdownMenu :members="members" :totals="totals" :price="item.price"/>
        </div>
    </div>
</template>

<script>
import DropdownMenu from "./DropdownMenu.vue";

export default {
    name: "ReceiptItem",
    components: {
        DropdownMenu,
    },
    props: {
        item: Object,
        members: Array,
        totals: Map
    },
    data() {
        return {
            showDropdown: false,
        };
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
            console.log(this.showDropdown, this.members);
        },
        reassignItem(member) {
            console.log(`Reassign item to ${member}`);
        },
    },
};
</script>

<style>
.receipt-item {
    position: relative;
}

.dropdown {
    position: absolute;
    z-index: 1000;
    background-color: rgb(201, 201, 201);
    border-radius: 10px;
}
</style>
