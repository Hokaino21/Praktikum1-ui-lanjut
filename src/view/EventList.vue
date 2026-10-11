<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import EventCard from '@/components/event/EventCard.vue';
import SearchBar from '@/components/event/SearchBar.vue';
import CategoryFilter from '@/components/event/CategoryFilter.vue';

const router = useRouter();

const searchQuery = ref('');
const selectedCategory = ref('All');

const categories = [
  'All',
  'Workshop',
  'Meetup',
  'Competition',
  'Seminar',
  'Conference'
];

// Contoh data acara.
// Ganti dengan data acara yang sudah dimiliki project kamu.
const events = ref([
  {
    id: 1,
    title: 'Vue.js Mastery Workshop',
    cat: 'Workshop',
    date: 'October 12, 2026',
    loc: 'Tech Hub, Jakarta Pusat',
    desc: 'Learn Vue.js components, props, events, and reusable UI.'
  },
  {
    id: 2,
    title: 'Frontend Developer Meetup',
    cat: 'Meetup',
    date: 'October 18, 2026',
    loc: 'Jakarta Selatan',
    desc: 'Meet developers and discuss frontend development trends.'
  },
  {
    id: 3,
    title: 'UI Design Competition',
    cat: 'Competition',
    date: 'October 22, 2026',
    loc: 'Jakarta Pusat',
    desc: 'Showcase your interface design and creative problem-solving.'
  },
  {
    id: 4,
    title: 'Modern Web Development Seminar',
    cat: 'Seminar',
    date: 'October 25, 2026',
    loc: 'Online',
    desc: 'Explore modern web application architecture and development.'
  },
  {
    id: 5,
    title: 'Technology Innovation Conference',
    cat: 'Conference',
    date: 'November 2, 2026',
    loc: 'Jakarta Convention Center',
    desc: 'Discuss technology, innovation, and the future of digital products.'
  },
  {
    id: 6,
    title: 'JavaScript Community Meetup',
    cat: 'Meetup',
    date: 'November 8, 2026',
    loc: 'Jakarta Barat',
    desc: 'Share experiences and learn from the JavaScript community.'
  }
]);

const filteredEvents = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase();

  return events.value.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(keyword) ||
      event.loc.toLowerCase().includes(keyword) ||
      event.desc.toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory.value === 'All' ||
      event.cat === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

function viewEventDetail(eventId) {
  // Sesuaikan dengan konfigurasi route detail pada project.
  router.push(`/browse/events/${eventId}`);
}
</script>

<template>
  <div class="event-list-page">
    <header class="page-header">
      <h1>Upcoming Events</h1>
      <p>
        Discover workshops, seminars, tech meetups, and competitions near you.
      </p>
    </header>

    <SearchBar v-model="searchQuery" />

    <CategoryFilter
      v-model="selectedCategory"
      :categories="categories"
    />

    <div v-if="filteredEvents.length > 0" class="events-grid">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @view-detail="viewEventDetail"
      />
    </div>

    <div v-else class="empty-state">
      <h3>No events found</h3>
      <p>No events found matching your criteria.</p>
      <button
        class="reset-btn"
        @click="searchQuery = ''; selectedCategory = 'All'"
      >
        Reset Search
      </button>
    </div>
  </div>
</template>

<style scoped>
.event-list-page {
  padding: var(--space-6) 0;
}

.page-header {
  margin-bottom: var(--space-6);
}

.page-header h1 {
  font-size: 2.2rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.page-header p {
  color: var(--text-muted);
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  align-items: stretch;
}

.empty-state {
  min-height: 180px;
  padding: var(--space-8);
  background: var(--bg-light);
  border-radius: var(--space-4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: var(--space-3);
}

.empty-state p {
  color: var(--text-muted);
}

.reset-btn {
  border: none;
  background: var(--primary);
  color: white;
  border-radius: 8px;
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
}

.reset-btn:hover {
  background: var(--primary-hover);
}
</style>
