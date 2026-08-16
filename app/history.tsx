import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

type ScanRecord = {
  id: string;
  woundType: string;
  severity: "low" | "medium" | "high";
  date: string;
  time: string;
};

const MOCK_HISTORY: ScanRecord[] = [
  { id: "1", woundType: "Abrasion", severity: "low", date: "Today", time: "10:32 AM" },
  { id: "2", woundType: "Minor Cut", severity: "low", date: "Yesterday", time: "3:15 PM" },
  { id: "3", woundType: "Bruise", severity: "medium", date: "May 3", time: "8:44 AM" },
  { id: "4", woundType: "Laceration", severity: "high", date: "May 1", time: "5:20 PM" },
];

const SEVERITY_COLORS: Record<string, { bg: string; text: string }> = {
  low: { bg: "#D4EDDA", text: "#1A7A3C" },
  medium: { bg: "#FFF3CD", text: "#7D5A00" },
  high: { bg: "#F8D7DA", text: "#7D1A1A" },
};

export default function HistoryScreen() {
  const router = useRouter();
  const colors = useColors();

  const renderItem = ({ item }: { item: ScanRecord }) => {
    const sev = SEVERITY_COLORS[item.severity];
    return (
      <Pressable
        onPress={() => router.push("/result")}
        style={({ pressed }) => [
          styles.historyCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
          pressed && { opacity: 0.75 },
        ]}
      >
        <View style={[styles.historyIcon, { backgroundColor: `${colors.primary}15` }]}>
          <IconSymbol name="bandage.fill" size={24} color={colors.primary} />
        </View>
        <View style={styles.historyInfo}>
          <Text style={[styles.historyType, { color: colors.foreground }]}>{item.woundType}</Text>
          <Text style={[styles.historyDate, { color: colors.muted }]}>
            {item.date} · {item.time}
          </Text>
        </View>
        <View style={[styles.severityPill, { backgroundColor: sev.bg }]}>
          <Text style={[styles.severityPillText, { color: sev.text }]}>{item.severity}</Text>
        </View>
        <IconSymbol name="chevron.right" size={18} color={colors.muted} />
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
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Scan History</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={MOCK_HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <IconSymbol name="clock.fill" size={48} color={colors.border} />
            <Text style={[styles.emptyText, { color: colors.muted }]}>No scans yet</Text>
          </View>
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
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  listContent: {
    padding: 16,
    gap: 10,
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  historyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  historyInfo: {
    flex: 1,
    gap: 3,
  },
  historyType: {
    fontSize: 15,
    fontWeight: "600",
  },
  historyDate: {
    fontSize: 12,
  },
  severityPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  severityPillText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
