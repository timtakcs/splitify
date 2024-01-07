<template>
    <div class="container-fluid p-0">
        <div class="row no-gutters">
            <div class="col-md-3">
                <DashBoard />
            </div>
            <div class="col-md-6 scrollable-list">
                <div class="transactions-section">
                    <h1 class="text-start transactions-title">Transactions</h1>
                    <button
                        class="btn btn-success add-transaction-btn"
                        @click="openModal"
                    >
                        <i class="fas fa-plus"></i>
                    </button>
                    <Teleport to="#modal">
                        <div class="modal-bg" v-if="isModalOpen">
                            <div class="file-upload">
                                <FileUpload @close-modal="isModalOpen = false"/>
                            </div>
                        </div>
                    </Teleport>
                </div>
            </div>
            <div class="col-md-3 scrollable-list">
                <p>Who owes who</p>
            </div>
        </div>
    </div>
</template>

<script>
import DashBoard from "../components/DashBoard.vue";
import FileUpload from "../components/FileUpload.vue"

export default {
    name: "NewTransaction",
    components: {
        DashBoard,
        FileUpload
    },
    data() {
        return {
            isModalOpen: false,
        };
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
            console.log(this.isModalOpen);
        },
    },
};
</script>

<style scoped>
.transactions-section {
    top: 0;
    left: 0;
    padding: 20px; /* Adjust as necessary */
}

.transactions-title {
    margin: 0;
    font-size: 24px; /* Adjust as necessary */
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
