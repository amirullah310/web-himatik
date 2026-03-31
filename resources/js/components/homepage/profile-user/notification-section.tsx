import { usePage } from '@inertiajs/react';
import { Bell, Heart, MessageCircle } from 'lucide-react';

export default function NotificationSection() {
    const { notifications, auth } = usePage().props;
    const user = auth?.user;

    return (
        <section className="rounded-xl border border-gray-300 bg-white p-6 sm:p-8 transition-colors duration-300 hover:border-purple-400">
            <header className="mb-4 text-center">
                <h2 className="text-3xl font-bold text-black md:text-4xl flex gap-2 justify-center items-center">
                    <Bell className="h-8 w-8 text-purple-500" />
                    Notifikasi
                </h2>
            </header>

            {!user && (
                <p className="text-center text-gray-500">
                    Login untuk melihat notifikasi.
                </p>
            )}

            {user && (
                <div>
                    {notifications && notifications.length > 0 ? (
                        <div className="space-y-4">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className="p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 transition"
                                >
                                    <div className="flex items-start gap-3">

                                        {/* Icon berdasar tipe */}
                                        {notif.type === "comment_liked" && (
                                            <Heart className="h-5 w-5 text-pink-500 mt-1" />
                                        )}

                                        {notif.type === "comment_replied" && (
                                            <MessageCircle className="h-5 w-5 text-purple-500 mt-1" />
                                        )}

                                        <div className="flex flex-col">

                                            {/* Pesan otomatis */}
                                            <p className="text-sm text-gray-800">
                                                <span className="font-semibold text-purple-600">
                                                    {notif.from || "Seseorang"}
                                                </span>{" "}
                                                {notif.message}
                                            </p>

                                            {/* Tanggal */}
                                            <p className="text-xs text-gray-400 mt-1">
                                                {notif.created}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            Belum ada notifikasi baru untuk saat ini.
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}
