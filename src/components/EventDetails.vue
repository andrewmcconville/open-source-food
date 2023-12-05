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
                    <p class="panel-view__label">Took place</p>
                    <p>
                        <template v-if="daysAgoComputed >= 1">
                            {{ daysAgoComputed }} days ago on {{ formattedDate(trackingEvent.date) }}
                        </template>
                        <template v-else>
                            Today, {{ formattedDate(trackingEvent.date) }}
                        </template>
                    </p>
                    <p>{{ ordinalNumber(store.getActiveIngredientTrackingEventIndex) }} of {{
                        store.getActiveIngredientEventCount }} events</p>
                </header>

                <p class="panel-view__label">How Much</p>
                <p>{{ trackingEvent.quantity }} {{ trackingEvent.UOM }}<template
                        v-if="trackingEvent.quantity > 1">s</template></p>
                <p>{{ formattedNumber(trackingEvent.weight) }} lbs. each</p>

                <div v-if="trackingEvent.notes || trackingEvent.link">
                    <p class="panel-view__label">Notes</p>
                    <p v-if="trackingEvent.notes">{{ trackingEvent.notes }}</p>
                    <p v-if="trackingEvent.link">
                        <a :href="trackingEvent.link" target="_blank" rel="noopener noreferrer">
                            Learn more at {{ trackingEvent.linkDomain }}
                            <svg width="16" height="16" class="anchor-link-icon">
                                <use xlink:href="@/assets/solar-icon-set/square-top-down.svg#icon"></use>
                            </svg>
                        </a>
                    </p>
                </div>

                <p class="panel-view__label">Event Location</p>
                <p>{{ trackingEvent.location.name }}</p>
                <p>{{ trackingEvent.location.street }}</p>
                <p>{{ trackingEvent.location.city }}, {{ trackingEvent.location.state }} {{ trackingEvent.location.zip }}
                </p>
                <template v-if="trackingEvent.location.field">Field {{ trackingEvent.location.field }}</template>
                <template v-if="trackingEvent.location.building">Building {{ trackingEvent.location.building }}</template>

                <img class="event-details__img" :src="`map-${trackingEvent.map}.jpg`" v-if="trackingEvent.map"/>

                <p class="panel-view__label">Performed By</p>
                <p>{{ trackingEvent.serviceProvider.name }}</p>
                <p>{{ trackingEvent.serviceProvider.street }}</p>
                <p>{{ trackingEvent.serviceProvider.city }}, {{ trackingEvent.serviceProvider.state }} {{ trackingEvent.serviceProvider.zip }}</p>

                <template v-if="trackingEvent.TLC">
                    <template v-if="trackingEvent.TLCBefore">
                        <p class="panel-view__label">From lot</p>
                        <p>{{ trackingEvent.TLCBefore }}</p>
                        <p class="panel-view__label">To lot</p>
                        <p>{{ trackingEvent.TLC }}</p>
                    </template>
                    <template v-else>
                        <p class="panel-view__label">Lot code</p>
                        <p>{{ trackingEvent.TLC }}</p>
                    </template>
                </template>
            </template>
            <template v-else>
                <p>Unknown tracking event</p>
            </template>
        </section>
    </aside>
</template>

<script setup lang="ts">
import { watch, computed, ref } from 'vue';
import type { Ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router'
import { useFormattedDate, useDaysAgo } from '../utilities/DateFormats'
import { useFormattedNumber, useOrdinalNumber } from '../utilities/NumberFormats'
import { useAppStore } from '../stores/AppStore'
import type { TrackingEvent } from '../models/TrackingEvent'

const route = useRoute();
const store = useAppStore();
const { formattedDate } = useFormattedDate();
const { daysAgo } = useDaysAgo();
const { formattedNumber } = useFormattedNumber();
const { ordinalNumber } = useOrdinalNumber();
let trackingEvent: Ref<TrackingEvent | undefined> = ref(store.getActiveIngredientTrackingEvent);

watch(() => route.params.event, () => {
    trackingEvent.value = store.getActiveIngredientTrackingEvent;
});

const daysAgoComputed = computed((): number => {
    if (!store.getActiveIngredient?.events[store.getActiveIngredient?.events.length - 1] || !trackingEvent.value) {
        return 0;
    }

    const count: number = daysAgo(store.getActiveIngredient.events[store.getActiveIngredient.events.length - 1].date, trackingEvent.value.date);
    if (count > 0) {
        return count;
    }

    return 0;
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
        bottom: var(--footer-height);
        left: 0;
    }
}

.event-details__img {
    max-width: calc(100% + 64px);
    margin: 8px -32px 0 -32px;
}</style>
