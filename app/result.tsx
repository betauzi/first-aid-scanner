import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

type Severity = "low" | "medium" | "high";

const MOCK_RESULT = {
  woundType: "Abrasion",
  woundDescription: "Superficial skin scrape with minor tissue damage",
  severity: "low" as Severity,
  confidence: 87,
  treatments: [
    "Rinse the wound gently with clean water",
    "Apply antiseptic solution or cream",
    "Cover with a sterile bandage",
    "Monitor for signs of infection",
  ],
};

const SEVERITY_CONFIG: Record<Severity, { label: string; color: string; bg: string; icon: "checkmark.circle.fill" | "exclamationmark.triangle.fill" | "shield.fill" }> = {
  low: {
    label: "Low Severity",
    color: "#1A7A3C",
    bg: "#D4EDDA",
    icon: "checkmark.circle.fill",
  },
  medium: {
    label: "Medium Severity",
    color: "#7D5A00",
    bg: "#FFF3CD",
    icon: "exclamationmark.triangle.fill",
  },
  high: {
    label: "High Severity",
    color: "#7D1A1A",
    bg: "#F8D7DA",
    icon: "shield.fill",
  },
};

export default function ResultScreen() {
  const router = useRouter();
  const colors = useColors();
  const result = MOCK_RESULT;
  const severityConfig = SEVERITY_CONFIG[result.severity];

  const handleViewSteps = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/steps");
  };

  const handleFindHospital = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In a real app, this would open maps
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
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Scan Result</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Wound Type Card */}
        <View style={[styles.mainCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* Wound Icon */}
          <View style={[styles.woundIconContainer, { backgroundColor: `${colors.primary}15` }]}>
            <IconSymbol name="bandage.fill" size={40} color={colors.primary} />
          </View>

          {/* Wound Type */}
          <Text style={[styles.woundType, { color: colors.foreground }]}>{result.woundType}</Text>
          <Text style={[styles.woundDescription, { color: colors.muted }]}>
            {result.woundDescription}
          </Text>

          {/* Severity Badge */}
          <View style={[styles.severityBadge, { backgroundColor: severityConfig.bg }]}>
            <IconSymbol name={severityConfig.icon} size={16} color={severityConfig.color} />
            <Text style={[styles.severityText, { color: severityConfig.color }]}>
              {severityConfig.label}
            </Text>
          </View>

          {/* Confidence */}
          <View style={styles.confidenceRow}>
            <Text style={[styles.confidenceLabel, { color: colors.muted }]}>AI Confidence</Text>
            <View style={styles.confidenceBarContainer}>
              <View style={[styles.confidenceBarBg, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.confidenceBarFill,
                    { backgroundColor: colors.primary, width: `${result.confidence}%` },
                  ]}
                />
              </View>
              <Text style={[styles.confidenceValue, { color: colors.primary }]}>
                {result.confidence}%
              </Text>
            </View>
          </View>
        </View>

        {/* Treatment Summary */}
        <View style={[styles.treatmentCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.treatmentHeader}>
            <IconSymbol name="list.bullet" size={20} color={colors.primary} />
            <Text style={[styles.treatmentTitle, { color: colors.foreground }]}>
              Treatment Summary
            </Text>
          </View>
          {result.treatments.map((treatment, index) => (
            <View key={index} style={styles.treatmentItem}>
              <View style={[styles.treatmentBullet, { backgroundColor: colors.primary }]}>
                <Text style={styles.treatmentBulletText}>{index + 1}</Text>
              </View>
              <Text style={[styles.treatmentText, { color: colors.foreground }]}>{treatment}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={handleViewSteps}
            style={({ pressed }) => [
              styles.primaryActionBtn,
              { backgroundColor: colors.primary },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <IconSymbol name="list.bullet" size={20} color="#FFFFFF" />
            <Text style={styles.primaryActionText}>View Steps</Text>
          </Pressable>

          <Pressable
            onPress={handleFindHospital}
            style={({ pressed }) => [
              styles.secondaryActionBtn,
              { backgroundColor: colors.surface, borderColor: colors.primary },
              pressed && { opacity: 0.7 },
            ]}
          >
            <IconSymbol name="location.fill" size={20} color={colors.primary} />
            <Text style={[styles.secondaryActionText, { color: colors.primary }]}>
              Find Nearby Hospital
            </Text>
          </Pressable>
        </View>

        {/* Disclaimer */}
        <View style={[styles.disclaimer, { backgroundColor: "#FFF8E1", borderColor: "#FFD54F" }]}>
          <IconSymbol name="exclamationmark.triangle.fill" size={14} color="#F39C12" />
          <Text style={[styles.disclaimerText, { color: "#7D5A00" }]}>
            This is an AI-generated assessment. Always consult a medical professional for serious injuries.
          </Text>
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 32,
  },
  mainCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  woundIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  woundType: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  woundDescription: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  severityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 4,
  },
  severityText: {
    fontSize: 14,
    fontWeight: "700",
  },
  confidenceRow: {
    width: "100%",
    marginTop: 8,
    gap: 8,
  },
  confidenceLabel: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  confidenceBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  confidenceBarBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  confidenceBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: "700",
    minWidth: 40,
    textAlign: "right",
  },
  treatmentCard: {
    borderRadius: 20,
    padding: 20,
    gap: 14,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  treatmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  treatmentTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  treatmentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  treatmentBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  treatmentBulletText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  treatmentText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  actionsContainer: {
    gap: 12,
  },
  primaryActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#1A8FE3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  secondaryActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  secondaryActionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  disclaimerText: {
    fontSize: 12,
    lineHeight: 17,
    flex: 1,
    fontWeight: "500",
  },
});
