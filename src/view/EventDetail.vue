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
