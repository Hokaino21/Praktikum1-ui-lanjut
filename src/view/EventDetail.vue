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
<!-- Ganti bagian action-buttons menjadi ini -->
<div class="action-buttons">
  <!-- STATUS 1: SUDAH SELESAI -->
  <button v-if="event.done" disabled class="btn-register btn-disabled">
    Registration Closed
  </button>

  <!-- STATUS 2: SUDAH TERDAFTAR -->
  <div v-else-if="isRegistered" class="registered-action-group">
    <button disabled class="btn-register btn-registered">Already Registered</button>
    <router-link :to="'/browse/your-events/' + event.id" class="view-receipt-link">
      View Your Ticket Receipt &rarr;
    </router-link>
  </div>

  <!-- STATUS 3: KUOTA HABIS -->
  <button v-else-if="event.quota <= 0" disabled class="btn-register btn-disabled">
    Sold Out
  </button>

  <!-- STATUS 4: TERSEDIA -->
  <button v-else class="btn-register" @click="router.push(`/browse/events/${event.id}/register`)">
    Register Now
  </button>
</div>