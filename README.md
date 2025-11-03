# Movement 🤜✊🤛

**Make Your Voice Heard. Contact Your Representatives in Minutes.**

Movement is a viral-ready civic engagement platform that combines the campaign tracking power of Change.org with the easy representative contact features of Democracy.io. Create campaigns, rally supporters, and make contacting your representatives as easy as clicking a button.

## 🎯 Features

### For Activists
- **Start Campaigns**: Create campaigns around issues you care about
- **Track Impact**: See real-time stats on how many people have taken action
- **Share Easily**: Built-in social sharing to amplify your message
- **Trending Discovery**: Find the most popular campaigns

### For Citizens
- **Quick Action**: Contact your representatives in under 2 minutes
- **Auto Rep Lookup**: Just enter your ZIP code - we find your representatives
- **Pre-Written Messages**: Customize template messages or write your own
- **Track Your Impact**: See how your actions contribute to the movement

### Design & UX
- **Modern, Viral-Ready Design**: Eye-catching gradients and animations
- **Mobile Responsive**: Works perfectly on all devices
- **Social Proof**: Counters, progress bars, and trending indicators
- **Frictionless Experience**: Minimal clicks from discovery to action

## 🚀 Getting Started

### Quick Start

1. Clone this repository
2. Open `index.html` in your browser
3. That's it! No build process required.

### For Development

```bash
# Clone the repository
git clone https://github.com/yourusername/movement.git

# Navigate to the directory
cd movement

# Open in browser
open index.html
# or just drag index.html into your browser
```

## 📁 Project Structure

```
movement/
├── index.html      # Main HTML file with all pages
├── styles.css      # Modern, responsive styling
├── app.js          # All JavaScript functionality
└── README.md       # This file
```

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Storage**: LocalStorage for demo purposes
- **Fonts**: Google Fonts (Inter)
- **No Dependencies**: Zero npm packages, zero build process

## 🎨 Key Pages

### Home Page
- Hero section with compelling stats
- "How It Works" explanation
- Trending campaigns grid

### Create Campaign
- Simple form to start new campaigns
- Category selection
- Message template creation
- Target level selection (Federal, State, Local)

### Campaign Detail/Action
- Full campaign information
- Representative lookup by ZIP code
- One-click message sending
- Progress tracking and social sharing

## 💡 How It Works

1. **Browse Campaigns**: Users discover campaigns on the home page
2. **Take Action**: Click a campaign, enter ZIP code, and send a message
3. **Find Representatives**: System automatically finds relevant representatives
4. **Send Message**: Pre-filled message sent to all representatives (simulated)
5. **Track & Share**: Watch the counter grow and share to amplify impact

## 🔧 Customization

### Adding Real Representative Lookup

Replace the `findRepresentatives()` function in `app.js` with a real API:

```javascript
async function findRepresentatives(address, targetLevel) {
    // Use Google Civic Information API
    const response = await fetch(
        `https://www.googleapis.com/civicinfo/v2/representatives?address=${address}&key=YOUR_API_KEY`
    );
    const data = await response.json();
    return parseRepresentatives(data);
}
```

### Adding Backend Storage

Currently uses LocalStorage. For production:

1. Set up a backend (Node.js, Python, etc.)
2. Replace `saveCampaigns()` with API calls
3. Add user authentication
4. Store actions in a database

### Integrating Real Contact Systems

Replace the `sendMessage()` function with integrations to:
- Official congressional contact forms
- State legislature systems
- Local government portals
- Email APIs (SendGrid, Mailgun)

## 🎯 Production Considerations

For a production deployment, consider:

- [ ] Real representative database/API (Google Civic Information API)
- [ ] Backend for campaign storage and user management
- [ ] Authentication system
- [ ] Rate limiting to prevent spam
- [ ] Email verification
- [ ] Actual message delivery integration
- [ ] Analytics and tracking
- [ ] SEO optimization
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Security measures (CSRF protection, input sanitization)

## 📊 Demo Data

The app comes with 6 sample campaigns covering:
- Education (Pre-K funding, teacher pay)
- Infrastructure (rural broadband)
- Environment (green spaces)
- Healthcare (mental health services)
- Housing (affordability)

These demonstrate the platform's versatility across issues.

## 🌟 Viral Features

What makes this site go viral:

1. **Social Proof**: Real-time counters showing growing action
2. **Easy Sharing**: One-click social media sharing
3. **Progress Bars**: Visual feedback on campaign momentum
4. **Trending Section**: Discover what others care about
5. **Quick Action**: 2-minute commitment reduces friction
6. **Emotional Design**: Gradients, animations, and engaging copy

## 🤝 Contributing

Want to improve Movement? Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this for your own projects!

## 🙏 Inspiration

This project is inspired by:
- **Change.org**: Campaign creation and social proof mechanics
- **Democracy.io**: Easy representative contact functionality
- **Modern web design**: Gradients, animations, and mobile-first approach

## 📧 Contact

Have questions or suggestions? Open an issue or reach out!

---

**Built with ❤️ for civic engagement**

*Remember: Real change requires real action. This platform makes it easy.*
