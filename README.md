# Transparent Charity DAO Backend

A Node.js backend for a transparent charity DAO (Decentralized Autonomous Organization) built with Express.js, MongoDB, and Web3 integration.

## 🚀 Features

- **Blockchain Integration**: Real-time event listening from smart contracts
- **AI Analysis**: Gemini AI integration for fundraising proposal analysis
- **Real-time Updates**: Socket.io for live blockchain event streaming
- **API Documentation**: Swagger/OpenAPI documentation

## 🛠 Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose
- **Blockchain**: Ethers.js v6
- **AI**: Google Gemini API
- **Real-time**: Socket.io
- **Documentation**: Swagger UI
- **Logging**: Winston

## 📋 Prerequisites

- Node.js 20 or higher
- MongoDB instance
- Google Gemini API key
- Alchemy API key (for blockchain RPC)
- USDT contract address

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Transparent-Charity-DAO-BE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=*

   # Database
   MONGO_URI=mongodb://localhost:27017
   MONGO_DB=web3_DAO_project

   # Blockchain Configuration
   ALCHEMY_API_KEY=your_alchemy_api_key
   RPC_HTTP=https://eth-sepolia.g.alchemy.com/v2/your_key
   RPC_WS=wss://eth-sepolia.g.alchemy.com/v2/your_key
   CONTRACT_ADDRESSES=your_usdt_contract_address
   TEST_PRIVATE_KEY=your_test_private_key

   # AI Configuration
   GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the application**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 🐳 Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t transparent-charity-dao-be .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 --env-file .env transparent-charity-dao-be
   ```

## 📚 API Documentation

Once the server is running, access the Swagger documentation at:
- **Local**: `http://localhost:3000/api/docs`
- **Production**: `https://your-domain.com/api/docs`

## 🏗 Project Structure

```
src/
├── app.js                 # Express app configuration
├── server.js              # Server entry point
├── config/
│   ├── db.js             # MongoDB connection
│   └── swagger.js        # Swagger configuration
├── controllers/
│   ├── analyzingController.js
│   ├── donateController.js
│   ├── transactionController.js
│   └── userController.js
├── middlewares/
│   ├── errorHandler.js
│   ├── validateEmail.js
│   └── validateFundraisingInput.js
├── models/
│   ├── AIResult.js
│   ├── Donate.js
│   ├── Transaction.js
│   └── User.js
├── routes/
│   ├── donateRoutes.js
│   ├── proposalRoutes.js
│   ├── transactionRoutes.js
│   └── userRoutes.js
├── services/
│   ├── blockchain/
│   │   ├── blockchainService.js
│   │   ├── errorHandler.js
│   │   └── eventSubscriber.js
│   ├── donateService.js
│   ├── geminiService.js
│   ├── transactionService.js
│   └── userService.js
├── prompts/
│   └── fundraisingPrompt.js
├── utils/
│   ├── logger.js
│   └── validators.js
└── socket.js              # Socket.io configuration
```

## 🔗 API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Donations
- `GET /api/donates` - Get all donations
- `POST /api/donates` - Create donation
- `GET /api/donates/:id` - Get donation by ID

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction by ID

### Proposals
- `GET /api/proposals` - Get all proposals
- `POST /api/proposals` - Create proposal
- `GET /api/proposals/:id` - Get proposal by ID
- `GET /api/proposals/result/:project_id` - Get AI analysis result

## 🔄 Blockchain Integration

The backend listens to smart contract events in real-time:

### Events Monitored
- `DonationReceived` - General fund donations
- `ProjectDonation` - Project-specific donations
- `RequestCreated` - New funding requests
- `VoteCast` - DAO voting
- `PayoutSuccess` - Successful payouts
- `ProjectCreated` - New projects
- `ProjectApproved/Rejected` - Project decisions
- `DaoMemberAdded` - New DAO members

### Socket Events
- `donationReceived` - Real-time donation updates
- `projectUpdate` - Project status changes
- `requestUpdate` - Request status changes
- `daoUpdate` - DAO member changes

## 🤖 AI Integration

The system uses Google Gemini AI to analyze fundraising proposals:

- **Fraud Detection**: Analyzes proposals for potential fraud
- **Recommendation System**: Provides approve/reject recommendations
- **Risk Scoring**: Generates fraud scores (0-100)
- **Key Reasons**: Extracts important decision factors

## 🧪 Testing

Run the test files in the `tests/` directory:

```bash
# Test blockchain service
node tests/testBlockchainServiceFull.js

# Test event listening
node tests/testListenEvents.js

# Test balance checking
node tests/testBalance.js
```

## 🔒 Security Considerations

- CORS is configured for cross-origin requests
- Input validation on all endpoints
- Error handling middleware
- Environment variables for sensitive data
- Non-root user in Docker container

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 3000) |
| `NODE_ENV` | Environment | No (default: development) |
| `MONGO_URI` | MongoDB connection string | Yes |
| `MONGO_DB` | Database name | No (default: web3_DAO_project) |
| `ALCHEMY_API_KEY` | Alchemy API key | Yes |
| `RPC_HTTP` | HTTP RPC endpoint | Yes |
| `RPC_WS` | WebSocket RPC endpoint | Yes |
| `CONTRACT_ADDRESSES` | USDT contract address | Yes |
| `GEMINI_API_URL` | Gemini API endpoint | Yes |
| `GEMINI_API_KEY` | Gemini API key | Yes |
| `TEST_PRIVATE_KEY` | Test private key | Yes |

## 🚀 Deployment

### Using Docker
```bash
docker build -t transparent-charity-dao-be .
docker run -p 3000:3000 --env-file .env transparent-charity-dao-be
```

### Manual Deployment
1. Set up production environment variables
2. Install dependencies: `npm ci --omit=dev`
3. Start the application: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
