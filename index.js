import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue , remove } from "firebase/database"; // 1. Add forceWebSockets
const firebaseConfig = {
    // PASTE YOUR FIREBASE CONFIG HERE
    apiKey: "AIzaSyBPZFJ3HKkeQxopeB8jxa2RF7Pc2_mXw0U",
    databaseURL: "https://savelinks-29ee6-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB , function(snapshot){
    if(snapshot.exists()){
        const Snapshotvalues = snapshot.val()
        const leads = Object.values(Snapshotvalues)
        render(leads)
    }
})
deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""

})

inputBtn.addEventListener("click", function() {
   if(inputEl.value !="")
   push(referenceInDB, inputEl.value)
    inputEl.value = ""
})