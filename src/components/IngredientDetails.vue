<template>
    <aside class="ingredient-details">
        <header class="view-header__header">
            <RouterLink to="/" class="view-header__back-anchor">
                <img class="nav__anchor-icon" src="@/assets/solar-icon-set/ArrowLeft.svg" alt="Arrow Left" width="26" height="26" />
            </RouterLink>
            <h1 class="view-header__heading">Timeline</h1>
        </header>
        <div class="ingredient-details__scroller">
            <h1 class="ingredient-details__heading">{{ store.getActiveIngredient.name }}</h1>
            <div class="ingredient-details__labels">
                <p class="ingredient-details__day-label">Day</p>
                <p class="ingredient-details__event-label">Event</p>
            </div>
            <ul class="ingredient-details__list">
                <li v-for="(event, index) in store.getActiveIngredient.events" :key="index">
                    <RouterLink :to="{ name: 'EventDetails', params: { event: index }}" class="ingredient-details__event">
                        <div class="ingredient-details__day">
                            <p class="ingredient-details__day-count">{{ dayCount(store.getActiveIngredient.events[0].date, event.date) }}</p>
                        </div>
                        <div class="ingredient-details__data">
                            <p class="ingredient-details__CTE">{{ event.CTE }}</p>
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
        </div>
    </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useDayCount } from '../utilities/DateFormats'
import { useFormattedNumber } from '../utilities/NumberFormats'
import { useAppStore } from '../stores/AppStore'

const store = useAppStore();
const { dayCount } = useDayCount();
const { formattedNumber } = useFormattedNumber();
</script>


<style scoped lang="scss">
.ingredient-details {
    background: var(--warm-gray-20);
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    flex: 1;
    min-height: 0;
    
    @media(max-width: 640px) {
        display: none;
    }
}

.ingredient-details--active {
    @media(max-width: 640px) {
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
    padding: 16px;
}

.ingredient-details__list {
    list-style: none;
    width: 100%;
}

.ingredient-details__event {
    display: flex;
    align-items: start;
    justify-content: start;
    width: 100%;
    margin-bottom: 24px;
    text-decoration: none;
    color: #666;
}

.ingredient-details__labels {
    display: flex;
    align-items: start;
    justify-content: start;
    margin-bottom: 12px;
}

.ingredient-details__day-label {
    font-size: 12px;
    width: 48px;
    text-align: center;
    margin-right: 12px;
}

.ingredient-details__event-label {
    font-size: 12px;
    margin-left: 12px;
}

.ingredient-details__day {
    width: 48px;
    text-align: center;
    margin-right: 12px;
    margin-top: 4px;
    flex-shrink: 0;
}

.ingredient-details__day-count {
    font-size: 24px;
    font-weight: 200;
    line-height: 1;
    margin-top: 8px;
}

.ingredient-details__data {
    flex-grow: 1;
    padding: 12px;
}

.ingredient-details__CTE {
    text-transform: capitalize;
    font-size: 24px;
    font-weight: 200;
    line-height: 1;
    margin-bottom: 8px;
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