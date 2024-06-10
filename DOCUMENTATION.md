1. Architecture

This project follows a component-based architecture using React.js v16.13 and Node 14.x, with a focus on modularity and reusability. Here's a breakdown of the architecture and how components interact with each other:

Component-Based Approach: The application is structured around reusable, self-contained components, each responsible for a specific UI element or feature.
App Component: Serves as the root component of the application. It sets up the routing using React Router and renders different components based on the URL.
Router: Utilizes React Router for client-side routing. Defines routes for different parts of the application, such as:
/itineraries?departureLocation=Paris&arrivalLocation=London&departureYear=2022&departureMonth=04&departureDay=07

Hash routing is straightforward to implement and understand, making it a good choice for small to medium-sized applications where complex routing features are not needed.

SearchPanel component is designed to facilitate the selection of departure and arrival locations, along with the departure date, in order to initiate a search for travel options.
The Itineraries component is responsible for displaying the results of a search for travel options.
404 Page Component: The application includes a custom 404 page to handle routes that do not match any defined paths.

- Error Boundary: An error boundary component is implemented to catch and handle errors that occur during rendering or lifecycle methods of its children components.
  Utility Functions: Utility functions are designed to be reusable in different parts of the codebase.
  Unit Tests with React Testing Library: Unit tests ensure the reliability and correctness of components.
  SVG Shared Components: Shared SVG components can be used for consistent visual elements across the application.
  SCSS: used for styling the application.

2. Technical decision

- React Router for Routing: React Router v6 simplifies client-side routing with its declarative approach, enabling the creation of a seamless single-page application experience without full page reloads. Its robustness and simplicity make it an ideal choice for managing navigation within a React application.

- React Testing Library: React Testing Library was chosen for its focus on testing user behavior, resulting in more maintainable tests compared to testing implementation details. Its lightweight nature and intuitive API make it easy to learn and use effectively, ensuring reliable and robust unit tests for React components.

CSS Strategy: The provided CSS strategy employs CSS variables and class-based styling to establish consistent and scalable styling across the application. By defining typography, color palette, and layout properties as CSS variables, developers can easily maintain and modify the visual appearance of their components.
Axios in React Hooks The use of Axios in React hooks simplifies asynchronous data fetching and management within functional components.
Error Handling: The hook includes robust error handling mechanisms, ensuring that any network errors or exceptions during data retrieval are properly handled and propagated to the consuming components.
AbortController Integration: The hook integrates the AbortController API to facilitate the cancellation of ongoing fetch requests, enhancing performance and resource management.
To use the useFetch hook, import it into your React functional component and invoke it with the desired URL as a parameter. Then, destructure the returned values (data, loading, error) to utilize the fetched data within your component.

3. Unit Testing

- Write unit tests for individual components using React Testing Library v12.
- Test component rendering, user interactions, state changes, and prop validations.
- Cover edge cases and error scenarios to ensure robustness.
- Mock external dependencies.

4. Alternatives

- Different State Management Libraries: Instead of using React's built-in state management, alternatives such as Redux, MobX, Zustand, or Recoil could have been considered for managing the application state, especially if the application's state grows in complexity or needs to be shared across multiple components.
- Alternative Styling Approaches: other styling approaches such as CSS Modules, CSS-in-JS libraries like Emotion, and styled-components could have been used depending on personal preference or project requirements.
- Testing Frameworks: Although React Testing Library was chosen for unit testing components, other testing frameworks like Jest + Enzyme or Cypress for end-to-end testing could have been considered. Each testing framework has its own strengths and may be better suited for specific testing needs or preferences.
- REST Client Libraries: While Axios was chosen for API integration, other REST client libraries such as GraphQL, Fetch API, and React Query could have been considered for interacting with RESTful APIs.
- Alternative Routing Solutions: Although React Router was chosen for client-side routing, alternative routing solutions such as Next.js could have been evaluated based on features like code splitting, prefetching, or server-side rendering capabilities.
