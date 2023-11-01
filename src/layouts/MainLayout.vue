<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <img src="src/assets/Pillbug_logo.png" style="height: 40px"/>
        <q-toolbar-title>
          Pillbug
        </q-toolbar-title>

        <div>Pillbug v0.1.0</div>
      </q-toolbar>
    </q-header>

    <q-page-container >
<!--      <router-view />-->
      <q-layout
        v-if="introNotSeen"
        style="background-color: #FCF7F9">
        <div class="intro-container">
            <q-intersection v-if="introStep1" transition="slide-left">
              <img src="src/assets/Pillbug_logo.png" style="position: absolute; height: 30vh; left: 27vw; top: 5vh"/>

            </q-intersection>
          <div class="intro-text" style="position: absolute; top: 35.5vh; background-color: #FFFFFF; border-radius: 30px" v-if="introStep1">
            <div style="background-color: #FFFFFF; border-radius: 30px; height: 30vh; padding: 20px; font-family: Serif, Georgia,serif">
              Pillbug is
              here to help
            </div>
          </div>
            <q-intersection v-if="introStep2" transition="slide-left">
              <img src="src/assets/building-surrounded-by-nature%201.png" style="position: absolute; width: 70vw; left: 15vw; top: 5vh"/>

            </q-intersection>
          <div v-if="introStep2" class="intro-text" style="position: absolute; top: 35.5vh; background-color: #FFFFFF; border-radius: 30px; padding: 20px; font-family: Serif, Georgia,serif">
            <div>Never leave the house without taking your meds again </div>
          </div>
            <q-intersection v-if="introStep4" transition="slide-left">
              <img src="src/assets/sleeping%20pillbug%201.png" style="position: absolute; height: 30vh; left: 27vw; top: 5vh"/>

            </q-intersection>
          <div v-if="introStep4" class="intro-text" style="position: absolute; top: 35.5vh; background-color: #FFFFFF; border-radius: 30px; padding: 20px; font-family: Serif, Georgia,serif">
            <div>A picture is worth a thousand snooze buttons</div>
          </div>
            <q-intersection v-if="introStep3" transition="slide-left">
              <img src="src/assets/camera-barcode-pill.png" style="position: absolute; width: 80vw; left: 10vw; top: 5vh"/>
            </q-intersection>
          <div v-if="introStep3" class="intro-text" style="position: absolute; top: 35.5vh; background-color: #FFFFFF; border-radius: 30px; padding: 20px; font-family: Serif, Georgia,serif">
            <div>Scan a barcode instead of pressing snooze</div>
          </div>
        </div>

        <canvas id="introProgressDisplay" width="1000" height="1000" style="position: absolute; right: 38.15vw; top: 58.9vh; width: 24.2vw; height: 24.2vw">

        </canvas>
        <transition>

          <q-intersection v-if="!introDone">

            <q-btn padding="md" class="next-btn" @click="handleIntroBtnClick()" round style="background: #242C64; color: white; top: 44vh">
              <q-icon name="arrow_right_alt" size="10vw"></q-icon>
            </q-btn>

          </q-intersection>
          </transition>
        <transition>
          <q-btn v-if="introDone2" padding="md" class="next-btn" @click="handleIntroBtnClick()" style="background: #242C64; color: white; top: 62vh; margin-left: 37.5vw; border-radius: 30px; width: 25vw; font-size: 1.1em; position: absolute" >
            <div>Let's Go!</div>
          </q-btn>
        </transition>
      </q-layout>
      <q-layout
        v-else-if="notEditingStep1 && !alarmActive && !introNotSeen" style="background-color: rgb(222, 224, 255,1)">
        <q-intersection>
          <div key="container">
            <q-list  v-for="clock in clocksList.valueOf()" :key="clock">
              <div v-if="clock != null" key="clock-container" class="clock-container">
                <div style="width: fit-content; max-width: 48vw; height: 3.8vh; margin-left: 3vw; color: white; font-size: 1.5em; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ `${clock.clockId}`}}</div>
                <div key="time-display" class="time-display" style=" font-size: 1.5em; padding-top: 5px; display: inline-flex"><div style="margin-top: .5vh">Time:</div> <div style="font-size: 1.333em; border-radius: 5px; background-color: white; color: black; padding-left: 5px; margin-left: 2vw; width: 40vw; height: 1.5em;">{{Number((`${clock.time}`.split(":")[0])) % 12 + ":" + `${clock.time}`.split(":")[1] }}</div> </div>
                <div style="height: fit-content; color: white; font-size: 1.5em; margin-left: 3.4vw; display: inline-flex; margin-top: 1vh;">Days:
                  <div style="background-color: white; color: black; padding-left: 5px; margin-left: 2vw; width: 65vw; height: 1.5em; border-radius: 5px">{{daysToString(clock)}}</div>
                </div>
                <q-btn key="edit" icon="more_horiz" class="clock-edit" @click="handleEdit1ClockClick2(clock)" flat style="bottom: 15vh"></q-btn>
              </div>
            </q-list>
            <q-btn key="btn-add"  @click="handleAddClockClick" class="add-clock-btn" style="border-radius: 30px; font-size: 1.5em" flat icon="add"></q-btn>
          </div>
        </q-intersection>
      </q-layout>
      <q-layout v-else-if="notEditingStep2 && !alarmActive" style="background-color: rgb(222, 224, 255,1)">
        <q-btn v-if="editingMode" icon="delete" color="red" @click="handleRemoveClockClick()" flat style="position: absolute; left: 85vw; bottom: 10vh"></q-btn>
        <q-intersection>
          <div class="setup-intro" style="font-size: 1.5em; padding: 15px; font-family: Serif, Georgia,serif">{{"Let's set up \nyour medication reminder!"}} </div>
        <div>
          <div style="font-size: 1.3em; padding: 15px 5vw 15px 5vw">Medication name (or choose nickname)</div>
          <q-input rounded standout v-model="curClock[0].clockId" style="margin: 0 5vw 0 5vw;" bg-color="white" label-color="black" placeholder="Medication name here" color="black" input-style="color: black"></q-input>
        </div>
        <div>
          <div style="font-size: 1.3em; padding: 15px 5vw 10px 5vw">What days would you like your reminder?</div>
          <div style="height: fit-content; margin-left: 8vw">
            <q-checkbox v-model="curClock[0].sun" size="12vw" color="blue-10" style="font-size: 1.1em"></q-checkbox>
            <q-checkbox v-model="curClock[0].mon" size="12vw" color="blue-10" style="font-size: 1.1em"></q-checkbox>
            <q-checkbox v-model="curClock[0].tue" size="12vw" color="blue-10" style="font-size: 1.1em"></q-checkbox>
            <q-checkbox v-model="curClock[0].wed" size="12vw" color="blue-10" style="font-size: 1.1em"></q-checkbox>
            <q-checkbox v-model="curClock[0].thu" size="12vw" color="blue-10" style="font-size: 1.1em"></q-checkbox>
            <q-checkbox v-model="curClock[0].fri" size="12vw" color="blue-10" style="font-size: 1.1em"></q-checkbox>
            <q-checkbox v-model="curClock[0].sat" size="12vw" color="blue-10" style="font-size: 1.1em"></q-checkbox>
          </div>
          <div style="height: fit-content; left: 5vw; display: inline; position: relative; top: 0">
            <p style="font-size: 1.1em; float: left; margin-left: 5.8vw; ">Sun</p>
            <p style="font-size: 1.1em; float: left; margin-left: 5.4vw; ">Mon</p>
            <p style="font-size: 1.1em; float: left; margin-left: 4.8vw; ">Tue</p>
            <p style="font-size: 1.1em; float: left; margin-left: 5.4vw; ">Wed</p>
            <p style="font-size: 1.1em; float: left; margin-left: 5.2vw; ">Thu</p>
            <p style="font-size: 1.1em; float: left; margin-left: 6.6vw; ">Fri</p>
            <p style="font-size: 1.1em; float: left; margin-left: 7.4vw; ">Sat</p>
          </div>
        </div>
          <div>
            <div style="font-size: 1.3em; padding: 15px 5vw 0px 5vw; margin-top: 3.4vh;">What time would you like to take your pill?</div>
            <q-btn  style="width: fit-content; height: fit-content" flat :ripple="false">

              <q-input text-color="#E8EAF7"  :rules="['time']" style="height: fit-content; position: relative; width: 0" no-error-icon item-aligned readonly>
                <template v-slot:append>
                  <div class="time-display" style="width: 68vw; margin-left: 5vw; height: 5vh; color: black; font-size: 1.1em; background-color: white; border-radius: 20px; padding-left: 5vw; padding-top: 1.2vh"> Time: {{curClock[0].time}}
                  </div>
                  <q-popup-proxy text-color="#E8EAF7" cover transition-show="scale" transition-hide="scale" >
                    <q-time v-model="curClock[0].time" now-btn text-color="#E8EAF7" format12h mask="hh:mm A">

                    </q-time>

                  </q-popup-proxy>

                </template>

              </q-input>
            </q-btn>
          </div>
        <q-btn  v-if="!editingMode" @click="handleEdit3ClockClick()" style="position: absolute; font-size: 2em; border-radius: 30px; right: 37.5vw; width: 25vw; top: 580px; background-color: #242C64; color: #E8EAF7">Next</q-btn>
          <q-btn v-if="editingMode" @click="handleFinishEditingClick()" style="position: absolute; font-size: 2em; border-radius: 30px; right: 37.5vw; width: 25vw; top: 80vh; background-color: #242C64; color: #E8EAF7">Done</q-btn>
        </q-intersection>
      </q-layout>
      <q-layout v-else-if="notEditingStep3 && !alarmActive" style="background-color: rgb(222, 224, 255,1)">
        <q-intersection
          transition="slide-left" ssr-prerender>
        <div>
          <q-btn v-if="!editingMode" icon="arrow_back_ios" flat @click="handleEditClockClickBack()"></q-btn>
          <div style="font-size: 1.5em; padding: 15px 5vw 15px 5vw">What time would you like to take your pill?</div>
          <q-btn  style="width: fit-content; height: fit-content" flat :ripple="false">

          <q-input text-color="#E8EAF7"  :rules="['time']" style="height: fit-content; position: relative; width: 0" no-error-icon item-aligned readonly>
            <template v-slot:append>
              <div class="time-display" style="width: 68vw; margin-left: 5vw; height: 5vh; color: black; font-size: 1.1em; background-color: white; border-radius: 20px; padding-left: 5vw; padding-top: 1.2vh"> Time: {{curClock[0].time}}
              </div>
              <q-popup-proxy text-color="#E8EAF7" cover transition-show="scale" transition-hide="scale" >
                <q-time v-model="curClock[0].time" now-btn text-color="#E8EAF7" format12h mask="hh:mm A">

                </q-time>

              </q-popup-proxy>

            </template>

          </q-input>
          </q-btn>
        </div>
          <q-btn v-if="!editingMode" @click="handleEdit3ClockClick()" style="position: absolute; font-size: 2em; border-radius: 30px; margin-left: 37.5vw; width: 25vw; top: 80vh; background-color: #242C64; color: #E8EAF7">Next</q-btn>
          <q-btn v-if="editingMode" @click="handleFinishEditingClick()" style="position: absolute; font-size: 2em; border-radius: 30px; margin-left: 37.5vw; width: 25vw; top: 80vh; background-color: #242C64; color: #E8EAF7">Done</q-btn>
        </q-intersection>
      </q-layout>
      <q-layout v-else-if="!doneEditing && !alarmActive" >
        <q-intersection
          transition="slide-left" ssr-prerender >
          <div style="width: 100vw; background-color: rgb(222, 224, 255,1)"><q-btn icon="arrow_back_ios" flat @click="handleEditClockClickBack()"></q-btn>
          </div>
          <div style="background-color: rgb(222, 224, 255,1); width: 100vw; height: 2.3em; font-size: 2em; padding: 15px 15px 20px;font-family: Serif, Georgia,serif">Let's set up your barcode!</div>
          <div>
            <div style="position: absolute; left: 10vw; top:23vh; width: 80vw; height: 30vh; box-shadow: 0 0 0 9.2vh rgb(222, 224, 247,1); border-radius: 10px;"></div>
            <div style="position: absolute; width: 100vw; top: 53vh; height: 50vh; background-color: rgb(222, 224, 247,1)"></div>
            <div style="position: absolute; width: 100vw; left: -100vw; top: -10vh; height: 110vh; background-color: rgb(232, 224, 247,1)"></div>
          </div>
          <q-btn @click="handleToFinishEditingClick()" style="position: absolute; font-size: 2em; border-radius: 30px; margin-left: 37.5vw; width: 25vw; top: 80vh; background-color: #242C64; color: #E8EAF7">Next</q-btn>
        </q-intersection>
      </q-layout>
      <q-layout v-else-if="alarmActive">
        <q-intersection
          transition="slide-left" ssr-prerender >
          <div style="background-color: rgb(222, 224, 255,1); width: 100vw; font-size: 1.8em; height: fit-content; padding: 15px; font-family: Serif, Georgia,serif">It's time to take your medicine!</div>
          <div style="position: absolute; background-color: rgb(222, 224, 255,1); width: 100vw; top: 7vh; font-size: 1.8em; height: fit-content; padding: 0 15px 0 15px; font-family: Serif, Georgia,serif">Scan your barcode to confirm</div>
          <div>
            <div style="position: absolute; left: 10vw; top:21vh; width: 80vw; height: 30vh; box-shadow: 0 0 0 9.1vh rgb(222, 224, 247,1); border-radius: 10px;"></div>
            <div style="position: absolute; width: 100vw; top: 51vh; height: 50vh; background-color: rgb(222, 224, 247,1)"></div>
            <div style="position: absolute; width: 100vw; left: -100vw; top: -10vh; height: 110vh; background-color: rgb(222, 224, 247,1)"></div>
          </div>
          <q-btn @click="handleSnoozeClick()" style="position: absolute; width: 25vw; height: 12vh; left: 20vw; top: 53vh; background-color: #242C64; color: #E8EAF7; border-radius: 20px; padding: 7px; text-align: center">Snooze for 5 minutes</q-btn>
          <q-btn @click="handleNotTakingClick()" style="position: absolute; width: 25vw; height: 12vh; right: 20vw; top: 53vh; background-color: #242C64; color: #E8EAF7; border-radius: 20px; padding: 7px; text-align: center">I'm not taking my pill today</q-btn>
        </q-intersection>
      </q-layout>
      <q-layout v-else-if="doneEditing && !alarmActive" style="background-color: rgb(222, 224, 255,1)">
        <q-intersection
          transition="slide-left">
          <div style="width: 100vw; background-color: rgb(222, 224, 255,1)"><q-btn icon="arrow_back_ios" flat @click="handleEditClockClickBack()"></q-btn>
          </div>
        <div style="background-color: rgb(222, 224, 255,1); width: 100vw; height: 2em; font-size: 2em; padding: 15px; font-family: Serif, Georgia,serif">Congratulations!</div>
        <div style="background-color: rgb(222, 224, 255,1); width: 100vw; height: 2em; font-size: 2em; padding: 15px; font-family: Serif, Georgia,serif">Your medication is set up!</div>
        <q-btn @click="handleFinishEditingClick()" style="position: absolute; top: 80vh; font-size: 2em; border-radius: 30px; margin-left: 25vw; width: 50vw; background-color: #242C64; color: #E8EAF7">Test it now</q-btn>
        </q-intersection>
      </q-layout>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {defineComponent, Ref, ref} from 'vue';
