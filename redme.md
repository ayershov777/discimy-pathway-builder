# Learning Pathway Creator - Application Documentation

## Overview

The Learning Pathway Creator is a fullstack web application that enables course creators to build structured learning pathways through an intuitive, step-by-step interface. The application combines manual content creation with AI-powered assistance to streamline the pathway development process.

## Technology Stack

- **Frontend**: React (JavaScript)
- **Backend**: Express.js (JavaScript)
- **Data Storage**: Local storage (browser-based)
- **AI Integration**: Custom API endpoints for content generation

## Application Workflow

### Step-by-Step Creation Process

The pathway creation follows a linear, guided workflow where creators complete one step at a time:

#### Step 1: Job Title Definition
- Creator enters a job title that defines the target role for the learning pathway
- This serves as the foundation for all subsequent AI-generated content
- No AI assistance available at this step

#### Step 2: Course Titles Generation
- Creator defines the high-level courses within the pathway
- AI assistance available via "Create with AI" button
- Generated suggestions can be refined through follow-up prompts
- Version history maintained for all refinements

#### Step 3: Module Titles Definition
- For each course, creator defines individual module titles
- Process repeated for every course in the pathway
- AI considers the job title, current course, and sibling courses for context
- Refinement and version control available

#### Step 4: Module Segments Overview
- For each module, creator defines segment types and titles
- Segment types: Info, Research, Exercise, Discussion, Project
- AI generates structured segment overviews with appropriate types
- Full refinement capabilities with version tracking

#### Step 5: Segment Content Creation
- Detailed content creation for each individual segment
- AI generates markdown-formatted content based on segment type and context
- Content considers the full hierarchy (job → course → module → segment)
- Refinement process allows iterative content improvement

### Navigation and Version Control

#### Folder Tree Structure
- Visual representation of the complete pathway hierarchy
- Expandable/collapsible tree showing Job Title → Courses → Modules → Segments
- Click navigation to any level for editing
- Real-time updates as content is created

#### Version Management
- Each AI refinement creates a new version
- Back/forward navigation between versions
- Version dropdown showing numerical progression
- Ability to revert to any previous version

#### Form Navigation
- Single form presentation (one step at a time)
- Progress indicator showing current step
- Ability to navigate back to edit previous steps
- Data persistence across navigation

## API Endpoints Specification

### Course Title Generation

**POST** `/generateCourseTitles`
- Generates initial course titles based on job title
- Returns array of suggested course titles

**POST** `/refineCourseTitles`
- Refines existing course titles with additional context
- Returns structured changes (additions and deletions with positioning)

### Module Title Generation

**POST** `/generateModuleTitles`
- Generates module titles for a specific course
- Considers job title, target course, and sibling courses for context

**POST** `/refineModuleTitles`
- Refines existing module titles with additional context
- Returns structured changes for precise modifications

### Segment Overview Generation

**POST** `/generateSegmentOverview`
- Creates segment overview with titles and types
- Considers full hierarchy context for appropriate segment generation

**POST** `/refineSegmentOverview`
- Refines segment overview with structured change responses
- Maintains type assignments while allowing title modifications

### Segment Content Generation

**POST** `/generateSegmentContent`
- Generates detailed markdown content for individual segments
- Type-specific content generation (Info, Research, Exercise, etc.)

**POST** `/refineSegmentContent`
- Iterative content refinement based on creator feedback
- Maintains markdown formatting and segment-appropriate structure

## Data Management

### Local Storage Strategy
- All pathway data stored in browser local storage
- Hierarchical data structure maintained in memory during editing
- Automatic saving of progress at each step completion
- Final "Save Pathway" action for permanent storage

### Data Structure Hierarchy
```
Pathway
├── Job Title (String)
├── Courses (Array)
│   ├── Course Title (String)
│   └── Modules (Array)
│       ├── Module Title (String)
│       └── Segments (Array)
│           ├── Segment Title (String)
│           ├── Segment Type (String)
│           └── Content (Markdown String)
```

## User Interface Features

### AI Assistance Integration
- "Create with AI" buttons on applicable forms
- Loading states during AI generation
- Error handling for API failures
- Retry mechanisms for failed requests

### Responsive Design Requirements
- Mobile-friendly interface
- Tablet optimization for content creation
- Desktop-optimized for complex navigation

### Accessibility Considerations
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management across form steps

## Content Generation Context

### Hierarchical Context Awareness
The AI endpoints utilize contextual information from the pathway hierarchy:

- **Job Title**: Foundational context for all generations
- **Sibling Relationships**: Courses aware of other courses, modules aware of sibling modules
- **Parent Relationships**: Content generation considers parent course and module context
- **Additional Context**: Creator-provided refinement instructions

### Content Type Specifications

#### Segment Types and Their Purposes
- **Info**: Educational content, explanations, theoretical foundations
- **Research**: Investigation tasks, data gathering, analysis activities
- **Exercise**: Practical application, skill-building activities
- **Discussion**: Collaborative learning, peer interaction prompts
- **Project**: Comprehensive application, portfolio-building activities

## Error Handling and Validation

### Frontend Validation
- Form field validation before submission
- Required field enforcement
- Character limits and formatting checks
- Real-time validation feedback

### Backend Error Management
- API endpoint error responses
- Network failure handling
- Timeout management
- Graceful degradation when AI services unavailable

### Data Integrity
- Version conflict resolution
- Local storage quota management
- Data backup and recovery mechanisms
- Corruption detection and repair

## Performance Considerations

### Optimization Strategies
- Lazy loading of pathway sections
- Efficient re-rendering for tree navigation
- Debounced AI requests for refinements
- Caching of generated content versions

### Scalability Planning
- Modular component architecture
- Efficient state management
- Memory usage optimization for large pathways
- Progressive loading for complex hierarchies

## Security and Privacy

### Data Protection
- Local-only data storage (no server persistence)
- Secure API communication
- Input sanitization for AI prompts
- XSS prevention measures

### Content Ownership
- Creator retains full ownership of generated pathways
- Export capabilities for data portability
- Clear data deletion procedures
- Privacy-first design principles