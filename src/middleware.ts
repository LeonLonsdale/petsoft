// import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export default auth;

export const config = {
  matcher: ['/((?!apoi|_next/static|_next/image|favicon.ico).*)'],
};
