import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

type GuideItem = {
  id: string;
  title: string;
  description: string;
  icon: "drop.fill" | "bandage.fill" | "shield.fill" | "waveform.path.ecg" | "exclamationmark.triangle.fill";
  color: string;
};

const GUIDE_ITEMS: GuideItem[] = [
  {
    id: "1",
    title: "Abrasions (Scrapes)",
    description: "Clean with water, apply antiseptic, cover with bandage. Change daily.",
    icon: "drop.fill",
    color: "#1A8FE3",
  },
  {
    id: "2",
    title: "Minor Cuts",
    description: "Apply pressure to stop bleeding, clean wound, use butterfly closure if needed.",
    icon: "bandage.fill",
    color: "#2ECC71",
  },
  {
    id: "3",
    title: "Bruises",
    description: "Apply ice pack for 20 min, elevate if possible. Avoid heat for 48 hours.",
    icon: "shield.fill",
    color: "#9B59B6",
  },
  {
    id: "4",
    title: "Burns (Minor)",
    description: "Cool under running water for 10 min. Do not use ice or butter. Cover loosely.",
    icon: "exclamationmark.triangle.fill",
    color: "#E67E22",
  },
  {
    id: "5",
    title: "Puncture Wounds",
    description: "Do not remove embedded objects. Clean around wound, seek medical help.",
    icon: "waveform.path.ecg",
    color: "#E74C3C",
  },
];

export default function GuideScreen() {
  const router = useRouter();
  const colors = useColors();

  const renderItem = ({ item }: { item: GuideItem }) => (
    <View
      style={[
        styles.guideCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={[styles.guideIcon, { backgroundColor: `${item.color}18` }]}>
        <IconSymbol name={item.icon} size={26} color={item.color} />
      </View>
      <View style={styles.guideContent}>
        <Text style={[styles.guideTitle, { color: colors.foreground }]}>{item.title}</Text>
        <Text style={[styles.guideDesc, { color: colors.muted }]}>{item.description}</Text>
      </View>
    </View>
  );

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
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>First Aid Guide</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={GUIDE_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={[styles.bannerCard, { backgroundColor: `${colors.primary}12`, borderColor: `${colors.primary}30` }]}>
            <IconSymbol name="book.fill" size={28} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.bannerTitle, { color: colors.foreground }]}>Quick Reference</Text>
              <Text style={[styles.bannerDesc, { color: colors.muted }]}>
                Basic first aid for common wound types
              </Text>
            </View>
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
    gap: 12,
    paddingBottom: 32,
  },
  bannerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  bannerDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  guideCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  guideIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  guideContent: {
    flex: 1,
    gap: 5,
  },
  guideTitle: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  guideDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
});
