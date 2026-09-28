<template>
  <div class="event-detail-page">
    <button
      @click="$router.push('/browse/events')"
      class="btn-back"
    >
      ← Back to Events
    </button>

    <div class="detail-header">
      <span class="icon">🎉</span>

      <h1>Community Gathering</h1>

      <p>
        An amazing event for the community.
      </p>
    </div>

    <div class="detail-content">
      <div class="detail-info">
        <h2>Event Information</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <p>
          Join us for an exciting community gathering with
          various activities and networking opportunities.
        </p>
      </div>

      <div class="spots">
        <strong>Only 4 spots left!</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-detail-page {
  animation: fadeIn 0.4s ease;
  max-width: 900px;
  margin: 0 auto;
}

.btn-back {
  border: none;
  background: transparent;
  color: #6644ff;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.detail-header {
  text-align: center;
  padding: 3rem;
  background: #fafafa;
  border-radius: 20px;
  border: 1px solid #eee;
}

.icon {
  font-size: 3rem;
}

.detail-header h1 {
  color: #1c1948;
  font-size: 2.5rem;
}

.detail-header p {
  color: #666;
}

.detail-content {
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border: 1px solid #eee;
  border-radius: 16px;
}

.detail-info h2 {
  color: #1c1948;
}

.detail-info p {
  color: #555;
  line-height: 1.8;
}

.spots {
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(102, 68, 255, 0.1);
  color: #6644ff;
  border-radius: 10px;
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