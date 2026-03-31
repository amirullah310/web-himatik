import AboutLogo from '@/components/about/app-about-logo';
import AboutHistory from '@/components/about/app-history';
import AboutIntro from '@/components/about/app-intro';
import SectionLabel from '@/components/about/app-label';
import AppFooter from '@/components/homepage/app-footer';
import AppHeader from '@/components/homepage/app-header';
import AppLoading from '@/components/homepage/app-loading';
import AnimatedSection from '@/components/homepage/AnimatedSection'; // path sesuai struktur project
import AppVisiMisi from '@/components/homepage/app-visi-misi';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import AppJoinSection from '@/components/about/app-join-section';
import AppLabel from '@/components/homepage/app-label';
import AppScrollToTop from '@/components/homepage/app-scroll-to-top';
import SectionLabelHome from '@/components/homepage/app-label-bottom';

const AboutPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.body.classList.add('public-theme');
        return () => {
            document.body.classList.remove('public-theme');
        };
    }, []);

    if (isLoading) return <AppLoading />;

    return (
        <>
            <Head title="About - HIMATIK" />
            <AppHeader />
            <main className="min-h-screen bg-white">
                <SectionLabel />
                <AboutIntro />
                <AboutHistory />
                                {/* <AppLabel /> */}
                {/* <AnimatedSection><AboutLogo /></AnimatedSection> */}
                <AppVisiMisi />
                <AppJoinSection />  {/* 🔥 Tambahkan ini */}
                {/* <AnimatedSection><AboutTeam /></AnimatedSection> */}
                                <SectionLabelHome/>
                
            </main>
            <AppScrollToTop />
            <AppFooter />
        </>
    );
};

export default AboutPage;
