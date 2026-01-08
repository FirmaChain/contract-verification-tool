# Contract Verification Tool

<div style={{display: flex}}>
  <!-- <img height="auto" width="auto" src="https://user-images.githubusercontent.com/93243647/225242358-f9635d41-6f2c-4952-a6a5-987662764323.png"> -->
  <img height="auto" width="auto" src="https://github.com/user-attachments/assets/95d27af2-7016-40ec-bd1b-e8fe26fc9f8b" />
</div>

Contract Verification Tool is a web service that verifies contracts recorded in Firmachain.

You can verify contracts by uploading files or entering hash values, and record contracts on the blockchain using API.

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
yarn run dev      # Uses .env.dev
yarn run testnet  # Uses .env.testnet
yarn run mainnet  # Uses .env.mainnet
```

## Build

```bash
yarn run build:testnet  # Uses .env.testnet
yarn run build:mainnet  # Uses .env.mainnet
```

---

### Environment Configuration

| Script          | Environment File | Description           |
| --------------- | ---------------- | --------------------- |
| `build:testnet` | `.env.testnet`   | Default testnet build |
| `build:mainnet` | `.env.mainnet`   | Default mainnet build |

---