import {Clock, usePagesStore, useClockStore} from 'src/stores/index';
import {LocalNotifications, LocalNotificationSchema} from '../../src-capacitor/node_modules/@capacitor/local-notifications'
import {Camera, CameraResultType} from '../../src-capacitor/node_modules/@capacitor/camera'
import {BarcodeScanner, SupportedFormat } from '../../src-capacitor/node_modules/@capacitor-community/barcode-scanner'
import {ScheduleOptions} from '../../src-capacitor/node_modules/@capacitor/local-notifications/dist/esm/definitions'
import {Channel} from '../../src-capacitor/node_modules/@capacitor/local-notifications/dist/esm/definitions'
import {RegisterActionTypesOptions} from '../../src-capacitor/node_modules/@capacitor/local-notifications/dist/esm/definitions'
import {ActionPerformed} from '../../src-capacitor/node_modules/@capacitor/local-notifications/dist/esm/definitions'
import AlarmComponent from '../components/AlarmComponent.vue'


const storeClocks = useClockStore()
const AMPM: string[] = ['am', 'pm']
const pagesStore = usePagesStore()

function handleResetIntroClick() {
  resetIntro()
}

function resetIntro() {
  introNotSeen.value = false
  pagesStore.setIntroNotSeen()
  introStep1.value = true
  pagesStore.setIntro1()
}


