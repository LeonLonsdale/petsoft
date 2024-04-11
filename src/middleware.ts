// import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { nextAuthEdgeConfig } from './lib/auth-edge';

export default NextAuth(nextAuthEdgeConfig).auth;

export const config = {
  matcher: ['/((?!apoi|_next/static|_next/image|favicon.ico).*)'],
};
