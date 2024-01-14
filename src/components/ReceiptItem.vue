<template>
    <div class="receipt-item">
        <div class="item-info">
            <h5 class="item-name">{{ item.name }}</h5> <!-- Class for name -->
            <h6 class="item-price">$ {{ item.price.toFixed(2) }}</h6> <!-- Class for price -->
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

<style scoped>
.receipt-item {
    position: relative;
    background-color: #f8f9fa; /* Soft background color */
    color: #464646;
    border-radius: 10px;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 1em;
    margin-bottom: 0.5em;
    border: none; /* Remove borders */
    box-shadow: none; /* Remove shadows */
}

.item-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Align texts to the left */
}

.item-name {
    font-size: 1.1rem; /* Slightly larger font for the name */
    margin-bottom: 0.25rem;
    font-weight: bold; /* Bold font for the name */
}

.item-price {
    font-size: 1rem; /* Slightly smaller font for the price */
    font-weight: normal;
}

.dropdown {
    position: absolute;
    right: 0; 
    top: 100%; 
    z-index: 1000;
}

</style>


