<template>
    <div>
        <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            @click="toggleDropdown"
        >
            Bought by
        </button>
        <div v-if="showDropdown" class="dropdown-menu show">
            <section>
                <h6 class="dropdown-header">Has Bought</h6>
                <button
                    v-for="member in members.filter(
                        (m) => paying.includes(m)
                    )"
                    :key="member"
                    class="dropdown-item"
                    @click="toggleBought(member)"
                >
                    {{ member }}
                </button>
            </section>
            <section>
                <h6 class="dropdown-header">Hasn't Bought</h6>
                <button
                    v-for="member in members.filter((m) =>
                        !paying.includes(m)
                    )"
                    :key="member"
                    class="dropdown-item"
                    @click="toggleBought(member)"
                >
                    {{ member }}
                </button>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        members: Array,
        totals: Map,
        price: Number
    }, 
    data() {
        return {
            showDropdown: false,
            paying: [],
        };
    },
    created() {
        this.paying = [...this.members];
    },  
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        toggleBought(member) {
            const index = this.paying.indexOf(member);

            if (index > -1) {
                if (this.paying.length > 1) {

                    this.paying.forEach((person) => {
                        var newPrice = this.totals.get(person) - (this.price / this.paying.length);
                        this.totals.set(person, newPrice);
                    })

                    this.paying.splice(index, 1);

                    this.paying.forEach((person) => {
                        var newPrice = this.totals.get(person) + (this.price / this.paying.length);
                        this.totals.set(person, newPrice);
                    })
                }
            } else {
                this.paying.forEach((person) => {
                    var newPrice = this.totals.get(person) - (this.price / this.paying.length);
                    this.totals.set(person, newPrice);
                })

                this.paying.push(member);

                this.paying.forEach((person) => {
                    var newPrice = this.totals.get(person) + (this.price / this.paying.length);
                    this.totals.set(person, newPrice);
                })
            }
        },
    },
};
</script>

<style scoped>
.dropdown-menu {
    position: absolute;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    width: 200px;
}
</style>
