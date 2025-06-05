const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request validation middleware
const validateRequest = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(field => {
            const value = req.body[field];
            return value === undefined || value === null || value === '';
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Missing required fields',
                missingFields: missingFields
            });
        }
        next();
    };
};

// Error handling middleware
const handleErrors = (res, error, message = 'Internal server error') => {
    console.error(error);
    res.status(500).json({
        error: message,
        details: error.message
    });
};

// Mock data generators
const generateMockCourseTitles = (jobTitle) => {
    const courseTemplates = {
        'software engineer': [
            'Fundamentals of Programming',
            'Data Structures and Algorithms',
            'Software Design Patterns',
            'Database Management Systems',
            'Web Development Technologies',
            'Version Control and Collaboration',
            'Testing and Quality Assurance',
            'DevOps and Deployment'
        ],
        'data scientist': [
            'Statistics and Probability',
            'Python for Data Science',
            'Data Visualization and Analysis',
            'Machine Learning Fundamentals',
            'Database and SQL Mastery',
            'Big Data Technologies',
            'Deep Learning and Neural Networks',
            'Business Intelligence and Reporting'
        ],
        'product manager': [
            'Product Strategy and Vision',
            'Market Research and Analysis',
            'User Experience Design Principles',
            'Agile Project Management',
            'Data-Driven Decision Making',
            'Stakeholder Communication',
            'Go-to-Market Strategy',
            'Product Metrics and Analytics'
        ]
    };

    const defaultCourses = [
        'Industry Fundamentals',
        'Core Technical Skills',
        'Professional Development',
        'Advanced Techniques',
        'Leadership and Communication',
        'Project Management'
    ];

    const jobTitleLower = jobTitle.toLowerCase();
    for (const [key, courses] of Object.entries(courseTemplates)) {
        if (jobTitleLower.includes(key)) {
            return courses.join('\n');
        }
    }

    return defaultCourses.join('\n');
};

const generateMockModuleTitles = (courseTitle) => {
    const moduleTemplates = {
        'programming': [
            'Introduction to Programming Concepts',
            'Variables and Data Types',
            'Control Structures and Logic',
            'Functions and Procedures',
            'Object-Oriented Programming',
            'Error Handling and Debugging'
        ],
        'data': [
            'Introduction to Data Analysis',
            'Data Collection and Cleaning',
            'Exploratory Data Analysis',
            'Statistical Methods',
            'Data Visualization Techniques',
            'Advanced Analytics'
        ],
        'management': [
            'Leadership Fundamentals',
            'Team Building and Communication',
            'Project Planning and Execution',
            'Risk Management',
            'Performance Measurement',
            'Continuous Improvement'
        ]
    };

    const courseTitleLower = courseTitle.toLowerCase();
    for (const [key, modules] of Object.entries(moduleTemplates)) {
        if (courseTitleLower.includes(key)) {
            return modules;
        }
    }

    return [
        'Introduction and Overview',
        'Core Concepts',
        'Practical Applications',
        'Advanced Topics',
        'Best Practices',
        'Final Project'
    ];
};

const generateMockSegments = (moduleTitle) => {
    const segmentTypes = ['Info', 'Research', 'Exercise', 'Discussion', 'Project'];

    return [
        { title: `${moduleTitle} Overview`, type: 'Info' },
        { title: `Key Concepts and Terminology`, type: 'Info' },
        { title: `Industry Research Assignment`, type: 'Research' },
        { title: `Hands-on Practice Exercise`, type: 'Exercise' },
        { title: `Group Discussion: Best Practices`, type: 'Discussion' },
        { title: `Capstone Project`, type: 'Project' }
    ];
};

