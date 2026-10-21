# ResolveHQ — Backend

A secure REST API for a role-based customer support and escalation platform, planned with Node.js, Express, TypeScript, and PostgreSQL.

ResolveHQ is a full-stack SaaS portfolio project designed to demonstrate backend engineering, API design, authentication and authorization, database design, automated testing, and cloud deployment.

## Project Status

**Current phase:** Phase 1 — Foundation and Architecture

The backend application has not yet been implemented. This repository is being prepared for development.

## Planned Responsibilities

- Expose REST API endpoints for support ticket workflows
- Authenticate requests using Auth0 access tokens
- Enforce server-side role-based permissions and ticket ownership
- Support ticket creation, assignment, status changes, and customer-agent messaging
- Record ticket activity history
- Persist application data in PostgreSQL
- Provide structured validation errors, consistent API responses, and logging
- Support automated testing and AWS Lambda deployment

These are planned responsibilities, not implemented or verified features.

## Planned Technology Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Auth0
- AWS Lambda and API Gateway HTTP API
- Automated testing and CI/CD

Database hosting, connection management, and deployment details will be finalized during architecture planning.

## Related Repository

- **Frontend:** [resolvehq-frontend](https://github.com/VedantM007/resolvehq-frontend)

## Development

Installation, configuration, testing, and local development instructions will be added once the backend foundation is established.

Environment variables and credentials must remain outside version control. A safe `.env.example` will be added when the required configuration variables are defined.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.