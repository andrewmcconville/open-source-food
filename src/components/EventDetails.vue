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
                    <h1 class="panel-view__scroller-heading">{{ trackingEvent.CTE }}</h1>
                    <p>Took place on {{ formattedDate(trackingEvent.date) }}</p>
                    <p>About {{ friendlyDate(trackingEvent.date) }}</p>
                    <p>This is event {{ store.getActiveIngredientTrackingEventIndex }} of {{ store.getActiveIngredientEventCount }}</p>
                </header>
                <p class="panel-view__scroller-label">Location</p>
                <p>{{ trackingEvent.location.name }}</p>
                <p>{{ trackingEvent.location.street }}</p>
                <p>{{ trackingEvent.location.city }}, {{ trackingEvent.location.state }} {{ trackingEvent.location.zip }}</p>
                <template v-if="trackingEvent.location.field">Field {{ trackingEvent.location.field }}</template>
                <template v-else>Building {{ trackingEvent.location.building }}</template>
                <template v-if="trackingEvent.TLC">
                    <template v-if="trackingEvent.TLCBefore">
                        <p class="panel-view__scroller-label">From lot</p>
                        <p>{{ trackingEvent.TLCBefore }}</p>
                        <p class="panel-view__scroller-label">To lot</p>
                        <p>{{ trackingEvent.TLC }}</p>
                    </template>
                    <template v-else>
                        <p class="panel-view__scroller-label">Lot code</p>
                        <p>{{ trackingEvent.TLC }}</p>
                    </template>
                </template>
                <p class="panel-view__scroller-label">By</p>
                <p>{{ trackingEvent.organization.name }}</p>
                <p>{{ trackingEvent.organization.street }}</p>
                <p>{{ trackingEvent.organization.city }}, {{ trackingEvent.organization.state }} {{ trackingEvent.organization.zip }}</p>
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
