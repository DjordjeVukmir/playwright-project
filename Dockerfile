# Use Node.js with Debian base
FROM node:20-bookworm

# Install Java (required for Allure CLI)
RUN apt-get update && apt-get install -y \
    default-jre \
    curl \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Set working directory before copying anything
WORKDIR /app

# Copy package files separately to leverage Docker cache
COPY package.json package-lock.json ./

# Install Playwright and its deps
RUN npm install && npx playwright install --with-deps

# Copy rest of the project
COPY . .

# Install Allure CLI
RUN curl -o allure.zip -L https://github.com/allure-framework/allure2/releases/download/2.27.0/allure-2.27.0.zip \
    && unzip allure.zip -d /opt/ \
    && ln -s /opt/allure-2.27.0/bin/allure /usr/bin/allure \
    && rm allure.zip

# Default command
CMD ["npx", "playwright", "test", "--project=chromium", "--reporter=line,allure-playwright"]