let actionsInit = ref(false)
let introNotSeen = ref(pagesStore.introNotSeen)
let notEditingStep1 = ref(pagesStore.notEditingStep1)
let notEditingStep2 = ref(pagesStore.notEditingStep2)
let notEditingStep3 = ref(pagesStore.notEditingStep3)
let doneEditing = ref(pagesStore.doneEditing)
let introStep1 = ref(pagesStore.introStep1)
let introStep2 = ref(pagesStore.introStep2)
let introStep3 = ref(pagesStore.introStep3)
let introStep4 = ref(pagesStore.introStep4)
let introStep5 = ref(pagesStore.introStep5)
let introStep6 = ref(pagesStore.introStep6)
let alarmActive = ref(pagesStore.alarmActive)
let notifying = ref(pagesStore.notifying)
let counter = ref(storeClocks.counter)
const clocksList = ref(storeClocks.clockList)
let length = ref(storeClocks.getLength)
let cameraOff = true
let curClock = ref(storeClocks.curClock)
let editingMode = ref(false)
let home = true
let introDone = ref(false)
let introDone2 = ref(false)


function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

const startScan = async() => {
  await BarcodeScanner.prepare()
  const status = await BarcodeScanner.checkPermission({ force: true })
  if (status.granted) {
    await BarcodeScanner.hideBackground()
    cameraOff = false;
    let result = await BarcodeScanner.startScan()
    let code = curClock.value[0].barcode
    let curCode = ''
    if (result.hasContent) {
      while (result.content != code && code.length > 0) {
        if (curCode != result.content) {
          if (result.content != null) curCode = result.content
          await scheduleNotification(`Incorrect Barcode.${curCode}`, '', 'Please try again')
          await delay(500)
          result = await BarcodeScanner.startScan()
        }
      }
      let date = new Date()
      let day = date.getDay()
      curClock.value[0].disabledToday = -1
      curClock.value[0].disabledToday = day
      curClock.value[0].disabledToday = -1
      curClock.value[0].disabledToday = day
      curClock.value[0].disabledToday = -1
      curClock.value[0].disabledToday = day
      notTaking()
      cameraOff = true;
      alarmActive.value = false

      console.log(curClock.value[0].disabledToday)
      pagesStore.setNotAlarmActive()
      stopScan()
      await delay(1000)
      await scheduleNotification('Barcode Scanned', '', 'You took your meds!')


    } else {
      console.log('failed')
    }
  }
}

