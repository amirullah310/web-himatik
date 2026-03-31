// index.tsx
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

import AppBidang from '@/components/homepage/app-bidang';
import AppFooter from '@/components/homepage/app-footer';
import AppHeader from '@/components/homepage/app-header';
import AppHero from '@/components/homepage/app-hero';
import AppLabel from '@/components/homepage/app-label';
import SectionLabelHome from '@/components/homepage/app-label-bottom';
import AppLoading from '@/components/homepage/app-loading';
import AppStruktural from '@/components/homepage/app-struktural';
import AppVisiMisi from '@/components/homepage/app-visi-misi';
import AppCarousel from '@/components/homepage/app-carousel';
import AppTimeline from '@/components/homepage/app-timeline';
import VideoProfile from '@/components/homepage/app-profile';

import banner1 from '@/assets/images/image.png';
import banner2 from '@/assets/images/image3.png';
import banner3 from '@/assets/images/image4.png';
import NewsGrid from '@/components/homepage/newsGrid';
import AppFeatureGrid from '@/components/homepage/app-carousel';
import AppJoinSection from '@/components/about/app-join-section';
import AppScrollToTop from '@/components/homepage/app-scroll-to-top';


interface Division {
    id: number;
    name: string;
    description?: string;
}

interface StructureMember {
    id: number;
    name: string;
    position: string;
    picture?: string | null;
}

// Tambahkan prop isBirthday di interface
interface HomePageProps {
    divisions: Division[];
    structureMembers: StructureMember[];
    isBirthday: boolean;
}

// Tambahkan isBirthday sebagai parameter props
const HomePage: React.FC<HomePageProps> = ({ divisions, structureMembers, isBirthday }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    // Tambahkan useEffect untuk mengontrol kelas pada <body>
    useEffect(() => {
        // Saat komponen dimuat, tambahkan kelas 'public-theme'
        document.body.classList.add('public-theme');

        // Saat komponen tidak lagi digunakan, hapus kelasnya
        return () => {
            document.body.classList.remove('public-theme');
        };
    }, []); // Array kosong memastikan efek ini hanya berjalan sekali saat mount dan unmount

    if (isLoading) return <AppLoading />;

    return (
        <>
            <Head title="Home - HIMATIK" />
            {/* Teruskan prop isBirthday ke komponen AppHeader */}
            <AppHeader isBirthday={isBirthday} />
            <main className="bg-white ">
                <AppHero />
                <AppLabel />
                <VideoProfile/>

                <AppVisiMisi />
                <AppLabel />
                {/* <AppTimeline /> */}

                <AppBidang divisions={divisions} />
                {/* <NewsGrid /> */}
                <AppJoinSection/>
                {/* <AppStruktural strukturalList={structureMembers} /> */}
                <SectionLabelHome/>

                {/* <AppFeatureGrid /> */}
            </main>
            <AppScrollToTop />
            <AppFooter />
        </>
    );
};


export default HomePage;
