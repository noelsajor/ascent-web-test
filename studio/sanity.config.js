import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// Define the common studio configs used across all workspaces
const commonConfig = {
    plugins: [deskTool(), visionTool()],
    schema: {
        types: schemaTypes,
    },
}

export default defineConfig([
    {
        name: 'ascent-workspace',
        title: 'Ascent MGNT',
        projectId: process.env.SANITY_STUDIO_ASCENT_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || '',
        dataset: 'production',
        basePath: '/ascent',
        ...commonConfig,
    },
    {
        name: 'vita-workspace',
        title: 'Vita Organica',
        projectId: process.env.SANITY_STUDIO_VITA_PROJECT_ID || '',
        dataset: 'production',
        basePath: '/vita',
        ...commonConfig,
    },
    {
        name: 'enhanced-workspace',
        title: 'Enhanced Labs',
        projectId: process.env.SANITY_STUDIO_ENHANCED_PROJECT_ID || '',
        dataset: 'production',
        basePath: '/enhanced',
        ...commonConfig,
    }
])
