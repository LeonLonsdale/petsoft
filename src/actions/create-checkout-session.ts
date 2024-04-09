'use server';

import { redirect } from 'next/navigation';
import { authCheck } from '@/lib/server-utils';
import { paths } from '@/lib/paths';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async () => {
  const userSession = await authCheck();

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: userSession.user.email,
    // line items: the products to display on the page
    line_items: [{ price: 'price_1P3dD100aBxCONuGOLglsCVg', quantity: 1 }],
    // mode: payment, subscription etc
    mode: 'payment',
    success_url: `${process.env.BASE_URL}${paths.payments.path('?success=true')}`,
    cancel_url: `${process.env.BASE_URL}${paths.payments.path('?cancelled=true')}`,
  });

  redirect(checkoutSession.url);
};