const generateMockContent = (segmentTitle, segmentType) => {
    const contentTemplates = {
        'Info': `# ${segmentTitle}

## Learning Objectives
By the end of this section, you will be able to:
- Understand the core concepts related to ${segmentTitle.toLowerCase()}
- Apply fundamental principles in practical scenarios
- Identify key terminology and best practices

## Introduction
This section provides a comprehensive overview of ${segmentTitle.toLowerCase()}, covering essential concepts that form the foundation for advanced topics.

## Key Concepts
### Concept 1: Fundamentals
Description of the fundamental principles and why they matter.

### Concept 2: Applications
How these concepts apply in real-world scenarios.

### Concept 3: Best Practices
Industry-standard approaches and methodologies.

## Summary
- Key takeaway 1
- Key takeaway 2
- Key takeaway 3

## Next Steps
Proceed to the next section to build upon these foundational concepts.`,

        'Research': `# ${segmentTitle}

## Research Assignment Overview
This research assignment will help you explore ${segmentTitle.toLowerCase()} in depth and understand current industry trends.

## Objectives
- Conduct thorough research on the given topic
- Analyze current market trends and developments
- Present findings in a structured format

## Assignment Instructions
1. **Research Phase** (2-3 hours)
   - Review at least 5 credible sources
   - Take detailed notes on key findings
   - Identify emerging trends and challenges

2. **Analysis Phase** (1-2 hours)
   - Compare different perspectives
   - Identify common themes
   - Draw meaningful conclusions

3. **Documentation Phase** (1 hour)
   - Create a summary report
   - Include references and citations
   - Prepare for group discussion

## Deliverables
- Research summary (500-750 words)
- List of sources with brief annotations
- 3-5 key insights or recommendations

## Evaluation Criteria
- Quality and credibility of sources
- Depth of analysis
- Clarity of presentation
- Actionable insights`,

        'Exercise': `# ${segmentTitle}

## Exercise Overview
This hands-on exercise will give you practical experience with ${segmentTitle.toLowerCase()}.

## Learning Outcomes
- Apply theoretical knowledge to practical scenarios
- Develop problem-solving skills
- Build confidence through hands-on practice

## Prerequisites
- Completion of previous information sections
- Basic understanding of core concepts

## Exercise Instructions

### Part 1: Setup (15 minutes)
1. Prepare your workspace
2. Gather necessary materials
3. Review the exercise requirements

### Part 2: Implementation (45 minutes)
1. **Step 1**: Initial setup and configuration
2. **Step 2**: Core implementation
3. **Step 3**: Testing and validation
4. **Step 4**: Optimization and refinement

### Part 3: Review and Reflection (15 minutes)
1. Test your solution
2. Document lessons learned
3. Identify areas for improvement

## Expected Results
By completing this exercise, you should have:
- A working solution to the given problem
- Better understanding of practical applications
- Confidence to tackle similar challenges

## Troubleshooting
Common issues and their solutions:
- Issue 1: Solution approach
- Issue 2: Alternative method
- Issue 3: Best practice recommendation`,

        'Discussion': `# ${segmentTitle}

## Discussion Forum Guidelines
Welcome to our collaborative discussion on ${segmentTitle.toLowerCase()}.

## Discussion Objectives
- Share diverse perspectives and experiences
- Learn from peer insights and best practices
- Build a community of practice

## Discussion Prompts

### Main Question
How has ${segmentTitle.toLowerCase()} impacted your current or desired work environment?

### Follow-up Questions
1. What challenges have you encountered related to this topic?
2. What successful strategies or solutions have you observed?
3. How do you see this area evolving in the future?

## Participation Guidelines
- **Initial Post**: Share your thoughts on the main question (150-200 words)
- **Peer Responses**: Respond to at least 2 classmates' posts thoughtfully
- **Professional Tone**: Maintain respectful and constructive dialogue
- **Evidence-Based**: Support opinions with examples or references when possible

## Discussion Timeline
- **Days 1-3**: Initial posts
- **Days 4-6**: Peer responses and follow-up discussions
- **Day 7**: Final reflections and synthesis

## Evaluation Criteria
- Quality and depth of initial post
- Meaningful engagement with peers
- Use of course concepts and terminology
- Professionalism and respect in all interactions

## Resources for Reference
- Course materials from previous sections
- Industry articles and case studies
- Professional experience and observations`,

        'Project': `# ${segmentTitle}

## Project Overview
This capstone project integrates all concepts learned about ${segmentTitle.toLowerCase()} into a comprehensive, real-world application.

## Project Objectives
- Demonstrate mastery of course concepts
- Apply skills to solve a practical problem
- Create a portfolio piece for professional development

## Project Scope
Design and implement a solution that addresses a real-world challenge related to ${segmentTitle.toLowerCase()}.

## Project Requirements

### Phase 1: Planning and Design (Week 1)
- **Problem Definition**: Clearly articulate the challenge you're addressing
- **Research**: Investigate existing solutions and best practices
- **Design**: Create detailed project plan and specifications
- **Timeline**: Develop realistic milestones and deliverables

### Phase 2: Implementation (Weeks 2-3)
- **Development**: Build your solution according to specifications
- **Testing**: Validate functionality and performance
- **Documentation**: Create user guides and technical documentation
- **Iteration**: Refine based on testing feedback

### Phase 3: Presentation and Evaluation (Week 4)
- **Final Documentation**: Complete project report
- **Presentation**: Prepare 10-minute presentation
- **Peer Review**: Participate in peer evaluation process
- **Reflection**: Submit learning reflection essay

## Deliverables
1. Project proposal and plan (Week 1)
2. Progress reports (Weeks 2-3)
3. Final solution/product (Week 4)
4. Technical documentation (Week 4)
5. Presentation slides and demo (Week 4)
6. Reflection essay (Week 4)

## Evaluation Criteria
- **Technical Execution** (40%): Quality and functionality of solution
- **Problem-Solving** (25%): Approach to addressing the challenge
- **Documentation** (20%): Clarity and completeness of documentation
- **Presentation** (15%): Communication of project and results

## Support Resources
- Office hours for technical guidance
- Peer collaboration encouraged
- Industry mentor connections available
- Technical resources and tools provided`
    };

    return contentTemplates[segmentType] || contentTemplates['Info'];
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({ message: 'Learning Pathway Creator API is running!' });
});

