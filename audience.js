import { supabase } from "./supabase.js";

// Global Form State Management
const submissionData = {
  mood: "",
  name: "",
  phone: "",
  email: "",
  follow_up: "",
  prayer_text: ""
};

const slides = {
  1: document.getElementById("slide-1"),
  2: document.getElementById("slide-2"),
  3: document.getElementById("slide-3"),
  success: document.getElementById("slide-success")
};

function navigateToSlide(slideId) {
  Object.values(slides).forEach(s => s.classList.remove("active"));
  slides[slideId].classList.add("active");
  
  // Smoothly scrolls the window container right back to the top for a fresh view
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// STEP 1: MOOD TRANSITION
document.querySelectorAll(".mood-btn").forEach(btn => {
  btn.onclick = () => {
    submissionData.mood = btn.getAttribute("data-mood");
    navigateToSlide(2);
  };
});

// STEP 2: PROFILE VERIFICATION
const btnContactNext = document.getElementById("btn-contact-next");
btnContactNext.onclick = () => {
  const nameVal = document.getElementById("user-name").value.trim();
  const phoneVal = document.getElementById("user-phone").value.trim();
  const emailVal = document.getElementById("user-email").value.trim();
  const followUpVal = document.getElementById("follow-up-preference").value;

  if (!nameVal || !phoneVal || !emailVal) {
    alert("Please fill out your name, contact number, and email address so we can coordinate support for 

your request.");
    return;
  }

  submissionData.name = nameVal;
  submissionData.phone = phoneVal;
  submissionData.email = emailVal;
  submissionData.follow_up = followUpVal;

  navigateToSlide(3);
};

// STEP 3: DATA TRANSMISSION
const btnSubmit = document.getElementById("btn-submit-prayer");
const prayerTextArea = document.getElementById("prayer-text");
const followUpNoticeEl = document.getElementById("follow-up-notice");

btnSubmit.onclick = async () => {
  const prayerVal = prayerTextArea.value.trim();

  if (!prayerVal) {
    alert("Please take a moment to write a description or statement about your prayer request.");
    return;
  }

  submissionData.prayer_text = prayerVal;
  btnSubmit.disabled = true;
  btnSubmit.innerText = "Lifting your request up...";

  try {
    const { error } = await supabase
      .from("prayer_requests")
      .insert([submissionData]);

    if (error) throw error;

    if (submissionData.follow_up === "Just Prayer") {
      followUpNoticeEl.innerText = "🕊️ Your request is marked for quiet, deep prayer support.";
    } else if (submissionData.follow_up === "Phone Call") {
      followUpNoticeEl.innerText = "📞 Expect an encouraging call from us very soon!";
    } else {
      followUpNoticeEl.innerText = "✉️ Keep an eye on your inbox for an uplifting message.";
    }

    navigateToSlide("success");
  } catch (err) {
    console.error("Database connection runtime exception:", err);
    alert("Unable to reach the server. Please check your network connection and try again.");
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = `<span>Submit Here</span><img class="btn-emoji-animated" 

src="https://fonts.gstatic.com/s/e/notoemoji/latest/2728/512.webp" alt="Sparkles">`;
  }
};
