# VidTube Frontend

This is the frontend for VidTube, a minimalist video sharing platform built with React and Vite.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- **Authentication**: Login and registration with JWT tokens
- **Responsive Design**: Modern dark theme with mobile-friendly layout
- **Video Grid**: Clean video card layout with hover effects
- **Protected Routes**: Authentication-based route protection
- **Performance Optimizations**: Lazy loading, code splitting, and memoization

## Performance Features

### Lazy Loading
- **Image Lazy Loading**: Video thumbnails load only when entering viewport
- **Code Splitting**: Login/Register components loaded on-demand
- **Skeleton Loading**: Smooth loading states with animated placeholders

### Responsive Optimizations
- **Mobile-First**: Optimized for all screen sizes
- **Adaptive Grid**: Dynamic video grid columns based on screen size
- **Touch-Friendly**: Proper button sizes and spacing for mobile devices

### Performance Hooks
- **useLazyLoading**: Intersection Observer-based lazy loading
- **useDebounce**: Debounced search and input handling
- **useWindowSize**: Responsive breakpoint detection
- **useInfiniteScroll**: Future-ready infinite scrolling capability

## Styling

The frontend uses a modern dark theme inspired by popular video platforms:

- **Color Scheme**: Dark background (#0f0f0f) with red accents (#ff0000)
- **Typography**: Roboto font family for clean readability
- **Components**: Card-based design with subtle shadows and animations
- **Responsive**: Mobile-first approach with breakpoints

### Key Style Files:
- `src/index.css`: Global styles and component styles
- `src/App.css`: Component-specific styles and utilities

### Design Features:
- Smooth transitions and hover effects
- Loading animations
- Form validation styling
- Consistent spacing and typography

- Minimalist UI with a clean design
- Video grid display with thumbnails
- Basic navigation header
- Responsive layout

## Project Structure

- `src/App.jsx` - Main app component
- `src/main.jsx` - Entry point
- `src/index.css` - Global styles
- `index.html` - HTML template
- `vite.config.js` - Vite configuration

## Next Steps

- Integrate with the backend API for real video data
- Add video player functionality
- Implement user authentication
- Add upload feature

This is a basic setup. Expand as needed for full functionality.