const startScanSetup = async() => {
  await BarcodeScanner.prepare()
  const status = await BarcodeScanner.checkPermission({ force: true })
  await BarcodeScanner.hideBackground()
  cameraOff = false;
  const result = await BarcodeScanner.startScan()
  if (result.hasContent) {
    console.log(result.content)
    curClock.value[0].barcode = result.content
    cameraOff = true
    await stopScan()
    await delay(1000)
    await scheduleNotification('Barcode Setup!', '', 'Your medication reminder is setup')


  } else {
    console.log('failed')
  }
}

const stopScan = () => {

  BarcodeScanner.showBackground()
  BarcodeScanner.stopScan()

  if (curClockDisable != -3) {
    console.log(curClockDisable)
    curClock.value[0].disabledToday = curClockDisable
    curClockDisable = -3
  }

};

function handleEditClockClickBack() {
  editClockClickBack()
}

async function editClockClickBack() {
  if (doneEditing.value) {
    doneEditing.value = false;
    pagesStore.setNotDoneEditing()
    await startScanSetup()
  } else if (!notEditingStep2.value) {
    notEditingStep2.value = true
    pagesStore.setNotEditingStep2()
  }
}

function daysToString(c: Clock) {
  let out = ''
  if (c.sun) out += 'Sun '
  if (c.mon) out += 'Mon '
  if (c.tue) out += 'Tue '
  if (c.wed) out += 'Wed '
  if (c.thu) out += 'Thu '
  if (c.fri) out += 'Fri '
  if (c.sat) out += 'Sat '
  if (c.sun && c.mon && c.tue && c.wed && c.thu && c.fri && c.sat) out = 'every day'
  if (!c.sun && c.mon && c.tue && c.wed && c.thu && c.fri && !c.sat) out = 'every weekday'
  return out
}

