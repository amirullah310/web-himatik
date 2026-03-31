export default function Sidebar() {
  return (
    <aside className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Search</h3>
        <div className="flex">
          <input
            type="text"
            placeholder="I'm looking for..."
            className="flex-1 border border-gray-300 px-3 py-2 rounded-l-md text-sm"
          />
          <button className="bg-[#FECA00] text-black font-semibold px-4 rounded-r-md">
            Search
          </button>
        </div>
      </div>

      {/* Follow Us */}
      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Follow us</h3>
        <p className="text-sm text-neutral-600 mb-3">
          Read our latest news on any of these social networks!
        </p>
        <div className="flex gap-3">
          {['facebook', 'twitter', 'instagram', 'youtube'].map((icon, i) => (
            <a
              key={i}
              href="#"
              className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FECA00] hover:text-black transition"
            >
              <i className={`fab fa-${icon}`}></i>
            </a>
          ))}
        </div>
      </div>

      {/* Subscribe */}
      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Get latest news delivered daily!</h3>
        <p className="text-sm text-neutral-600 mb-3">
          We will send you breaking news right to your inbox.
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Your e-mail"
            className="flex-1 border border-gray-300 px-3 py-2 rounded-l-md text-sm"
          />
          <button className="bg-[#FECA00] text-black font-semibold px-4 rounded-r-md">
            Subscribe
          </button>
        </div>
      </div>

      {/* Latest news */}
      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Latest news</h3>
        <ul className="space-y-3 text-sm text-neutral-700">
          <li className="border-b pb-2">Bradley Cooper’s “Twin” Causes Madness At Sundance</li>
          <li className="border-b pb-2">LA flight emergency lands as 6 onboard fall ill</li>
          <li className="border-b pb-2">Islamic State releases new propaganda video</li>
        </ul>
      </div>
    </aside>
  );
}