// Generate Course Titles
app.post('/generateCourseTitles', validateRequest(['jobTitle']), (req, res) => {
    try {
        const { jobTitle, additionalContext } = req.body;

        const courseTitles = generateMockCourseTitles(jobTitle);

        // Add delay to simulate AI processing
        setTimeout(() => {
            res.json({ courseTitles });
        }, 1500);

    } catch (error) {
        handleErrors(res, error, 'Failed to generate course titles');
    }
});

// Refine Course Titles
app.post('/refineCourseTitles', validateRequest(['jobTitle', 'courseTitles', 'additionalContext']), (req, res) => {
    try {
        const { jobTitle, courseTitles, additionalContext } = req.body;

        // Mock refinement logic
        const titlesToDelete = courseTitles.length > 3 ? [courseTitles[Math.floor(Math.random() * courseTitles.length)]] : [];
        const titlesToAdd = [
            {
                title: 'Professional Ethics and Standards',
                idx: Math.floor(courseTitles.length / 2)
            },
            {
                title: 'Industry Trends and Future Outlook',
                idx: courseTitles.length
            }
        ];

        setTimeout(() => {
            res.json({ titlesToDelete, titlesToAdd });
        }, 1200);

    } catch (error) {
        handleErrors(res, error, 'Failed to refine course titles');
    }
});

// Generate Module Titles
app.post('/generateModuleTitles', validateRequest(['jobTitle', 'courseTitle']), (req, res) => {
    try {
        const { jobTitle, courseTitle, siblingCourseTitles, additionalContext } = req.body;

        const moduleTitles = generateMockModuleTitles(courseTitle);

        setTimeout(() => {
            res.json({ moduleTitles });
        }, 1300);

    } catch (error) {
        handleErrors(res, error, 'Failed to generate module titles');
    }
});

