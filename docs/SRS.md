# Software Requirements Specification

## Introduction

### Purpose
The application is intended for individuals who seek to combine the engagement and fun of video gaming with practical
self-improvement tasks. It targets users who are interested in personal development, education, time management,
and those who might struggle with maintaining motivation and consistency in their habit-forming or learning endeavors.

### Document Conventions
...

### Intended Audience
This document is intended for:
- Software Developers
- Promoters
- Stakeholders

### Project Scope
The application will feature an idle RPG game design, allowing users to experience progress.
The design will include character development, in-game rewards, and a storyline that advances as users complete
learning and productivity tasks.

The software will integrate tools such as a Habit timer and note-taking system, designed to encourage effective learning
and habit-building practices.

Users will unlock new features, such as access to the adventures, by completing specific tasks related to productivity.
This system is designed to provide a sense of achievement and maintain user engagement.

### References
...

## Overall description

### Product Perspective
The application is uniquely positioned at the intersection of gaming, education, and productivity software, bridging the
gap between entertainment and personal development. This innovative approach allows the application to seamlessly
integrate into the broader ecosystem of self-improvement technologies and educational platforms, providing a distinct
and engaging value proposition to users.

### Product Functions
The software encapsulates suite of functionalities designed to engage users in a gamified habit-building experience,
enhanced by productivity tools. Here's a summarization of its major functions:

#### Registration & Authentication
The system offers registration mechanism, enabling users to create and authenticate their accounts using an
email and password.

#### Character Management
Users can personalize their virtual character through various customization options.
The software also tracks character development, encompassing levels, skills, attributes and inventory.

#### Habit Timer
To aid in productivity and time management, the application incorporates a customizable timer, complete with
focus and break intervals. It features notifications and alarms to signify the end of sessions and offers detailed
progress tracking and statistical insights to encourage consistency and improvement.

#### Note-taking Capability
The application includes a rich text editor for efficient note-taking, complemented by organizational tools such as
folders and tags for easy management.

#### Interactive Tutorial
First-time users are greeted with an interactive tutorial that outlines the software's game mechanics and
learning tools, ensuring a smooth onboarding process and enhanced user engagement.

#### Quests & Learning Activities
The software integrates a daily quest system linked with learning activities, motivating users to engage with the
content regularly and reinforcing the gamified learning experience.

#### Rewards & Progression System
Completing learning tasks and quests earns users in-game rewards, such as items and currency.
This system is closely tied to a character progression framework, where users can level up and earn skill points,
further enriching the gamified aspect of the application.

### User Classes and Characteristics

#### Casual Gamers
Casual gamers are looking for an entertaining and relaxing way to spend their free time without the commitment required
by more intense gaming experiences.

#### Productivity Seekers
This group is focused on improving their time management, learning, and productivity skills.
They might be students, professionals, or anyone interested in personal development.

#### Educational Enthusiasts
These users are keen on learning new things, whether it's for personal enrichment or professional development.
They enjoy educational content that's presented in an engaging and interactive manner.

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

The development and deployment of this application are subject to several constraints that could affect both its design
and implementation. These constraints are primarily related to system requirements, compliance standards, hardware
limitations, and specific technologies employed in the project.

#### Frontend Technologies
The use of React, Redux, and Tailwind CSS dictates a modern, component-based architecture for the frontend.
This choice necessitates the use of browsers that support ES6 and later features, potentially limiting support for
older browser versions.

#### Mobile Support
Initial exclusion of mobile platforms could constrain user accessibility and market reach, necessitating a responsive
design approac to somehow accommodate mobile devices.

#### Client Devices
The application's performance on client devices, especially in terms of graphics and real-time features
(Phaser, SignalR), may vary based on the device's hardware capabilities, such as GPU and CPU performance.

#### Content Licensing
The use of third-party assets or code libraries necessitates adherence to licensing agreements, which may restrict
the modification, distribution, or commercial use of certain components of the application.

#### Scalability
The application's architecture must support scalability to accommodate growing user numbers and data volumes, which may
necessitate additional investment in server infrastructure and optimization of database and application code.

### Assumptions and Dependencies
...

## System Features and Requirements

### Functional requirements

#### 1. Registration & Authentication

1.1 The system shall allow users to create a new account using an email address and a password.

1.2 The system shall allow users to log in and log out of their accounts using their email and password.

1.3 The system shall send a verification link to the user's provided email address to ensure account security.

1.4 The system shall provide a password recovery mechanism that allows users to reset their password through a link sent
to their registered email address.

#### 2. Character

2.1 The system shall allow users to create a character with given nickname.

2.2 The system shall allow users to choose character's class.

2.2 The system shall allow users to create and modify character's apperance.

2.3 The system shall track and display the character's level and experience.

2.4 The system shall track and display the character's inventory.

2.5 The system shall track and display the character's attributes.

2.6 The system shall track and display the character's skills.

#### 3. Habit Timer

3.1 The system shall allow users to start and cancel the timer.

3.1 The system shall notify users with an alarm or notification when a session ends.

3.2 The system shall allow users to customize focus intervals for sessions.

3.3 The system shall track and provide statistics on the user's sessions.

#### 4. Notes

4.1 The system shall provide a rich text editor for users to take notes.

4.2 The system shall allow users to create, read, update, and delete the notes.

4.3 The system shall offer groupping notes in folders.

4.4 The system shall allow users to pin notes.

4.5 The system shall allow users to color the notes.

4.6 The system shall allow users to use tags for their notes.

4.7 The system shall allow users to use searchbar to find the notes.

#### 5. Tutorial

5.1 The system shall offer an interactive tutorial for new users that explains the game mechanics and learning tools.

#### 6. Quests

6.1 The system shall provide a main quests system.

6.2 The system shall provide a daily quests system.

6.3 Main quests system shall serve to navigate players throughout the gameplay experience.

6.4 Daily quests system shall integrate with the Habit Timer functionality.

#### 7. Adventures

7.1 ... 

#### 8. Rewards & Progression

8.1 ... 

#### 9. Responsive Design

9.1 The system shall be compatible with various devices, including PCs, laptops, and mobile devices,
ensuring a consistent user experience.

#### 10. Cross-Browser Support

10.1 The system shall ensure functionality across major web browsers, including Chrome, Firefox, Edge, and Opera.

### Non-functional requirements
...

### External Interface Requirements
...

## Appendices
...

## Revision History
...
