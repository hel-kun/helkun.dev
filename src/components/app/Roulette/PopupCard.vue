<template>
    <div v-if="visible" class="popup">
      <div class="content" >
        <p>選ばれたのは...</p>
        <h2 class="message">{{ message }}</h2>
        <button class="closeButton" @click="hide">閉じる</button>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            visible: false,
        };
    },
    methods: {
        show(message) {
            this.message = message;
            this.visible = true;
        },
        hide() {
            this.visible = false;
        }
    }
};
</script>

<style scoped>
.popup {
    @apply fixed top-0 left-0 w-full h-full bg-black dark:bg-white bg-opacity-50 dark:bg-opacity-50 flex justify-center items-center z-50;
    .content {
        @apply bg-white dark:bg-gray-800 p-4 rounded-md sm:w-1/3 w-2/3 text-black dark:text-white;
        .message{
            @apply text-center m-2 sm:m-4;
        }
        .closeButton {
            @apply flex items-center bg-red-500 text-white p-2 rounded-md hover:bg-red-700 mx-auto my-1;
        }
    }
}
</style>