const initNotificationsEnable = async(): Promise<void> => {
  try {
    if (await LocalNotifications.checkPermissions().then((permissionState) => {
      return (permissionState.display != 'granted')
    })) {
      await LocalNotifications.requestPermissions()
    }
  } catch (e) {
    console.log(e)
  }
}

const initCameraEnable = async() => {
  try {
    if (await Camera.checkPermissions().then((permissionState) => {
      return (permissionState.camera != 'granted')
    })) {
      await Camera.requestPermissions()
    }
  } catch (e) {
    console.log(e)
  }
}

const scheduleNotification = async(title: string, extra: string, body: string): Promise<void> => {
  await initNotificationsEnable()
  let options: ScheduleOptions = {
      notifications: [
        {
          id: 1,
          title: title,
          body: body,
          sound: 'alarmclockshort6402.wav',
          schedule: {
            allowWhileIdle: true
          },
          channelId: 'pop-notifications',
          autoCancel: true,
          extra: extra,
        }
      ]
    }
  let actionsOptions: RegisterActionTypesOptions = {
    types: [
      {
        id: 'AlARM_ACTIVE',
        actions: [
          {
            id: 'activate_alarm',
            title: 'alarm_active',
          }
        ]
      }
    ]
  }
  let actionPerformed: ActionPerformed = {
    actionId: 'notification 1 action',
    notification: options.notifications[0]
  }
  let channel: Channel = {
    id: 'pop-notifications',
    name: 'Pop notifications',
    description: 'Pop notifications',
    importance: 5,
    visibility: 1
  }
  try {

    await LocalNotifications.schedule(options)
    await LocalNotifications.createChannel(channel)
    await LocalNotifications.registerActionTypes(actionsOptions)

  }
  catch (e) {
    console.log(e)
  }
}


