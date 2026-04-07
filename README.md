
# CryptoSim
### Full-Stack Cryptocurrency & Stock Market Simulator

CryptoSim is a full-stack educational web application that simulates trading cryptocurrencies and stocks using virtual money.
The project was created by a two-person development team over several months as part of a school programming project.

The project is designed for educational purposes, allowing users to log in, invest virtual funds, track real-time market prices, analyze price charts — all in a fully safe, risk-free environment.

### Project Overview
CryptoSim enables users to:
- Register and log in
- Trade cryptocurrencies and stocks using virtual money
- Track real-time market prices
- Analyze price charts
- Learn investing strategies safely

### Project Structure
```lua
📁 CryptoSim/
├── cryptosim-backend/     # Backend API
├── frontend/              # Frontend web application
├── .babelrc
├── .gitignore
├── .prettierrc
├── next.config.mjs
├── package.json
├── README.md
└── vitest.config.js
```

### Technology Stack
| Layer    | Technologies                                   |
| -------- | -----------------------------------------------|
| Frontend | React / Next.js                                |
| Backend  | Java, Spring Boot, Maven                       |
| Styling  | CSS, Styled Components                         |
| Database | PostgreSQL (local instance)                    |
| Unit/Integration Testing | Vitest, React Testing Library  |
| E2E Testing | Playwright |

### Application Overview
https://github.com/user-attachments/assets/64340665-c095-4108-9a36-01aa96a97368

### Getting Started (Local Development)
**Prerequisites**

**Frontend:**
- Node.js (LTS recommended)
- npm or yarn

**Backend:**
- Java JDK 17 or higher
- Apache Maven 3.8+
- PostgreSQL 14+ (local)

**Tools:**
- Git

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Dawid-Waloch/CryptoSim.git
    cd CryptoSim
    ```

2. **Backend setup:**

    ```bash
    cd cryptosim-backend
    mvn clean install
    mvn spring-boot:run
    ```
    
    > The backend API will start (usually on port 8080).

3. **Frontend setup:**

    Open a new terminal:
    ```bash
    npm install
    npm run dev
    ```
### How to run tests

**Run unit & integration tests**
```bash
npm run test
```

**Run tests in watch mode**
```bash
npm run test:watch
```

**Run E2E tests**
```bash
npm run test:e2e
```

### Database

**Database requirements:**
- PostgreSQL 14+ (local installation)
- Running locally on default or configured port
- Database connection configured in the backend

```properties
spring.application.name=cryptosim-backend
spring.datasource.url=jdbc:postgresql://localhost:5432/cryptosim
spring.datasource.username=postgres
spring.datasource.password=your_password
```

### Market Data
CryptoSim uses real market prices but operates exclusively on virtual funds, making it safe for experimentation and learning.

### License
This project is intended for educational purposes.

### Disclaimer
CryptoSim is not a financial tool and does not provide investment advice.

All trading is simulated and uses virtual funds only.
