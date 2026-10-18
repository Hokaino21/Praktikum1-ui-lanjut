<script setup>
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
</script>

<template>
  <div class="event-detail-page">
    <button
      @click="$router.push('/browse/events')"
      class="btn-back"
    >
      &larr; Back to Events
    </button>

    <div class="detail-header">
      <span class="event-tag">Workshop &amp; Training</span>
      <h1>Vue.js Mastery Workshop</h1>

      <div class="meta-info">
        <span class="meta-item">October 12, 2026</span>
        <span class="meta-item">Tech Hub, Jakarta Pusat</span>
        <span class="meta-item">Quota: 150 Attendees</span>
      </div>
    </div>

    <div class="detail-content">
      <div class="main-desc">
        <h2>About This Event</h2>
        <p>
          Welcome to the biggest web interface development training
          event of the year! Gatherly is collaborating with the local
          developer community to host a comprehensive workshop
          designed specifically to bring together professionals,
          enthusiasts, and students.
        </p>

        <p>
          In this session, we will discuss various current industry
          challenges, explore Single Page Applications (SPA), and
          practice hands-on Layout System design prioritizing visual
          hierarchy. You will gain practical insights that can be
          directly applied to your future projects or career.
        </p>

        <h2>Event Agenda</h2>
        <ul class="agenda-list">
          <li><strong>09:00 AM</strong> - Registration &amp; QR Check-in</li>
          <li><strong>10:00 AM</strong> - Session 1: Vue Router &amp; Navigation</li>
          <li><strong>11:30 AM</strong> - Coffee Break &amp; Networking</li>
          <li><strong>01:00 PM</strong> - Session 2: Layout System &amp; Grid</li>
          <li><strong>03:00 PM</strong> - Q&amp;A and Closing Remarks</li>
        </ul>
      </div>

      <aside class="detail-sidebar">
        <AppCard class="ticket-card">
          <h3>Attendee Registration</h3>
          <p class="price">Free</p>
          <p class="ticket-desc">
            Secure your seat now before the quota is full.
          </p>

          <AppButton
            variant="primary"
            @click="alert('Registration feature is not implemented yet.')"
          >
            Register Now
          </AppButton>

          <p class="spots">Only 12 seats left!</p>
        </AppCard>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.event-detail-page {
  padding: var(--space-6) 0;
}

.btn-back {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  margin-bottom: var(--space-6);
  font-size: 1rem;
}

.btn-back:hover {
  color: var(--primary);
}

.detail-header {
  margin-bottom: var(--space-8);
}

.event-tag {
  color: var(--primary);
  font-weight: 600;
}

.detail-header h1 {
  font-size: 2.5rem;
  margin: var(--space-2) 0;
  color: var(--text-main);
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  color: var(--text-muted);
}

.detail-content {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(260px, 1fr);
  gap: var(--space-8);
  align-items: start;
}

.main-desc h2 {
  margin: var(--space-6) 0 var(--space-4);
}

.main-desc p {
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}

.agenda-list {
  padding-left: var(--space-6);
  line-height: 2;
}

.ticket-card {
  padding: var(--space-6);
  position: sticky;
  top: 20px;
}

.price {
  font-size: 2rem;
  font-weight: 700;
  margin: var(--space-4) 0;
}

.ticket-desc,
.spots {
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}

.ticket-card :deep(.app-button) {
  width: 100%;
}

@media (max-width: 700px) {
  .detail-content {
    grid-template-columns: 1fr;
  }

  .detail-header h1 {
    font-size: 2rem;
  }
}
</style>
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';

const route = useRoute();
const router = useRouter();
const { getEventById } = useEvents();

const event = computed(() => getEventById(route.params.id));
</script>

