const API="https://worker-chat.jihadwajib68.workers.dev"

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "...",
  projectId: "...",
  messagingSenderId: "...",
  appId: "..."
}

// 🔥 INIT SEKALI
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const messaging = firebase.messaging()

export async function initFCM(user){

  try {

    const permission = await Notification.requestPermission()

    if(permission !== "granted"){
      console.log("notif ditolak")
      return
    }

    const reg = await navigator.serviceWorker.ready

    const token = await messaging.getToken({
      vapidKey: "BMicSwmyrhTRTPuFZO-S2pm3ymIZ43RT-KcnQnWw2Z0_TIwDPRLa1EZLPNiSiwkoKiDQxNt7cNJQD3f3iCCgwb0",
      serviceWorkerRegistration: reg
    })

    if(!token){
      console.log("TOKEN NULL")
      return
    }

    console.log("TOKEN:", token)

    await fetch(API + "/save-token", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        token,
        email: user.email
      })
    })

  } catch(e){
    console.error("FCM ERROR:", e)
  }
}
