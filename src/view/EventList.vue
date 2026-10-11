<script setup>
const events = [
  {
    id: 1,
    title: 'Vue.js Mastery Workshop',
    date: 'Oct 12, 2026',
    loc: 'Tech Hub, Jakarta',
    cat: 'Workshop',
    desc: 'Learn advanced Vue 3 concepts, Composition API, and state management to build high-performance web applications interactively.'
  },
  {
    id: 2,
    title: 'National Tech Meetup',
    date: 'Oct 15, 2026',
    loc: 'Main Auditorium, City Center',
    cat: 'Meetup',
    desc: 'A gathering of hundreds of developers and tech enthusiasts to share the latest industry trends and expand professional networks.'
  },
  {
    id: 3,
    title: 'Startup Pitch Competition',
    date: 'Nov 02, 2026',
    loc: 'Innovation Center',
    cat: 'Competition',
    desc: 'Watch the best local startup founders pitch their innovative ideas live in front of a panel of renowned investors.'
  },
  {
    id: 4,
    title: 'UI/UX Design Sprint',
    date: 'Nov 18, 2026',
    loc: 'Creative Studio',
    cat: 'Workshop',
    desc: 'A hands-on session on designing user interfaces by implementing layout systems and visual hierarchy principles.'
  },
  {
    id: 5,
    title: 'Digital Marketing Seminar',
    date: 'Nov 20, 2026',
    loc: 'Grand Hotel Hall',
    cat: 'Seminar',
    desc: 'An in-depth seminar dissecting modern digital marketing strategies, from SEO optimization to user conversion tactics.'
  },
  {
    id: 6,
    title: 'Community Leaders Summit',
    date: 'Dec 05, 2026',
    loc: 'Gatherly HQ',
    cat: 'Conference',
    desc: 'An exclusive year-end conference for community leaders to formulate sustainable ecosystem development strategies.'
  }
]
</script>

<template>
  <div class="event-list-page">
    <div class="header-section">
      <h2 class="section-title">Upcoming Events</h2>
      <p class="section-desc">Discover workshops, seminars, tech meetups, and competitions near you.</p>
    </div>

    <div class="event-grid">
      <div class="event-card" v-for="event in events" :key="event.id">
        <div class="event-body">
          <div class="event-meta">
            <span class="event-date">{{ event.date }}</span>
            <span class="event-category">{{ event.cat }}</span>
          </div>

          <h3 class="event-title">{{ event.title }}</h3>
          <p class="event-loc">{{ event.loc }}</p>
          <p class="event-desc">{{ event.desc }}</p>

          <div class="card-footer">
            <router-link :to="`/browse/events/${event.id}`" class="btn-link">View Event Details &rarr;</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-section { margin-bottom: var(--space-8); }
.section-title { font-size: 2.2rem; margin-bottom: var(--space-2); }
.section-desc { color: var(--text-muted); font-size: 1.1rem; }

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

.event-card {
  background: white;
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.06);
}

.event-body { padding: var(--space-6); display: flex; flex-direction: column; height: 100%; }

.event-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.event-date {
  background: rgba(102, 68, 255, 0.1);
  color: var(--primary);
  padding: var(--space-1) var(--space-2);
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.event-category { color: var(--text-muted); font-size: 0.85rem; font-weight: 500; text-transform: uppercase; }
.event-title { margin-bottom: var(--space-2); font-size: 1.4rem; }
.event-loc { color: var(--text-muted); font-size: 0.95rem; margin-bottom: var(--space-4); }
.event-desc { color: var(--text-muted); line-height: 1.6; font-size: 0.95rem; margin-bottom: var(--space-6); flex-grow: 1; }

.card-footer {
  border-top: 1px solid var(--border-color);
  padding-top: var(--space-4);
}

.btn-link {
  color: var(--text-main);
  font-weight: 600;
  text-decoration: none;
}
.btn-link:hover { color: var(--primary); }
</style>

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

