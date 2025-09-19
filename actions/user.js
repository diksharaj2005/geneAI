"use server";

import { db } from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";


const normalizeAIEnums = (insights) => ({
  ...insights,
  demandLevel: insights.demandLevel?.toUpperCase(),    
  marketOutlook: insights.marketOutlook?.toUpperCase(),
});

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  try {
   
    let industryInsight = await db.industryInsight.findUnique({
      where: { industry: data.industry },
    });

    let insights;
    if (!industryInsight) {
      
      insights = await generateAIInsights(data.industry);
      insights = normalizeAIEnums(insights);
    }

    // 2️⃣ Per
    const result = await db.$transaction(
      async (tx) => {
        if (!industryInsight && insights) {
          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // next week
            },
          });
        }

        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            industry: data.industry,
            experience: data.experience ?? null,
            bio: data.bio ?? null,
            skills: data.skills ?? null,
          },
        });

        return { updatedUser, industryInsight };
      },
      { timeout: 10000 }
    );

    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry:", error);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true },
    });

    return { isOnboarded: !!user?.industry };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return { isOnboarded: false };
  }
}
