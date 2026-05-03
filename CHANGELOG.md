# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0]
### Added
- Refactored the codebase to improve safety and robustness, preparing it for production use as the project scales into a more mature open-source initiative.

## [1.3.0]
### Added
- **Smarter Replies, Fewer Tokens**: Implemented a message debounce system to merge rapid consecutive messages from the same user into a single batched prompt.
- Configurable debounce delay via `CHAT_BUDDY_RESPONSE_DEBOUNCE_MS`.

## [1.2.0]
### Added
- Google Calendar API integration.
- New `/schedule` command for natural language event scheduling.
- Added OAuth flow for authenticating with Google Calendar.

## [1.1.0]
### Added
- Interactive CLI setup wizard (`chat-buddy init`).
- Secure storage of API keys using AES-256-CBC encryption.
- In-chat commands (`/history`, `/reset`, `/time`).

## [1.0.0]
### Added
- Initial release.
- Core integration with OpenAI Agents SDK.
- WhatsApp client functionality using `whatsapp-web.js`.
- Basic guardrails and per-user short-term memory implementation.
