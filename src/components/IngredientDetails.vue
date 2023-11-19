<template>
    <aside class="ingredient-details">
        <RouterLink to="/">X</RouterLink>
        <h1>{{ store.activeIngredient.name }}</h1>
        <ul class="ingredient-details__list">
            <li class="ingredient-details__event" v-for="(event, index) in store.activeIngredient.events" :key="index">
                <div class="ingredient-details__day">
                    <p class="ingredient-details__day-label">Day</p>
                    <p class="ingredient-details__day-count">{{ dayCount(store.activeIngredient.events[0].date, event.date) }}</p>
                </div>
                <div class="ingredient-details__data">
                    <p class="ingredient-details__CTE">{{ event.CTE }}</p>
                    <p class="ingredient-details__organization">{{ event.organization }}</p>
                    <p class="ingredient-details__location">
                        {{ event.location.city }},
                        {{ event.location.state }}
                        <template v-if="event.location.field">Field: {{ event.location.field }}</template>
                        <template v-else>Building: {{ event.location.building }}</template>
                    </p>
                    <p v-if="event.TLC">Lot: {{ event.TLC }}</p>
                    <p>
                        {{ event.quantity }} {{ event.UOM }}<template v-if="event.quantity > 1">s</template>
                    </p>
                    <div class="ingredient-details__dates">
                        <span>{{ friendlyDate(event.date) }}</span>
                        <span>{{ formattedDate(event.date) }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useFormattedDate, useFriendlyDate, useDayCount } from '../utilities/dates'
import { useAppStore } from '../stores/AppStore'

const store = useAppStore();
const { formattedDate } = useFormattedDate();
const { friendlyDate } = useFriendlyDate();
const { dayCount } = useDayCount();
</script>


<style scoped>
.ingredient-details {
    background-color: #eee;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    overflow: scroll;
    width: 320px;
    padding: 24px;
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
}

.ingredient-details__day {
    background-color: #ddd;
    padding: 4px;
    width: 60px;
    text-align: center;
    margin-right: 20px;
}

.ingredient-details__day-label {
    font-size: 12px;
}

.ingredient-details__day-count {
    font-size: 22px;
    font-weight: 200;
}

.ingredient-details__data {
    flex-grow: 1;
}

.ingredient-details__CTE {
    text-transform: capitalize;
}

.ingredient-details__organization,
.ingredient-details__location {
    font-size: 12px;
}

.ingredient-details__dates {
    display: flex;
    align-items: start;
    justify-content: space-between;
    font-size: 14px;
}
</style>