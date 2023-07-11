const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const cors = require('cors');
const Web3 = require("web3")

// Connect to MongoDB
mongoose.connect('mongodb://localhost/nefturian_war', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create the Nefturian schema
const nefturianSchema = new mongoose.Schema({
  id: Number,
  name: String,
  pfp: String,
});

const Nefturian = mongoose.model('Nefturian', nefturianSchema);

// Create the Creature schema
const creatureSchema = new mongoose.Schema({
  address: String,
  nefturianId: Number,
});

const Creature = mongoose.model('Creature', creatureSchema);

// Initialize the Express app
const app = express();
app.use(express.json());
app.use(cors()); // Add this line to enable CORS

// Endpoint to get creature's Nefturian
app.get('/nefturian/:address', async (req, res) => {
  const { address } = req.params;

  if (address.trim().length === 0) {
    res.status(500)
        .json({ error: 'Please fill the input text !' });
    return;
  }

  let result = Web3.utils.isAddress(address)
  if (!result) {
    res.status(500)
        .json({ error: 'This address is not a valid Ethereum Address !' });
    return;
  }

  console.log("Get or Create Nefturian: " + address);
  let nefturianId = getNetfturianId(address);

  try {
    // Check if the Nefturian has already been created
    let nefturian = await Nefturian.findOne({ id: nefturianId });
    if (nefturian === null) {
      console.log("Netfurian does not exists, so create it !");
      
      // Create / Generate the Nefturian
      const name = "Random Name of " + nefturianId.toString();
      const pfp = "Pfp of " + nefturianId.toString();
      nefturian = new Nefturian({ id: nefturianId, name: name, pfp: pfp });
      await nefturian.save();
    }

    // Check if the User exists (Creature)
    let creature = await Creature.findOne({ address: address });

    if (creature === null) {
      console.log("Creature does not exists, so create it !");

      // Create the Creature
      creature = new Creature({ address, nefturianId });
      await creature.save();
    }

    res.json(nefturian);
  } catch (error) {
    console.log(error);
    res.status(500)
        .json({ error: 'An error occurred while assigning the Nefturian.' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

function getNetfturianId(address) {
  // Generate hash value
  const hash = crypto.createHash('sha256').update(address).digest('hex');

  // Convert hash value to number within the range of 1 to 1241
  return parseInt(hash, 16) % 1241 + 1;
}
