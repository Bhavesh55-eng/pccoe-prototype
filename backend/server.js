const express = require("express");
const multer = require("multer");
const path = require("path");
const { spawn } = require("child_process");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Routes
app.get("/", (req, res) => {
  res.send("BioMonitor Backend Server is running 🚀");
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from BioMonitor backend 🌿" });
});

// Species data endpoint
app.get("/api/species", (req, res) => {
  const speciesData = [
    {
      id: 1,
      name: "Bengal Tiger",
      scientificName: "Panthera tigris tigris",
      population: 2574,
      status: "ENDANGERED",
      conservationScore: 75,
      change: "+8.5%",
      location: "India, Bangladesh, Nepal, Bhutan"
    },
    {
      id: 2,
      name: "Mountain Gorilla",
      scientificName: "Gorilla beringei beringei",
      population: 1063,
      status: "CRITICALLY ENDANGERED",
      conservationScore: 68,
      change: "+12.3%",
      location: "Rwanda, Uganda, Democratic Republic of Congo"
    }
  ];
  res.json(speciesData);
});

// Image prediction endpoint
app.post("/api/predict", upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const imagePath = req.file.path;
  
  // Call Python prediction script
  const pythonProcess = spawn('python', ['predict.py', imagePath]);
  
  let result = '';
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });
  
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      try {
        const prediction = JSON.parse(result);
        res.json(prediction);
      } catch (error) {
        res.status(500).json({ error: "Failed to parse prediction result" });
      }
    } else {
      res.status(500).json({ error: "Prediction failed" });
    }
  });
});

// Threat alerts endpoint
app.get("/api/threats", (req, res) => {
  const threats = [
    {
      id: 1,
      type: "Deforestation",
      location: "Amazon Basin, Brazil",
      description: "Rapid forest clearing detected",
      area: "2,450 hectares",
      timeAgo: "2 hours ago",
      severity: "HIGH",
      trend: "increasing"
    },
    {
      id: 2,
      type: "Water Pollution",
      location: "Mekong Delta, Vietnam",
      description: "Chemical runoff from agriculture",
      area: "45 km stretch",
      timeAgo: "6 hours ago",
      severity: "MEDIUM",
      trend: "stable"
    }
  ];
  res.json(threats);
});

// Environmental metrics endpoint
app.get("/api/metrics", (req, res) => {
  const metrics = {
    biodiversityIndex: { value: 85, change: "+2.3%" },
    forestCover: { value: 75, change: "-1.8%" },
    waterQuality: { value: 90, change: "+4.1%" },
    airQuality: { value: 85, change: "+1.2%" }
  };
  res.json(metrics);
});

// Start server
app.listen(PORT, () => {
  console.log(`🌿 BioMonitor Server running at http://localhost:${PORT}`);
});
