import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useContext } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { TodosContext } from '../Context/TodosContext';

export default function HomePage() {
  const { tasks, setTasks } = useContext(TodosContext);
  const completedTasks = tasks.filter(task => task.completed).length;
  const router = useRouter();
  
  const features = [
    { 
      label: "Todo List", 
      description: "Manage your tasks and stay organized",
      icon: "checkmark-circle",
      color: "#6366F1",
      screen: "ToDoList"
    },
    { 
      label: "Notes", 
      description: "Capture ideas and important information",
      icon: "document-text",
      color: "#10B981",
      screen: "Note"
    },
    { 
      label: "Focus Timer", 
      description: "Time your focused work sessions",
      icon: "timer",
      color: "#F59E0B",
      screen: "Timer"
    },
    { 
      label: "AI Chatbot", 
      description: "Get instant AI assistance and insights",
      icon: "chatbubble-ellipses",
      color: "#EC4899",
      screen: "ChatBot"
    },
    { 
      label: "Progress", 
      description: "Track your productivity and achievements",
      icon: "bar-chart",
      color: "#06B6D4",
      screen: "Progress"
    },
    { 
      label: "Phone Time", 
      description: "Monitor and manage your screen time",
      icon: "phone-portrait",
      color: "#8B5CF6",
      screen: "PhoneTime"
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
        {/* Progress Stats */}
        <View style={[styles.statsCard, styles.progressCard]}>
          <Text style={styles.statsTitle}>Your Progress</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, styles.progressNumber]}>{completedTasks}</Text>
              <Text style={styles.statLabel}>Tasks Done</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, styles.progressNumber]}>5</Text>
              <Text style={styles.statLabel}>Notes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, styles.progressNumber]}>3h 24m</Text>
              <Text style={styles.statLabel}>Focused</Text>
            </View>
          </View>
        </View>

        {/* Lost Time Stats */}
        <View style={[styles.statsCard, styles.lostTimeCard]}>
          <Text style={styles.statsTitle}>Your Lost Time</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, styles.lostTimeNumber]}>3h 24m</Text>
              <Text style={styles.statLabel}>Screen Time</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, styles.lostTimeNumber]}>2h 15m</Text>
              <Text style={styles.statLabel}>Social Media</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, styles.lostTimeNumber]}>87</Text>
              <Text style={styles.statLabel}>Notifications</Text>
            </View>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Productivity Tools</Text>
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
                <View style={[styles.featureIconContainer, { backgroundColor: `${feature.color}15` }]}>
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
    backgroundColor: "#FFF2F0",
  },
  header: {
    backgroundColor: "#5D4E60",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#5D4E60",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    tintColor: "#FFF5EF",
  },
  titleContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFF7F3",
    fontFamily: "Delius",
  },
  subtitle: {
    fontSize: 13,
    color: "#FFF7F3",
    marginTop: 4,
    fontFamily: "fontak",
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  featuresSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#5D4E60",
    marginBottom: 20,
    fontFamily: "fontak",
    letterSpacing: -0.5,
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5D4E60",
    marginBottom: 4,
    fontFamily: "fontak"
  },
  featureDescription: {
    fontSize: 12,
    color: "#8D7B95",
    lineHeight: 16,
    flex: 1,
    fontFamily: "fontak"
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
  progressCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  lostTimeCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5D4E60",
    marginBottom: 16,
    fontFamily: "fontak"
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
    fontWeight: "800",
    marginBottom: 4,
  },
  progressNumber: {
    color: "#10B981",
  },
  lostTimeNumber: {
    color: "#EF4444",
  },
  statLabel: {
    fontSize: 12,
    color: "#8D7B95",
    fontFamily: "fontak",
    fontWeight: "500",
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
    color: "#8D7B95",
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "fontak"
  },
});