import type { CompanyData, ProjectData } from '@/shared/types/experience'

export interface ExperienceProps {
    projectFilter?: string[]
    id?: string
    hideHeading?: boolean
    isLast?: boolean
    companyData?: CompanyData
    projectsData?: ProjectData[]
}
