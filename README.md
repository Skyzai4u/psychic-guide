# Shahbaz Khan — Interactive 3D Portfolio

Production portfolio for Muhammad Shahbaz Khan, focused on IT Operations, retail technology, full-stack development, AI integration, automation and business systems.

## Architecture
- Next.js 15 Pages Router
- React 19
- React Three Fiber + Three.js + Drei
- Responsive dark neomorphic/glassmorphism UI
- WebGL hero with official profile portrait
- Keyboard/touch/pointer interaction safeguards
- SEO metadata + Person JSON-LD
- Vercel deployment

## Quality and accessibility
- WebGL fallback for unsupported environments
- Reduced-motion support
- Responsive mobile navigation
- Visible keyboard focus states
- Clickable email, LinkedIn and GitHub contact links
- Security response headers via vercel.json

## Important 3D note
The current hero is a WebGL 3D presentation of an official photographic portrait. It is not a rigged human GLB/GLTF mesh. A real human 3D model can be added later without changing the portfolio content architecture.

## Deployment
The project is deployed on Vercel and connected to the GitHub repository.

## Audit
See docs/PRODUCTION-AUDIT.md for the identified issues, fixes and remaining engineering work.
