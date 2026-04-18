import Loading from '../components/Loading';
import { useState } from 'react';
import Modal from '../components/Modal';
import AddSocialForm from '../components/AddSocialForm';
import UpdateSocialForm from '../components/UpdateSocialForm';
import DeleteSocialForm from '../components/DeleteSocialForm';
import { useFetchSocials } from '../queries/queries';
import SocialCard from '../components/SocialCard';

const PLATFORM_MAP = {
  instagram: { color: "#e1306c", label: "Instagram" },
  linkedin: { color: "#0a66c2", label: "LinkedIn" },
  github: { color: "#e8e2d4", label: "GitHub" },
  twitter: { color: "#1da1f2", label: "Twitter" },
  x: { color: "#e8e2d4", label: "X" },
  facebook: { color: "#1877f2", label: "Facebook" },
  discord: { color: "#5865f2", label: "Discord" },
  youtube: { color: "#ff0000", label: "YouTube" },
  tiktok: { color: "#e8e2d4", label: "TikTok" },
  dribbble: { color: "#ea4c89", label: "Dribbble" },
  behance: { color: "#1769ff", label: "Behance" },
  twitch: { color: "#9146ff", label: "Twitch" },
}

function detectPlatform(name) { 
  const key = name.toLowerCase().replace(/\s/g, '');
  return PLATFORM_MAP[key] || { color: "#c9922a", label: name || "Social"};
}

function extractHandler(url) {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    const parts = u.pathname.split('/').filter(Boolean);
    return parts.length ? "@" + parts[parts.length - 1] : u.hostname;
  } catch (error) {
    return url;
  }
}

function initials(name) {
  return name.slice(0,2).toUpperCase();
}



function SocialPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [social, setSocial] = useState(null);
  const [search, setSearch] = useState("");

  const { data = [], isPending, error } = useFetchSocials()

  if (isPending) return <Loading />;
  if (error) return error.message;

  const filteredSocials = data.filter(
    (social) => social.name.toLowerCase().includes(search.toLowerCase()) ||
      social.link.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <section className='relative flex flex-1 flex-col overflow-hidden bg-[#0f0f0f] text-[#e8e2d4]'>
      <div className="flex shrink-0 items-center justify-between border-b border-[#1e1e1e] px-7 py-4.5">
        <div>
          <h1 className='m-0 text-xl font-semibold tracking-[-0.3px] text-[#e8e2d4]'>Socials</h1>
          <p className='mt-0.5 text-xs text-[#555]'>Manage my social media presence</p>
        </div>
        <AddButton onClick={() => setOpenAddModal(true)}/>
      </div>

      {/* controls */}
      <div className="flex shrink-0 items-center gap-2.5 border-b border-[#1e1e1e] px-7 py-3.5">
        <div className="relative max-w-65 flex-1">
          <span className='absolute left-3 top-1/2 flex -translate-y-1/2 text-[#444]'>
            <IconSearch/>
          </span>
          <input type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search socials...'
            className='w-full rounded-md border border-[#2a2a2a] bg-[#161616] py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#c9922a55]'
          />
        </div>
        <span className='ml-auto text-xs text-[#444]'>{filteredSocials.length} social{filteredSocials.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Card Grid */}
      <div className="flex-1 overflow-y-auto px-7 py-5">
        {filteredSocials.length === 0 ? (
        <div className="flex h-50 items-center justify-center text-sm text-[#444]">No socials match your search</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredSocials.map((social) => (
                <SocialCard
                  key={social.id}
                  social={social}
                  onEdit={(social) => {
                    setSocial(social);
                    setOpenUpdateModal(true);
                  }}
                  onDelete={(social) => {
                    setSocial(social);
                    setOpenDeleteModal(true);
                  }}
                  detectPlatform={detectPlatform}
                  extractHandler={extractHandler}
                  initials={initials}
                />
              ))}
            </div>
        ) }
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-[#1e1e1e] px-7 py-3.5">
        <span className='text-xs text-[#444]'>
          {filteredSocials.length} total item{filteredSocials.length !== 1 ? "s" : ""}
        </span>
        <span className='text-xs text-[#333]'>Links open in a new tab</span>
      </div>

      <Modal
        isOpen={openAddModal}
        onClose={setOpenAddModal}
        title="Add New Social Link"
        children={
          <AddSocialForm
            onClose={setOpenAddModal}
            detectPlatform={detectPlatform}
          />}
      />
      <Modal
        isOpen={openUpdateModal}
        onClose={setOpenUpdateModal}
        title="Update Social Link"
        children={<UpdateSocialForm social={social} onClose={setOpenUpdateModal} detectPlatform={detectPlatform} />} />
      <Modal
        isOpen={openDeleteModal}
        onClose={setOpenDeleteModal}
        title="Delete Social Link"
        children={<DeleteSocialForm social={social} onClose={setOpenDeleteModal} />} />
    </section>
  )
}

function IconPlus() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function AddButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md px-4.5 py-2.5 text-sm font-semibold text-[#0f0f0f] transition-colors duration-150 ${hovered ? "bg-[#e0a838]" : "bg-[#c9922a]"
        }`}
    >
      <IconPlus /> Add social
    </button>
  );
}

export default SocialPage