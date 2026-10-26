import { ref, computed, watch } from 'vue';

// DATA AWAL (Initial State): Dimulai dari array kosong untuk menguji Empty State
const defaultEvents = [];

// SINGLE SOURCE OF TRUTH (Diletakkan di luar fungsi agar shared/singleton)
const savedData = localStorage.getItem('gatherly_events');
const events = ref(savedData ? JSON.parse(savedData) : defaultEvents);

// WATCHERS (Side Effect: Menyimpan ke LocalStorage setiap kali state events berubah)
watch(
  events,
  (newEvents) => {
    localStorage.setItem('gatherly_events', JSON.stringify(newEvents));
  },
  { deep: true }
);

export function useEvents() {
  // DERIVED STATE (Dihitung otomatis menggunakan computed)
  const totalEvents = computed(() => events.value.length);
  const activeEvents = computed(() => events.value.filter(e => !e.done));
  const completedEvents = computed(() => events.value.filter(e => e.done));

  // MUTASI STATE: TAMBAH DATA (Create)
  const createEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      title: eventData.title,
      date: eventData.date,
      loc: eventData.loc,
      cat: eventData.cat,
      quota: Number(eventData.quota) || 100,
      price: eventData.price || 'Free',
      desc: eventData.desc,
      done: false
    };
    events.value.unshift(newEvent);
    return newEvent;
  };

  // MUTASI STATE: UBAH STATUS (Toggle/Mark as Completed)
  const completeEvent = (id) => {
    const target = events.value.find(e => e.id === Number(id));
    if (target) {
      target.done = true;
    }
  };

  // MUTASI STATE: HAPUS DATA (Delete)
  const deleteEvent = (id) => {
    const index = events.value.findIndex(e => e.id === Number(id));
    if (index !== -1) {
      events.value.splice(index, 1);
    }
  };

  // PENCARIAN DATA BERDASARKAN ID
  const getEventById = (id) => {
    return events.value.find(e => e.id === Number(id));
  };

  // FUNGSI RESET DATA (Opsional untuk pengujian praktikum)
  const clearAllEvents = () => {
    events.value = [];
    localStorage.removeItem('gatherly_events');
  };

  return {
    events,
    totalEvents,
    activeEvents,
    completedEvents,
    createEvent,
    completeEvent,
    deleteEvent,
    getEventById,
    clearAllEvents
  };
}
import { ref, computed, watch } from 'vue';

const defaultEvents = [];
const EVENTS_STORAGE_KEY = 'gatherly_events';
const REGISTRATIONS_STORAGE_KEY = 'gatherly_user_registrations';

const savedData = localStorage.getItem(EVENTS_STORAGE_KEY);
const events = ref(savedData ? JSON.parse(savedData) : defaultEvents);

const savedRegs = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
const userRegistrations = ref(savedRegs ? JSON.parse(savedRegs) : []);

watch(events, (newEvents) => {
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(newEvents));
}, { deep: true });

watch(userRegistrations, (newRegs) => {
  localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(newRegs));
}, { deep: true });

export function useEvents() {
  const totalEvents = computed(() => events.value.length);
  const activeEvents = computed(() => events.value.filter(e => !e.done));
  const completedEvents = computed(() => events.value.filter(e => e.done));
  const totalRegistrations = computed(() => userRegistrations.value.length);

  const createEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      title: eventData.title.trim(),
      date: eventData.date,
      loc: eventData.loc.trim(),
      cat: eventData.cat,
      quota: Number(eventData.quota) || 100,
      desc: eventData.desc.trim(),
      done: false
    };
    events.value.unshift(newEvent);
    return newEvent;
  };

  const completeEvent = (id) => {
    const target = events.value.find(e => e.id === Number(id));
    if (target) target.done = true;
  };

  const deleteEvent = (id) => {
    const numId = Number(id);
    const index = events.value.findIndex(e => e.id === numId);
    if (index !== -1) events.value.splice(index, 1);
    
    // CASCADING DELETE: Hapus tiket milik user jika event dihapus
    userRegistrations.value = userRegistrations.value.filter(r => r.eventId !== numId);
  };

  const getEventById = (id) => {
    return events.value.find(e => e.id === Number(id));
  };

  const registerAttendee = (eventId, participantData) => {
    const event = events.value.find(e => e.id === Number(eventId));
    // Perbaikan logika: Jika event tidak ada ATAU kuota <= 0, gagalkan
    if (!event || event.quota <= 0) return null;

    event.quota -= 1;
    const bookingCode = 'GTH-' + Date.now().toString().slice(-4);
    
    const regRecord = {
      id: Date.now(),
      eventId: Number(eventId),
      eventTitle: event.title,
      eventCat: event.cat,
      eventDate: event.date,
      eventLoc: event.loc,
      bookingCode,
      registeredAt: new Date().toISOString(),
      fullName: participantData.fullName.trim(),
      email: participantData.email.trim(),
      phone: participantData.phone.trim(),
      dob: participantData.dob,
      reason: participantData.reason.trim()
    };

    userRegistrations.value.unshift(regRecord);
    return regRecord;
  };

  const isUserRegistered = (eventId) => {
    const numId = Number(eventId);
    const eventExists = events.value.some(e => e.id === numId);
    if (!eventExists) return false;
    return userRegistrations.value.some(r => r.eventId === numId);
  };

  const getRegistrationByEventId = (eventId) => {
    return userRegistrations.value.find(r => r.eventId === Number(eventId));
  };

  const cancelRegistration = (eventId) => {
    const regIdx = userRegistrations.value.findIndex(r => r.eventId === Number(eventId));
    if (regIdx !== -1) {
      userRegistrations.value.splice(regIdx, 1);
      const event = events.value.find(e => e.id === Number(eventId));
      if (event) event.quota += 1;
      return true;
    }
    return false;
  };

  return {
    events, totalEvents, activeEvents, completedEvents, userRegistrations, totalRegistrations,
    createEvent, completeEvent, deleteEvent, getEventById, registerAttendee, 
    isUserRegistered, getRegistrationByEventId, cancelRegistration
  };
}