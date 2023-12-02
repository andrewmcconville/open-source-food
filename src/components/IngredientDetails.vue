<template>
    <aside class="ingredient-details">
        <header class="view-header__header">
            <RouterLink to="/" class="view-header__back-anchor">
                <svg width="26" height="26" class="view-header__anchor-icon">
                    <use xlink:href="@/assets/solar-icon-set/arrow-left-linear.svg#icon"></use>
                </svg>
            </RouterLink>
            <h1 class="view-header__heading">Timeline</h1>
        </header>
        <div class="ingredient-details__scroller">
            <template v-if="activeIngredient">
                <header class="ingredient-details__header">
                    <h1 class="ingredient-details__heading">{{ activeIngredient.name }}</h1>
                    <p>Harvested on {{ formattedDate(activeIngredient.events[0].date) }}</p>
                    <p>About {{ friendlyDate(activeIngredient.events[0].date) }}</p>
                    <p>It has {{ activeIngredient.events.length }} tracking events</p>
                </header>

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
                                        <span>{{ formattedNumber(event.quantityBefore) }} {{ event.UOMBefore }}<template v-if="event.quantity > 1">s</template></span>
                                        <span class="ingredient-details__to">to</span>
                                    </template>
                                    <span>{{ formattedNumber(event.quantity) }} {{ event.UOM }}<template v-if="event.quantity > 1">s</template></span>
                                </p>
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
        </div>
    </aside>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router'
import { useDayCount, useFormattedDate, useFriendlyDate } from '../utilities/DateFormats'
import { useFormattedNumber } from '../utilities/NumberFormats'
import { useAppStore } from '../stores/AppStore'

const route = useRoute();
const store = useAppStore();
const { dayCount } = useDayCount();
const { formattedNumber } = useFormattedNumber();
const { formattedDate } = useFormattedDate();
const { friendlyDate } = useFriendlyDate();
let activeIngredient = store.getActiveIngredient;

watch(()  => route.params.id, () => {
    activeIngredient = store.getActiveIngredient;
});
</script>


<style scoped lang="scss">
.ingredient-details {
    background: var(--yellow-10);
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    flex: 1;
    min-height: 0;
    position: relative;
    
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

.ingredient-details__scroller {
    flex-grow: 1;
    overflow-y: auto;
    width: 100%;
    padding: 82px 32px;
}

.ingredient-details__header {
    margin-bottom: 64px;
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
    width: 54px;
    text-align: center;
}

.ingredient-details__event-label {
    font-size: 12px;
    margin-left: 12px;
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
    padding-left: 70px;
    line-height: 1.5;
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