<template>
    <aside class="event-details">
        <header class="view-header__header">
            <RouterLink to="." class="view-header__back-anchor">
                <span class="view-header__back-typcn typcn typcn-arrow-left"></span>
            </RouterLink>
            <h1 class="view-header__heading">Details</h1>
        </header>
        Details
    </aside>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.event-details {
    background: var(--view-background);
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    flex: 1;
    min-height: 0;
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
