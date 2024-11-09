# Software Requirements Specification

## Introduction

### Purpose
The application is intended for individuals who seek to combine the engagement and fun of video gaming with habit
building. It targets users interested in personal development, education, and time management and those
who might struggle with maintaining motivation and consistency in their habit-forming or learning endeavours.

### Document Conventions
...

### Intended Audience
This document is intended for:
- Software Developers
- Promoters
- Stakeholders

### Project Scope
The application will feature an RPG game design, allowing users to experience progress.
The design will include character development, in-game rewards, and a storyline that advances as users complete learning.

The software will integrate tools such as a Habit Timer, note-taking and goals to encourage
effective learning and habit-building practices.

Users will unlock new features, such as access to the adventures, by completing productivity-related tasks.
This system is designed to provide a sense of achievement and maintain user engagement.

### References
...

## Overall description

### Product Perspective
The application is uniquely positioned at the intersection of gaming, education, and productivity software, bridging the
gap between entertainment and personal development. This innovative approach allows the application to seamlessly 
integrate into the broader ecosystem of self-improvement technologies and educational platforms, providing users with a 
distinct and engaging value proposition.

### Product Functions
The software encapsulates suite of functionalities designed to engage users in a gamified habit-building experience,
enhanced by productivity tools. Here's a summarization of its major functions:

- Character
- Habit Timer
- Notes
- Goals
- Adventures
- Combat System

### User Classes and Characteristics

#### Casual Gamers
Casual gamers are looking for an entertaining and relaxing way to spend their free time without the commitment required 
by more intense gaming experiences.

#### Productivity Seekers
This group is focused on improving their time management, learning, and productivity skills. They might be students, 
professionals, or anyone interested in personal development.

#### Educational Enthusiasts
These users are keen on learning new things, whether it's for personal enrichment or professional development.
They enjoy educational content that's presented engagingly and interactively.

#### Habit Builders
Users focused on building or breaking habits, looking for a fun and engaging way to stay consistent with their goals.

### Operating Environment

#### Supported Devices:
- PC
- laptop
- mobile (later)

#### Software:
- Chrome
- Firefox
- Edge
- Opera

### Design and Implementation Constraints

The development and deployment of this application are subject to several constraints that could affect its design and 
implementation. These constraints are primarily related to system requirements, compliance standards, hardware 
limitations, and specific technologies employed in the project.

#### Frontend Technologies
React, Redux, and Tailwind CSS dictate a modern, component-based architecture for the front end.
This choice necessitates using browsers that support ES6 and later features, potentially limiting support for older
browser versions.

#### Mobile Support
The initial exclusion of mobile platforms could constrain user accessibility and market reach, necessitating a
responsive design approach to accommodate mobile devices.

#### Client Devices
The application's performance on client devices, especially in graphics and real-time features (Phaser, SignalR), may
vary based on the device's hardware capabilities, such as GPU and CPU performance.

#### Content Licensing
The use of third-party assets or code libraries necessitates adherence to licensing agreements, which may restrict the
application's modification, distribution, or commercial use of specific components.

#### Scalability
The application's architecture must support scalability to accommodate growing user numbers and data volumes, which may
necessitate additional investment in server infrastructure and database and application code optimisation.

### Assumptions and Dependencies
...

## Functional requirements

### 1. Registration & Authentication
- 1.1 The system shall allow users to create a new account using an email address and a password.
- 1.2 The system shall allow users to log in and out of their accounts using their email and password.
- 1.3 The system shall send a verification link to the user's provided email address to ensure account security.
- 1.4 The system shall provide a password recovery mechanism that allows users to reset their password through a link sent to their registered email address.

### 2. Character
- 2.1 The system shall allow users to create a character with the given nickname.
- 2.2 The system shall allow users to create and modify a character's appearance.
- 2.3 The system shall track and display the character's level and experience.

### 3. Habit Timer
- 3.1 The system shall allow users to start and cancel the timer.
- 3.2 The system shall notify users with an alarm or notification when a session ends.
- 3.3 The system shall allow users to customise focus intervals for sessions.
- 3.4 The system shall track and provide a heatmap of the user's sessions.
- 3.5 The system shall track and provide statistics on the user's sessions.

### 4. Notes
- 4.1 The system shall provide a rich text editor for users to take notes.
- 4.2 The system shall allow users to create, read, update, and delete the notes.
- 4.3 The system shall offer grouping notes in folders.
- 4.4 The system shall allow users to pin notes.
- 4.5 The system shall allow users to colour the notes.
- 4.6 The system shall allow users to use tags for their notes.
- 4.7 The system shall allow users to use a search bar to find the notes.

### 5. Goals
- 5.1 The system shall allow players to set specific habits as goals within the application interface.
- 5.2 The system shall categorise each goal into levels of mastery - Beginner, Intermediate, Advanced, Expert, and Elite.
- 5.3 The system shall provide a mechanism for players to advance through levels of mastery by tracking and validating consistent performance related to each set goal.
- 5.4 The system shall unlock specific in-game rewards or character enhancements upon the player reaching a new level of mastery for a goal.
- 5.5 The system shall display the current level of mastery and progress towards the next level for each set goal within the user interface.
- 5.6 The system shall allow players to modify or delete their set goals, with changes reflected in real-time within the application.
- 5.7 The system shall provide notifications or alerts to encourage and remind players of their progress and activities related to their set goals.
- 5.8 The system shall integrate the goals feature with the character module to ensure that in-game rewards and character enhancements are appropriately applied and displayed.
- 5.9 The system shall allow players to view a history of their goals, including those achieved, in progress, and abandoned, along with relevant performance metrics.
- 5.10 The system shall allow players to share their goal achievements on their profile or with other players if desired.

