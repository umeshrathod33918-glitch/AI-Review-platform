const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

/* =========================
   TEMPORARY STORAGE
========================= */

let reviews = [];

/* =========================
   IMAGE UPLOAD
========================= */

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },

});

const upload = multer({ storage: storage });

/* =========================
   HOME ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("AI Review Platform Running");
});

/* =========================
   SUBMIT REVIEW
========================= */

app.post("/submit-review", upload.single("image"), (req, res) => {

  try {

    const { name, review, rating } = req.body;

    let sentiment = "Neutral";

    if (
      review.includes("good") ||
      review.includes("great") ||
      review.includes("excellent")
    ) {
      sentiment = "Positive";
    }

    if (
      review.includes("bad") ||
      review.includes("worst")
    ) {
      sentiment = "Negative";
    }

    const summary =
      review.split(" ").slice(0, 10).join(" ") + "...";

    const newReview = {

      id: Date.now(),

      name,
      review,
      rating,

      image: req.file
        ? req.file.filename
        : "",

      sentiment,
      summary,

    };

    reviews.push(newReview);

    res.json({

      success: true,
      message: "Review Submitted Successfully",

      data: newReview,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

});

/* =========================
   GET REVIEWS
========================= */

app.get("/reviews", (req, res) => {

  res.json(reviews);

});

/* =========================
   DELETE REVIEW
========================= */

app.delete("/delete-review/:id", (req, res) => {

  reviews = reviews.filter(
    (review) => review.id != req.params.id
  );

  res.json({

    success: true,
    message: "Review Deleted",

  });

});

/* =========================
   SERVER
========================= */

const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
searchInput.addEventListener("input", () => {

  const cards = document.querySelectorAll(".review-card");

  cards.forEach((card) => {

    const text = card.innerText.toLowerCase();

    const searchText = searchInput.value.toLowerCase();

    if (text.includes(searchText)) {

      card.style.display = "block";

    } else {

      card.style.display = "none";

    }

  });

});