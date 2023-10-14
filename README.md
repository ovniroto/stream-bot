# [StreamBot](https://streambot.deno.dev) v0.3.2 (WIP)
![StreamBot](https://i.imgur.com/12cvjFU.png)

[![GitHub Issues](https://img.shields.io/github/issues/ovniroto/stream-bot)](https://github.com/ovniroto/stream-bot/issues)
[![GitHub Tag](https://img.shields.io/github/tag/ovniroto/stream-bot.svg)](https://github.com/ovniroto/stream-bot/tags)
[![GitHub Commits](https://img.shields.io/github/commit-activity/t/ovniroto/stream-bot)](https://github.com/ovniroto/stream-bot/commits/main/)
[![GitHub License](https://img.shields.io/github/license/ovniroto/stream-bot)](https://github.com/ovniroto/stream-bot/blob/main/LICENSE)

Essential bot for your stream!

This is a bot with various features for your stream. You can create your own commands, activate or disable them, and much more!

### ⚠️ **Bot is not ready yet. Star this project to know when it's ready.**

## Features

* 🥳 Stream Panel
* 😎 Twitch.tv support
* 💿 Spotify Commands
* 🤖 GPT AI Command
* 🔊 TTS overlay
* 🤩 Custom commands
* 👽 Toggle commands
* ⌛️ Command cooldown
* ... and much more!

## Default Commands
* 🤖 AI - **!ai**
* 🔊 TTS - **!tts**
* 🎲 Roll the dice - **!rtd**
* 🥠 Fortune cookie - **!fortune**
* 🎱 8 Ball - **!8ball**
* 💿 Spotify - **!spoty**

### Soon™
* Kick.com support
* Custom timed events
* Stream Game Overlay

### Resources
- [Documentation](https://streambot.deno.dev/docs)
- [Changelog](https://github.com/ovniroto/stream-bot/blob/main/CHANGELOG.md)

## Local Installation

### 1. Download last release

First download the [latest released version](https://github.com/ovniroto/stream-bot/releases/latest) and unzip folder

### 2. Rename `.env.example` file

Rename the `.env.example` file to `.env` and fill information

### 3. Create Twitch oauth token (Optional)

* Login with your main account or bot account on Twitch
* Enter to [twitchtokengenerator.com](https://twitchtokengenerator.com)
* Select **Bot Chat Token**
* Authorize **Twitch Token Generator** in your account
* Copy **Access Token** and paste in the `.env` file (TWITCH_ACCESS_TOKEN)

Example:
```sh
TWITCH_ACCESS_TOKEN="your-token-here"
```

### 4. Create OpenAI API Key (Optional)

**Important**: The !ai command uses your OpenAI API Key to generate the responses. This entails an economic expense that you must control for yourself. We recommend creating a [usage limit on your OpenAI account](https://platform.openai.com/account/billing/limits) to avoid unwanted spending and automatically blocking responses from being generated when you reach that limit. You can also use the !aimod command to turn the command on or off. You can keep the command disabled if you don't want to use this feature. You can change the generation model to a less expensive one with the !aimod command or from the bot panel.

* Create new account or login on [OpenAI](https://openai.com/)
* Go to your [API Keys](https://platform.openai.com/account/api-keys) and create **new secret key**
* Copy **Secret Key** and paste in the `.env` file (OPENAI_API_KEY)

### 5. Create Spotify API Keys (Optional)

**Important**: Spotify limits player actions for users who pay for Spotify Premium. If you don't pay for Spotify Premium, you won't be able to use actions like skip to the next or previous song, pause or resume music, etc.

* Create new [Spotify App](https://developer.spotify.com/dashboard/create) with this data:
  * Name: StreamBot
  * Description: StreamBot
  * Redirect URI: http://localhost:8000/api/spotify
* Go to app `Settings` and click on `View client secret`
* Copy `Client ID` and `Client secret` and paste it in the `.env` file.
* To connect your Spotify account, run the bot and go to http://localhost:8000/spotify/login

Example:
```sh
SPOTIFY_CLIENT_ID="your-client-here"
SPOTIFY_CLIENT_SECRET="your-secret-here"
```

### 6. Run `StreamBot_Start.bat`

## Bot Updates

If you want to check if there are new bot updates, you just have to run the file `StreamBot_Update.bat`.

## Troubleshooting

### MissingEnvVarsError

```sh
error: Uncaught MissingEnvVarsError: The following variables were defined in the example file but are not present in the environment:
  TWITCH_USERNAME, TWITCH_PASSWORD, TWITCH_CHANNEL, OPENAI_API_KEY, DEBUG, ENVIRONMENT

Make sure to add them to your env file.

[...]
```

You may not have renamed the file `.env.example` to `.env`.

### Login authentication failed

Twitch credentials are incorrect. Check the data you have put in the `.env` file.

## Contributors
All issue reports, feature requests, pull requests and github stars are welcomed and much appreciated.