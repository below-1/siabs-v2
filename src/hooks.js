import { v4 as uuid } from '@lukeed/uuid';
import * as session from './session'

import * as cookie from 'cookie';

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.userid = cookies['userid'] || uuid();

	if (cookies['username']) {
		const session_data = await session.load(cookies['username'])
		event.locals.session = session_data;
	}

	const response = await resolve(event);

	if (!cookies['userid']) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('userid', event.locals.userid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};

export async function getSession(event) {
	return event.locals.session ? event.locals.session : {}
}