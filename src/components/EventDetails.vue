<template>
    <aside class="event-details panel-view">
        <header class="panel-view__header">
            <RouterLink to="." class="panel-view__back-anchor">
                <svg width="26" height="26" class="panel-view__anchor-icon">
                    <use xlink:href="@/assets/solar-icon-set/arrow-left-linear.svg#icon"></use>
                </svg>
            </RouterLink>
            <h1 class="panel-view__heading">Tracking Event</h1>
        </header>
        <section class="panel-view__scroller">
            <template v-if="trackingEvent">
                <header class="panel-view__scroller-header">
                    <h1 class="panel-view__scroller-heading">{{ trackingEvent?.CTE }}</h1>
                    <p>Took place on {{ formattedDate(trackingEvent?.date) }}</p>
                    <p>About {{ friendlyDate(trackingEvent?.date) }}</p>
                    <p>This is event {{ store.getActiveIngredientTrackingEventIndex }} of {{ store.getActiveIngredientEventCount }}</p>
                </header>
                <template v-if="trackingEvent.TLC">
                    <template v-if="trackingEvent.TLCBefore">
                        <p>From lot: {{ trackingEvent.TLCBefore }}</p>
                        <p>To lot: {{ trackingEvent.TLC }}</p>
                    </template>
                    <template v-else>
                        <p>Lot: {{ trackingEvent.TLC }}</p>
                    </template>
                </template>
                <p>By: {{ trackingEvent.organization }}</p>
                <p>At:
                    <template v-if="trackingEvent.location.field">Field {{ trackingEvent.location.field }}</template>
                    <template v-else>Building {{ trackingEvent.location.building }}</template>
                </p>
            </template>
            <template v-else>
                <p>Unknown tracking event</p>
            </template>
        </section>
    </aside>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router'
import { useFormattedDate, useFriendlyDate } from '../utilities/DateFormats'
import { useAppStore } from '../stores/AppStore'
import type { TrackingEvent } from '../models/TrackingEvent'

const route = useRoute();
const store = useAppStore();
const { formattedDate } = useFormattedDate();
const { friendlyDate } = useFriendlyDate();
let trackingEvent: TrackingEvent | undefined = store.getActiveIngredientTrackingEvent;

watch(() => route.params.event, () => {
    trackingEvent = store.getActiveIngredientTrackingEvent;
});
</script>

<style scoped lang="scss">
.event-details {
}

.event-details--active {
    @media(max-width: 1080px) {
        display: flex;
        position: fixed;
        top: var(--header-height);
        right: 0;
        bottom: var(--footer-height);
        left: 50%;
        z-index: 3;
    }
    @media(max-width: 720px) {
        top: 0;
        bottom: 0;
        left: 0;
    }
}
</style>
