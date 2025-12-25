import WorkExperience from '../components/resume/WorkExperience';
import ProjectsSection from '../components/home/ProjectsSection';
import ResumeHeader from '../components/resume/ResumeHeader';
import Education from '../components/resume/Education';
import { useEffect } from 'react';
import { useResume } from '../hooks/useResume';

export default function ResumePage() {
    const { data } = useResume();

    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24">
            <ResumeHeader header={data.header} />
            <WorkExperience experience={data.experience} />
            <Education education={data.education} />
            <ProjectsSection className="!py-6" />
        </div>
    );
}
