# **App Name**: MGNREGA Insights

## Core Features:

- District Selection: Allow users to select their district from a hierarchical state -> district dropdown. Persist the choice in local storage.
- API Data Ingestion & Storage: Fetch MGNREGA data from the data.gov.in API, process it, and store it in a PostgreSQL database. Implement caching with daily/weekly/monthly cronjobs.
- Data Visualization: Present key MGNREGA performance indicators (e.g., employment provided, funds utilized, asset creation) through charts and graphs that are easy to understand.
- Historical Data Comparison: Enable users to compare the current performance of their district with historical data, identifying trends and patterns over time.
- Simplified Explanations: Provide short, clear explanations of MGNREGA terms and indicators using generative AI. Present the LLM as a tool. Prioritize simplicity, cultural context and local languages, drawing on official guidelines and relevant resources as needed. 
- Performance Scorecard: Generate a simplified performance scorecard for the district using generative AI that highlights key achievements and areas for improvement in simple terms, again presenting the LLM as a tool.
- Location Detection (Bonus): Attempt to detect the user's district based on their IP address (with user consent) to pre-select the district. Use the standard navigator.geolocation API to detect their precise location, but ask for consent. Have IP based detection as fallback in case location detection fails or is not consented to.

## Style Guidelines:

- Primary color: A deep sky blue (#007BFF) to convey trust and stability, reflecting the government's initiative.
- Background color: A very light blue-grey (#F0F8FF) for a clean and accessible interface.
- Accent color: A warm orange (#FFA500) to highlight key data points and call to action buttons, providing contrast.
- Font pairing: 'PT Sans', a modern sans-serif (for body) and 'Playfair', a modern serif font (for headlines).
- Use simple, culturally relevant icons to represent MGNREGA activities (e.g., digging, planting, building).
- Employ a clear, hierarchical layout with ample spacing to ensure readability for users with varying levels of literacy. Keep buttons big for easy pressing by people with limited dexterity.
- Use subtle animations to guide users through the app and provide feedback on interactions (e.g., a loading animation when fetching data).