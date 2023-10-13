# [StreamBot](https://streambot.deno.dev) v0.2.1 (WIP)
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
* 🤖 GPT AI Command
* 🔊 TTS overlay
* 🤩 Custom commands
* 👽 Toggle commands
* ⌛️ Command cooldown
* ... and much more soon!

## Default Commands
* 🤖 AI - **!ai**
* 🔊 TTS - **!tts**
* 🎲 Roll the dice - **!rtd**
* 🥠 Fortune cookie - **!fortune**
* 🎱 8 Ball - **!8ball**

### Soon
* Kick.com support
* Custom timed events
* Stream Game Overlay

### Resources
- [Documentation](https://streambot.deno.dev/docs)
- [Changelog](https://github.com/ovniroto/stream-bot/blob/main/CHANGELOG.md)

## Installation

### 1. Download last release

First download the [latest released version](https://github.com/ovniroto/stream-bot/releases/latest) and unzip folder

### 2. Install Deno

Make sure to install [Deno](https://docs.deno.com/runtime/manual/getting_started/installation)

> Deno is a JavaScript/TS runtime that allows you to execute this bot.

### 3. Rename `.env.example` file

Rename the `.env.example` file to `.env` and fill information

### 4. Create Twitch oauth token

* Login with your main account or bot account on Twitch
* Enter to [twitchtokengenerator.com](https://twitchtokengenerator.com)
* Select **Bot Chat Token**
* Authorize **Twitch Token Generator** in your account
* Copy **Access Token** and paste in the `.env` file (TWITCH_ACCESS_TOKEN)

Example:
```sh
TWITCH_ACCESS_TOKEN="your-token-here"
```


### 5. Create OpenAI API Key

**Important**: The !ai command uses your OpenAI API Key to generate the responses. This entails an economic expense that you must control for yourself. We recommend creating a [usage limit on your OpenAI account](https://platform.openai.com/account/billing/limits) to avoid unwanted spending and automatically blocking responses from being generated when you reach that limit. You can also use the !aimod command to turn the command on or off. You can keep the command disabled if you don't want to use this feature. You can change the generation model to a less expensive one with the !aimod command or from the bot panel.

* Create new account or login on [OpenAI](https://openai.com/)
* Go to your [API Keys](https://platform.openai.com/account/api-keys) and create **new secret key**
* Copy **Secret Key** and paste in the `.env` file (OPENAI_API_KEY)

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