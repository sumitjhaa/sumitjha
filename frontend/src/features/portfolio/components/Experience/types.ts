import type { CompanyData, ProjectData } from '@/shared/types/experience'

export interface ExperienceProps {
    id?: string
    companyData?: CompanyData
    projectsData?: ProjectData[]
}
