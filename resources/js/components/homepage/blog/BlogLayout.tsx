import AppFooter from '@/components/homepage/app-footer';
import AppHeader from '@/components/homepage/app-header';
import { Head } from '@inertiajs/react';
import React from 'react';
import { Toaster } from 'sonner';
import SectionLabelHome from '../app-label-bottom';
import AppScrollToTop from '../app-scroll-to-top';

interface BlogLayoutProps {
    children: React.ReactNode;
    title: string;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head title={title} />
            <AppHeader />

            <main className="relative min-h-screen bg-white text-black">
                {/* Gradient aksen kuning halus di background */}
                <div className="pointer-events-none absolute inset-0 bg-white" />
                
                {/* Konten utama */}
                <div className="relative z-10 pt-0">{children}</div>
            </main>
            <SectionLabelHome/>
          <AppScrollToTop />

            <AppFooter />

            {/* Toaster notifikasi dengan aksen kuning */}
            <Toaster
                richColors
                toastOptions={{
                    classNames: {
                        success: 'bg-[#FECA00] text-black font-semibold shadow-lg',
                        error: 'bg-[#FECA00] text-black font-semibold shadow-lg',
                        info: 'bg-gray-900 text-white shadow-lg',
                    },
                }}
            />
        </>
    );
};

export default BlogLayout;