let readDelay = 1000
let reading = false
async function readClocks() {
  if (!actionsInit.value) {
    LocalNotifications.addListener('localNotificationReceived', (payload) => {
      if (payload.extra.includes(':') && notifying.value) {
        setTimeout(() => {
          let date = new Date();
          let hour = '' + date.getHours()
          let min = '' + date.getMinutes()
          let day = date.getDay()
          if (Number(min) < 10) min = '0' + min
          hour = '0' + (Number(hour) % 12)
          let curHour = (payload.extra + '').split(':')[0]
          let curMin = payload.extra.split(':')[1].split(' ')[0]
          let curDisabledToday = payload.extra.split(' ')[3]
          console.log(curDisabledToday)
          if ((hour >= curHour || min >= curMin)  && notifying.value && curDisabledToday != `${day}` && !reading) {
            scheduleNotification(`${curClock.value[0].clockId}: Time to take meds!`, payload.extra, 'It is time to take your meds')
          } else {
            if (!globalSnooze.value && notEditingStep1.value) reading = false
            notifying.value = false
          }
        }, 5000)
      }
    })
    LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction: ActionPerformed) => {
      console.log('clicked')
      if (notificationAction.notification.title.includes('Time to take meds!')) activateAlarm()
    })
    actionsInit.value = true
  }
  if (notEditingStep1.value && !alarmActive.value) {
    for (let i = 0; i < clocksList.value.length; i++) {
      if (clocksList.value[i] == null) {
        clocksList.value.splice(i, 1)
      } else {
        let curReadClock = clocksList.value[i];
        let date = new Date();
        if (curReadClock.disabledToday != date.getDay() && !curReadClock.snoozing) {
          if (curReadClock.clockId == null) {
            curReadClock.clockId = 'N/A'
          }
          let curTime = curReadClock.time;
          let curHour = (curTime.split(':')[0])
          if (curTime.includes('PM')) curHour = (Number(curHour) + 12) + ''
          let curMin = (curTime.split(':')[1].split(' ')[0])
          let days: boolean[] = [
            curReadClock.sun,
            curReadClock.mon,
            curReadClock.tue,
            curReadClock.wed,
            curReadClock.thu,
            curReadClock.fri,
            curReadClock.sat
          ]
          let hour = '' + date.getHours()
          let min = '' + date.getMinutes()
          let day = date.getDay()
          if (Number(min) < 10) min = '0' + min
          if ((hour >= curHour || min >= curMin) && days[day] && !reading && notEditingStep1.value && notEditingStep2.value && notEditingStep3.value && !alarmActive.value && curReadClock.disabledToday != day) {
            console.log(' e0' + curReadClock.disabledToday)
            reading = true
            notifying.value = true
            pagesStore.setNotifying()
            curClock.value[0] = curReadClock
            storeClocks.setCurClock(curReadClock)
            curClockIdx = i
            if (notEditingStep1.value && notEditingStep2.value && notEditingStep3.value && !alarmActive.value && home) {
              await scheduleNotification(`${curClock.value[0].clockId}: Time to take meds!`, `${curHour}:${curMin} ${day} ${days[day]} ${curReadClock.disabledToday}`, 'It is time to take your meds')
            }
          }
        }
      }
    }
  }
}
setInterval(()=> {
  if (!reading && notEditingStep1.value && notEditingStep2.value && notEditingStep3.value && !alarmActive.value && home) {
    readClocks()
  }
}, 1000);

