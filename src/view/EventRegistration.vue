<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import AppModal from '@/components/ui/AppModal.vue';
import RegistrationSummary from '@/components/event/RegistrationSummary.vue';
import RegistrationForm from '@/components/event/RegistrationForm.vue';
import RegistrationReceipt from '@/components/event/RegistrationReceipt.vue';

const route = useRoute();
const router = useRouter();
const { getEventById, isUserRegistered } = useEvents();

const event = computed(() => getEventById(route.params.id));
const isRegistered = computed(() => event.value ? isUserRegistered(event.value.id) : false);

const isSuccessModalOpen = ref(false);
const confirmedData = ref(null);

const handleRegistrationSuccess = (record) => {
  confirmedData.value = record;
  isSuccessModalOpen.value = true;
};
const handleBackToDetail = () => router.push(`/browse/events/${event.value?.id || ''}`);
const handleGoToCatalog = () => { isSuccessModalOpen.value = false; router.push('/browse/events'); };
const handleGoToYourEvents = () => { isSuccessModalOpen.value = false; router.push('/browse/your-events'); };
</script>

<template>
  <div class="registration-page">
    <div v-if="event">
      <!-- Sudah Terdaftar -->
      <div v-if="isRegistered" class="notice-card">
        <span class="notice-badge">NOTICE</span>
        <h2>Already Registered</h2>
        <p>You have already secured a confirmed ticket for this event.</p>
        <div class="notice-actions">
          <router-link :to="'/browse/your-events/' + event.id" class="btn-primary-link">View Your Ticket Receipt &rarr;</router-link>
          <button class="btn-secondary-link" @click="handleBackToDetail">Back to Event Detail</button>
        </div>
      </div>

      <!-- Event Selesai -->
      <div v-else-if="event.done" class="notice-card">
        <span class="notice-badge">CONCLUDED</span>
        <h2>Registration Closed</h2>
        <p>This event has already concluded. Registrations are no longer accepted.</p>
        <button class="btn-secondary-link" @click="router.push('/browse/events')">Browse Active Events</button>
      </div>

      <!-- Kuota Habis -->
      <div v-else-if="event.quota <= 0" class="notice-card">
        <span class="notice-badge">SOLD OUT</span>
        <h2>Event Full</h2>
        <p>All available seats for this event have been filled.</p>
        <button class="btn-secondary-link" @click="handleBackToDetail">Back to Event Detail</button>
      </div>

      <!-- Tampilan Normal -->
      <div v-else class="registration-grid">
        <aside class="event-summary-column">
          <RegistrationSummary :event="event" @back="handleBackToDetail" />
        </aside>
        <main class="form-column">
          <RegistrationForm :event="event" @success="handleRegistrationSuccess" @cancel="handleBackToDetail" />
        </main>
      </div>
    </div>

    <!-- 404 -->
    <div v-else class="notice-card">
      <span class="notice-badge">NOT FOUND</span>
      <h2>Event Not Found</h2>
      <button class="btn-secondary-link" @click="router.push('/browse/events')">Back to Event Catalog</button>
    </div>

    <!-- Modal Sukses -->
    <AppModal :is-open="isSuccessModalOpen" title="Registration Confirmed" badge-text="SUCCESS" badge-variant="success" variant="primary" @close="handleGoToCatalog">
      <RegistrationReceipt :confirmed-data="confirmedData" :event="event" />
      <template #footer>
        <div class="modal-action-buttons">
          <button class="btn-cancel" @click="handleGoToCatalog">Back to Event Catalog</button>
          <button class="btn-confirm btn-primary" @click="handleGoToYourEvents">Go to Your Events &rarr;</button>
        </div>
      </template>
    </AppModal>
  </div>
</template>

<style scoped>
.registration-page { padding-bottom: var(--space-12); }
.registration-grid { display: grid; grid-template-columns: 360px 1fr; gap: var(--space-8); align-items: start; }
.notice-card { text-align: center; padding: var(--space-12) var(--space-8); background: white; border-radius: var(--space-4); border: 1px solid var(--border-color); max-width: 540px; margin: var(--space-8) auto; }
.notice-badge { display: inline-block; background: var(--bg-light); color: var(--text-muted); font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 50px; margin-bottom: var(--space-3); }
.notice-actions { display: flex; justify-content: center; gap: var(--space-4); flex-wrap: wrap; margin-top: var(--space-4); }
.btn-primary-link { background: var(--primary); color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; }
.btn-secondary-link { background: none; border: 1px solid var(--border-color); padding: 10px 20px; border-radius: 8px; cursor: pointer; }
.modal-action-buttons { display: flex; gap: var(--space-3); width: 100%; justify-content: flex-end; }
.btn-primary { background: var(--primary); color: white; }
@media (max-width: 900px) { .registration-grid { grid-template-columns: 1fr; } }
</style>