<template>
  <div class="event-detail-page">
    <button @click="router.push('/browse/events')" class="btn-back">
      &larr; Back to Events
    </button>

    <!-- KONDISI JIKA EVENT DITEMUKAN -->
    <div v-if="event">
      <div class="detail-header">
        <div class="header-tags">
          <span class="event-tag">{{ event.cat }}</span>
          <span v-if="event.done" class="status-tag status-ended">Event Finished</span>
          <span v-else class="status-tag status-live">Open Registration</span>
        </div>
        <h1>{{ event.title }}</h1>
        <div class="meta-info">
          <span class="meta-item">📅 {{ event.date }}</span>
          <span class="meta-item">📍 {{ event.loc }}</span>
          <span class="meta-item">👥 Quota: {{ event.quota }} Attendees</span>
        </div>
      </div>

      <div class="detail-content grid-asymmetric">
        <div class="main-desc">
          <h2>About This Event</h2>
          <p class="description-text">{{ event.desc }}</p>
        </div>

        <div class="sidebar">
          <AppCard class="ticket-card sticky-pane">
            <h3>Attendee Registration</h3>
            <p class="price">{{ event.price }}</p>
            <p class="ticket-desc">
              {{ event.done ? 'Registration is closed as this event has ended.' : 'Secure your ticket now before quota is filled.' }}
            </p>

            <!-- LOGIKA TOMBOL DIPERBAIKI: Jika !event.done baru muncul tombol register -->
            <AppButton 
              v-if="!event.done" 
              variant="primary" 
              class="btn-register" 
              @click="alert('Ticket registered successfully! Your digital QR ticket has been sent to your email.')"
            >
              Register Now
            </AppButton>
            <AppButton 
              v-else 
              variant="secondary" 
              class="btn-register btn-disabled" 
              disabled
            >
              Registration Closed
            </AppButton>

            <p v-if="!event.done" class="spots">Only {{ event.quota }} seats available!</p>
          </AppCard>
        </div>
      </div>
    </div>

    <!-- EMPTY STATE IF ID NOT FOUND -->
    <div v-else class="not-found-card">
      <h2>404 - Event Not Found</h2>
      <p>The event you are looking for is unavailable or has been removed by the organizer.</p>
      <AppButton variant="primary" @click="router.push('/browse/events')">
        Back to Event Catalog
      </AppButton>
    </div>
  </div>
</template>

<style scoped>
.btn-back { background: none; border: none; font-size: 1rem; cursor: pointer; margin-bottom: var(--space-6, 24px); color: var(--text-muted, #718096); font-weight: 500; }
.btn-back:hover { color: var(--primary, #6644ff); }
.detail-header { background: var(--bg-light, #f7fafc); border-radius: var(--space-4, 16px); border: 1px solid var(--border-color, #e2e8f0); padding: var(--space-12, 48px) var(--space-8, 32px); margin-bottom: var(--space-8, 32px); }
.header-tags { display: flex; gap: var(--space-3, 12px); align-items: center; margin-bottom: var(--space-4, 16px); }
.event-tag { background: rgba(102, 68, 255, 0.1); color: var(--primary, #6644ff); padding: var(--space-1, 4px) var(--space-4, 16px); border-radius: 50px; font-weight: 600; font-size: 0.9rem; text-transform: uppercase; }
.status-tag { padding: var(--space-1, 4px) var(--space-3, 12px); border-radius: 50px; font-size: 0.85rem; font-weight: 600; }
.status-live { background: rgba(46, 204, 113, 0.15); color: #27ae60; }
.status-ended { background: rgba(108, 117, 125, 0.15); color: #6C757d; }
.detail-header h1 { font-size: 2.5rem; margin-bottom: var(--space-4, 16px); color: var(--text-main, #1a202c); }
.meta-info { display: flex; gap: var(--space-6, 24px); color: var(--text-muted, #718096); flex-wrap: wrap; }
.meta-item { display: flex; align-items: center; gap: var(--space-2, 8px); font-size: 1rem; }
.grid-asymmetric { display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-8, 32px); }
.main-desc h2 { font-size: 1.5rem; margin-bottom: var(--space-4, 16px); color: var(--text-main, #1a202c); }
.description-text { line-height: 1.8; color: var(--text-muted, #718096); font-size: 1.05rem; white-space: pre-wrap; }
.ticket-card { padding: var(--space-6, 24px); }
.ticket-card h3 { font-size: 1.2rem; margin-bottom: var(--space-2, 8px); }
.price { font-size: 2rem; font-weight: 800; color: var(--primary, #6644ff); margin-bottom: var(--space-2, 8px); }
.ticket-desc { font-size: 0.9rem; color: var(--text-muted, #718096); margin-bottom: var(--space-6, 24px); }
.btn-register { width: 100%; margin-bottom: var(--space-3, 12px); }
.btn-disabled { cursor: not-allowed; opacity: 0.6; }
.spots { color: #27ae60; font-weight: 600; font-size: 0.95rem; text-align: center; }
.not-found-card { text-align: center; padding: var(--space-12, 48px); background: white; border-radius: var(--space-4, 16px); border: 1px solid var(--border-color, #e2e8f0); }
.not-found-card h2 { margin-bottom: var(--space-2, 8px); }
.not-found-card p { color: var(--text-muted, #718096); margin-bottom: var(--space-6, 24px); }
@media (max-width: 900px) { .grid-asymmetric { grid-template-columns: 1fr; } }
</style>