let curClockIdx = -1


function activateAlarm() {
  notifying.value = false;
  pagesStore.setNotNotifying()
  alarmActive.value = true
  pagesStore.setAlarmActive()
  delay(100)
  startScan()
}

function  removeClock() {
  for (let i = 0; i < clocksList.value.length; i++) {
    if (clocksList.value[i].valueKey == curClock.value[0].valueKey) clocksList.value.splice(i,1)
  }
  storeClocks.clockList = clocksList.value
  handleFinishEditingClick()
}

let curAddClock: Clock

function addClock(){
  reading = true
  let cClock: Clock = {clockId: '', valueKey: counter.value, time: '00:00', sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, barcode: '', snoozing: false, disabledToday: -1}
  curAddClock = cClock
  storeClocks.clockList = clocksList.value
  counter.value++
  storeClocks.increaseCounter()
  length.value++
  edit1Clock(cClock)
}

function handleToFinishEditingClick() {
  toFinishEditing()
}

function toFinishEditing() {
  stopScan()
  doneEditing.value = true
  pagesStore.setDoneEditing()
  if (!globalSnooze.value) reading = false
  clocksList.value.push(curAddClock)
}

function handleFinishEditingClick() {
  finishEditing()
}

function finishEditing() {
  editingMode.value = false
  if (curClock.value[0].clockId.length < 1) curClock.value[0].clockId = 'New Medication'
  for (let i = 0; i < clocksList.value.length; i++) {
    if (clocksList.value[i].valueKey == curClock.value[0].valueKey) clocksList.value[i] = curClock.value[0]
  }
  notEditingStep1.value = true
  notEditingStep2.value = true
  notEditingStep3.value = true
  pagesStore.setNotEditingStep1()
  pagesStore.setNotEditingStep2()
  pagesStore.setNotEditingStep3()
  storeClocks.clearCurClock()
  doneEditing.value = false
  pagesStore.setNotDoneEditing()
  home = true
}

function handleRemoveClockClick() {
  removeClock();
}

function edit1Clock(clock: Clock) {
  home = false
  storeClocks.setCurClock(clock)
  storeClocks.curClockIdx = clock.valueKey
  curClock.value[0] = clock
  storeClocks.setCurClock(clock)
  notEditingStep1.value = false
  if (curClock.value[0].time.length < 1) curClock.value[0].time = '00:00'
  pagesStore.setEditingStep1()
}

function handleEdit1ClockClick2(clock: Clock) {
  edit1Clock2(clock)
}

function edit2Clock() {

  notEditingStep2.value = false
  pagesStore.setEditingStep2()
}

function edit2Clock2(clock: Clock) {
  storeClocks.setCurClock(clock)
  storeClocks.curClockIdx = clock.valueKey
  curClock.value[0] = clock
  notEditingStep1.value = false
  editingMode.value = true
  notEditingStep2.value = false
  pagesStore.setEditingStep2()
}

function edit1Clock2(clock: Clock) {
  reading = true;
  storeClocks.setCurClock(clock)
  storeClocks.curClockIdx = clock.valueKey
  curClock.value[0] = clock
  notEditingStep1.value = false
  editingMode.value = true
  pagesStore.setEditingStep1()
}

async function handleEdit3ClockClick() {
  edit3Clock()
  await startScanSetup()
}

function edit3Clock() {
  notEditingStep2.value = false
  pagesStore.setEditingStep2()
  notEditingStep3.value = false
  pagesStore.setEditingStep3()
}

function handleAddClockClick(){
  addClock()
}


function handleIntroBtnClick() {
  introBtnClick()
}

