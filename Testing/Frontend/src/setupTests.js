import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.alert globally
global.alert = vi.fn();