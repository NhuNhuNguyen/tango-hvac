"use server";

import { createClient } from "@supabase/supabase-js";

export async function submitEstimate(formData: any) {
  // Các biến này không cần NEXT_PUBLIC_ vì đang chạy ở Server
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY! // Hoặc ANON_KEY kiểu server
  );

  const { error } = await supabase
    .from("contacts")
    .insert([
      {
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      },
    ]);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}