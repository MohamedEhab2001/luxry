# Environment variables

Copy `.env.example` to `.env.local` to configure local development. The seed scripts use `.env.local` automatically.

## Required values
- `MONGO_URI`: MongoDB connection string. Example: `mongodb://localhost:27017/luxry`.
- `MONGO_DB`: Optional override for the database name (defaults to the database name in the URI).
- `JWT_SECRET`: Secret used for signing JSON Web Tokens.
- `INSTAPAY_PUBLIC_KEY` / `INSTAPAY_SECRET_KEY`: API keys for Instapay checkout processing.
- `STORAGE_BUCKET`: Bucket name for product media.
- `STORAGE_CDN_URL`: Public CDN base URL for media assets.
- `ADMIN_EMAILS`: Comma-separated list of admin accounts to bootstrap.
- `DEMO_PASSWORD`: Plaintext password used to generate hashes for demo users.
- `LOG_LEVEL`: Optional logging level (e.g., `info`, `debug`).

## Local defaults
The sample `.env.example` file includes safe defaults for local development. Replace placeholders for secrets before running the seed scripts.
