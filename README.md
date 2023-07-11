# Nefture Technical Test

<div style="text-align:center; width: 100%">
  <img src="https://uploads-ssl.webflow.com/63c0b53d2b5c780e0e0ed256/63d7f3b2b34c743112860cf0_logo-light-p-500.png"  width="40%">
</div>

## Coding Exercise - Find your Nefturian Hero !

To accomplish this mission, we can design a system that uses a cryptographic hash function to deterministically link Ethereum addresses to Nefturians. 

Here's an outline of how we'll achieve that :

1. Nefturian Assignment :
    - We can leverage the Ethereum address as the input for the hash function.

    - For each Ethereum address, we compute a hash value using a cryptographic hash function (e.g., SHA-256) with the Ethereum address as the input.
      So, we convert the hash value to a number within the range of 1 to 1241 (e.g., by taking the modulo 1241).
      Assigning the Nefturian corresponding to the computed number to the Ethereum address.


2. Database Management:
   - We can use a database system like MongoDB to achieve this.
   - Set up a database to store the Ethereum addresses and their corresponding Nefturians.
   - Create a schema/table to store the Ethereum address and associated Nefturian ID.
   - When a new Ethereum address joins the platform, compute the hash, assign the Nefturian and store the address and Nefturian ID in the database.


3. Platform Development:
   - Set up a Next.js project for the frontend & Node.js for the backend
   - Design and develop the frontend pages where creatures (Users) can input their Ethereum addresses.
   - Implement an API endpoint on the Node.js backend to receive Ethereum addresses and retrieve the associated Nefturians from the database.
   - On the frontend, send an HTTP request to the backend API with the creature's Ethereum address.


4. Other features will be required later:
   - Nefturian image generation in the backend with random metadata
   - Designing a logical system for migrating metadata and images to the IPFS network
   - Encrypted communication using SSL (HTTPS)
   - Embed fontend and backend inside docker container images
   - Use configuration file with profile (dev, uat, prod) instead of hard-coding Global Variables
   - Create more API endpoints to expose more data and statistics
   - Improve the Database management by adding a DB layer (Retry policy, Transaction management ...)
   - Improve the Try Catch error handling
   - Integration of the Metamask SDK, allowing users signing messages to reveal their Nefturian


### Preparation and production

**Step 1** Install MongoDB

	sudo apt-get install gnupg curl

	curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
         sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \
         --dearmor

	echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] \
         https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | \
         sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

    sudo apt-get update

    sudo apt-get install -y mongodb-org

**Step 2** Setup & Create the Database

    # Enter the MongoDB shell
    mongo 

    # This will create the DB if not exists
    > use nefturian_war 

**Step 3** Config the backend sub-project

    # Create the backend folder
    mkdir backend && cd backend

    # Initialize the Node.js project (backend)
    npm init -y
    
    # Install dependencies
    npm install express crypto mongoose cors web3

    # Create/Open the server.js file and fill it
    nano server.js

**Step 4** Config the fontend sub-project

    # Initialize the Next.js project (frontend) 
    npx create-next-app frontend

    cd frontend

    # Create/Open the index.txs file and fill it
    nano pages/index.tsx

**Step 5** Run the application

    node backend/server.js

    npm --prefix frontend/ run dev

Now, when we access the frontend at http://localhost:3000, we can enter an Ethereum address and click the "Get or Create Nefturian" button to assign or get the Nefturian associated to the address !