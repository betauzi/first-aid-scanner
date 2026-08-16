import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

// ✅ lucide icons
import { Cross, Clock, BookOpen, Camera, TriangleAlert } from "lucide-react-native";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();

  const handleScanWound = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/camera");
  };

  const handleHistory = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/history");
  };

  const handleGuide = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/guide");
  };

  return (
    <ScreenContainer containerClassName="bg-background">
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
            <Cross size={32} color="#fff" />
          </View>

          <Text style={[styles.appTitle, { color: colors.foreground }]}>
            First Aid Scanner
          </Text>

          <Text style={[styles.appSubtitle, { color: colors.muted }]}>
            Quick wound assessment & guidance
          </Text>
        </View>

        {/* SCAN BUTTON */}
        <View style={styles.scanSection}>
          <Pressable
            onPress={handleScanWound}
            style={({ pressed }) => [
              styles.scanButton,
              { backgroundColor: colors.primary },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <View style={styles.scanButtonInner}>

              <View style={styles.scanIconCircle}>
                <Camera size={36} color="#fff" />
              </View>

              <Text style={styles.scanButtonText}>Scan Wound</Text>
              <Text style={styles.scanButtonSubtext}>
                Point camera at wound area
              </Text>
            </View>
          </Pressable>
        </View>

        {/* SECONDARY */}
        <View style={styles.secondaryRow}>

          <Pressable
            onPress={handleHistory}
            style={({ pressed }) => [
              styles.secondaryButton,
              { backgroundColor: colors.surface, borderColor: colors.border },
              pressed && { opacity: 0.7 },
            ]}
          >
            <Clock size={22} color={colors.primary} />
            <Text style={[styles.secondaryButtonText, { color: colors.foreground }]}>
              History
            </Text>
          </Pressable>

          <Pressable
            onPress={handleGuide}
            style={({ pressed }) => [
              styles.secondaryButton,
              { backgroundColor: colors.surface, borderColor: colors.border },
              pressed && { opacity: 0.7 },
            ]}
          >
            <BookOpen size={22} color={colors.primary} />
            <Text style={[styles.secondaryButtonText, { color: colors.foreground }]}>
              First Aid Guide
            </Text>
          </Pressable>

        </View>

        {/* TIPS */}
        <View style={[styles.tipsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.tipsTitle, { color: colors.foreground }]}>
            Quick Tips
          </Text>

          <Tip text="Ensure good lighting for accurate results" color={colors.primary} />
          <Tip text="Keep the wound centered in the frame" color={colors.primary} />
          <Tip text="Hold steady for a clear capture" color={colors.primary} />
        </View>

        {/* DISCLAIMER */}
        <View style={styles.disclaimer}>
          <TriangleAlert size={16} color="#F39C12" />
          <Text style={styles.disclaimerText}>
            This app provides basic guidance only. Always seek professional medical advice.
          </Text>
        </View>

      </View>
    </ScreenContainer>
  );
}

// ================= helper =================
function Tip({ text, color }: any) {
  return (
    <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color, marginTop: 6 }} />
      <Text style={{ fontSize: 13, color: "#666", flex: 1 }}>{text}</Text>
    </View>
  );
}

// ================= styles =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 20,
  },

  header: {
    alignItems: "center",
    gap: 6,
  },

  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  appTitle: {
    fontSize: 26,
    fontWeight: "700",
  },

  appSubtitle: {
    fontSize: 14,
  },

  scanSection: {
    marginTop: 10,
  },

  scanButton: {
    borderRadius: 20,
    padding: 20,
  },

  scanButtonInner: {
    alignItems: "center",
    gap: 8,
  },

  scanIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  scanButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  scanButtonSubtext: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
  },

  secondaryRow: {
    flexDirection: "row",
    gap: 12,
  },

  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },

  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },

  tipsCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
  },

  tipsTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  disclaimer: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
  },

  disclaimerText: {
    fontSize: 12,
    flex: 1,
    color: "#7D5A00",
  },
});