async function introBtnClick() {
  console.log(introStep4.value)
  const introCanvas = ref(document.getElementById('introProgressDisplay') as HTMLCanvasElement)
  const introCtx = ref(introCanvas.value?.getContext('2d') as CanvasRenderingContext2D)
  introCtx.value.lineWidth = 30
  introCtx.value.strokeStyle = '#242C64'
  if (introStep1.value) {
    introStep1.value = false
    introStep2.value = true
    let n = 0
    while (n < 360 / 3) {
      introCtx.value.beginPath()
      introCtx.value.arc(introCanvas.value.width / 2, introCanvas.value.height / 2, introCanvas.value.width / 2 - 30, -Math.PI / 2, n * Math.PI / 180 -Math.PI / 2)
      introCtx.value.stroke()
      introCtx.value.closePath()
      await delay(3).then(() => {n += 1})
    }
    pagesStore.setNotIntro1()
    pagesStore.setIntro2()
  } else if (introStep2.value) {
    introStep2.value = false
    introStep3.value = true
    let n = 360 / 3
    while (n < 2 * 360 / 3) {
      introCtx.value.beginPath()
      introCtx.value.arc(introCanvas.value.width / 2, introCanvas.value.height / 2, introCanvas.value.width / 2 - 30, -Math.PI / 2, n * Math.PI / 180 -Math.PI / 2)
      introCtx.value.stroke()
      introCtx.value.closePath()
      await delay(3).then(() => {n += 1})
    }
    pagesStore.setNotIntro2()
    pagesStore.setIntro3()
  } else if (introStep3.value) {
    introStep3.value = false
    introStep4.value = true
    let n = 2 * 360 / 3
    while (n < 3 * 360 / 3 + 1) {
      introCtx.value.beginPath()
      introCtx.value.arc(introCanvas.value.width / 2, introCanvas.value.height / 2, introCanvas.value.width / 2 - 30, -Math.PI / 2, n * Math.PI / 180 -Math.PI / 2)
      introCtx.value.stroke()
      introCtx.value.closePath()
      await delay(3).then(() => {n += 1})
    }
    let o = 100
    introDone.value = true
    while (o > 0) {
      introCtx.value.strokeStyle = RGBAToHexA(`rgb(36, 44, 100, ${o/100}`)
      introCtx.value.beginPath()
      introCtx.value.clearRect(0,0,1000,1000)
      introCtx.value.arc(introCanvas.value.width / 2, introCanvas.value.height / 2, introCanvas.value.width / 2 - 30, -Math.PI / 2, n * Math.PI / 180 -Math.PI / 2)
      introCtx.value.stroke()
      introCtx.value.closePath()
      await delay(1).then(() => {o -= 1})
    }
    introDone2.value = true
    pagesStore.setNotIntro3()
    pagesStore.setIntro4()
  } else if (introStep4.value) {
    introStep4.value = false
    pagesStore.setNotIntro4()
    initNotificationsEnable().then(() => {
      initCameraEnable()
    })
    introNotSeen.value = false
    pagesStore.introSeen()
  }
}

function RGBAToHexA(rgba: string, forceRemoveAlpha = false) {
  return '#' + rgba.replace(/^rgba?\(|\s+|\)$/g, '')
    .split(',')
    .filter((string, index) => !forceRemoveAlpha || index !== 3)
    .map(string => parseFloat(string))
    .map((number, index) => index === 3 ? Math.round(number * 255) : number)
    .map(number => number.toString(16))
    .map(string => string.length === 1 ? '0' + string : string)
    .join('')
}

function handleSnoozeClick() {
  snooze()
}

let globalSnooze = ref(pagesStore.globalSnooze)

function snooze() {
  globalSnooze.value = true
  pagesStore.setSnooze()
  let date = new Date()
  let day = date.getDay()
  curClock.value[0].disabledToday = day
  cameraOff = true;
  alarmActive.value = false
  pagesStore.setNotAlarmActive()
  stopScan()
  setTimeout(() => {
    globalSnooze.value = false
    pagesStore.setNotSnooze()
  },300000)
}

function handleNotTakingClick() {
  notTaking()
}

let curClockDisable = -3

function notTaking() {
  let date = new Date()
  let day = date.getDay()
  curClock.value[0].disabledToday = -1
  curClock.value[0].disabledToday = day
  clocksList.value[curClockIdx].disabledToday = day
  storeClocks.setClockDisabled(day)
  cameraOff = true;
  alarmActive.value = false
  curClockDisable = day
  pagesStore.setNotAlarmActive()
  stopScan()
}
</script>
