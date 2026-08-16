import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: "drop.fill" | "shield.fill" | "bandage.fill" | "waveform.path.ecg" | "checkmark.circle.fill";
  duration: string;
};

const STEPS: Step[] = [
  {
    id: 1,
    title: "Clean the Wound",
    description:
      "Rinse the wound thoroughly under clean running water for at least 5 minutes. Remove any visible dirt or debris gently. Do not scrub the wound as this can cause further damage.",
    icon: "drop.fill",
    duration: "5 min",
  },
  {
    id: 2,
    title: "Apply Antiseptic",
    description:
      "Pat the wound dry with a clean cloth or sterile gauze. Apply a thin layer of antiseptic solution (such as iodine or hydrogen peroxide) to prevent infection. Allow it to dry.",
    icon: "shield.fill",
    duration: "2 min",
  },
  {
    id: 3,
    title: "Cover the Wound",
    description:
      "Place a sterile bandage or dressing over the wound. Ensure the bandage is large enough to cover the entire wound area. Secure it firmly but not too tightly.",
    icon: "bandage.fill",
    duration: "2 min",
  },
  {
    id: 4,
    title: "Monitor for Infection",
    description:
      "Check the wound daily for signs of infection: increased redness, swelling, warmth, pus, or fever. Change the dressing every 24 hours or when it becomes wet or dirty.",
    icon: "waveform.path.ecg",
    duration: "Daily",
  },
  {
    id: 5,
    title: "Seek Medical Help if Needed",
    description:
      "Visit a doctor if the wound is deep, won't stop bleeding, shows signs of infection, or if you haven't had a tetanus shot in the past 5 years.",
    icon: "checkmark.circle.fill",
    duration: "If needed",
  },
];

export default function StepsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (id: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDone = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push("/");
  };

  const allDone = completedSteps.size === STEPS.length;

  const renderStep = ({ item, index }: { item: Step; index: number }) => {
    const isCompleted = completedSteps.has(item.id);
    return (
      <Pressable
        onPress={() => toggleStep(item.id)}
        style={({ pressed }) => [
          styles.stepCard,
          {
            backgroundColor: isCompleted ? `${colors.primary}10` : colors.surface,
            borderColor: isCompleted ? colors.primary : colors.border,
          },
          pressed && { opacity: 0.8 },
        ]}
      >
        {/* Step Number + Icon */}
        <View style={styles.stepLeft}>
          <View
            style={[
              styles.stepNumberCircle,
              {
                backgroundColor: isCompleted ? colors.primary : `${colors.primary}15`,
              },
            ]}
          >
            {isCompleted ? (
              <IconSymbol name="checkmark.circle.fill" size={20} color="#FFFFFF" />
            ) : (
              <Text style={[styles.stepNumber, { color: colors.primary }]}>{item.id}</Text>
            )}
          </View>
          {index < STEPS.length - 1 && (
            <View
              style={[
                styles.stepConnector,
                { backgroundColor: isCompleted ? colors.primary : colors.border },
              ]}
            />
          )}
        </View>

        {/* Step Content */}
        <View style={styles.stepContent}>
          <View style={styles.stepTitleRow}>
            <View
              style={[
                styles.stepIconBadge,
                { backgroundColor: isCompleted ? colors.primary : `${colors.primary}15` },
              ]}
            >
              <IconSymbol
                name={item.icon}
                size={18}
                color={isCompleted ? "#FFFFFF" : colors.primary}
              />
            </View>
            <View style={styles.stepTitleGroup}>
              <Text
                style={[
                  styles.stepTitle,
                  {
                    color: isCompleted ? colors.primary : colors.foreground,
                    textDecorationLine: isCompleted ? "line-through" : "none",
                  },
                ]}
              >
                {item.title}
              </Text>
              <View style={[styles.durationBadge, { backgroundColor: `${colors.primary}15` }]}>
                <Text style={[styles.durationText, { color: colors.primary }]}>{item.duration}</Text>
              </View>
            </View>
          </View>
          <Text style={[styles.stepDescription, { color: isCompleted ? colors.muted : colors.foreground }]}>
            {item.description}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
        >
          <IconSymbol name="arrow.left" size={22} color={colors.primary} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Treatment Steps</Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>Abrasion</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress */}
      <View style={[styles.progressContainer, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View style={styles.progressInfo}>
          <Text style={[styles.progressLabel, { color: colors.muted }]}>Progress</Text>
          <Text style={[styles.progressCount, { color: colors.primary }]}>
            {completedSteps.size}/{STEPS.length} steps
          </Text>
        </View>
        <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: colors.primary,
                width: `${(completedSteps.size / STEPS.length) * 100}%`,
              },
            ]}
          />
        </View>
      </View>

      <FlatList
        data={STEPS}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderStep}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Pressable
            onPress={handleDone}
            style={({ pressed }) => [
              styles.doneButton,
              {
                backgroundColor: allDone ? colors.success : colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <IconSymbol name="checkmark.circle.fill" size={22} color="#FFFFFF" />
            <Text style={styles.doneButtonText}>{allDone ? "All Done! Go Home" : "Mark as Done"}</Text>
          </Pressable>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    alignItems: "center",
    gap: 2,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  progressCount: {
    fontSize: 13,
    fontWeight: "700",
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  listContent: {
    padding: 16,
    gap: 0,
    paddingBottom: 24,
  },
  stepCard: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 12,
    overflow: "hidden",
  },
  stepLeft: {
    width: 52,
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 0,
  },
  stepNumberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: {
    fontSize: 15,
    fontWeight: "700",
  },
  stepConnector: {
    width: 2,
    flex: 1,
    marginTop: 4,
    marginBottom: -12,
    borderRadius: 1,
  },
  stepContent: {
    flex: 1,
    padding: 16,
    paddingLeft: 8,
    gap: 10,
  },
  stepTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  stepIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  stepTitleGroup: {
    flex: 1,
    gap: 4,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  durationBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 11,
    fontWeight: "600",
  },
  stepDescription: {
    fontSize: 13,
    lineHeight: 19,
  },
  doneButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 8,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#1A8FE3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
