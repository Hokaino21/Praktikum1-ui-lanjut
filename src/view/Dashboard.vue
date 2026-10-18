<template>
  <div class="dashboard-overview">
    <h2>Welcome back, Organizer</h2>

    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Total Tickets Sold</h3>
        <p class="metric-value">1,245</p>
      </div>
      <div class="metric-card">
        <h3>Page Views</h3>
        <p class="metric-value">8,302</p>
      </div>
      <div class="metric-card">
        <h3>Revenue</h3>
        <p class="metric-value">$12,450</p>
      </div>
    </div>

    <div class="data-table-container">
      <h3>Recent Registrations</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>Attendee Name</th>
            <th>Event</th>
            <th>Registration Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 5" :key="i">
            <td>John Doe {{ i }}</td>
            <td>Community Gathering {{ i }}</td>
            <td>Oct 1{{ i }}, 2026</td>
            <td><span class="status-badge">Confirmed</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dashboard-overview h2 { margin-bottom: var(--space-6); color: var(--text-main); }

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.metric-card {
  background: white;
  padding: var(--space-6);
  border-radius: var(--space-3);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.metric-card h3 { font-size: 1rem; color: var(--text-muted); margin-bottom: var(--space-2); }
.metric-value { font-size: 2.2rem; font-weight: 700; color: var(--primary); margin: 0; }

.data-table-container {
  background: white;
  padding: var(--space-6);
  border-radius: var(--space-3);
  border: 1px solid var(--border-color);
}
.data-table-container h3 { margin-bottom: var(--space-4); font-size: 1.2rem; }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}
.data-table th { background: var(--bg-gray); color: var(--text-muted); font-weight: 600; font-size: 0.9rem; }
.data-table td { color: var(--text-main); font-size: 0.95rem; }

.status-badge {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecf71;
  padding: var(--space-1) var(--space-2);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}
</style>
<script setup>
import { useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import AppCard from '@/components/ui/AppCard.vue';
import AppButton from '@/components/ui/AppButton.vue';

const router = useRouter();
const { events, totalEvents, activeEvents, completedEvents } = useEvents();
</script>

<template>
  <div class="dashboard-overview">
    <div class="dashboard-header">
      <div>
        <h2>Organizer Analytics & Overview</h2>
        <p class="subtitle">Monitor real-time statistics and track status across all managed events.</p>
      </div>
      <AppButton variant="primary" @click="router.push('/dashboard/events')">
        📊 Manage Events &rarr;
      </AppButton>
    </div>

    <div class="metrics-grid">
      <AppCard class="metric-card">
        <h3>Total Events</h3>
        <p class="metric-value">{{ totalEvents }}</p>
        <span class="metric-hint">All recorded events</span>
      </AppCard>

      <AppCard class="metric-card">
        <h3>Active Events</h3>
        <p class="metric-value text-success">{{ activeEvents.length }}</p>
        <span class="metric-hint">Live in public catalog</span>
      </AppCard>

      <AppCard class="metric-card">
        <h3>Completed Events</h3>
        <p class="metric-value text-muted">{{ completedEvents.length }}</p>
        <span class="metric-hint">Archived completed events</span>
      </AppCard>
    </div>

    <div class="data-table-container">
      <div class="table-header">
        <div>
          <h3>Recent Events Status Overview</h3>
          <p class="table-subtitle">Master registry of all events managed across the Gatherly platform.</p>
        </div>
        <button class="btn-manage-link" @click="router.push('/dashboard/events')">
          Open Event Management &rarr;
        </button>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Event Title</th>
            <th>Category</th>
            <th>Date & Location</th>
            <th>Quota</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="events.length === 0">
            <td colspan="5" class="empty-table-cell">
              <div class="empty-table-content">
                <span class="empty-icon">📭</span>
                <p>No events recorded in the system yet.</p>
                <AppButton variant="primary" @click="router.push('/dashboard/events')">
                  Create First Event
                </AppButton>
              </div>
            </td>
          </tr>
          <tr v-for="item in events" :key="item.id">
            <td class="font-semibold">{{ item.title }}</td>
            <td><span class="category-badge">{{ item.cat }}</span></td>
            <td>{{ item.date }}</td>
            <td>{{ item.quota }}</td>
            <td>
              <span :class="['status-badge', item.done ? 'status-completed' : 'status-active']">
                {{ item.done ? 'Completed' : 'Active' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dashboard-overview { max-width: 1200px; margin: 0 auto; }
.dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-8, 32px); flex-wrap: wrap; gap: var(--space-4, 16px); }
.dashboard-header h2 { font-size: 2rem; color: var(--text-main, #1a202c); margin-bottom: var(--space-1, 4px); }
.subtitle { color: var(--text-muted, #718096); font-size: 1rem; }
.metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-6, 24px); margin-bottom: var(--space-8, 32px); }
.metric-card { padding: var(--space-6, 24px); text-align: left; }
.metric-card h3 { font-size: 0.95rem; color: var(--text-muted, #718096); text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; margin-bottom: var(--space-2, 8px); }
.metric-value { font-size: 2.6rem; font-weight: 800; color: var(--primary, #6644ff); line-height: 1; margin-bottom: var(--space-2, 8px); }
.metric-hint { font-size: 0.85rem; color: var(--text-muted, #718096); }
.text-success { color: #2ecc71 !important; }
.text-muted { color: #8a8d93 !important; }

.data-table-container { background: white; padding: var(--space-6, 24px); border-radius: var(--space-4, 16px); border: 1px solid var(--border-color, #e2e8f0); box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
.table-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4, 16px); }
.table-header h3 { font-size: 1.25rem; margin: 0 0 var(--space-1, 4px) 0; }
.table-subtitle { color: var(--text-muted, #718096); font-size: 0.9rem; margin: 0; }
.btn-manage-link { background: none; border: none; color: var(--primary, #6644ff); font-weight: 600; cursor: pointer; }
.btn-manage-link:hover { text-decoration: underline; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { padding: var(--space-3, 12px) var(--space-4, 16px); text-align: left; border-bottom: 1px solid var(--border-color, #e2e8f0); }
.data-table th { background: var(--bg-light, #f7fafc); color: var(--text-muted, #718096); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; }
.font-semibold { font-weight: 600; color: var(--text-main, #1a202c); }
.category-badge { background: rgba(102, 68, 255, 0.1); color: var(--primary, #6644ff); padding: 4px 10px; border-radius: 50px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; }
.status-badge { padding: 4px 10px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; }
.status-active { background: rgba(46, 204, 113, 0.15); color: #27ae60; }
.status-completed { background: rgba(108, 117, 125, 0.15); color: #6c757d; }
.empty-table-cell { text-align: center; padding: var(--space-12, 48px) var(--space-4, 16px); background: var(--bg-light, #f7fafc); }
.empty-table-content { display: flex; flex-direction: column; align-items: center; gap: var(--space-2, 8px); }
.empty-table-content .empty-icon { font-size: 2.5rem; }
.empty-table-content p { color: var(--text-muted, #718096); margin-bottom: var(--space-2, 8px); }
@media (max-width: 768px) { .dashboard-header { flex-direction: column; align-items: flex-start; } }
</style>