<template>
    <aside class="ingredient-details">
        <RouterLink to="/">Back</RouterLink>
        <h1>{{ store.activeIngredient.name }}</h1>
        <ul>
            <li v-for="event in store.activeIngredient?.events" :key="event.name">
                <p>{{ event.name }}</p>
                <p>{{ formattedDate(event.date) }}</p>
                <p>{{ friendlyDate(event.date) }}</p>
                <p>{{ event.location }}</p>
                <p>{{ dayCount(store.activeIngredient.events[0].date, event.date) }}</p>
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
}
</style>