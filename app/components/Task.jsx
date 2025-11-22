import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Task({ task, onEdit, onDelete, onToggle }) {
  const { title, description, completed = false, priority = "medium" } = task;

  return (
    <View style={[styles.taskCard, completed && styles.taskCompleted]}>
      {/* Priority Indicator */}
      <View style={[
        styles.priorityIndicator,
        priority === "high" && styles.priorityHigh,
        priority === "medium" && styles.priorityMedium,
        priority === "low" && styles.priorityLow
      ]} />
      
      {/* Checkbox - Make it clickable */}
      <TouchableOpacity 
        style={[styles.checkbox, completed && styles.checkboxCompleted]}
        onPress={() => onToggle && onToggle(task)}
      >
        {completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {/* Task Content */}
      <View style={styles.taskContent}>
        <View style={styles.taskHeader}>
          <Text style={[styles.taskTitle, completed && styles.taskTitleCompleted]}>
            {title}
          </Text>
        </View>
        
        {description && (
          <Text style={[styles.taskDescription, completed && styles.taskDescriptionCompleted]}>
            {description}
          </Text>
        )}
        
        <View style={styles.taskFooter}>
          <View style={[
            styles.priorityBadge,
            priority === "high" && styles.priorityBadgeHigh,
            priority === "medium" && styles.priorityBadgeMedium,
            priority === "low" && styles.priorityBadgeLow
          ]}>
            <Text style={styles.priorityText}>{priority}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onEdit && onEdit(task)}
        >
          <Ionicons name="create-outline" size={18} color="#8D7B95" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onDelete && onDelete(task)}
        >
          <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#5D4E60",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#4ECDC4",
    position: 'relative',
    overflow: 'hidden',
  },
  taskCompleted: {
    backgroundColor: "#F8F9FA",
    borderLeftColor: "#B8A9C2",
    opacity: 0.8,
  },
  priorityIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 4,
    height: '100%',
  },
  priorityHigh: {
    backgroundColor: "#FF6B6B",
  },
  priorityMedium: {
    backgroundColor: "#FFD166",
  },
  priorityLow: {
    backgroundColor: "#4ECDC4",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D8CFE4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
    backgroundColor: '#FFFFFF',
  },
  checkboxCompleted: {
    backgroundColor: "#4ECDC4",
    borderColor: "#4ECDC4",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  taskContent: {
    flex: 1,
    marginRight: 12,
  },
  taskHeader: {
    marginBottom: 6,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5D4E60",
    lineHeight: 20,
  },
  taskTitleCompleted: {
    color: "#B8A9C2",
    textDecorationLine: "line-through",
  },
  taskDescription: {
    fontSize: 14,
    color: "#8D7B95",
    lineHeight: 18,
    marginBottom: 10,
  },
  taskDescriptionCompleted: {
    color: "#C8BFD4",
    textDecorationLine: "line-through",
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#F0E6F6",
  },
  priorityBadgeHigh: {
    backgroundColor: "#FFE6E6",
  },
  priorityBadgeMedium: {
    backgroundColor: "#FFF6E6",
  },
  priorityBadgeLow: {
    backgroundColor: "#E6F7F5",
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#5D4E60",
    textTransform: "uppercase",
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
  },
});