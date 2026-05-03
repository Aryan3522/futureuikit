# Future UI - Modern Reusable Components

Future UI is an open-source library of high-performance, visually stunning, and reusable UI components specifically designed for Next.js applications. Built with **React 19**, **Next.js 16**, and **Tailwind CSS 4**, it provides a foundation for building modern, futuristic web interfaces with ease.

![Future UI Banner](public/next.svg)

## 🚀 Features

- **Modern Tech Stack**: Leveraging React 19 and Next.js 16 (App Router).
- **Tailwind CSS 4**: Optimized styling with the latest Tailwind features.
- **Glassmorphism & Glow Effects**: Built-in support for futuristic aesthetics.
- **Interactive Previews**: Live code and preview playground for every component.
- **Dark Mode First**: Seamless theme switching with persistent storage.
- **Performance Optimized**: Minimal bundle size and fast load times.
- **Open Source**: Built by the community, for the community.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Inter & Poppins

## 💻 Getting Started

### Prerequisites

- **Node.js**: 18.x or later
- **npm**: 9.x or later (or yarn/pnpm)

### Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aryan3522/future-ui.git
   cd future-ui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access the library**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to explore the components.

## CLI Usage

After the package is published to npm, users can install a component with:

```bash
npx future-ui add boxy-bounce
```

The CLI downloads component files from the registry endpoint configured in `package.json`:

```json
{
  "config": {
    "registryUrl": "https://future-ui.vercel.app/api/registry"
  }
}
```

If your production deployment uses a different domain, update `config.registryUrl` before publishing to npm. You can also override the registry during testing:

```bash
npx future-ui add boxy-bounce --registry https://your-site.vercel.app/api/registry
```

## Release Checklist

1. Deploy the Next.js app.
2. Verify the registry response:
   ```bash
   curl https://future-ui.vercel.app/api/registry/boxy-bounce
   ```
3. Verify the npm package exposes the CLI:
   ```bash
   npm pack --dry-run
   npm view future-ui bin
   ```
4. Publish the new version:
   ```bash
   npm publish
   ```
5. Validate from npm:
   ```bash
   npx future-ui@latest add boxy-bounce
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory and add the following variables:

```env
# Project Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
FUTURE_UI_REGISTRY_URL=http://localhost:3000/api/registry
NEXT_PUBLIC_GITHUB_REPO=https://github.com/Aryan3522/future-ui
NEXT_PUBLIC_GITHUB_PROFILE=https://github.com/Aryan3522
NEXT_PUBLIC_LINKEDIN_PROFILE=https://www.linkedin.com/in/aryan-hooda-code/
```

## 🤝 Contributing

Future UI is open-source and we love contributions! Whether you're fixing a bug, adding a new component, or improving documentation, your help is welcome.

### How to Collaborate:

1. **Fork the Project**: Click the 'Fork' button at the top right of this page.
2. **Create a Branch**: 
   ```bash
   git checkout -b feature/amazing-component
   ```
3. **Commit your Changes**: 
   ```bash
   git commit -m "feat: Add a new GlassyCard component"
   ```
4. **Push to the Branch**: 
   ```bash
   git push origin feature/amazing-component
   ```
5. **Open a Pull Request**: Go to the original repository and click 'New Pull Request'.

### Contribution Guidelines:
- Ensure your code follows the existing style and conventions.
- Add comments where necessary.
- Update the documentation/README if you're adding new features.
- Test your changes thoroughly before submitting.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

If you find this project helpful, give it a ⭐ on [GitHub](https://github.com/Aryan3522/future-ui)!

---

Built with ❤️ by [Aryan Hooda](https://github.com/Aryan3522) and the Open Source Community.
