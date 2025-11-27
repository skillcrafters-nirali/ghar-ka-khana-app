# Project Structure

## 📁 Folder Organization

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (Button, Input, etc.)
│   ├── ui/              # UI-specific components
│   └── index.js         # Component exports
├── screens/             # Screen components
│   ├── auth/            # Authentication screens
│   ├── main/            # Main app screens
│   └── orders/          # Order-related screens
├── navigation/          # Navigation configuration
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── services/            # API services and external integrations
├── utils/               # Utility functions and helpers
├── constants/           # App constants and configuration
└── styles/              # Global styles and themes
```

## 🎯 Key Features

### **Professional Structure Benefits:**
- **Scalable**: Easy to add new features
- **Maintainable**: Clear separation of concerns
- **Reusable**: Shared components and utilities
- **Organized**: Logical folder grouping

### **Import Examples:**
```javascript
// Components
import { Button, ProfileDropdown } from '../components';

// Styles
import { colors, fonts } from '../styles';

// Constants
import { SCREENS, ORDER_STATUS } from '../constants';

// Utils
import { formatCurrency, validateEmail } from '../utils/helpers';

// Hooks
import { useCart } from '../hooks/useCart';

// Services
import ApiService from '../services/api';
```

### **Screen Categories:**
- **Auth**: Login, Register, OTP, Password Reset
- **Main**: Home, Profile, Provider Details, Menu
- **Orders**: Cart, Checkout, Payment, History, Subscriptions

### **Custom Hooks:**
- `useCart`: Cart state management
- `useAuth`: Authentication state (existing)

### **Services:**
- `ApiService`: Centralized API calls
- Future: Push notifications, Analytics, etc.

This structure follows React Native best practices and scales well for enterprise applications.