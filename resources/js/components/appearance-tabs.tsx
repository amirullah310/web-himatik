import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { useSidebar } from '@/components/ui/sidebar'; // ✅ ambil state sidebar

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();
    const { state } = useSidebar(); // 👉 collapsed / expanded

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        // { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            className={cn(
                'flex rounded-lg bg-neutral-100 dark:bg-neutral-800',
                state === 'collapsed'
                    ? 'flex-col gap-1 p-0'
                    : 'flex-wrap gap-1 p-1', // 👉 pakai flex-wrap saat expanded
                className
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center justify-center rounded-md transition-colors',
                        state === 'collapsed'
                            ? 'h-9 w-9'
                            : cn(
                                'h-8 px-3 gap-2',
                                value === 'system' && 'basis-full justify-start' // 👈 System turun ke baris bawah
                              ),
                        appearance === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <Icon className="h-4 w-4" />
                    {state !== 'collapsed' && <span className="text-sm">{label}</span>}
                </button>
            ))}
        </div>
    );
}
