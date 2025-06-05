# Learning Pathway Creator - Application Documentation

## Overview

The Learning Pathway Creator is a fullstack web application that enables course creators to build structured learning pathways through a guided, step-by-step process. The application uses Express.js for the backend API and React for the frontend interface, with AI-powered content generation capabilities.

## Application Architecture

### Technology Stack
- **Frontend**: React (JavaScript, no TypeScript)
- **Backend**: Express.js
- **Data Storage**: Local storage for temporary data, with final save functionality
- **AI Integration**: Custom AI endpoints for content generation and refinement

### Core Features
- Step-by-step pathway creation workflow
- AI-powered content generation with refinement capabilities
- Version history with navigation controls
- Tree-view visualization of pathway structure
- Local data persistence with final save functionality

## User Workflow

### Pathway Creation Process

The application guides users through a sequential 5-step process:

1. **Job Title Definition**
   - Single form input for the target job title
   - No AI generation available for this step
   - Serves as the foundation for all subsequent AI-generated content

2. **Course Titles Creation**
   - Define a list of course titles within the pathway
   - "Create with AI" button generates initial suggestions
   - Refinement capabilities with follow-up prompts
   - Version history tracking

3. **Module Titles Definition**
   - Create module titles for each course individually
   - Context-aware generation using job title and sibling courses
   - AI generation and refinement for each course
   - Version history per course

4. **Module Segment Overview**
   - Define segment types and titles for each module
   - Segment types: Info, Research, Exercise, Discussion, Project
   - AI-powered generation with contextual awareness
   - Version history per module

5. **Segment Content Creation**
   - Generate detailed content for each segment
   - Markdown-formatted content output
   - Context includes all hierarchical information
   - Individual segment refinement capabilities

### Navigation and Version Control

#### Form Navigation
- Only one form displayed at a time
- Linear progression through steps
- Ability to return to previous steps for editing
- Tree view sidebar for quick navigation to any section

#### AI Refinement System
- Initial AI generation on button click
- Follow-up prompt input for refinements
- Back/Forward buttons for version navigation
- Version dropdown showing all iterations
- Each refinement creates a new version in history

#### Data Persistence
- Automatic local storage after each form submission
- Real-time updates to tree structure
- Final "Save Pathway" button for permanent storage

## User Interface Components

### Main Layout
- **Header**: Application title and progress indicator
- **Sidebar**: Tree-view navigation showing pathway structure
- **Main Content**: Current step form
- **Footer**: Navigation buttons (Previous/Next)

### Form Components
- **Job Title Form**: Simple text input with validation
- **List Creation Forms**: Dynamic add/remove interface for titles
- **AI Generation Panel**: 
  - "Create with AI" button
  - Additional context textarea
  - Generated content display
  - Refinement prompt input
  - Version navigation controls

### Tree Navigation
- **Hierarchical Display**: Job Title → Courses → Modules → Segments
- **Expandable/Collapsible**: Folder-style interface
- **Status Indicators**: Visual markers for completed/incomplete sections
- **Click Navigation**: Direct access to any section for editing

## API Documentation

### Content Generation Endpoints

#### Generate Course Titles
**POST** `/generateCourseTitles`

Generates initial course titles based on job title and additional context.

**Request Body:**
- `jobTitle` (String): The target job title for the pathway
- `additionalContext` (String): Optional additional context or requirements

**Response:**
- `courseTitles` (String): Generated course titles as formatted text

#### Refine Course Titles
**POST** `/refineCourseTitles`

Refines existing course titles based on user feedback.

**Request Body:**
- `jobTitle` (String): The target job title
- `courseTitles` (String[]): Current list of course titles
- `additionalContext` (String): Refinement instructions or context

**Response:**
- `titlesToDelete` (String[]): Titles to be removed from the list
- `titlesToAdd` (Object[]): New titles to add
  - `title` (String): The new course title
  - `idx` (Number): Position index for insertion

#### Generate Module Titles
**POST** `/generateModuleTitles`

Creates module titles for a specific course within the pathway context.

**Request Body:**
- `jobTitle` (String): The target job title
- `courseTitle` (String): The specific course being developed
- `siblingCourseTitles` (String[]): Other courses in the pathway for context
- `additionalContext` (String): Optional additional requirements

**Response:**
- `moduleTitles` (String[]): Generated list of module titles

#### Refine Module Titles
**POST** `/refineModuleTitles`

Refines existing module titles based on user feedback.

**Request Body:**
- `jobTitle` (String): The target job title
- `courseTitle` (String): The specific course
- `siblingCourseTitles` (String[]): Other courses for context
- `moduleTitles` (String[]): Current module titles
- `additionalContext` (String): Refinement instructions

