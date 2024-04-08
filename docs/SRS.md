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
design approach to somehow accommodate mobile devices.

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

2.3 The system shall allow users to create and modify character's apperance.

2.4 The system shall track and display the character's level and experience.

2.5 The system shall track and display the character's inventory.

2.6 The system shall track and display the character's attributes.

2.7 The system shall track and display the character's skills.

#### 3. Habit Timer

3.1 The system shall allow users to start and cancel the timer.

3.2 The system shall notify users with an alarm or notification when a session ends.

3.3 The system shall allow users to customize focus intervals for sessions.

3.4 The system shall track and provide heatmap on the user's sessions.

3.5 The system shall track and provide statistics on the user's sessions.

#### 4. Notes

4.1 The system shall provide a rich text editor for users to take notes.

4.2 The system shall allow users to create, read, update, and delete the notes.

4.3 The system shall offer groupping notes in folders.

4.4 The system shall allow users to pin notes.

4.5 The system shall allow users to color the notes.

4.6 The system shall allow users to use tags for their notes.

4.7 The system shall allow users to use searchbar to find the notes.

#### 5. Goals

5.1 The system shall allow players to set specific habits as goals within the application interface.

5.2 The system shall categorize each goal into levels of mastery - Beginner, Intermediate, Advanced, Expert, and Elite.

5.3 The system shall provide a mechanism for players to advance through levels of mastery by tracking and validating
consistent performance related to each set goal.

5.4 The system shall unlock specific in-game rewards or character enhancements upon the player reaching a new level of
mastery for a goal.

5.5 The system shall display the current level of mastery and progress towards the next level for each set goal within
the user interface.

5.6 The system shall allow players to modify or delete their set goals, with changes reflected in real-time within the
application.

5.7 The system shall provide notifications or alerts to encourage and remind players of their progress and activities
related to their set goals.

5.8 The system shall integrate the goals feature with the character module to ensure that in-game rewards and character
enhancements are appropriately applied and displayed.

5.9 The system shall allow players to view a history of their goals, including those achieved, in progress,
and abandoned, along with relevant performance metrics.

5.10 The system shall allow players to share their goal achievements on their profile or with other players, if desired.

#### 6. Events

6.1 The system shall offer a variety of events: Seasonal Challenges, Event-Based Challenges, and Time-Limited Quests.

**Seasonal Challenges**

6.2 The system shall schedule and launch Seasonal Challenges in alignment with specific seasons (e.g., Summer, Winter)
and make them accessible to all players.

6.3 The system shall clearly display the start and end dates, objectives, and rewards associated with each
Seasonal Challenge.

**Event-Based Challenges**

6.4 The system shall introduce Event-Based Challenges in correspondence with real-world events or holidays
(e.g., Halloween, Christmas).

6.5 The system shall provide thematic challenges, rewards, and in-game environments that reflect the theme of the
real-world event or holiday.

**Time-Limited Quests**

6.6 The system shall regularly release Time-Limited Quests that are available for completion within a short,
specified timeframe (e.g., weekends).

6.7 The system shall notify players in advance of upcoming Time-Limited Quests, detailing their objectives and
potential rewards.

**General Requirements for All Events**

6.8 The system shall track and update players' progress in real-time as they participate in various events.

6.9 The system shall award players with in-game rewards, achievements, or enhancements upon the successful completion
of event challenges.

6.10 The system shall provide a leaderboard or ranking system for events where player performance is compared, fostering
a competitive environment.

6.12 The system shall offer a preview or teaser of upcoming events, including a brief overview and key dates, to engage
and inform players.

6.13 The system shall ensure that the difficulty and objectives of event challenges are balanced and accessible for
players of varying skill levels.

6.14 The system shall provide a feedback mechanism for players to rate and comment on events, contributing to the
improvement of future events.

6.15 The system shall archive past events, allowing players to view their participation history, achievements, and
rewards earned in each event.

#### 7. Tasks

**Daily Missions**

7.1 The system shall generate and assign a set of Daily Missions to each player every 24 hours.

7.2 The system shall display the objectives, rewards, and time remaining for each Daily Mission within the
user interface.

7.3 The system shall automatically track and update the player's progress towards completing each Daily Mission
in real-time.

7.4 The system shall award players with in-game rewards, points, or currency upon the successful completion of
Daily Missions.

7.5 The system shall allow players to replace or skip a certain number of Daily Missions per day, subject to specific
rules or limitations.

**Skill Challenges**

7.6 The system shall offer Skill Challenges that are designed to test and improve players' proficiency in various
in-game skills or abilities.

7.7 The system shall categorize Skill Challenges based on difficulty levels and skill types.

7.8 The system shall provide detailed instructions and success criteria for each Skill Challenge.

7.9 The system shall track players' attempts, successes, and improvements in Skill Challenges and provide feedback
on their performance.

7.10 The system shall reward players with special achievements, badges, or enhancements upon the successful completion
of Skill Challenges, especially for higher difficulty levels.

**General Requirements for Tasks**

7.11 The system shall provide notifications or reminders to players about new or incomplete Tasks, encouraging
engagement and participation.

7.12 The system shall allow players to view a history of their Tasks, including completed, in progress, and missed
Tasks, along with relevant performance metrics.

7.13 The system shall ensure that the Tasks are balanced in terms of difficulty and are achievable for players of
various skill levels.

7.14 The system shall integrate the Tasks feature with other game features (e.g., Events, Goals) to provide a cohesive
and immersive gameplay experience.

7.15 The system shall provide a mechanism for players to share their Task achievements on their profile or with other
players, if desired.

7.16 The system shall ensure data privacy and security for all information related to players' Tasks, in accordance
with applicable laws and regulations.

7.17 The system shall be capable of handling a high volume of players engaging with Tasks simultaneously, ensuring
scalability and performance.

7.18 The system shall offer an API for third-party integrations, allowing other applications to access Task-related
data with the user's consent.

#### 8. Adventures

8.1 The system shall allow users to open the map with adventures.

8.2 The system shall allow users to select and read about the adventure.

8.3 The system shall allow users to go for an adventure.

8.4 The system shall track user's completed adventures.

#### 9. Combat System

9.1 The system shall allow users to generate fight between their characters and attacked enemies.

9.2 The system shall show the result of fight to user.

9.3 The system shall generate the animation of the fight for user.

### Non-functional requirements
...

### External Interface Requirements
...

## Appendices
...

## Revision History
...
