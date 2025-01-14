import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import type { RecordModel, AdminModel } from "pocketbase";
import { pocketbase } from "./pocketbase";

export function getUserFromCookie(cookies: ReadonlyRequestCookies | RequestCookies): AdminModel | RecordModel | null {
	if (!pocketbase) {
		return null;
	}

	const authCookie = cookies.get("pb_auth");

	if (!authCookie) {
		return null;
	}

	pocketbase.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);
	return pocketbase.authStore.model;
}
