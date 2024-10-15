
# Library Management System

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Version 14 or higher
- **.NET SDK**: Version 6.0 or higher

## Installation

### 1. Install .NET SDK

To install the .NET SDK, follow these steps:

- Download the installer from the [.NET download page](https://dotnet.microsoft.com/download).
- Run the installer and follow the on-screen instructions.

After installation, verify the installation by running:

```bash

dotnet --version


2. Update Database
To update your database, use the following command:

dotnet ef database update

Make sure to have your database connection string configured properly in your appsettings.json file.

3. Install Node.js
To install Node.js, follow these steps:

Download the installer from the Node.js download page.
Choose the version labeled LTS (Long Term Support) for stability.
Run the installer and follow the on-screen instructions.
After installation, verify the installation by running:

node --version
npm --version

4. Install Node Modules
Navigate to the client side of your project (typically in the client folder or wherever your React app resides)
and install the necessary Node modules using:

npm install

5. Run the Application
Server Side
To run the server-side application, navigate to the folder containing your .csproj file and execute:
dotnet run
The server should start and listen on the specified port (usually http://localhost:5025).

Client Side
Open a new terminal window, navigate to the client-side folder (e.g., the folder containing package.json), and run:

npm star

This command starts the React application and opens it in your default web browser, usually at http://localhost:3000.


