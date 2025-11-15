# Landing Page Project

This project is a simple landing page that displays links to Git and project repositories in a carousel format. It is designed to showcase your work and provide easy access to your repositories.

## Project Structure

```
landing-page
├── src
│   ├── index.html        # Main HTML document for the landing page
│   ├── css
│   │   └── styles.css    # Styles for the landing page
│   ├── js
│   │   ├── main.js       # Main JavaScript file for initialization
│   │   └── carousel.js    # Logic for carousel functionality
│   └── data
│       └── repos.json    # JSON data for repository links
├── package.json           # npm configuration file
├── .gitignore             # Files and directories to ignore by Git
└── README.md              # Documentation for the project
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd landing-page
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Project**
   Open `src/index.html` in your web browser to view the landing page.

## Usage Guidelines

- The carousel will automatically cycle through the repository links.
- Each slide contains the repository name, description, and a link to the repository.
- You can customize the repository data by editing the `src/data/repos.json` file.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.