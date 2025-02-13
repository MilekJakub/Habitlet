We want to create the architecture of our system.  
So, the question arises: What is system architecture?

## **C4 Model**  
Let’s start with the C4 model.  
Simon Brown created the concept of documenting architecture through four levels.

| **C4 Level** | **Role**             | **Focus Areas**                                     | **Corresponding Architecture**     |
|--------------|-----------------------|-----------------------------------------------------|------------------------------------|
| **Level 4**  | System Context         | Actors, integration points, business value, risk    | Business Architecture              |
| **Level 3**  | Container              | Scale, communication, security, transactionality, availability, costs | Deployment Architecture           |
| **Level 2**  | Component              | Complexity, responsibility, scalability, team skill, availability, change | System Architecture               |
| **Level 1**  | Code                   | Code structure, architectural style, quality, efficiency, problem class | Application Architecture         |

---

## **Level 4: System Context Diagram**  
- System surroundings: actors and stakeholders  
- Business value  
- Risks  

The highest level of architecture is the **contextual level**.  
It serves as the starting point, showing how the system fits into the surrounding world. We focus on **actors and integration points**—who or what we need to integrate with, what risks exist, and who our users are.

---

## **Level 3: Container Diagram**  
**Deployment Architecture**  

- Request/Event scale  
- Data scale  
- Type of communication  
- Security  
- Availability  
- Costs  
- Transactionality  

The next level is **container architecture**.  
But what is a component?  

We can assume that a component is something we deploy—**code that we want to run somewhere**.

For example, we can deploy it into a microservice. A component should be able to live in different environments.  

We may have an **application service**, mobile applications, or other systems exchanging information with each other.  
**Containers** represent the environments where we deploy the code.  
Now the question arises: how should we divide it?

In a microservices architecture, can we afford to separate some logic into two different microservices? What does that depend on? (Refer to the list above.)

**Example: Request/Event Scale**  
If an event occurs once a week, how we split it doesn't really matter. We could even print it out and manually enter it into a form.  
However, if we have **100,000 events per second**, then we have a real problem to solve.

---

## **Level 2: Component Diagram**  
**System Architecture** – Integrating components to fulfill a process.  

- Complexity level  
- Team skill  
- Responsibility (API)  
- Ownership of data and rules  
- Availability  
- Scalability  
- Changeability  

Components represent a **logical division of our code**.  
Multiple components can be deployed into one physical container, or a single logical component can be deployed across multiple containers.

**Example:**  
Some validation logic might exist both on Android and on the server. This is the same logic—not a code duplication. The code is written once but deployed twice. (Think **NuGet/npm**.)

**Event Storming** will help us divide the system into components sensibly. Later, we can change how they are deployed to the infrastructure.

So, how should we divide the system into components?  
What should guide us in this decision?

We often look at the **organization’s departments** for which we are developing the software. If there is a **sales department**, there will probably be a sales component. If there is a **complaint department**, there will likely be a complaint component. But is this a good division?

**Another Reason to Create a Component**  
Would it make sense to create a component with only **10 lines of code**?  
A **nano-service? A pico-service?**  
It might make sense—it all depends on the **context**.

**Example: Car Rental Business**  
Imagine a car rental service where customers rent cars by the hour.  

- If there’s a **bug when renting**, it’s frustrating, but manageable.  
- If there’s a **bug when returning the car**, it’s a bigger issue. The system might continue to charge the customer, and we cannot do anything about it.  

This becomes a **cost to the business**—we must manage the angry customer, offer compensation, and try to restore lost trust.  

In such cases, we might isolate 10–100 lines of code into a separate component with **five-nines (99.999%) availability**.  
This means the component can only be down for **5 minutes and 15 seconds per year**.

Such a component should remain stable, with no changes, ensuring **high availability**.  
Other components, like **invoice calculation**, can be more agile. If they stop working, it’s not a big problem.  
It’s critical to **log the return of the car**, while the **invoice can be generated later**.

This is one of the **technical drivers** for splitting code into separate components.  
A **Bounded Context** is an ideal candidate for a component, but **a component is not the same as a Bounded Context**.

---

## **Level 1: Code Diagram**  
**Application Architecture** – Internal structure of the component, focusing on patterns rather than individual classes.

- Architectural style  
- Problem class  
- Time scale  
- Changeability  
- Quality  
- Performance  

How does a component look internally?  
What classes is it composed of?  
What is the structure of that code?  

- Will it have **layers**, **ports and adapters**, **pipes and filters**?  
- What architectural styles should we use inside a given component?

Sometimes, when entering a project, we find that **all components use the same architectural style**, e.g., **Clean Architecture**.  

We should then ask: "Why?"  
"To keep it consistent."  

That doesn’t make sense.  
We should choose the **internal architecture of a component based on its problem class**.

---

To create a System Architecture using the C4 model based on the provided notes from `AggregateDesign.md` and `BoundedContexts.md`, we can outline the architecture at different levels. Here's a structured approach:

### Level 4: System Context Diagram
- **Actors and Stakeholders**: Users, Identity Team, Goals Team, Habits Team, Sessions Team, Progress Team, Notifications Team, User Management Team.
- **Integration Points**: Each context integrates with others to provide a seamless user experience.
- **Business Value**: Supports users in identity change, achieving goals, habit development, session tracking, progress tracking, notifications, and user management.
- **Risks**: Data consistency across contexts, timely notifications, user data security.

### Level 3: Container Diagram
- **Containers**:
  - **Web Application**: User interface for managing identity, goals, habits, sessions, progress, and notifications.
  - **Identity Service**: Manages identity creation and linking to behaviors.
  - **Goals Service**: Handles goal setup, milestone definition, and roadmap visualization.
  - **Habits Service**: Manages habit creation and tracking.
  - **Sessions Service**: Tracks sessions and integrates Pomodoro.
  - **Progress Service**: Tracks user progress, XP, streaks, and heatmaps.
  - **Notifications Service**: Sends reminders and notifications.
  - **User Management Service**: Manages user registration, profiles, and authentication.
  - **Database**: Stores data for each context, ensuring data integrity and availability.

### Level 2: Component Diagram

**User Management**


