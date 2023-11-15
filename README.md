# Transcript Updater

This TypeScript script reads data from `timeline.json` and `transcript.txt`, associates usernames with dialogue, and writes the updated transcript to `updated_transcript.txt`.

## Prerequisites

Ensure that you have [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1. **Clone this repository to your local machine:**

   ```bash
   git clone https://github.com/trevorotterson/transcript_organizer.git

2. **Navigate to project directory:**
   ```bash
   cd transcript_organizer

3. **Install dependencies:**
   ```bash
   npm install

## Usage

1. **Run the script:**
   ```bash
   npm start

2. View the updated transcript in ./data/updated_transcript.txt.

## File Structure

- **data/**
  - `timeline.json`: JSON file containing timeline data.
  - `transcript.txt`: Text file containing the original transcript.
  - `updated_transcript.txt`: Output file with the updated transcript.
- **root/**
  - `transcriptReader.ts`: Main script file.

## Contributing

Feel free to contribute to the improvement of this script by submitting pull requests or reporting issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