**Response:**
- `titlesToDelete` (String[]): Module titles to remove
- `titlesToAdd` (Object[]): New modules to add
  - `title` (String): The new module title
  - `idx` (Number): Position index for insertion

#### Generate Segment Overview
**POST** `/generateSegmentOverview`

Creates segment structure (types and titles) for a specific module.

**Request Body:**
- `jobTitle` (String): The target job title
- `courseTitle` (String): The parent course
- `siblingCourseTitles` (String[]): Other courses for context
- `moduleTitle` (String): The specific module being developed
- `siblingModuleTitles` (String[]): Other modules in the course
- `additionalContext` (String): Optional requirements

**Response:**
- `segments` (Object[]): Generated segment structure
  - `title` (String): The segment title
  - `type` (String): Segment type (Info, Research, Exercise, Discussion, Project)

#### Refine Segment Overview
**POST** `/refineSegmentOverview`

Refines the segment structure based on user feedback.

**Request Body:**
- `jobTitle` (String): The target job title
- `courseTitle` (String): The parent course
- `siblingCourseTitles` (String[]): Other courses for context
- `moduleTitle` (String): The specific module
- `siblingModuleTitles` (String[]): Other modules for context
- `segments` (Object[]): Current segment structure
- `additionalContext` (String): Refinement instructions

**Response:**
- `segmentsToDelete` (String[]): Segment titles to remove
- `titlesToAdd` (Object[]): New segments to add
  - `segment` (Object): The new segment structure
    - `title` (String): Segment title
    - `type` (String): Segment type
  - `idx` (Number): Position index for insertion

#### Generate Segment Content
**POST** `/generateSegmentContent`

Creates detailed content for a specific segment.

**Request Body:**
- `jobTitle` (String): The target job title
- `courseTitle` (String): The parent course
- `siblingCourseTitles` (String[]): Other courses for context
- `moduleTitle` (String): The parent module
- `siblingModuleTitles` (String[]): Other modules for context
- `segmentTitle` (String): The specific segment
- `segmentType` (String): The segment type
- `siblingSegments` (Object[]): Other segments in the module
- `additionalContext` (String): Content requirements

**Response:**
- `content` (String): Generated content in Markdown format

#### Refine Segment Content
**POST** `/refineSegmentContent`

Refines existing segment content based on user feedback.

**Request Body:**
- `jobTitle` (String): The target job title
- `courseTitle` (String): The parent course
- `siblingCourseTitles` (String[]): Other courses for context
- `moduleTitle` (String): The parent module
- `siblingModuleTitles` (String[]): Other modules for context
- `segmentTitle` (String): The specific segment
- `segmentType` (String): The segment type
- `siblingSegments` (Object[]): Other segments for context
- `segmentContent` (String): Current content
- `additionalContext` (String): Refinement instructions

**Response:**
- `content` (String): Refined content in Markdown format

## Data Structures

### Pathway Data Model

```
Pathway {
  jobTitle: String,
  courses: [
    {
      title: String,
      modules: [
        {
          title: String,
          segments: [
            {
              title: String,
              type: String, // Info, Research, Exercise, Discussion, Project
              content: String // Markdown
            }
          ]
        }
      ]
    }
  ]
}
```

### Version History Model

```
VersionHistory {
  stepType: String, // "courseTitles", "moduleTitles", "segmentOverview", "segmentContent"
  stepId: String, // Unique identifier for the specific step instance
  versions: [
    {
      versionNumber: Number,
      timestamp: Date,
      data: Object, // The specific data for this step
      prompt: String // The user prompt that generated this version
    }
  ],
  currentVersion: Number
}
```

## Technical Requirements

### Frontend Requirements
- React functional components with hooks
- Client-side routing for step navigation
- Local storage integration for data persistence
- Responsive design for various screen sizes
- Form validation and error handling
- Loading states for AI generation requests

### Backend Requirements
- Express.js server with CORS configuration
- RESTful API endpoints
- Request validation middleware
- Error handling and logging
- AI service integration
- JSON response formatting

### Development Considerations
- No TypeScript usage (pure JavaScript)
- Modern ES6+ syntax
- Component-based architecture
- State management for complex form data
- Optimistic UI updates for better user experience
- Proper error boundaries and fallback states

## User Experience Guidelines

### Loading States
- Show loading indicators during AI generation
- Disable form inputs while requests are processing
- Provide clear feedback on operation status

### Error Handling
- Display user-friendly error messages
- Provide retry mechanisms for failed requests
- Validate form inputs before submission
- Handle network connectivity issues gracefully

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels and roles
- Color contrast compliance
- Focus management for dynamic content

### Performance
- Lazy load tree view components
- Debounce API requests where appropriate
- Implement client-side caching for generated content
- Optimize re-renders with proper React patterns