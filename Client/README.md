Welcome to your new TanStack app! 

# Getting Started

To run this application:

```bash
pnpm install
pnpm start
```

# Building For Production

To build this application for production:

```bash
pnpm build
AutoHub Frontend - Vehicle Rental Management System
https://img.shields.io/badge/React-18.2.0-61dafb?logo=react&logoColor=white
https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript&logoColor=white
https://img.shields.io/badge/TanStack_Router-Latest-ff4154?logo=react&logoColor=white
https://img.shields.io/badge/Vite-5.0-646cff?logo=vite&logoColor=white
https://img.shields.io/badge/Redux_Toolkit-1.9-764abc?logo=redux&logoColor=white

📋 Table of Contents
System Overview

Architecture

Features

Installation

Routing

State Management

UI Components

API Integration

Testing

Deployment

Contributing

🏢 System Overview
AutoHub Frontend is a modern React application built with TypeScript and TanStack Router, providing an intuitive interface for vehicle rental management. The application offers seamless user experiences for browsing vehicles, making bookings, and managing rentals.

Key Technologies:

Framework: React 18.x with TypeScript

Routing: TanStack Router for type-safe routing

Build Tool: Vite for fast development and building

State Management: Redux Toolkit with RTK Query

UI Components: Custom components with Lucide Icons

Forms: React Hook Form with Zod validation

Styling: CSS Modules with modern CSS features

API Client: Axios for HTTP requests

🏗️ Architecture
Project Structure
text
src/
├── main.tsx                     # Application entry point
├── App.tsx                      # Root application component
├── routes/                      # TanStack Router route definitions
│   ├── __root.tsx               # Root route with layout
│   ├── index.tsx                # Home page route
│   ├── auth/                    # Authentication routes
│   ├── dashboard/               # User dashboard routes
│   ├── admin/                   # Admin panel routes
│   ├── vehicles/                # Vehicle browsing routes
│   └── bookings/                # Booking management routes
├── components/                  # Reusable UI components
│   ├── ui/                      # Basic UI components (Button, Input, etc.)
│   ├── layout/                  # Layout components (Header, Footer, etc.)
│   ├── vehicles/                # Vehicle-related components
│   ├── booking/                 # Booking-related components
│   └── admin/                   # Admin-specific components
├── store/                       # Redux store configuration
│   ├── slices/                  # Redux slices
│   ├── api/                     # RTK Query API definitions
│   └── hooks.ts                 # Redux hooks
├── hooks/                       # Custom React hooks
├── utils/                       # Utility functions
├── types/                       # TypeScript type definitions
├── constants/                   # Application constants
├── styles/                      # Global styles and CSS modules
└── assets/                      # Static assets (images, icons, etc.)
TanStack Router Configuration
The application uses TanStack Router for type-safe routing with file-based routing:

typescript
// routes/__root.tsx
export const Route = createRootRoute({
  component: RootComponent,
});

// Route definition with type-safe params
const vehiclesRoute = createRoute({
  getParentRoute: () => Route,
  path: 'vehicles',
  component: VehiclesPage,
});

const vehicleDetailRoute = createRoute({
  getParentRoute: () => vehiclesRoute,
  path: '$vehicleId',
  parseParams: (params) => ({
    vehicleId: z.string().parse(params.vehicleId),
  }),
  component: VehicleDetailPage,
});
✨ Features
User-Facing Features
Vehicle Browsing: Filterable vehicle catalog with search functionality

Booking System: Intuitive booking process with date selection

User Authentication: Secure login/registration with JWT tokens

Dashboard: Personal dashboard for managing bookings and profile

Payment Processing: Integrated Stripe payment flow

Responsive Design: Mobile-first responsive design

Admin Features
Dashboard Analytics: Charts and metrics for business insights

Vehicle Management: CRUD operations for vehicle inventory

User Management: Admin controls for user accounts

Booking Management: View and manage all bookings

Reporting System: Financial and operational reports

Support Management: Customer ticket handling system

Technical Features
Type-Safe Routing: Full TypeScript integration with TanStack Router

State Management: Centralized state with Redux Toolkit

API Integration: RTK Query for efficient data fetching

Form Handling: React Hook Form with Zod validation

Error Boundaries: Graceful error handling

Loading States: Skeleton loaders and loading indicators

PWA Ready: Progressive Web App capabilities

🚀 Installation
Prerequisites
Node.js 18.0 or higher

npm or yarn package manager

Step-by-Step Setup
Clone the repository

bash
git clone https://github.com/your-username/autohub-frontend.git
cd autohub-frontend
Install dependencies

bash
npm install
Environment configuration

bash
cp .env.example .env
Edit the .env file with your configuration:

env
VITE_API_URL="http://localhost:3001/api"
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
VITE_APP_NAME="AutoHub"
Start the development server

bash
npm run dev
The application will be available at http://localhost:5173

🧭 Routing with TanStack Router
Route Definitions
TanStack Router uses file-based routing with type safety:

typescript
// routes/vehicles/$vehicleId.tsx
import { createRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createRoute({
  getParentRoute: () => vehiclesRoute,
  path: '$vehicleId',
  parseParams: (params) => ({
    vehicleId: z.string().uuid().parse(params.vehicleId),
  }),
  component: VehicleDetailPage,
});

// Using the route in components
function VehicleDetailPage() {
  const { vehicleId } = Route.useParams();
  // vehicleId is type-safe string
}
Navigation
typescript
import { useNavigate } from '@tanstack/react-router';

function Component() {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate({
      to: '/vehicles/$vehicleId',
      params: { vehicleId: '123e4567-e89b-12d3-a456-426614174000' },
    });
  };
  
  return <button onClick={handleNavigate}>View Vehicle</button>;
}
Route Loaders
typescript
// Using loaders for data fetching
export const Route = createRoute({
  getParentRoute: () => vehiclesRoute,
  path: '$vehicleId',
  parseParams: (params) => ({
    vehicleId: z.string().uuid().parse(params.vehicleId),
  }),
  loader: async ({ params }) => {
    const vehicle = await fetchVehicle(params.vehicleId);
    return vehicle;
  },
  component: VehicleDetailPage,
});

// Accessing loader data
function VehicleDetailPage() {
  const { vehicle } = Route.useLoaderData();
}
🗃️ State Management
Redux Store Structure
typescript
// store/slices/authSlice.ts
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// store/api/authApi.ts
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});
Custom Hooks
typescript
// hooks/useAuth.ts
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  
  const login = async (credentials: LoginRequest) => {
    try {
      const result = await dispatch(authApi.endpoints.login.initiate(credentials));
      if ('data' in result) {
        dispatch(setCredentials(result.data));
      }
    } catch (error) {
      // Handle error
    }
  };
  
  return { user, token, login };
};
🎨 UI Components
Component Structure
tsx
// components/vehicles/VehicleCard.tsx
interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
  return (
    <div className={styles.card}>
      <img src={vehicle.imageUrl} alt={vehicle.model} />
      <h3>{vehicle.manufacturer} {vehicle.model}</h3>
      <p>${vehicle.rentalRate}/day</p>
      <Button onClick={() => onSelect(vehicle)}>View Details</Button>
    </div>
  );
};
Styling with CSS Modules
css
/* styles/VehicleCard.module.css */
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
🔌 API Integration
RTK Query Setup
typescript
// store/api/baseApi.ts
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

// store/api/vehiclesApi.ts
export const vehiclesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query<Vehicle[], VehicleFilters>({
      query: (filters) => ({
        url: '/vehicles',
        params: filters,
      }),
    }),
    createBooking: builder.mutation<Booking, CreateBookingRequest>({
      query: (bookingData) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingData,
      }),
    }),
  }),
});
Using API Hooks
tsx
// components/VehicleList.tsx
export const VehicleList: React.FC = () => {
  const [filters, setFilters] = useState<VehicleFilters>({});
  const { data: vehicles, error, isLoading } = useGetVehiclesQuery(filters);
  
  if (isLoading) return <SkeletonLoader />;
  if (error) return <Error message="Failed to load vehicles" />;
  
  return (
    <div>
      {vehicles?.map((vehicle) => (
        <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} />
      ))}
    </div>
  );
};
🧪 Testing
Test Setup
bash
# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
Testing Components
tsx
// __tests__/VehicleCard.test.tsx
import { render, screen } from '@testing-library/react';
import { VehicleCard } from '../components/VehicleCard';

const mockVehicle = {
  vehicleId: '1',
  manufacturer: 'Toyota',
  model: 'Camry',
  rentalRate: 45,
};

describe('VehicleCard', () => {
  it('renders vehicle information', () => {
    render(<VehicleCard vehicle={mockVehicle} onSelect={jest.fn()} />);
    
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('$45/day')).toBeInTheDocument();
  });
});
Testing Routes
tsx
// __tests__/routing.test.tsx
import { createMemoryHistory } from '@tanstack/react-router';
import { testRouter } from '../test-utils';

describe('Routing', () => {
  it('navigates to vehicle detail page', async () => {
    const router = testRouter();
    await router.navigate({ to: '/vehicles/$vehicleId', params: { vehicleId: '1' } });
    
    expect(router.state.currentPathname).toBe('/vehicles/1');
  });
});
🚀 Deployment
Build for Production
bash
# Build the application
npm run build

# Preview the build
npm run preview
Environment Variables for Production
env
VITE_API_URL="https://api.autohub.example.com"
VITE_STRIPE_PUBLISHABLE_KEY="pk_live_your-stripe-publishable-key"
VITE_APP_NAME="AutoHub"
Deployment Platforms
Vercel:

json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
Netlify:

toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
🤝 Contributing
Development Guidelines
Follow TypeScript best practices

Use TanStack Router for all navigation

Write tests for new components and features

Follow the established component structure

Use CSS Modules for styling

Update documentation for new features

Code Structure
Components: Place in appropriate category folders

Hooks: Use descriptive names and proper TypeScript typing

Routes: Follow TanStack Router file-based routing conventions

Styles: Use CSS Modules with BEM naming convention

Commit Message Convention
text
feat: add new vehicle filter component
fix: resolve booking date validation issue
docs: update routing documentation
style: improve responsive design for mobile
refactor: simplify authentication logic
test: add tests for payment component
📞 Support
For support regarding the AutoHub Frontend:

Check the documentation first

Review existing GitHub Issues

Create a new issue with detailed description

Email: frontend-support@autohub.example.com

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

AutoHub Frontend - Modern, type-safe vehicle rental management interface built with React and TanStack Router.


```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
pnpm test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.


