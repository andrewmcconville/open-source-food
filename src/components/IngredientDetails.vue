<template>
    <aside class="ingredient-details panel-view">
        <header class="panel-view__header">
            <RouterLink to="/" class="panel-view__back-anchor">
                <svg width="26" height="26" class="panel-view__anchor-icon">
                    <use xlink:href="@/assets/solar-icon-set/arrow-left-linear.svg#icon"></use>
                </svg>
            </RouterLink>
            <h1 class="panel-view__heading">Timeline</h1>
        </header>
        <section class="panel-view__scroller">
            <template v-if="activeIngredient">
                <header class="panel-view__scroller-header">
                    <h1 class="panel-view__scroller-heading">{{ activeIngredient.name }}</h1>
                    <p class="panel-view__scroller-label">{{ activeIngredient.events[0].CTE }}</p>
                    <p>{{ daysAgoComputed }} days ago on {{ formattedDate(activeIngredient.events[0].date) }}</p>
                    <p>{{ activeIngredient.events.length }} tracking events</p>
                </header>

                <p class="panel-view__scroller-label">Event Timeline</p>
                <ul class="ingredient-details__list">
                    <li v-for="(event, index) in activeIngredient.events" :key="index" class="ingredient-details__list-item">
                        <RouterLink :to="{ name: 'EventDetails', params: { id: activeIngredient.name, event: index }}" class="ingredient-details__event">
                            <div class="ingredient-details__labels">
                                <p class="ingredient-details__day-label">Day</p>
                                <p class="ingredient-details__event-label">Event</p>
                            </div>
                            <header class="ingredient-details__event-header">
                                <p class="ingredient-details__day-count">{{ dayCount(activeIngredient.events[0].date, event.date) }}</p>
                                <p class="ingredient-details__CTE">{{ event.CTE }}</p>
                            </header>
                            <div class="ingredient-details__data">
                                <p class="ingredient-details__quantity">
                                    <template v-if="event.quantityBefore">
                                        <span class="ingredient-details__before">{{ formattedNumber(event.quantityBefore) }} {{ event.UOMBefore }}<template v-if="event.quantity > 1">s</template></span>
                                        <span class="ingredient-details__to">into</span>
                                    </template>
                                </p>
                                <p>{{ formattedNumber(event.quantity) }} {{ event.UOM }}<template v-if="event.quantity > 1">s</template></p>
                                <p>{{ formattedNumber(event.weight) }} lbs. each</p>
                                <p class="ingredient-details__location">
                                    {{ event.location.city }},
                                    {{ event.location.state }}
                                </p>
                            </div>
                        </RouterLink>
                    </li>
                </ul>
            </template>
            <template v-else>
                <p>Unknown ingredient</p>
            </template>
        </section>
    </aside>
</template>

<script setup lang="ts">
import { watch, computed, ref } from 'vue';
import type { Ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router'
import { useDayCount, useFormattedDate } from '../utilities/DateFormats'
import { useFormattedNumber } from '../utilities/NumberFormats'
import { useAppStore } from '../stores/AppStore'
import type { Ingredient } from '../models/Ingredient'

const route = useRoute();
const store = useAppStore();
const { dayCount } = useDayCount();
const { formattedNumber } = useFormattedNumber();
const { formattedDate } = useFormattedDate();
let activeIngredient: Ref<Ingredient | undefined> = ref(store.getActiveIngredient);

watch(()  => route.params.id, () => {
    activeIngredient.value = store.getActiveIngredient;
});

const daysAgoComputed = computed((): number => {
    if (!activeIngredient.value || !activeIngredient.value.events[activeIngredient.value.events.length - 1]) {
        return 0;
    } else {
        return dayCount(activeIngredient.value.events[activeIngredient.value.events.length - 1].date, activeIngredient.value.events[0].date) - 1;
    }
});
</script>


<style scoped lang="scss">
.ingredient-details {    
    @media(max-width: 720px) {
        display: none;
    }
}

.ingredient-details--active {
    @media(max-width: 720px) {
        display: flex;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
    }
}

.ingredient-details__list {
    list-style: none;
    width: 100%;
}

.ingredient-details__list-item {
    margin-bottom: 24px;
}

.ingredient-details__event {
    color: #666;
    padding: 8px 0;
    display: block;
}

.ingredient-details__labels {
    display: flex;
    align-items: start;
    justify-content: start;
    margin-bottom: 4px;
}

.ingredient-details__day-label {
    font-size: 12px;
    width: 52px;
    text-align: center;
}

.ingredient-details__event-label {
    font-size: 12px;
    margin-left: 16px;
}

.ingredient-details__event-header {
    display: flex;
    margin-bottom: 4px;
}

.ingredient-details__day-count {
    border: 1px solid var(--teal);
    color: var(--teal);
    background-color: var(--yellow-20);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    flex-shrink: 0;
    font-size: 20px;
    font-weight: 800;
    line-height: 1;
}

.ingredient-details__CTE {
    background-color: var(--teal);
    color: #fff;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    text-transform: capitalize;
}

.ingredient-details__data {
    padding-left: 68px;
}


.ingredient-details__quantity {
    display: flex;
    align-items: center;
    justify-content: start;
}

.ingredient-details__to {
    font-weight: 200;
    margin: 0 6px;
}
</style>