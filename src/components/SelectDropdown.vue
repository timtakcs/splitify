<template>
    <div>
        <button class="btn btn-primary dropdown-toggle" type="button" @click="toggleDropdown">
            {{ selectedMember ? selectedMember : 'Select Member' }}
        </button>
        <div v-if="showDropdown" class="dropdown-menu show">
            <button
                v-for="member in props.members"
                :key="member"
                class="dropdown-item"
                @click="selectMember(member)"
            >
                {{ member.name }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['member-selected']);

const props = defineProps({
    members: Array,
});

const showDropdown = ref(false);
const selectedMember = ref(null);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const selectMember = (member) => {
    selectedMember.value = member;
    showDropdown.value = false;
    emit('member-selected', member);
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