## Linting & Formatting


This project uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for linting and formatting. Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint). The following scripts are available:

```bash
pnpm lint
pnpm format
pnpm check
```



## Routing
This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which means that the routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add another a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you use the `<Outlet />` component.

Here is an example layout that includes a header:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

The `<TanStackRouterDevtools />` component is not required so you can remove it if you don't want it in your layout.

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).


## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json() as Promise<{
      results: {
        name: string;
      }[];
    }>;
  },
  component: () => {
    const data = peopleRoute.useLoaderData();
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  },
});
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

### React-Query

React-Query is an excellent addition or alternative to route loading and integrating it into you application is a breeze.

First add your dependencies:

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

Next we'll need to create a query client and provider. We recommend putting those in `main.tsx`.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ...

const queryClient = new QueryClient();

// ...

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

You can also add TanStack Query Devtools to the root route (optional).

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools />
    </>
  ),
});
```

Now you can use `useQuery` to fetch your data.

```tsx
import { useQuery } from "@tanstack/react-query";

import "./App.css";

function App() {
  const { data } = useQuery({
    queryKey: ["people"],
    queryFn: () =>
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => data.results as { name: string }[]),
    initialData: [],
  });

  return (
    <div>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

You can find out everything you need to know on how to use React-Query in the [React-Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview).

## State Management

Another common requirement for React applications is state management. There are many options for state management in React. TanStack Store provides a great starting point for your project.

First you need to add TanStack Store as a dependency:

```bash
pnpm add @tanstack/store
```

Now let's create a simple counter in the `src/App.tsx` file as a demonstration.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

function App() {
  const count = useStore(countStore);
  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
    </div>
  );
}

export default App;
```

One of the many nice features of TanStack Store is the ability to derive state from other state. That derived state will update when the base state updates.

Let's check this out by doubling the count using derived state.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store, Derived } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
});
doubledStore.mount();

function App() {
  const count = useStore(countStore);
  const doubledCount = useStore(doubledStore);

  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
      <div>Doubled - {doubledCount}</div>
    </div>
  );
}

export default App;
```

We use the `Derived` class to create a new store that is derived from another store. The `Derived` class has a `mount` method that will start the derived store updating.

Once we've created the derived store we can use it in the `App` component just like we would any other store using the `useStore` hook.

You can find out everything you need to know on how to use TanStack Store in the [TanStack Store documentation](https://tanstack.com/store/latest).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).
