import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout'
import {
  AccountSettingsPage,
  AdvancedTablePage,
  AnalyticsDashboard,
  BasicTablePage,
  BillingSettingsPage,
  BlankPage,
  ButtonsPage,
  CalendarPage,
  ChartsPage,
  ChatPage,
  CrmDashboard,
  CustomerCreatePage,
  CustomerDetailPage,
  CustomersPage,
  DataDisplayPage,
  DesignSystemPage,
  DocsPage,
  ErrorPage,
  FeedbackPage,
  FileManagerPage,
  FinanceDashboard,
  ForgotPasswordPage,
  FormsPage,
  InboxPage,
  InputsPage,
  InvoicePage,
  KanbanPage,
  LayoutsPage,
  LockScreenPage,
  LoginPage,
  NavigationPage,
  NotificationSettingsPage,
  OverviewDashboard,
  PlaygroundPage,
  PricingPage,
  ProfilePage,
  ProjectsDashboard,
  RegisterPage,
  ResetPasswordPage,
  RolesPage,
  SaasDashboard,
  SecuritySettingsPage,
  TasksPage,
  TwoFactorPage,
  TypographyPage,
  UsersPage,
} from '@/pages'

function AuthLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="two-factor" element={<TwoFactorPage />} />
        <Route path="verify-email" element={<TwoFactorPage />} />
        <Route path="lock" element={<LockScreenPage />} />
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    </div>
  )
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />} />

      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/dashboards/overview" replace />} />

        <Route path="dashboards/overview" element={<OverviewDashboard />} />
        <Route path="dashboards/analytics" element={<AnalyticsDashboard />} />
        <Route path="dashboards/saas" element={<SaasDashboard />} />
        <Route path="dashboards/crm" element={<CrmDashboard />} />
        <Route path="dashboards/projects" element={<ProjectsDashboard />} />
        <Route path="dashboards/finance" element={<FinanceDashboard />} />

        <Route path="design-system" element={<DesignSystemPage />} />
        <Route path="design-system/typography" element={<TypographyPage />} />
        <Route path="design-system/colors" element={<DesignSystemPage />} />
        <Route path="design-system/playground" element={<PlaygroundPage />} />

        <Route path="components/buttons" element={<ButtonsPage />} />
        <Route path="components/forms" element={<FormsPage />} />
        <Route path="components/inputs" element={<InputsPage />} />
        <Route path="components/selection" element={<InputsPage />} />
        <Route path="components/feedback" element={<FeedbackPage />} />
        <Route path="components/navigation" element={<NavigationPage />} />
        <Route path="components/data-display" element={<DataDisplayPage />} />
        <Route path="components/charts" element={<ChartsPage />} />

        <Route path="tables/basic" element={<BasicTablePage />} />
        <Route path="tables/advanced" element={<AdvancedTablePage />} />

        <Route path="layouts" element={<LayoutsPage />} />
        <Route path="layouts/:variant" element={<LayoutsPage />} />

        <Route path="apps/calendar" element={<CalendarPage />} />
        <Route path="apps/kanban" element={<KanbanPage />} />
        <Route path="apps/chat" element={<ChatPage />} />
        <Route path="apps/inbox" element={<InboxPage />} />
        <Route path="apps/file-manager" element={<FileManagerPage />} />
        <Route path="apps/tasks" element={<TasksPage />} />

        <Route path="pages/auth/login" element={<LoginPage />} />
        <Route path="pages/auth/register" element={<RegisterPage />} />
        <Route path="pages/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="pages/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="pages/auth/verify-email" element={<TwoFactorPage />} />
        <Route path="pages/users" element={<UsersPage />} />
        <Route path="pages/customers" element={<CustomersPage />} />
        <Route path="pages/customers/new" element={<CustomerCreatePage />} />
        <Route path="pages/customers/:id" element={<CustomerDetailPage />} />
        <Route path="pages/roles" element={<RolesPage />} />
        <Route path="pages/settings/general" element={<AccountSettingsPage />} />
        <Route path="pages/settings/account" element={<AccountSettingsPage />} />
        <Route path="pages/settings/security" element={<SecuritySettingsPage />} />
        <Route path="pages/settings/notifications" element={<NotificationSettingsPage />} />
        <Route path="pages/settings/appearance" element={<AccountSettingsPage />} />
        <Route path="pages/profile" element={<ProfilePage />} />
        <Route path="pages/billing" element={<BillingSettingsPage />} />
        <Route path="pages/pricing" element={<PricingPage />} />
        <Route path="pages/invoice" element={<InvoicePage />} />

        <Route path="errors/404" element={<ErrorPage />} />
        <Route path="errors/*" element={<ErrorPage />} />

        <Route path="docs" element={<DocsPage />} />
        <Route path="docs/:section" element={<DocsPage />} />

        <Route path="blank" element={<BlankPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}
