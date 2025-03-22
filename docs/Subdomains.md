# **Subdomain Breakdown**

## **1. Introduction**
In this document, we will break down the domain of **Achieving Goals by Identity Transformation and Habit Formation** into smaller, well-defined **subdomains** using **semantic boundaries**. Each subdomain has unique vocabulary and concepts, which help us create **bounded contexts** and outline **core flows** crucial for the application's operation.

We will first identify the subdomains and their purposes, followed by detailing the **core flow** for each subdomain.

## **2. Subdomain Breakdown**

### **Core, Supporting, and Generic Subdomains**
We categorize subdomains into **Core, Supporting,** and **Generic** based on their importance and role in the system.

- **Core Subdomains:** Represent the most critical areas of the business domain, where we focus our innovation and value.
- **Supporting Subdomains:** Provide functionality that supports the core subdomains.
- **Generic Subdomains:** Common functionalities that can often be generalized or reused.

### **Subdomains and Semantic Boundaries**

#### **1. Achieving Goals** (Core)
**Description:** Achieving goals is big and complex domain. It starts with an idea, then a defined goal, then sessions, hard work, and finally the achievement. Our system aims to support the user in this journey.
**Key Features:**
- Goal setup with SMART criteria.
- Milestone and step definition.
- Roadmap visualization and tracking.

#### **2. Identity Change** (Core)
**Description:** Identity is the core of the user's self. It is the way we see ourselves and how we behave. Our system aims to support the user in changing their identity.
**Key Features:**
- Identity creation and modification.
- Linking identity to behaviors and habits.
- Managing identity-driven XP and progress metrics.

#### **3. Habit Development** (Core)
**Description:** Habits are the building blocks of our lives. They are the actions we do regularly. Our system aims to support the user in developing good habits and breaking bad ones.
**Key Features:**
- Habit creation and customization.
- Tracking habit completion with heatmaps and streaks.
- Habit-related notifications and reminders.

#### **4. Session Tracking** (Supporting)
**Description:** Achieving goals is not a single session, but a journey. Our user needs to put in the hard work. Our system aims to support the user in tracking their sessions.
**Key Features:**
- Start, stop, and monitor sessions in real time.
- Pomodoro timer integration.
- Session summaries with reflection prompts.
- XP calculation and awards.

#### **5. Progress Tracking** (Supporting)
**Description:** Our user needs to see the progress and be motivated to achieve their goals. Our system aims to support the user in tracking their progress.
**Key Features:**
- XP system and leveling.
- Streak tracking for habits and sessions.
- Visual heatmaps and progress bars.
- Celebration animations and motivational messages.

#### **6. Notification** (Supporting)
**Description:** Our user needs a cue to start their sessions. Our system aims to support the user in staying on track.
**Key Features:**
- Smart notifications and goal adjustment suggestions.
- Weekly progress recaps.
- Recovery plans for missed habits and goals.

#### **7. User Management** (Generic)
**Description:** Generic subdomain for managing users.
**Key Features:**
- Registration and onboarding flow.
- Profile settings and personalization.
- Authentication and security features.

## **3. Core Flows for Each Subdomain**

### **1. Identity Change: Core Flow**
**Flow:** Defining new User Identity

| **Step**                         | **Actor**      | **Command**                         | **System**            | **Event**              |
|-----------------------------------|----------------|-------------------------------------|-----------------------|------------------------|
| Open the identity creation form    | User           | View identity form                  | Identity Management   | Identity form loaded   |
| Enter identity details             | User           | Define identity attributes           | Identity Management   | Identity attributes entered |
| Submit identity form               | User           | Submit identity form                | Identity Management   | **Identity Defined**   |
| Edit existing identity             | User           | Update identity                     | Identity Management   | **Identity Updated**   |

---

### **2. Achieving Goals: Core Flow**  
**Flow:** Creating a New Goal with a Structured Roadmap  

