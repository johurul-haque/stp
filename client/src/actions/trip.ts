"use server";

import { handleAxiosErrors } from "@/lib/axios/handle-errors";
import { serverFetch } from "@/lib/axios/server-fetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTrip<T>(payload: T) {
  try {
    await serverFetch.post("/api/trips", payload);
  } catch (error) {
    handleAxiosErrors(error);
  }

  revalidatePath("/trips");
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

export async function updateTrip<T>(payload: T, tripId: string) {
  try {
    await serverFetch.patch(`/api/trips/${tripId}`, payload);
  } catch (error) {
    handleAxiosErrors(error);
  }

  revalidatePath("/trips");
  revalidatePath("/dashboard", "layout");
  redirect(`/trips/${tripId}`);
}

export async function deleteTrip(tripId: string) {
  try {
    await serverFetch.delete(`/api/trips/${tripId}`);
  } catch (error) {
    handleAxiosErrors(error);
  }

  revalidatePath("/", "layout");
}

export async function sendJoinRequest(tripId: string) {
  try {
    await serverFetch.post(`/api/trips/${tripId}/request`);
  } catch (error) {
    console.error("from actions", error);
    handleAxiosErrors(error);
  }

  revalidatePath(`/trips/${tripId}`);
  redirect(`/trips/${tripId}`);
}
