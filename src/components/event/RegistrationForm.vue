<script setup>
import { ref, reactive, computed } from 'vue';
import { useEvents } from '@/composables/useEvents';
import AppCard from '@/components/ui/AppCard.vue';
import AppModal from '@/components/ui/AppModal.vue';

const props = defineProps({ event: { type: Object, required: true } });
const emit = defineEmits(['success', 'cancel']);
const { registerAttendee } = useEvents();

const form = reactive({ fullName: '', email: '', phone: '', dob: '', reason: '' });
const errors = reactive({ fullName: '', email: '', phone: '', dob: '', reason: '' });
const errorMessage = ref('');
const isDiscardModalOpen = ref(false);

const isFormDirty = computed(() => Boolean(form.fullName || form.email || form.phone || form.dob || form.reason));

const validateField = (field) => {
  switch (field) {
    case 'fullName':
      errors.fullName = !form.fullName.trim() ? 'Full name is required.' : form.fullName.trim().length < 2 ? 'Must be at least 2 characters.' : '';
      break;
    case 'email':
      if (!form.email.trim()) errors.email = 'Email address is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.';
      else errors.email = '';
      break;
    case 'phone':
      if (!form.phone.trim()) errors.phone = 'Phone number is required.';
      else if (!/^[0-9+\-\s()]{9,16}$/.test(form.phone.trim())) errors.phone = 'Enter a valid phone number (min 9 digits).';
      else errors.phone = '';
      break;
    case 'dob':
      if (!form.dob) errors.dob = 'Date of birth is required.';
      else if (new Date(form.dob) > new Date()) errors.dob = 'Date of birth cannot be in the future.';
      else errors.dob = '';
      break;
    case 'reason':
      if (!form.reason.trim()) errors.reason = 'Reason is required.';
      else if (form.reason.trim().length < 10) errors.reason = 'Please write at least 10 characters.';
      else errors.reason = '';
      break;
  }
};

const validateAll = () => {
  ['fullName', 'email', 'phone', 'dob', 'reason'].forEach(validateField);
  return !errors.fullName && !errors.email && !errors.phone && !errors.dob && !errors.reason;
};

const handleSubmit = () => {
  if (!validateAll()) {
    errorMessage.value = 'Please correct the highlighted fields below before submitting.';
    return;
  }
  const record = registerAttendee(props.event.id, form);
  if (record) {
    errorMessage.value = '';
    emit('success', record);
  } else {
    errorMessage.value = 'Unable to complete registration. Please check remaining seats.';
  }
};

const handleCancelClick = () => {
  if (isFormDirty.value) isDiscardModalOpen.value = true;
  else emit('cancel');
};

const handleConfirmDiscard = () => {
  isDiscardModalOpen.value = false;
  emit('cancel');
};
</script>

<template>
  <div class="registration-form-wrapper">
    <AppCard class="form-card">
      <header class="form-header">
        <h2>Registration Form</h2>
        <p>Fill out the attendee information below to confirm your participation.</p>
      </header>

      <div v-if="errorMessage" class="error-banner">{{ errorMessage }}</div>

      <form @submit.prevent="handleSubmit" class="attendee-form">
        <!-- Full Name -->
        <div class="form-group">
          <label for="fullName">Full Name <span class="required">*</span></label>
          <input id="fullName" v-model="form.fullName" type="text" :class="['form-input', { 'input-error': errors.fullName }]" placeholder="e.g. John Doe" @input="errors.fullName && validateField('fullName')" />
          <span v-if="errors.fullName" class="field-error">{{ errors.fullName }}</span>
        </div>
        
        <!-- Email -->
        <div class="form-group">
          <label for="email">Email Address <span class="required">*</span></label>
          <input id="email" v-model="form.email" type="email" :class="['form-input', { 'input-error': errors.email }]" placeholder="e.g. name@example.com" @input="errors.email && validateField('email')" />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>

        <!-- Phone -->
        <div class="form-group">
          <label for="phone">Phone Number <span class="required">*</span></label>
          <input id="phone" v-model="form.phone" type="tel" :class="['form-input', { 'input-error': errors.phone }]" placeholder="e.g. 081234567890" @input="errors.phone && validateField('phone')" />
          <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
        </div>

        <!-- DOB -->
        <div class="form-group">
          <label for="dob">Date of Birth <span class="required">*</span></label>
          <input id="dob" v-model="form.dob" type="date" :class="['form-input', { 'input-error': errors.dob }]" @change="errors.dob && validateField('dob')" />
          <span v-if="errors.dob" class="field-error">{{ errors.dob }}</span>
        </div>

        <!-- Reason -->
        <div class="form-group">
          <label for="reason">Reason for Attending <span class="required">*</span></label>
          <textarea id="reason" v-model="form.reason" rows="4" :class="['form-textarea', { 'input-error': errors.reason }]" placeholder="Describe your background..." @input="errors.reason && validateField('reason')"></textarea>
          <span v-if="errors.reason" class="field-error">{{ errors.reason }}</span>
        </div>

        <!-- Actions -->
        <div class="form-actions">
          <button type="button" class="btn-cancel-form" @click="handleCancelClick">Cancel</button>
          <button type="submit" class="btn-submit-form">Submit Registration</button>
        </div>
      </form>
    </AppCard>

    <AppModal :is-open="isDiscardModalOpen" title="Discard Registration?" message="You have unsaved changes. Are you sure you want to cancel?" badge-text="WARNING" variant="danger" cancel-text="Keep Editing" confirm-text="Yes, Discard" @confirm="handleConfirmDiscard" @close="isDiscardModalOpen = false" />
  </div>
</template>

<style scoped>
.form-card { padding: var(--space-8); border: 1px solid var(--border-color); background: white; border-radius: var(--space-4); }
.form-header { margin-bottom: var(--space-6); }
.form-header h2 { font-size: 1.6rem; color: var(--text-main); margin-bottom: var(--space-1); }
.form-header p { color: var(--text-muted); font-size: 0.95rem; }
.error-banner { background: #fee2e2; color: #b91c1c; padding: var(--space-3) var(--space-4); border-radius: 8px; border: 1px solid #fecaca; font-size: 0.9rem; font-weight: 500; margin-bottom: var(--space-6); }
.attendee-form { display: flex; flex-direction: column; gap: 22px; }
.form-group { display: flex; flex-direction: column; }
.form-group label { font-size: 0.9rem; font-weight: 600; color: var(--text-main); margin-bottom: 8px; }
.required { color: #e63946; }
.form-input, .form-textarea { width: 100%; padding: 11px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.95rem; color: var(--text-main); background: #fafafa; transition: border-color 0.2s; box-sizing: border-box; }
.input-error { border-color: #e63946 !important; background: #fff5f5; }
.field-error { color: #e63946; font-size: 0.8rem; margin-top: 4px; }
.form-actions { display: flex; justify-content: flex-end; gap: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--border-color); }
.btn-cancel-form { background: none; border: none; color: var(--text-muted); cursor: pointer; font-weight: 600; }
.btn-submit-form { background: var(--primary); color: white; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; }
</style>