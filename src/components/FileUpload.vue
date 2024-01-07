<template>
    <button
        class="btn-close position-absolute top-0 end-0 px-2 py-2"
        @click="close"
    ></button>
    <div>
        <input
            type="file"
            @change="handleUpload($event)"
            accept="image/*"
            capture multiple
        />
        <button class="btn" @click="submitReceipts">upload</button>
    </div>
    <div>
        <li v-for="url in this.files" :key="url">
            {{ url.name }}
        </li>
    </div>
</template>

<script>
export default {
    name: "FileUpload",
    methods: {
        close() {
            this.$emit("close-modal");
        },
        submitReceipts() {
            console.log("submitting");

            const form = new FormData();

            for (const file of this.files) {
                form.append('receipts', file);
            }

            fetch('http://localhost:3000/api/receipts', {
                method: 'POST',
                body: form,
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data.data);
                this.$router.push({ path: '/new-transaction', query: { data: data.data}})
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
        handleUpload(event) {
            const newFiles = event.target.files; 
            if (newFiles.length) {
                this.files = [...this.files, ...Array.from(newFiles)];
            }
        }
    },
    data() {
        return {
            files: []
        }
    }
};
</script>

<style scoped></style>