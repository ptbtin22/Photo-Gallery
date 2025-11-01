# Photo Gallery App

A modern, responsive photo gallery application built with React and powered by the Lorem Picsum API. Features infinite scrolling, photo details, and smooth navigation.

## Features

✨ **Photo Grid Display** - Browse photos in a responsive grid layout
🔄 **Infinite Scroll** - Automatically loads more photos as you scroll
🖼️ **Photo Details** - Click any photo to view full details including author, dimensions, and description
📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
⚡ **Fast & Efficient** - Built with Vite for optimal performance
🎨 **Modern UI** - Styled with Tailwind CSS for a clean, professional look

## Tech Stack

- **React 19** - Latest version with modern hooks
- **React Router DOM** - For client-side routing
- **Tailwind CSS 4** - For responsive styling
- **Vite** - Fast development and build tool
- **Lorem Picsum API** - Free photo provider

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd photo-gallery
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Browsing Photos

- The home page displays a grid of photos from Lorem Picsum
- Scroll down to automatically load more photos
- Each photo thumbnail shows the author's name

### Viewing Photo Details

- Click on any photo to view its details
- The detail page shows:
  - Full-size image
  - Author information
  - Photo dimensions
  - Description
  - Link to original source (Unsplash)
  - Download button

### Navigation

- Use the back button to return to the gallery
- Navigate directly using URLs:
  - `/photos` - Main gallery
  - `/photos/:id` - Individual photo detail

## Project Structure

```
photo-gallery/
├── src/
│   ├── components/
│   │   ├── PhotoList.jsx      # Main gallery with infinite scroll
│   │   └── PhotoDetail.jsx    # Individual photo detail view
│   ├── App.jsx                 # Router configuration
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles (Tailwind)
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Reference

This app uses the [Lorem Picsum API](https://picsum.photos/):

- `GET https://picsum.photos/v2/list?page={page}&limit={limit}` - Get list of photos
- `GET https://picsum.photos/id/{id}/info` - Get photo details
- `https://picsum.photos/id/{id}/{width}/{height}` - Get photo image

## Features in Detail

### Infinite Scroll Implementation

The app uses the Intersection Observer API to detect when the user scrolls near the bottom of the page, automatically fetching and displaying more photos without manual pagination.

### Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-3 column grid
- **Desktop**: 4 column grid with hover effects

### Loading States

- Animated loading indicators while fetching data
- Skeleton screens for better UX
- Error handling with user-friendly messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Acknowledgments

- Photos provided by [Lorem Picsum](https://picsum.photos/)
- Images sourced from [Unsplash](https://unsplash.com/)
