import { store } from 'quasar/wrappers'
import { createPinia, defineStore, PiniaVuePlugin  } from 'pinia'
import { Router } from 'vue-router';
import {createApp, ref, Ref} from "vue";
import { useStorage } from '@vueuse/core'
import MainLayout from 'src/layouts/MainLayout.vue'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
createApp(MainLayout).use(pinia).mount('#app')


export const usePagesStore = defineStore({
  id: 'pagesStore',
  state: () => ({
    introNotSeen: useStorage('introSeenBool' ,true),
    //introNotSeen: true,
    notEditingStep1: true,
    notEditingStep2: true,
    notEditingStep3: true,
    doneEditing: false,
    introStep1: true,
    introStep2: false,
    introStep3: false,
    introStep4: false,
    introStep5: false,
    introStep6: false,
    alarmActive: false,
    notifying: false,
    globalSnooze: false
  }),
  actions: {
    introSeen() {
      this.introNotSeen = false
    },
    setIntroNotSeen() {
      this.introNotSeen = true
    },
    setEditingStep1() {
      this.notEditingStep1 = false
    },
    setNotEditingStep1() {
      this.notEditingStep1 = true
    },
    setEditingStep2() {
      this.notEditingStep2 = false
    },
    setNotEditingStep2() {
      this.notEditingStep2 = true
    },
    setEditingStep3() {
      this.notEditingStep3 = false
    },
    setNotEditingStep3() {
      this.notEditingStep3 = true
    },
    setDoneEditing() {
      this.doneEditing = true
    },
    setNotDoneEditing() {
      this.doneEditing = false
    },
    setIntro1() {
      this.introStep1 = true
    },
    setNotIntro1() {
      this.introStep1 = false
    },
    setIntro2() {
      this.introStep2 = true
    },
    setNotIntro2() {
      this.introStep2 = false
    },
    setIntro3() {
      this.introStep3 = true
    },
    setNotIntro3() {
      this.introStep3 = false
    },
    setIntro4() {
      this.introStep4 = true
    },
    setNotIntro4() {
      this.introStep4 = false
    },
    setAlarmActive() {
      this.alarmActive = true
    },
    setNotAlarmActive() {
      this.alarmActive = false
    },
    setNotifying() {
      this.notifying = true
    },
    setNotNotifying() {
      this.notifying = false
    },
    setNotSnooze() {
      this.globalSnooze = false
    },
    setSnooze() {
      this.globalSnooze = true
    }
  }
})


export interface Clock {
  clockId: string
  valueKey: number
  time: string
  sun: boolean
  mon: boolean
  tue: boolean
  wed: boolean
  thu: boolean
  fri: boolean
  sat: boolean
  barcode: string
  snoozing: boolean
  disabledToday: number
}

export const useClockStore = defineStore('clockDataStore', {
  state: () => ({
    clockList: ref(useStorage('clockList', Array<{ clockId: string; time: string; sun: boolean; mon: boolean; tue: boolean; wed: boolean; thu: boolean; fri: boolean; sat: boolean; valueKey: number, barcode: string, snoozing: boolean, disabledToday: number}>())),
    counter: 0,
    length: 0,
    curClock: useStorage('curClock', Array<{ clockId: string; time: string; sun: boolean; mon: boolean; tue: boolean; wed: boolean; thu: boolean; fri: boolean; sat: boolean; valueKey: number, barcode: string, snoozing: boolean, disabledToday: number}>()),
    curClockIdx: -1,
    daysString: ''
  }),
  persist: true,
  getters: {
    getClockList(state) {
      return state.clockList
    },
    getCounter(state) {
      return state.counter
    },
    getCurClock(state) {
      return state.curClock
    },
    getLength(state) {
      return state.length
    },
    getDaysString(state) {
      return state.daysString
    }
  },
  actions: {
    increaseCounter() {
      this.counter++
    },
    setCurClock(c: Clock) {
      const clock: Clock = {clockId:c.clockId, valueKey: c.valueKey, time: '', sun: c.sun, mon: c.mon, tue: c.tue, wed: c.wed, thu: c.thu, fri: c.fri, sat: c.sat, barcode: c.barcode, snoozing: c.snoozing, disabledToday: c.disabledToday}
      this.curClock.pop()
      this.curClock.push(clock)
    },
    setClockDisabled(day: number) {
      this.curClock[0].disabledToday = day
    },
    setClockList(l: Array<{ clockId: string; time: string; sun: boolean; mon: boolean; tue: boolean; wed: boolean; thu: boolean; fri: boolean; sat: boolean; valueKey: number, barcode: string, snoozing: boolean, disabledToday: number}>) {
      this.clockList = l
    },
    clearCurClock() {
      this.curClock.pop()
    }

  }
})



export default store((/* { ssrContext } */) => {
  const pinia = createPinia()

  return pinia
})
