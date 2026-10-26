<script setup>
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: 'Action Confirmation' },
  message: { type: String, default: 'Are you sure you want to proceed with this action?' },
  confirmText: { type: String, default: 'Yes, Proceed' },
  cancelText: { type: String, default: 'Cancel' }
});

const emit = defineEmits(['confirm', 'close']);
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-icon">⚠️</div>
          <h3 class="modal-title">{{ title }}</h3>
        </div>
        <div class="modal-body">
          <p class="modal-message">{{ message }}</p>
          <slot />
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="emit('close')">{{ cancelText }}</button>
          <button class="btn-confirm" @click="emit('confirm')">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999; padding: var(--space-4, 16px);
}
.modal-card {
  background: white; width: 100%; max-width: 460px;
  border-radius: var(--space-4, 16px); padding: var(--space-6, 24px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-color, #e2e8f0);
  animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.modal-header { display: flex; align-items: center; gap: var(--space-3, 12px); margin-bottom: var(--space-3, 12px); }
.modal-icon { font-size: 1.8rem; line-height: 1; }
.modal-title { font-size: 1.25rem; font-weight: 700; color: var(--text-main, #1a202c); margin: 0; }
.modal-body { margin-bottom: var(--space-6, 24px); }
.modal-message { color: var(--text-muted, #718096); font-size: 0.95rem; line-height: 1.6; margin: 0; }
.modal-footer { display: flex; justify-content: flex-end; gap: var(--space-3, 12px); }
.btn-cancel {
  background: var(--bg-light, #f7fafc); color: var(--text-muted, #718096);
  border: 1px solid var(--border-color, #e2e8f0); padding: var(--space-2, 8px) var(--space-4, 16px);
  border-radius: 8px; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: all 0.2s;
}
.btn-cancel:hover { background: #e2e8f0; color: var(--text-main, #1a202c); }
.btn-confirm {
  background: #e63946; color: white; border: none;
  padding: var(--space-2, 8px) var(--space-5, 20px); border-radius: 8px;
  font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background-color 0.2s, transform 0.1s;
}
.btn-confirm:hover { background: #d62828; }
.btn-confirm:active { transform: scale(0.98); }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-card">
        <div class="modal-header">
          <span v-if="badgeText" :class="['modal-badge', `badge-${badgeVariant || variant}`]">
            {{ badgeText }}
          </span>
          <h3 class="modal-title">{{ title }}</h3>
        </div>

        <div class="modal-body">
          <p v-if="message" class="modal-message">{{ message }}</p>
          <slot /> <!-- Slot Utama -->
        </div>

        <div class="modal-footer">
          <!-- SLOT FOOTER BARU -->
          <slot name="footer">
            <button v-if="showCancel" class="btn-cancel" @click="$emit('close')">
              {{ cancelText }}
            </button>
            <button :class="['btn-confirm', `btn-${variant}`]" @click="$emit('confirm')">
              {{ confirmText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: 'Action Confirmation' },
  message: { type: String, default: '' },
  confirmText: { type: String, default: 'Yes, Proceed' },
  cancelText: { type: String, default: 'Cancel' },
  showCancel: { type: Boolean, default: true },
  variant: { type: String, default: 'danger' },
  badgeText: { type: String, default: '' },
  badgeVariant: { type: String, default: '' }
});
defineEmits(['confirm', 'close']);
</script>
<!-- CSS AppModal biarkan saja seperti sebelumnya -->