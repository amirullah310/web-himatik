export default function OpenRequirement() {
    return (
        <section className="rounded-xl border border-gray-300 bg-white p-6 transition-colors duration-300 hover:border-[#FECA00] sm:p-8">
            <header className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-black md:text-4xl">Open Requirement</h2>
                <p className="mt-2 text-gray-600">Lihat status pendaftaran Anda di sini.</p>
            </header>
            <div className="text-center text-gray-500">
                Fitur ini belum diimplementasikan. <br /> 
                <span className="font-semibold text-[#FECA00]">Kode peserta</span> akan muncul di sini.
            </div>
        </section>
    );
}
