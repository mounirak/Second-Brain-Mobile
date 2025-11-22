import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import uuid from 'react-native-uuid';
import Task from "../components/Task";

export default function ToDoList() {
  const [tasks, setTasks] = useState([
    {
      id: "001",
      title: "Complete project proposal",
      description: "Finish the client presentation and send for review",
      completed: true,
      priority: "high"
    }
  ]);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [howShow, sethowShow] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("medium");

  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() === "") return;

    setTasks(tasks.map(task => 
      task.id === editingTask.id 
        ? {
            ...task,
            title: editTitle.trim(),
            description: editDescription.trim(),
            priority: editPriority
          }
        : task
    ));

    // Reset editing state
    setEditingTask(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("medium");
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("medium");
  };

  const handleDeleteTask = (task) => {
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  const AddTask = () => {
    if (newTaskTitle.trim() === "") {
      return;
    }

    const newTask = {
      id: uuid.v4(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      completed: false,
      priority: newTaskPriority
    };

    setTasks([...tasks, newTask]);
    
    // Reset form
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskPriority("medium");
    setIsAddingTask(false);
  };

  const StartAddingTask = () => {
    setIsAddingTask(true);
  };

  const CancelAddingTask = () => {
    setIsAddingTask(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskPriority("medium");
  };

  const changeTypeShow = (me) => {
    sethowShow(me);
  };
  const handleToggleTask = (task) => {
    setTasks(tasks.map(t => 
      t.id === task.id 
        ? { ...t, completed: !t.completed }
        : t
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header - Fixed */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerIcon}>📝</Text>
          <View>
            <Text style={styles.headerTitle}>Todo List</Text>
            <Text style={styles.headerSubtitle}>Stay organized and productive</Text>
          </View>
        </View>
        <View style={styles.headerDecoration}>
          <View style={styles.decorationCircle} />
          <View style={styles.decorationCircle} />
          <View style={styles.decorationCircle} />
        </View>
      </View>

      {/* Add Task Modal */}
      {isAddingTask && (
        <View style={styles.addTaskContainer}>
          <View style={styles.addTaskCard}>
            <Text style={styles.addTaskTitle}>Add New Task</Text>
            
            {/* Title Input */}
            <TextInput
              style={styles.input}
              placeholder="Task title..."
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              autoFocus={true}
            />
            
            {/* Description Input */}
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description (optional)"
              value={newTaskDescription}
              onChangeText={setNewTaskDescription}
              multiline={true}
              numberOfLines={3}
            />
            
            {/* Priority Selection */}
            <Text style={styles.priorityLabel}>Priority</Text>
            <View style={styles.priorityButtons}>
              <TouchableOpacity 
                style={[
                  styles.priorityButton, 
                  newTaskPriority === "high" && styles.priorityButtonHighActive
                ]}
                onPress={() => setNewTaskPriority("high")}
              >
                <Text style={[
                  styles.priorityButtonText,
                  newTaskPriority === "high" && styles.priorityButtonTextActive
                ]}>High</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.priorityButton, 
                  newTaskPriority === "medium" && styles.priorityButtonMediumActive
                ]}
                onPress={() => setNewTaskPriority("medium")}
              >
                <Text style={[
                  styles.priorityButtonText,
                  newTaskPriority === "medium" && styles.priorityButtonTextActive
                ]}>Medium</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.priorityButton, 
                  newTaskPriority === "low" && styles.priorityButtonLowActive
                ]}
                onPress={() => setNewTaskPriority("low")}
              >
                <Text style={[
                  styles.priorityButtonText,
                  newTaskPriority === "low" && styles.priorityButtonTextActive
                ]}>Low</Text>
              </TouchableOpacity>
            </View>
            
            {/* Action Buttons */}
            <View style={styles.addTaskActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={CancelAddingTask}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.addConfirmButton,
                  newTaskTitle.trim() === "" && styles.addConfirmButtonDisabled
                ]}
                onPress={AddTask}
                disabled={newTaskTitle.trim() === ""}
              >
                <Text style={styles.addConfirmButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <View style={styles.editTaskContainer}>
          <View style={styles.editTaskCard}>
            <Text style={styles.editTaskTitle}>Edit Task</Text>
            
            {/* Title Input */}
            <TextInput
              style={styles.input}
              placeholder="Task title..."
              value={editTitle}
              onChangeText={setEditTitle}
              autoFocus={true}
            />
            
            {/* Description Input */}
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description (optional)"
              value={editDescription}
              onChangeText={setEditDescription}
              multiline={true}
              numberOfLines={3}
            />
            
            {/* Priority Selection */}
            <Text style={styles.priorityLabel}>Priority</Text>
            <View style={styles.priorityButtons}>
              <TouchableOpacity 
                style={[
                  styles.priorityButton, 
                  editPriority === "high" && styles.priorityButtonHighActive
                ]}
                onPress={() => setEditPriority("high")}
              >
                <Text style={[
                  styles.priorityButtonText,
                  editPriority === "high" && styles.priorityButtonTextActive
                ]}>High</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.priorityButton, 
                  editPriority === "medium" && styles.priorityButtonMediumActive
                ]}
                onPress={() => setEditPriority("medium")}
              >
                <Text style={[
                  styles.priorityButtonText,
                  editPriority === "medium" && styles.priorityButtonTextActive
                ]}>Medium</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.priorityButton, 
                  editPriority === "low" && styles.priorityButtonLowActive
                ]}
                onPress={() => setEditPriority("low")}
              >
                <Text style={[
                  styles.priorityButtonText,
                  editPriority === "low" && styles.priorityButtonTextActive
                ]}>Low</Text>
              </TouchableOpacity>
            </View>
            
            {/* Action Buttons */}
            <View style={styles.editTaskActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleCancelEdit}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.saveButton,
                  editTitle.trim() === "" && styles.saveButtonDisabled
                ]}
                onPress={handleSaveEdit}
                disabled={editTitle.trim() === ""}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Main Content - Fixed top section, scrollable bottom */}
      <View style={styles.content}>
        {/* Fixed Top Section */}
        <View style={styles.fixedSection}>
          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            <TouchableOpacity 
              style={[styles.filterButton, howShow === "all" && styles.filterButtonActive]}
              onPress={() => changeTypeShow("all")}
            >
              <Text style={[styles.filterText, howShow === "all" && styles.filterTextActive]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, howShow === "Completed" && styles.filterButtonActive]}
              onPress={() => changeTypeShow("Completed")}
            >
              <Text style={[styles.filterText, howShow === "Completed" && styles.filterTextActive]}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, howShow === "Active" && styles.filterButtonActive]}
              onPress={() => changeTypeShow("Active")}
            >
              <Text style={[styles.filterText, howShow === "Active" && styles.filterTextActive]}>Active</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{tasks.length}</Text>
              <Text style={styles.statLabel}>Total Tasks</Text>
              <View style={[styles.statIndicator, styles.totalIndicator]} />
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{completedTasks}</Text>
              <Text style={styles.statLabel}>Completed</Text>
              <View style={[styles.statIndicator, styles.completedIndicator]} />
            </View>
          </View>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Your Progress</Text>
              <Text style={styles.progressPercent}>{Math.round(progressPercentage)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {completedTasks} of {tasks.length} tasks completed
            </Text>
          </View>

          {/* Section Header - Fixed */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today&apos;s Tasks</Text>
            <Text style={styles.sectionCount}>({tasks.length})</Text>
          </View>
        </View>

        {/* Scrollable Task List Only */}
        <View style={styles.scrollableSection}>
          <ScrollView 
            style={styles.tasksScrollView} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {tasks.length === 0 ? (
              <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                  <Text style={styles.emptyIconText}>📝</Text>
                </View>
                <Text style={styles.emptyStateTitle}>No tasks yet</Text>
                <Text style={styles.emptyStateSubtext}>Create your first task to get started</Text>
              </View>
            ) : (
              <View style={styles.tasksList}>
                {(() => {
                  let filteredTasks = tasks;
                  
                  if (howShow === "Completed") {
                    filteredTasks = tasks.filter(task => task.completed);
                  } else if (howShow === "Active") {
                    filteredTasks = tasks.filter(task => !task.completed);
                  }
                  
                  return filteredTasks.map((task) => (
                    <Task 
                  key={task.id} 
                  task={task} 
                   onEdit={(task) => handleEditTask(task)}
                  onDelete={(task) => handleDeleteTask(task)}
                  onToggle={(task) => handleToggleTask(task)}
/>
                  ));
                })()}
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      {/* Add Button - Fixed */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={StartAddingTask}
      >
        <View style={styles.addButtonInner}>
          <Text style={styles.addButtonIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5d4e60",
  },
  header: {
    backgroundColor: "#fff7f3",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#5D4E60",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Delius",
    fontWeight: "700",
    color: "#5d4e60",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#8D7B95",
    marginTop: 2,
  },
  headerDecoration: {
    position: 'absolute',
    top: 25,
    right: 30,
    flexDirection: 'row',
  },
  decorationCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5d4e60',
    opacity: 0.3,
    marginHorizontal: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  fixedSection: {
    paddingTop: 20,
  },
  scrollableSection: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#6d5e70",
    borderRadius: 16,
    padding: 6,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: "#fff7f3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#d8cfe4",
    letterSpacing: 0.3,
  },
  filterTextActive: {
    color: "#5d4e60",
  },
  statsRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#6d5e70",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff7f3",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#d8cfe4",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  statIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  totalIndicator: {
    backgroundColor: "#8B5FBF",
  },
  completedIndicator: {
    backgroundColor: "#4ECDC4",
  },
  progressSection: {
    backgroundColor: "#6d5e70",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff7f3",
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4ECDC4",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#5d4e60",
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: "#4ECDC4",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#d8cfe4",
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff7f3",
    letterSpacing: 0.5,
  },
  sectionCount: {
    fontSize: 14,
    color: "#d8cfe4",
    marginLeft: 8,
    fontWeight: "500",
  },
  tasksScrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  tasksList: {
    gap: 12,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    minHeight: 300,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#5d4e60",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyIconText: {
    fontSize: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff7f3",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#b8a9c2",
    textAlign: "center",
    lineHeight: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 100,
  },
  addButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff7f3",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: '#5d4e60',
  },
  addButtonIcon: {
    fontSize: 24,
    fontWeight: "300",
    color: "#5d4e60",
  },
  // Add Task Modal Styles
  addTaskContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(93, 78, 96, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1000,
  },
  addTaskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  addTaskTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5D4E60',
    marginBottom: 20,
    textAlign: 'center',
  },
  // Edit Task Modal Styles
  editTaskContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(93, 78, 96, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1000,
  },
  editTaskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  editTaskTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5D4E60',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#F0E6F6',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  priorityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5D4E60',
    marginBottom: 8,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#F0E6F6',
    alignItems: 'center',
  },
  priorityButtonHighActive: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FF6B6B',
  },
  priorityButtonMediumActive: {
    borderColor: '#FFD166',
    backgroundColor: '#FFD166',
  },
  priorityButtonLowActive: {
    borderColor: '#4ECDC4',
    backgroundColor: '#4ECDC4',
  },
  priorityButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8D7B95',
  },
  priorityButtonTextActive: {
    color: '#FFFFFF',
  },
  addTaskActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editTaskActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F0E6F6',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8D7B95',
  },
  addConfirmButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
  },
  addConfirmButtonDisabled: {
    backgroundColor: '#D8CFE4',
  },
  addConfirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#8B5FBF',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#D8CFE4',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});