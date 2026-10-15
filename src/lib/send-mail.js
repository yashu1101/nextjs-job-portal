import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function SendMail({ to, subject, text }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "JobFinder <onboarding@resend.dev>",
      to: [to],
      subject,
      text,
    });

    if (error) {
      console.error("Verification email failed:", error);
      throw new Error(error.message || "Email could not be sent");
    }

    console.log("Verification email sent successfully:", data?.id);

    return data;
  } catch (error) {
    console.error("SendMail error:", error?.message || error);
    throw error;
  }
}