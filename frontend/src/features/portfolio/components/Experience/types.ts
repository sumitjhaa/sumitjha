import type { CompanyData, ProjectData } from '@/shared/types/experience'

export interface ExperienceProps {
    projectFilter?: string[]
    id?: string
    hideHeading?: boolean
    isLast?: boolean
    nextPageId?: string
    companyData?: CompanyData
    projectsData?: ProjectData[]
}
