import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
  
export default function HomePage() {
  const router = useRouter();
    const features = [
      { 
        label: "Todo List", 
        description: "Manage your tasks and stay organized",
        icon: "checkmark-circle",
        color: "#8B5FBF",
      screen: "ToDoList"
      },
      { 
        label: "Notes", 
        description: "Capture ideas and important information",
        icon: "document-text",
        color: "#4ECDC4",
        screen: "Note"
      },
      { 
        label: "Focus Timer", 
        description: "Time your focused work sessions",
        icon: "timer",
        color: "#FF6B6B",
      screen: "Timer"
      },
      { 
        label: "AI Chatbot", 
        description: "Get instant AI assistance and insights",
        icon: "chatbubble-ellipses",
        color: "#45B7D1",
      screen: "ChatBot"
      },
    ];
  
    const handleFeaturePress = (feature) => {
    router.push(`/pages/${feature.screen}`);
    };
  
    return (
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logoBrain.png")}
              style={styles.logo}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Second Brain</Text>
              <Text style={styles.subtitle}>
                Your intelligent productivity companion
              </Text>
            </View>
          </View>
        </View>
  
        {/* Main Content */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Welcome Message */}
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Welcome back! </Text>
            <Text style={styles.welcomeText}>
              Ready to boost your productivity today?
            </Text>
          </View>
  
          {/* Features  */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <TouchableOpacity
                  key={feature.label}
                  style={[
                    styles.featureCard,
                    { 
                      borderLeftColor: feature.color,
                      marginRight: index % 2 === 0 ? 12 : 0
                    }
                  ]}
                  onPress={() => handleFeaturePress(feature)}
                  activeOpacity={0.8}
                >
                  <View style={styles.featureIconContainer}>
                    <Ionicons 
                      name={feature.icon} 
                      size={24} 
                      color={feature.color} 
                    />
                  </View>
                  <Text style={styles.featureTitle}>{feature.label}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                  <View style={styles.arrowContainer}>
                    <Ionicons name="chevron-forward" size={16} color="#8D7B95" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
  
          {/* Stats Section */}
        {/* we must to add context for be change  */}

          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Your Progress</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Tasks Done</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Notes</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3h 24m</Text>
                <Text style={styles.statLabel}>Focused</Text>
              </View>
            </View>
          </View>
        </ScrollView>
  
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Organize • Focus • Achieve
          </Text>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF7F3",
    },
    header: {
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 20,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      shadowColor: "#5D4E60",
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
      fontFamily: "Delius"
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      width: 60,
      height: 60,
      resizeMode: "contain",
    },
    titleContainer: {
      marginLeft: 16,
      flex: 1,
      fontFamily: "Delius",
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: "#5D4E60",
    },
    subtitle: {
      fontSize: 13,
      color: "#8D7B95",
      marginTop: 4,

    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingVertical: 24,
    },
    welcomeCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: "#5D4E60",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 3,
      
    },
    welcomeTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: "#5D4E60",
      marginBottom: 4,
      
    },
    welcomeText: {
      fontSize: 14,
      color: "#8D7B95",
      lineHeight: 20,
    },
    featuresSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#5D4E60",
      marginBottom: 16,
    },
    featuresGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    featureCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      padding: 16,
      width: "48%",
      marginBottom: 16,
      borderLeftWidth: 4,
      shadowColor: "#5D4E60",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
    featureIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: "#FFF7F3",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    featureTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#5D4E60",
      marginBottom: 4,
    },
    featureDescription: {
      fontSize: 12,
      color: "#8D7B95",
      lineHeight: 16,
      flex: 1,
    },
    arrowContainer: {
      position: "absolute",
      bottom: 16,
      right: 16,
    },
    statsCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: "#5D4E60",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 3,
    },
    statsTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#5D4E60",
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    statItem: {
      alignItems: "center",
    },
    statNumber: {
      fontSize: 24,
      fontWeight: "700",
      color: "#8B5FBF",
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: "#8D7B95",
    },
    statDivider: {
      width: 1,
      height: 30,
      backgroundColor: "#F0E6F6",
    },
    footer: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderTopWidth: 1,
      borderTopColor: "#F0E6F6",
      backgroundColor: "#FFFFFF",
    },
    footerText: {
      fontSize: 12,
      color: "#B8A9C2",
      fontWeight: "500",
      textAlign: "center",
    },
  });