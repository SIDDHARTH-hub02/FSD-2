# Experiment-6 — MUI Form & Validations

This experiment demonstrates building a frontend registration form using Material UI (MUI) components with client-side validations, responsive styling, and basic UX enhancements.

## Learning outcomes

By completing this experiment you will be able to:

1. Implement forms using Material UI components (TextField, Checkbox, RadioGroup, Button, Alert) and compose them into an accessible layout.
2. Add client-side validation logic (required fields, email format, password strength, confirm-password matching) using straightforward JavaScript/React patterns and regex.
3. Manage form state and validation feedback in React using controlled components and local state (`useState`) to provide immediate user feedback.
4. Customize component appearance using both MUI `sx` props and project CSS to control typography, spacing, and visual hierarchy while keeping a white card-style background.
5. Improve UX by enabling/disabling controls based on form state (e.g., disabling submit until terms accepted), showing success messages, and providing reset functionality.
6. Verify app behavior through development tools (HMR during `npm run dev`) and confirm production builds with `npm run build`.
7. Ensure text contrast and accessibility considerations by adjusting label/caption colors for readability and using semantic form controls.
8. Integrate third-party libraries (adding MUI and its emotion dependencies) and resolve dependency installation, ensuring the local development environment compiles successfully.

## How to run

- Install dependencies: `npm install`
- Start dev server: `npm run dev` and open `http://localhost:5173/`
- Build for production: `npm run build`

---

If you'd like, I can extend this with form-level schema validation using `Yup` + `Formik` or `react-hook-form`, or add unit/e2e tests for the form flows.