### 6. Campaign
- 8.1 The system shall allow users to open the map with adventures.
- 8.2 The system shall allow users to select and read about the adventure.
- 8.3 The system shall allow users to go for an adventure.
- 8.4 The system shall track the user's completed adventures.

### 7. Combat System
- 9.1 The system shall allow users to generate fights between their characters and enemies.
- 9.2 The system shall show the result of the fight to the user.
- 9.3 The system shall generate the animation of the fight for the user.

## Non-functional requirements

### Usability:
The application should provide an intuitive and engaging user interface that seamlessly integrates gaming elements with productivity tools.
The user experience should be designed to motivate and retain users, especially those who might struggle with maintaining consistency in their personal development efforts.

- **Priority:** 2
- **Goal:** To go to any functionality in the application, we should not perform more than 3 steps (clicks, swipes, etc.)
- **Criticality:** High (essential for user satisfaction and engagement)
- **Feasibility:** High (achievable with thoughtful design and user testing)
- **Risk:** Poor user experience leading to low engagement and user retention
- **Likelihood of occurrence:** Medium (if not enough attention is paid to user feedback and iterative design)
- **Business Impact:** High (directly affects user adoption and success of the application)
- **Risk minimisation methods:** Conduct user research and usability testing, implement adaptive UI/UX design principles, continuously gather and incorporate user feedback.

### Performance:
The application must provide fast response times and smooth animations, especially in character management, combat systems, and real-time productivity tools like the Habit Timer.
Performance should not degrade as the number of concurrent users increases.

- **Priority:** 3
- **Goal:** The goal is to handle 10,000 users simultaneously.
- **Criticality:** High (impacts user satisfaction and the application's reputation)
- **Feasibility:** Medium to High (depends on the optimization of front-end and back-end systems)
- **Risk:** Slow performance leading to frustration and reduced user engagement
- **Likelihood of occurrence:** Medium (if not adequately optimized for scalability and efficiency)
- **Business Impact:** High (affects user experience and perceived quality of the application)
- **Risk minimisation methods:** Optimize code for efficiency, use scalable cloud services, implement efficient database queries, and regularly monitor and analyze performance metrics.

### Security:
Given the application involves user registration and personal data management, it must adhere to strict security protocols to protect user data from unauthorized access, breaches, and other vulnerabilities.

- **Priority:** 1
- **Goal:** The system should use TLS/SSL protocol, use password encryption and use keyvaults for application secrets.
- **Criticality:** High (critical for user trust and legal compliance)
- **Feasibility:** High (standard security practices can be implemented)
- **Risk:** Data breach or unauthorized access to user data
- **Likelihood of occurrence:** Low (with robust security measures in place)
- **Business Impact:** Very High (can result in loss of user trust, legal repercussions, and significant damage to the company's reputation)
- **Risk minimisation methods:** Implement industry-standard encryption for data storage and transmission, conduct regular security audits and penetration testing, comply with data protection regulations, and educate users about secure password practices.

### Scalability:
The application must be designed to efficiently handle an increase in user load without degradation in performance or usability.
This includes the ability to scale up resources during peak usage times and scale down during off-peak hours to optimize cost and performance.

- **Priority:** 2
- **Goal:** The system should be able to distribute network traffic multiple servers.
- **Criticality:** High (essential for long-term success and growth)
- **Feasibility:** Medium to High (depends on the architectural choices and cloud services)
- **Risk:** Inability to handle peak loads, leading to slow response times and potential downtime
- **Likelihood of occurrence:** Medium (if scalability is not adequately planned and tested)
- **Business Impact:** High (affects user experience, retention, and the application's capability to grow)
- **Risk minimisation methods:** Use cloud-based infrastructure with auto-scaling capabilities, design a microservices architecture for better load distribution, and implement caching and load balancing strategies.

### Compatibility:
The application should be compatible with major browsers and devices to ensure a wide reach.
While initial focus might be on desktop platforms, the design should not preclude the future inclusion of mobile platforms.

- **Priority:** 3
- **Goal:** The application should behave and look the same on Chrome, Firefox, Edge, and Opera.
- **Criticality:** Medium (important for accessibility but initially focused on desktop)
- **Feasibility:** High (with responsive design and cross-browser testing)
- **Risk:** Limited access due to compatibility issues with certain browsers or devices
- **Likelihood of occurrence:** Low to Medium (depends on the range of devices and browsers supported)
- **Business Impact:** Medium (affects user base size and diversity)
- **Risk minimisation methods:** Adhere to web standards, perform extensive cross-browser and device testing, and design with a responsive and adaptive approach from the outset.

### External Interface Requirements
...

## Appendices
...

## Revision History
...
