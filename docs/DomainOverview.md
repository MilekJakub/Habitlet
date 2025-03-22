# **Domain Overview**  

## **1. Introduction**  
### **Overview of the Domain**  
This domain focuses on personal development through **Achieving Goals by Identity Transformation and Habit Formation**. The core methodology is inspired by principles from *Atomic Habits*, leveraging habit loops and behavioral science to build long-lasting change.  

---

## **2. Domain Overview**  
### **Key Concepts and Terminology**  
- **Identity-Based Habits**: Building habits aligned with the person you want to become.  
- **SMART Goals**: Goals that are Specific, Measurable, Achievable, Relevant, and Time-bound.  
- **Habit Loop**: The cycle of Cue, Craving, Response, and Reward for habit reinforcement.  
- **Gamification**: Integrating game mechanics (XP, streaks, progress bars) to motivate users.  
- **Roadmap Management**: Structuring long-term goals into manageable steps and milestones.

---

## **3. Core System Events**  

The application is built around core events that track and represent key user interactions:  

| **Event Name**       | **Description**                                                                 |
|-----------------------|---------------------------------------------------------------------------------|
| **Identity Defined**  | The user defines the identity they want to adopt to achieve their goal.          |
| **Goal Created**      | A new goal is created by the user, following the SMART criteria.                 |
| **Habit Created**     | A habit is created to align with the user’s identity and goal.                   |
| **Roadmap Created**   | A roadmap is created with milestones and steps to achieve the goal.              |
| **Session Started**   | The user starts a session to focus on a habit or task.                           |
| **Session Completed** | The user finishes a session and receives a summary of their progress.            |
| **Step Completed**    | The user completes a step in their roadmap.                                      |
| **Milestone Achieved**| All steps within a milestone are completed, unlocking the milestone.             |
| **Goal Achieved**     | The user completes all milestones and achieves their goal.                       |

---

## **4. Current Landscape**  

### **State of the Domain**  
Personal growth and habit-tracking apps are in high demand as individuals seek structured ways to develop habits and achieve long-term goals. Most current solutions focus on task-based tracking, lacking the identity-driven approach central to this app.  

---

## **5. User Personas and Requirements**  

### **Key Personas**  
1. **The Goal Setter** – Focused on personal productivity. Needs roadmap guidance and detailed tracking.
2. **The Self-Improver** – Seeks holistic growth with gamified experiences to stay motivated.

### **Functional Requirements**  
- Goal creation
- Roadmap management
- Progress visualizations
- Habit tracking
- XP
- Streaks
- Daily reminders
- Weekly summaries
- Recovery plans
- User management
- Authentication
- Notifications

---

## **6. Technical Perspective**  

### **Core Systems and Integration Points**
1. **System for User Management**: Handles registration, onboarding, and user profiles.  
2. **System for Goal Management**: Manages goal creation and tracking, ensuring they meet SMART criteria.  
3. **System for Habit Management**: Manages habits linked to the user’s defined identity and goals.  
4. **System for Session Management**: Tracks user sessions and awards XP for completed sessions.  

---

## **7. Detailed User Flows**  

### **Flow 1: App Discovery and Registration**  
**Goal:** Allow a new user to discover, download, and register in the application.  

| **Step**                   | **Actor** | **Command**                     | **System**       | **Event**           |
|----------------------------|-----------|---------------------------------|------------------|---------------------|
| App discovered              | User      | Read about the app              | Web Browser      | **App discovered**  |
| Download the app            | User      | Click download button           | Web Browser      | **App downloaded**  |
| Submit registration form    | User      | Enter user details              | User Management  | **User registered** |

---

### **Flow 2: Goal and Identity Definition**  
**Goal:** Guide the user to create a goal, define their identity, and establish habits.  

| **Step**                     | **Actor** | **Command**                   | **System**        | **Event**            |
|------------------------------|-----------|-------------------------------|-------------------|----------------------|
| Submit "create goal" form     | User      | Create a new goal             | Goal Management   | **Goal Created**     |
| Submit "define identity" form | User      | Define desired identity        | Identity Management | **Identity Defined** |
| Submit "define habit" form    | User      | Create a habit                | Habit Management  | **Habit Created**    |
| Submit "create milestone" form| User      | Create a milestone            | Roadmap Management | **Milestone Created**|
| Submit "create step" form     | User      | Create a roadmap step         | Roadmap Management | **Step Created**     |
| Submit roadmap               | User      | Finalize roadmap              | Roadmap Management | **Roadmap Created**  |

---

### **Flow 3: Session and Progress Tracking**  
**Goal:** Allow users to track their progress through sessions and milestones.  

| **Step**                      | **Actor** | **Command**               | **System**         | **Event**             |
|-------------------------------|-----------|---------------------------|--------------------|-----------------------|
| Start a session                | User      | Start habit session       | Session Management | **Session Started**   |
| End session                    | User      | Complete the session      | Session Management | **Session Completed** |
| Award XP                       | System    | Award XP based on session| Identity Management | **XP Earned**         |
| Mark step as complete          | User      | Complete roadmap step     | Roadmap Management | **Step Completed**    |
| Unlock milestone               | System    | Complete all steps        | Roadmap Management | **Milestone Achieved**|
| Unlock goal                    | System    | Complete all milestones   | Roadmap Management | **Goal Achieved**     |
