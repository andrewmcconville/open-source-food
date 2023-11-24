<template>
    <aside class="event-details">
        <RouterLink to=".">Back</RouterLink>
        Details
    </aside>
</template>

<script setup lang="ts">

</script>

<style scoped>
.event-details {
    background-color: bisque;
    flex: 1;
}

.event-details--active {
    @media(max-width: 960px) {
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 3;
    }
}
</style>
