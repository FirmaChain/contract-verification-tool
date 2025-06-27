# Contract Verification Tool

<div style={{display: flex}}>
  <img height="auto" width="auto" src="https://user-images.githubusercontent.com/93243647/225242358-f9635d41-6f2c-4952-a6a5-987662764323.png">
</div>

Contract Verification Tool is a web service that verifies contracts recorded in Firmachain.

You can experience contract verification and record using demo mode and API.

## Environment

- Node v20
- React 18 + Typescripts
- Material Design
- Zustand

---

## Initial setup

```bash
nvm use
yarn install
```

---

## Development

### Local Development

```bash
yarn run dev 	    # Uses .env.dev
yarn run testnet 	# Uses .env.testnet
yarn run mainnet  # Uses .env.mainnet
```

## Build

```bash
yarn run build:testnet  # Uses .env.testnet
yarn run build:mainnet  # Uses .env.mainnet
```

---

### Environment Configuration

| Script          | Environment File | Description          |
| --------------- | ---------------- | -------------------- |
| `build:testnet` | `.env.testnet`   | Default Docker build |
| `build:mainnet` | `.env.mainnet`   | QA environment       |

---
