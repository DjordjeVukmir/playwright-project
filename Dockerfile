# Use Node.js with Debian base
FROM node:20-bookworm

# Install Java (required for Allure CLI)
RUN apt-get update && apt-get install -y \
    default-jre \
    curl \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files separately to leverage Docker cache
COPY package.json package-lock.json ./

# Install Playwright and dependencies
RUN npm install && npx playwright install --with-deps

# Copy project files
COPY . .

# Install Allure CLI
RUN curl -o allure.zip -L https://github.com/allure-framework/allure2/releases/download/2.27.0/allure-2.27.0.zip \
    && unzip allure.zip -d /opt/ \
    && ln -s /opt/allure-2.27.0/bin/allure /usr/bin/allure \
    && rm allure.zip

# Install http-server globally to serve reports
RUN npm install -g http-server

# Set environment variables
ENV ALLURE_RESULTS_DIR=/app/allure-results
ENV ALLURE_REPORT_DIR=/app/allure-report
ENV PORT=8080

# Expose port for report server
EXPOSE 8080

# Default command: run tests, generate report, then serve it on port 8080
CMD sh -c "\
    npx playwright test --project=chromium --reporter=line,allure-playwright --output=$ALLURE_RESULTS_DIR && \
    allure generate $ALLURE_RESULTS_DIR --clean -o $ALLURE_REPORT_DIR && \
    http-server $ALLURE_REPORT_DIR -p $PORT -c-1"