// Refine Module Titles
app.post('/refineModuleTitles', validateRequest(['jobTitle', 'courseTitle', 'moduleTitles', 'additionalContext']), (req, res) => {
    try {
        const { jobTitle, courseTitle, siblingCourseTitles, moduleTitles, additionalContext } = req.body;

        const titlesToDelete = moduleTitles.length > 4 ? [moduleTitles[0]] : [];
        const titlesToAdd = [
            {
                title: 'Hands-on Workshop Session',
                idx: 2
            }
        ];

        setTimeout(() => {
            res.json({ titlesToDelete, titlesToAdd });
        }, 1100);

    } catch (error) {
        handleErrors(res, error, 'Failed to refine module titles');
    }
});

// Generate Segment Overview
app.post('/generateSegmentOverview', validateRequest(['jobTitle', 'courseTitle', 'moduleTitle']), (req, res) => {
    try {
        const { jobTitle, courseTitle, siblingCourseTitles, moduleTitle, siblingModuleTitles, additionalContext } = req.body;

        const segments = generateMockSegments(moduleTitle);

        setTimeout(() => {
            res.json({ segments });
        }, 1400);

    } catch (error) {
        handleErrors(res, error, 'Failed to generate segment overview');
    }
});

// Refine Segment Overview
app.post('/refineSegmentOverview', validateRequest(['jobTitle', 'courseTitle', 'moduleTitle', 'segments', 'additionalContext']), (req, res) => {
    try {
        const { jobTitle, courseTitle, siblingCourseTitles, moduleTitle, siblingModuleTitles, segments, additionalContext } = req.body;

        const segmentsToDelete = segments.length > 4 ? [segments[1].title] : [];
        const titlesToAdd = [
            {
                segment: {
                    title: 'Real-world Case Study Analysis',
                    type: 'Research'
                },
                idx: 3
            }
        ];

        setTimeout(() => {
            res.json({ segmentsToDelete, titlesToAdd });
        }, 1000);

    } catch (error) {
        handleErrors(res, error, 'Failed to refine segment overview');
    }
});

// Generate Segment Content
app.post('/generateSegmentContent', validateRequest(['jobTitle', 'courseTitle', 'moduleTitle', 'segmentTitle', 'segmentType']), (req, res) => {
    try {
        const {
            jobTitle,
            courseTitle,
            siblingCourseTitles,
            moduleTitle,
            siblingModuleTitles,
            segmentTitle,
            segmentType,
            siblingSegments,
            additionalContext
        } = req.body;

        const content = generateMockContent(segmentTitle, segmentType);

        setTimeout(() => {
            res.json({ content });
        }, 2000);

    } catch (error) {
        handleErrors(res, error, 'Failed to generate segment content');
    }
});

// Refine Segment Content
app.post('/refineSegmentContent', validateRequest(['jobTitle', 'courseTitle', 'moduleTitle', 'segmentTitle', 'segmentType', 'segmentContent', 'additionalContext']), (req, res) => {
    try {
        const {
            jobTitle,
            courseTitle,
            siblingCourseTitles,
            moduleTitle,
            siblingModuleTitles,
            segmentTitle,
            segmentType,
            siblingSegments,
            segmentContent,
            additionalContext
        } = req.body;

        // Mock refinement - add a section based on additional context
        const refinedContent = segmentContent + `\n\n## Additional Insights\n\nBased on your feedback: "${additionalContext}"\n\nHere are some additional considerations and expanded details to address your specific requirements. This refined content provides more depth and practical applications relevant to your learning objectives.`;

        setTimeout(() => {
            res.json({ content: refinedContent });
        }, 1800);

    } catch (error) {
        handleErrors(res, error, 'Failed to refine segment content');
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Learning Pathway Creator Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});
