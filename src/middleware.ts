import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

/*
export const middleware = (req: Request) => {
  const url = req.url;

  console.log(url);

  return NextResponse.next();
};
*/

export default auth;

export const config = {
  matcher: ['/((?!apoi|_next/static|_next/image|favicon.ico).*)'],
};
