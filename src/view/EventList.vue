<template>
  <div class="event-list-page">
    <div class="header-section">
      <h2>Upcoming Events</h2>

      <p>
        Discover the latest gatherings and activities
        happening near you.
      </p>
    </div>

    <div class="event-grid">
      <div
        class="event-card"
        v-for="i in 6"
        :key="i"
      >
        <div class="event-date">
          Oct {{ 10 + i }}, 2026
        </div>

        <span class="event-category">
          Community
        </span>

        <h3>
          Community Gathering {{ i }}
        </h3>

        <p>
          Main Auditorium, City Center
        </p>

        <p class="event-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aliquam at velit vel magna interdum scelerisque.
        </p>

        <router-link
          :to="`/browse/events/${i}`"
          class="btn-link"
        >
          View Details →
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-list-page {
  animation: fadeIn 0.4s ease;
}

.header-section {
  margin-bottom: 2rem;
}

.header-section h2 {
  font-size: 1.8rem;
  color: #1c1948;
}

.header-section p {
  color: #666;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(280px, 1fr)
  );
  gap: 1.5rem;
}

.event-card {
  padding: 1.5rem;
  background: white;
  border: 1px solid #eee;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
}

.event-date {
  color: #6644ff;
  font-weight: 700;
  margin-bottom: 0.8rem;
}

.event-category {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  background: rgba(102, 68, 255, 0.1);
  color: #6644ff;
  border-radius: 20px;
  font-size: 0.8rem;
}

.event-card h3 {
  color: #1c1948;
}

.event-card p {
  color: #666;
}

.event-desc {
  line-height: 1.6;
}

.btn-link {
  color: #6644ff;
  text-decoration: none;
  font-weight: 600;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>