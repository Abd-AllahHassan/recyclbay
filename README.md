# RecycleBay Frontend

## Deployment to Vercel

### Setup

1. **Backend URL**: The frontend is configured to use the backend at `https://resyclbay-bckend.vercel.app/api`

2. **Vercel Configuration**: A `vercel.json` file is included to configure:
   - Build settings for Vite
   - API route proxying to the backend
   - SPA routing fallback

### Deploying

- Push your code to a Git repository connected to Vercel.
- Vercel will automatically build the project using the `vite build` command.
- The frontend will be served as a static site.
- API requests to `/api/*` will be proxied to `https://resyclbay-bckend.vercel.app/api/$1`.

### Notes

- Ensure CORS is configured on the backend to allow requests from your frontend domain.
- The admin login credentials are: username `admin`, password `admin123`.
