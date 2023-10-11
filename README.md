# [StreamBot](https://streambot.deno.dev) v0.1.2 (WIP)

[![GitHub Issues](https://img.shields.io/github/issues/ovniroto/stream-bot)](https://github.com/ovniroto/stream-bot/issues)
[![GitHub Tag](https://img.shields.io/github/tag/ovniroto/stream-bot.svg)](https://github.com/ovniroto/stream-bot/tags)
[![GitHub Commits](https://img.shields.io/github/commit-activity/t/ovniroto/stream-bot)](https://github.com/ovniroto/stream-bot/commits/main/)
[![GitHub License](https://img.shields.io/github/license/ovniroto/stream-bot)](https://github.com/ovniroto/stream-bot/blob/main/LICENSE)

Essential bot for your stream!

This is a bot with various features for your stream on Twitch. You can create your own commands, activate or disable them, and much more!

## Features

* 🥳 Stream Panel
* 😎 Twitch.tv support
* 🤖 GPT AI Command
* 🔊 TTS overlay
* 🤩 Custom commands
* 👽 Toggle commands
* ⌛️ Command cooldown
* ... and much more soon!

## Default Commands
* 🤖 AI (!ai)
* 🔊 TTS (!tts)
* 🎲 Roll the dice (!rtd)
* 🥠 Fortune cookie (!fortune)
* 🎱 8 Ball (!8ball)

### Soon
* Kick.com support
* Custom timed events
* Who Wnats To Be a Millonaire (Stream overlay game)

### Resources
- [Documentation](https://streambot.deno.dev/docs)
- [Changelog](https://github.com/ovniroto/stream-bot/blob/main/CHANGELOG.md)

## Installation

### 1. Download last release

First download the [latest released version](https://github.com/ovniroto/stream-bot/releases/latest) and unzip folder

### 2. Install Deno

Make sure to install [Deno](https://docs.deno.com/runtime/manual/getting_started/installation)

### 3. Rename `.env.example` file

Rename the `.env.example` file to `.env` and fill information

### 4. Create Twitch oauth token

* Enter to [twitchtokengenerator.com](https://twitchtokengenerator.com)
* Select **Bot Chat Token**
* Authorize **Twitch Token Generator** in your account
* Copy **Access Token** and paste in the `.env` file (TWITCH_PASSWORD)

### 5. Create OpenAI API Key

* Create new account or login on [OpenAI](https://openai.com/)
* Go to your [API Keys](https://platform.openai.com/account/api-keys) and create new secret key
* Copy **Secret Key** and paste in the `.env` file (OPENAI_API_KEY)

### 6. Run `StreamBot_Start.bat`

## Troubleshooting

### 1. Uncaught MissingEnvVarsError

```sh
error: Uncaught MissingEnvVarsError: The following variables were defined in the example file but are not present in the environment:
  TWITCH_USERNAME, TWITCH_PASSWORD, TWITCH_CHANNEL, OPENAI_API_KEY, DEBUG, ENVIRONMENT

Make sure to add them to your env file.

[...]
```

If this error has come out, the most possible is that you have not renamed the `.env.example` to` .env` file.

## Contributors
All issue reports, feature requests, pull requests and github stars are welcomed and much appreciated.