# Site

A web application built with Next.js, integrating Notion for seamless content management.

## Overview

This project is a robust web application utilizing Next.js and Notion, designed to enhance user experience and streamline content handling. It combines the latest web technologies to provide both static and dynamic content generation.

## Key Features

- **Next.js**: Supports both static and server-rendered pages.
- **Notion Integration**: Efficient data management through Notion.
- **Responsive Design**: Styled with Tailwind CSS for mobile-first usability.
- **TypeScript**: Enhances developer experience with static typing.
- **Code Quality Tools**: Includes ESLint and Prettier for consistent code quality.

## Prerequisites

- **Node.js**: [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager).
- **pnpm**: [https://pnpm.io/installation](https://pnpm.io/installation).

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tuanductran/site.git
   cd site
   ```

2. **Install the dependencies:**

   ```bash
   pnpm install
   ```

3. **Create a `.env` file from the example:**

   ```bash
   cp .env.example .env
   ```

4. **Populate the `.env` file with the necessary environment variables:**

   - `NOTION_DATABASE_ID`: Your Notion database ID.
   - `ARTICLES_DATABASE_ID`: Database ID for articles.
   - `BOOKS_DATABASE_ID`: Database ID for books.
   - `CV_NOTION_TOKEN`: Token for accessing CV database.
   - `CV_NOTION_DATABASE_ID`: Database ID for CV entries.
   - `NOTION_TOKEN`: Token for Notion API access.

## Creating a Notion API Integration

1. **Go to Notion Integrations**:

   - Visit [Notion Integrations](https://www.notion.so/my-integrations).

2. **Create a New Integration**:

   - Click on "New Integration" and fill in the details.
   - Copy the generated Integration Token.

3. **Share Database with Integration**:

   - Open your Notion database, click "Share," and invite your integration.

4. **Retrieve Database IDs**:
   - Open the database in Notion and check the URL. The database ID is the part of the URL after `notion.so/` and before the question mark, if present.

## Scripts

- **Development**: Launch the development server:

  ```bash
  pnpm dev
  ```

- **Build**: Prepare the application for production:

  ```bash
  pnpm build
  ```

- **Start**: Run the production server:

  ```bash
  pnpm start
  ```

- **Lint**: Run ESLint to check for code issues:

  ```bash
  pnpm lint
  ```

- **Fix Lint Issues**: Automatically resolve linting problems:

  ```bash
  pnpm lint:fix
  ```

- **Type Checking**: Execute TypeScript type checks:

  ```bash
  pnpm typecheck
  ```

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests for new features or bug fixes.

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](./LICENSE) file.