| **Step**                          | **Actor**      | **Command**                        | **System**           | **Event**             |
|------------------------------------|----------------|------------------------------------|----------------------|-----------------------|
| Open the "create goal" form         | User           | View goal form                     | Goal Management      | Goal form loaded      |
| Enter goal details                  | User           | Define a new goal (SMART criteria) | Goal Management      | Goal details entered  |
| Submit the goal                     | User           | Submit goal form                   | Goal Management      | **Goal Created**      |
| Add milestones and steps            | User           | Create roadmap milestones          | Roadmap Management   | **Milestone Created** |
| Finalize roadmap                    | User           | Submit roadmap                    | Roadmap Management   | **Roadmap Created**   |

---

### **3. Habit Development: Core Flow**  
**Flow:** Creating and Tracking a Habit  

| **Step**                          | **Actor**      | **Command**                        | **System**           | **Event**             |
|------------------------------------|----------------|------------------------------------|----------------------|-----------------------|
| Open the "create habit" form        | User           | View habit form                    | Habit Management     | Habit form loaded     |
| Enter habit details                 | User           | Define a new habit                 | Habit Management     | Habit details entered |
| Submit the habit                    | User           | Submit habit form                  | Habit Management     | **Habit Created**     |
| Complete habit for the day          | User           | Mark habit as completed            | Habit Management     | **Habit Completed**   |
| Track streak and progress           | System         | Update habit streak and heatmap    | Habit Management     | **Streak Updated**    |

---

### **4. Session Tracking: Core Flow**  
**Flow:** Tracking and Completing a Focused Session  

| **Step**                          | **Actor**      | **Command**                        | **System**           | **Event**             |
|------------------------------------|----------------|------------------------------------|----------------------|-----------------------|
| Open the session dashboard          | User           | Start a session                    | Session Management   | **Session Started**   |
| Track time and activity             | System         | Monitor session                    | Session Management   | Session data updated  |
| End the session                     | User           | Complete the session               | Session Management   | **Session Completed** |
| Reflect on the session              | User           | Submit reflection                  | Session Management   | Reflection recorded   |
| Award XP                            | System         | Calculate and award XP             | Identity Management  | **XP Earned**        |

---

### **5. Progress Tracking: Core Flow**  
**Flow:** Tracking Progress and Awarding Rewards  

| **Step**                          | **Actor**      | **Command**                        | **System**           | **Event**             |
|------------------------------------|----------------|------------------------------------|----------------------|-----------------------|
| Complete a habit/session/milestone | User           | Trigger progress update            | User Progress System  | **Progress Tracked** |
| Earn XP                            | System         | Calculate XP                       | User Progress System  | **XP Awarded**       |
| Track streaks and heatmaps          | System         | Update streak status               | User Progress System  | **Streak Updated**   |
| Reach a new level                  | System         | Level up user identity             | User Progress System  | **Level Up**         |

---

### **6. Notification: Core Flow**  
**Flow:** Sending Daily Reminders and Weekly Recaps  

| **Step**                          | **Actor**      | **Command**                        | **System**           | **Event**             |
|------------------------------------|----------------|------------------------------------|----------------------|-----------------------|
| Generate daily reminder             | System         | Schedule notification              | Notification System  | **Reminder Generated** |
| Send daily reminder                 | System         | Deliver notification               | Notification System  | **Reminder Sent**     |
| Compile weekly progress             | System         | Generate progress summary          | Notification System  | **Weekly Recap Created** |
| Deliver weekly recap                | System         | Send progress report               | Notification System  | **Weekly Recap Sent** |

---

### **7. User Management: Core Flow**  
**Flow:** User Registration and Profile Management  

| **Step**                          | **Actor**      | **Command**                        | **System**           | **Event**             |
|------------------------------------|----------------|------------------------------------|----------------------|-----------------------|
| Open registration form              | User           | View registration page             | User Management      | Registration form loaded |
| Enter user details                  | User           | Fill out registration form         | User Management      | User details entered  |
| Submit registration form            | User           | Register a new account             | User Management      | **User Registered**  |
| Update user profile                 | User           | Edit profile information           | User Management      | **Profile Updated**  |

---

## **4. Conclusion**
This document provides a structured breakdown of the domain into subdomains and outlines core flows for each, ensuring clarity and separation of responsibilities. These flows serve as a foundation for future design, development, and scaling of the application.
