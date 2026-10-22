const express = require('express');
const router = express.Router();
const multer = require('multer');
const { PDFParse } = require('pdf-parse');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF resumes are allowed.'));
        }
    }
});

router.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a PDF resume.'
            });
        }

        const jobDescription = req.body.jobDescription || '';

        if (!jobDescription.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a job description.'
            });
        }

        const parser = new PDFParse({
            data: req.file.buffer
        });

        const pdfData = await parser.getText();
        const resumeText = pdfData.text.toLowerCase();
        const jobText = jobDescription.toLowerCase();

        await parser.destroy();

        const commonSkills = [
            'javascript',
            'python',
            'java',
            'react',
            'node.js',
            'express',
            'mongodb',
            'sql',
            'html',
            'css',
            'git',
            'communication',
            'leadership',
            'problem solving',
            'data structures',
            'machine learning'
        ];

        const requiredSkills = commonSkills.filter(skill =>
            new RegExp(
                `(^|[^a-z0-9])${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`,
                'i'
            ).test(jobText)
        );

        const matchedSkills = requiredSkills.filter(skill =>
            new RegExp(
                `(^|[^a-z0-9])${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`,
                'i'
            ).test(resumeText)
        );

        const missingSkills = requiredSkills.filter(
            skill => !matchedSkills.includes(skill)
        );

        const score = requiredSkills.length
            ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
            : 0;

        res.json({
            success: true,
            estimatedMatchScore: score,
            matchedSkills,
            missingSkills,
            totalRequiredSkills: requiredSkills.length,
            suggestions: missingSkills.length
                ? [`Consider developing these skills: ${missingSkills.join(', ')}`]
                : ['Your resume mentions all the skills detected in the job description.']
        });

    } catch (error) {
        console.error('Resume analysis error:', error);

        res.status(500).json({
            success: false,
            message: 'Unable to analyze the resume. Please check your PDF and try again.'
        });
    }
});

module.exports = router;