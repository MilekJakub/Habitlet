## **User Flows**

### **Flow 1: App Discovery and Registration**

Read Model: An ad
Actor: User
Command: Read about the app
System: Web browser
Event: App discovered

Read Model: Download Page
Actor: Actor
Command: Download the app
System: Web Browser
Event: App downloaded

Read Model: Read Model
Actor: Actor
Command: Submit the registration form
System: User Management
Event: User registered

### **Flow 2: Goal and Identity Definition**

Read Model: Create Goal Form
Actor: User
Command: Submit the "create goal" form
System: Goal Management
Event: Goal Created

Read Model: Define Identity Form
Actor: User
Command: Submit the "define identity" form
System: Identity Management
Event: Identity Defined

Read Model: Define Habit Form
Actor: User
Command: Submit the "define habit" form
System: Habit Management
Event: Habit Created

Read Model: Create Milestone Form
Actor: User
Command: Submit the "create milestone" form
System: Roadmap Management
Event: Milestone Created

Read Model: Create Step Form
Actor: User
Command: Submit the "create step" form
System: Roadmap Management
Event: Step Created

Read Model: Roadmap Editor
Actor: User
Command: Submit the roadmap
System: Roadmap Management
Event: Roadmap Created

### **Flow 3: Session and Progress Tracking**

Read Model: Roadmap Editor
Actor: User
Command: Start a session
System: Session Management
Event: Session Started

Read Model: Current Session Dashboard
Actor: User
Command: End the session
System: Session Management
Event: Session Completed

Policy: Session Completed Policy
Actor: System
Command: Award XP based on session data
System: Identity Management
Event: XP Earned
ń
Read Model: Roadmap Editor
Actor: User
Command: Mark the step as complete
System: Roadmap Management
Event: Step Completed

Policy: All previous steps completed policy
Event: Milestone Unlocked
Read Model: Roadmap Editor
Actor: User
Command: Mark the milestone as complete
System: Roadmap Management
Event: Milestone Achieved

Policy: All previous steps and milestones completed policy
Event: Goal unlocked
Read Model: Roadmap Editor
Actor: User
Command: Command
System: Roadmap Management
Event: Goal Achieved

---

## **Detailed User Flows**

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