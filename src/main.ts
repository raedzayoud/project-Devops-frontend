import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // Add this for bar charts
  BarController, // Add this for bar charts
  LineController, // Add this for line charts
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register all the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // Register bar element
  BarController, // Register bar controller
  LineController, // Register line controller
  Title,
  Tooltip,
  Legend,
  Filler
);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
