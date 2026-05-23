const generateAvatar =
document.getElementById("generateAvatar");

const avatarVideo =
document.getElementById("avatarVideo");
const downloadPDF =
document.getElementById("downloadPDF");
let reviews = [];
downloadPDF.addEventListener("click", async () => {

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "AI Review Platform Report",
    20,
    20
  );

  let y = 40;

  reviews.forEach((review, index) => {

    doc.setFontSize(14);

    doc.text(
      `${index + 1}. ${review.name}`,
      20,
      y
    );

    y += 10;

    doc.setFontSize(12);

    doc.text(
      `Review: ${review.review}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Rating: ${review.rating}`,
      20,
      y
    );

    y += 15;

  });

  doc.save("AI_Review_Report.pdf");

});
const chatbotButton =
document.getElementById("chatbotButton");

const chatbotContainer =
document.getElementById("chatbotContainer");

const chatMessages =
document.getElementById("chatMessages");

const chatInput =
document.getElementById("chatInput");

const sendChat =
document.getElementById("sendChat");
const chartCanvas =
document.getElementById("reviewChart");

let reviewChart;

const themeToggle =
document.getElementById("themeToggle");
const form = document.getElementById("reviewForm");
const searchInput = document.getElementById("searchInput");
const reviewsContainer = document.getElementById("reviewsContainer");
const toast = document.getElementById("toast");

const totalReviews =
document.getElementById("totalReviews");

const positiveReviews =
document.getElementById("positiveReviews");

const negativeReviews =
document.getElementById("negativeReviews");

const averageRating =
document.getElementById("averageRating");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch(
    "http://localhost:5000/submit-review",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  showToast(data.message);

  form.reset();

  fetchReviews();

});

async function fetchReviews() {

  const response = await fetch(
    "http://localhost:5000/reviews"
  );

  const reviews = await response.json();

  reviewsContainer.innerHTML = "";

  let positiveCount = 0;
let negativeCount = 0;
let totalRating = 0;

  reviews.forEach((review) => {

    if (review.sentiment === "Positive") {

  positiveCount++;

}

if (review.sentiment === "Negative") {

  negativeCount++;

}

totalReviews.innerText = reviews.length;

positiveReviews.innerText = positiveCount;

negativeReviews.innerText = negativeCount;

averageRating.innerText =
reviews.length
? (totalRating / reviews.length).toFixed(1)
: 0;
if (reviewChart) {

  reviewChart.destroy();

}

reviewChart = new Chart(chartCanvas, {

  type: "bar",

  data: {

    labels: [
      "Positive",
      "Negative"
    ],

    datasets: [{

      label: "Review Sentiment",

      data: [
        positiveCount,
        negativeCount
      ],

      borderWidth: 1,

    }]

  },

});

totalRating += Number(review.rating);

    reviewsContainer.innerHTML += `

      <div class="review-card">

        <h2>${review.name}</h2>

        <p>${review.review}</p>

        <p>⭐ Rating: ${review.rating}</p>

        <p class="sentiment">
          Sentiment: ${review.sentiment}
        </p>

        <p>
          Summary: ${review.summary}
        </p>

        <img src="http://localhost:5000/uploads/${review.image}" />

        <br><br>

        <button onclick="deleteReview('${review._id}')">
          Delete
        </button>

      </div>

    `;

  });

}

async function deleteReview(id) {

  await fetch(
    `http://localhost:5000/delete-review/${id}`,
    {
      method: "DELETE",
    }
  );

  fetchReviews();

}

fetchReviews();
themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

});
function showToast(message) {

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}
chatbotButton.addEventListener("click", () => {

  if (
    chatbotContainer.style.display === "flex"
  ) {

    chatbotContainer.style.display = "none";

  } else {

    chatbotContainer.style.display = "flex";

  }

});
sendChat.addEventListener("click", () => {

  const userMessage =
  chatInput.value.toLowerCase();

  let botReply =
  "I didn't understand that.";

  if (
    userMessage.includes("positive")
  ) {

    botReply =
    positiveReviews.innerText +
    " positive reviews found.";

  }

  if (
    userMessage.includes("negative")
  ) {

    botReply =
    negativeReviews.innerText +
    " negative reviews found.";

  }

  if (
    userMessage.includes("average")
  ) {

    botReply =
    "Average rating is " +
    averageRating.innerText;

  }

  chatMessages.innerHTML += `

    <div class="chat-message">
      <strong>You:</strong>
      ${chatInput.value}
    </div>

    <div class="chat-message">
      <strong>AI:</strong>
      ${botReply}
    </div>

  `;

  chatInput.value = "";

  chatMessages.scrollTop =
  chatMessages.scrollHeight;

});
generateAvatar.addEventListener("click", () => {

  showToast(
    "AI Avatar Video Generated!"
  );

  avatarVideo.src =
  "https://www.w3schools.com/html/mov_bbb.mp4";

});
const chatbotButton = document.getElementById("chatbotButton");
const chatbotContainer = document.getElementById("chatbotContainer");

chatbotButton.addEventListener("click", () => {
  if (chatbotContainer.style.display === "block") {
    chatbotContainer.style.display = "none";
  } else {
    chatbotContainer.style.display = "block";
  }
});

const stars = document.querySelectorAll(".star-rating input");

stars.forEach((star) => {
  star.addEventListener("change", () => {
    console.log("Rating:", star.value);
  });
});

document.getElementById("themeToggle")
.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

});
document.getElementById("downloadPDF").addEventListener("click", () => {

const { jsPDF } = window.jspdf;

const doc = new jsPDF();

doc.text("AI Review Platform Report", 20, 20);

doc.save("review-report.pdf");

});
document.getElementById("downloadPDF").addEventListener("click", () => {

const { jsPDF } = window.jspdf;

const doc = new jsPDF();

doc.text("AI Review Platform Report", 20, 20);

doc.save("review-report.pdf");

});