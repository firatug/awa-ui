export interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  popular?: boolean
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    period: 'month',
    description: 'For small teams getting started',
    features: ['Up to 5 users', '10 GB storage', 'Basic analytics', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    period: 'month',
    description: 'For growing teams that need more',
    features: ['Up to 25 users', '100 GB storage', 'Advanced analytics', 'Priority support', 'Custom branding'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: 'month',
    description: 'For organizations at scale',
    features: ['Unlimited users', 'Unlimited storage', 'SSO & SAML', 'Dedicated support', 'SLA guarantee', 'Audit logs'],
  },
]

export interface InvoiceLineItem {
  description: string
  quantity: number
  unitPrice: number
}

export interface Invoice {
  id: string
  number: string
  date: string
  dueDate: string
  status: 'paid' | 'pending' | 'overdue'
  billTo: { name: string; email: string; address: string }
  from: { name: string; email: string; address: string }
  items: InvoiceLineItem[]
  taxRate: number
}

export const sampleInvoice: Invoice = {
  id: 'inv-0842',
  number: 'INV-2026-0842',
  date: 'July 1, 2026',
  dueDate: 'July 15, 2026',
  status: 'paid',
  billTo: {
    name: 'Acme Corporation',
    email: 'billing@acme.com',
    address: '123 Business Ave, San Francisco, CA 94102',
  },
  from: {
    name: 'Studio Billing',
    email: 'billing@example.com',
    address: '456 Design Blvd, New York, NY 10001',
  },
  items: [
    { description: 'Pro Plan — Monthly subscription', quantity: 1, unitPrice: 79 },
    { description: 'Additional seats (×10)', quantity: 10, unitPrice: 8 },
    { description: 'Premium support add-on', quantity: 1, unitPrice: 49 },
  ],
  taxRate: 8.5,
}

export interface PaymentMethod {
  id: string
  type: 'visa' | 'mastercard'
  last4: string
  expiry: string
  default: boolean
}

export const paymentMethods: PaymentMethod[] = [
  { id: '1', type: 'visa', last4: '4242', expiry: '12/28', default: true },
  { id: '2', type: 'mastercard', last4: '8888', expiry: '06/27', default: false },
]

export interface BillingHistoryItem {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  invoice: string
}

export const billingHistory: BillingHistoryItem[] = [
  { id: '1', date: 'Jul 1, 2026', amount: 168.72, status: 'paid', invoice: 'INV-2026-0842' },
  { id: '2', date: 'Jun 1, 2026', amount: 168.72, status: 'paid', invoice: 'INV-2026-0721' },
  { id: '3', date: 'May 1, 2026', amount: 168.72, status: 'paid', invoice: 'INV-2026-0598' },
  { id: '4', date: 'Apr 1, 2026', amount: 149.00, status: 'paid', invoice: 'INV-2026-0412' },
]
